use rocket::request::{FromRequest, Outcome};
use rocket::Request;
use rocket_db_pools::Connection;
use rocket::http::Status;
use crate::{Db, db};
use rocket::serde::{Serialize, Deserialize};
use sqlx::{Error, Postgres, Transaction};

pub struct AuthorizedUser {
    username: String
}

#[rocket::async_trait]
impl<'r> FromRequest<'r> for AuthorizedUser {
    type Error = ();

    async fn from_request(request: &'r Request<'_>) -> Outcome<Self, Self::Error> {
        let transaction = match request.guard::<&Db>().await.unwrap().0.begin().await {
            Ok(transaction) => transaction,
            Err(_) => return Outcome::Failure((Status::InternalServerError, ()))
        };


        let session_id = match request.cookies().get("session_id") {
            None => return Outcome::Failure((Status::Unauthorized, ())),
            Some(session_id) => session_id.value()
        };

        let username = match db::get_username(&mut transaction, session_id).await {
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

