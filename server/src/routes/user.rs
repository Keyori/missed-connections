use crate::error::ServerError;
use crate::error::ServerError::Expected;
use crate::user_api::{CreateAccountError, CreateAccountRequest, LoginError, LoginRequest};
use crate::{db, Db};
use rand::Rng;
use rocket::serde::json::Json;
use rocket_db_pools::Connection;
use sqlx::types::Uuid;
use sqlx::Acquire;

#[post("/create-account", data = "<request>")]
pub async fn create_account(
    mut db: Connection<Db>,
    request: Json<CreateAccountRequest>,
) -> Result<(), ServerError<CreateAccountError>> {
    let mut transaction = (&mut *db).begin().await?;

    if request.graduation_year < 2022 || request.graduation_year > 2026 {
        return Err(Expected(CreateAccountError::InvalidGraduationYear(
            "Invalid graduation year.".to_string(),
        )));
    }

    if !is_password_valid(&request.password) {
        return Err(Expected(CreateAccountError::InvalidPassword(
            "Your password is invalid.".to_string(),
        )));
    }

    if db::does_email_exist(&mut transaction, &request.email).await? {
        return Err(Expected(CreateAccountError::EmailExists(
            "This email already exists.".to_string(),
        )));
    }

    if !check_if_email_exists::syntax::check_syntax(&request.email).is_valid_syntax {
        return Err(Expected(CreateAccountError::BadEmail(
            "Invalid email.".to_string(),
        )));
    }

    let salt: [u8; 10] = rand::thread_rng().gen();
    let password_hash = argon2::hash_encoded(
        request.password.as_bytes(),
        &salt,
        &argon2::Config::default(),
    )
    .unwrap();

    db::add_account(
        &mut transaction,
        &request.username,
        &request.email,
        &password_hash,
        &salt,
        &request.first_name,
        &request.last_name,
        &request.gender,
        request.graduation_year,
    )
    .await?;

    transaction.commit().await?;

    Ok(())
}

fn is_password_valid(password: &str) -> bool {
    password.len() > 7
        && password
            .chars()
            .any(|char| char == '&' || char == '!' || char == '$' || char == '@' || char == '*')
        && password.chars().any(char::is_uppercase)
        && password.chars().any(char::is_numeric)
}

#[post("/login", data = "<request>")]
pub async fn login(
    mut db: Connection<Db>,
    request: Json<LoginRequest>,
) -> Result<String, ServerError<LoginError>> {
    let mut transaction = (&mut *db).begin().await?;

    let password_hash = match db::get_password_hash(&mut transaction, &request.username).await? {
        None => {
            return Err(Expected(LoginError::UsernameDoesNotExist(
                "This username does not exist.".to_string(),
            )))
        }
        Some(salt) => salt,
    };

    if argon2::verify_encoded(&password_hash, request.password.as_bytes()).unwrap() {
        let session_id = Uuid::new_v4();
        db::set_session_id(&mut transaction, &request.username, session_id).await?;

        transaction.commit().await?;

        Ok(session_id.to_string())
    } else {
        Err(Expected(LoginError::IncorrectPassword(
            "Your password is incorrect.".to_string(),
        )))
    }
}
