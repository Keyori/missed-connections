use std::borrow::BorrowMut;
use std::future::Future;
use check_if_email_exists::CheckEmailInput;
use rand::Rng;
use rocket::form::validate::Contains;
use rocket::http::{Cookie, Status};
use rocket::{Request, Response};
use rocket::futures::TryFutureExt;
use rocket::http::hyper::body::HttpBody;
use rocket::request::{FromRequest, Outcome};
use rocket_db_pools::{Connection, Database};
use rocket::outcome::try_outcome;
use rocket::serde::json::Json;
use sqlx::Error;
use crate::{Db, db, INTERNAL_ERROR};
use rocket::serde::{Deserialize, Serialize};
use sqlx::pool::PoolConnection;
use crate::db::DbError;
use crate::user_api::{CreateAccountError, CreateAccountRequest, Gender};
use crate::error::ServerError::Expected;
use crate::error::ServerError;


#[get("/create-account", data = "<request>")]
pub async fn create_account(mut db: Connection<Db>, request: Json<CreateAccountRequest>) -> Result<(), ServerError<CreateAccountError>> {

    let mut transaction = db.
    // let mut transaction = db.0.begin().await?;

    if request.graduation_year < 2022 || request.graduation_year > 2026 {
        return Err(Expected(CreateAccountError::InvalidGraduationYear("Invalid graduation year.".to_string())));
    }

    if !is_password_valid(&request.password) {
        return Err(Expected(CreateAccountError::InvalidPassword("Your password is invalid.".to_string())));
    }

    if db::does_email_exist(&mut transaction, &request.email).await? {
        return Err(Expected(CreateAccountError::EmailExists("This email already exists.".to_string())));
    }

    if !check_if_email_exists::syntax::check_syntax(&request.email).is_valid_syntax {
        return Err(Expected(CreateAccountError::BadEmail("Invalid email.".to_string())));
    }

    let salt: [u8; 10] = rand::thread_rng().gen();
    let password_hash = argon2::hash_encoded(request.password.as_bytes(), &salt, &argon2::Config::default()).unwrap();

    db::add_account(&mut transaction, &request.username, &request.email, &password_hash, &salt, &request.first_name, &request.last_name, &request.gender, request.graduation_year).await?;

    transaction.commit()?;

    Ok(())
}

fn is_password_valid(password: &str) -> bool {
    password.len() > 7
        && password.chars().any(|char| char == '&' || char == '!' || char == '$' || char == '@' || char == '*')
    && password.chars().any(char::is_uppercase)
    && password.chars().any(char::is_numeric)
}


// let matches = argon2::verify_encoded(&hash, password).unwrap();

