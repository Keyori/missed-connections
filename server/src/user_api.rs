use std::str::FromStr;
use rocket::request::{FromRequest, Outcome};
use rocket::Request;
use rocket::http::Status;
use crate::{Db, db};
use rocket::serde::{Serialize, Deserialize};
use rocket_db_pools::Connection;
use uuid::Uuid;

pub struct AuthorizedUser {
    pub username: String
}

#[rocket::async_trait]
impl<'r> FromRequest<'r> for AuthorizedUser {
    type Error = ();

    async fn from_request(request: &'r Request<'_>) -> Outcome<Self, ()> {
        let session_id = match request.headers().get_one("Session-Id") {
            None => return Outcome::Failure((Status::Unauthorized, ())),
            Some(str_session_id) => match Uuid::from_str(str_session_id) {
                Ok(session_id) => session_id,
                Err(_) => return Outcome::Failure((Status::Unauthorized, ())),
            }
        };

        let conn = request.guard::<Connection<Db>>().await.unwrap();

        let username = match db::get_username(conn, session_id).await {
            Ok(Some(username)) => username,
            _ => return Outcome::Failure((Status::Unauthorized, ()))
        };

        Outcome::Success(AuthorizedUser {
            username
        })
    }
}

#[derive(Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
#[derive(sqlx::Type)]
#[sqlx(rename_all = "lowercase")]
pub enum Gender {
    Male,
    Female,
    Other
}

#[derive(Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
#[serde(rename_all = "camelCase")]
pub struct CreateAccountRequest {
    pub email: String,
    pub username: String,
    pub first_name: String,
    pub last_name: String,
    pub password: String,
    pub gender: Gender,
    pub graduation_year: i16
}

#[derive(Responder)]
pub enum CreateAccountError {
    #[response(status = 400)]
    InvalidPassword(String),
    #[response(status = 409)]
    EmailExists(String),
    #[response(status = 400)]
    BadEmail(String),
    #[response(status = 400)]
    InvalidGraduationYear(String),
}

#[derive(Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
#[serde(rename_all = "camelCase")]
pub struct LoginRequest {
    pub username: String,
    pub password: String,
}

#[derive(Responder)]
pub enum LoginError {
    #[response(status = 400)]
    IncorrectPassword(String),
    #[response(status = 409)]
    UsernameDoesNotExist(String),
}

