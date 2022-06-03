use rocket::serde::{Deserialize, Serialize};
use rocket_db_pools::sqlx::FromRow;
use rocket_db_pools::{sqlx, Database, Connection};
use sqlx::{Error, Postgres, Row, Transaction};
use uuid::Uuid;
use crate::user_api::Gender;

#[derive(Database)]
#[database("sqlx_postgres")]
pub struct Db(pub sqlx::PgPool);

#[derive(FromRow, Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct Post {
    pub creator: String,
    pub posted_at: i64,
    pub longitude: f32,
    pub latitude: f32,
    pub content: String,
}

#[derive(Debug)]
pub enum DbError {
    Unexpected(String)
}

impl From<sqlx::Error> for DbError {
    fn from(err: Error) -> Self {
        DbError::Unexpected(format!("{:?}", err))
    }
}

pub async fn get_post(transaction: &mut Transaction<'_, Postgres>, post_id: i64) -> Result<Option<Post>, DbError> {
    Ok(sqlx::query_as("SELECT * FROM posts WHERE id = $1")
        .bind(post_id)
        .fetch_optional(transaction)
        .await?)
}

pub async fn get_posts(transaction: &mut Transaction<'_, Postgres>, cursor: ) -> Result<Vec<Post>, DbError> {
    Ok(sqlx::query_as("SELECT * FROM posts")
        .fetch_all(transaction)
        .await?)
}

pub async fn add_post(transaction: &mut Transaction<'_, Postgres>, post: Post) -> Result<(), DbError> {
    sqlx::query("INSERT INTO posts ( creator, posted_at, longitude, latitude, content ) VALUES ( $1, $2, $3, $4, $5 )")
        .bind(post.creator)
        .bind(post.posted_at)
        .bind(post.longitude)
        .bind(post.latitude)
        .bind(post.content)
        .execute(transaction)
        .await?;

    Ok(())
}

pub async fn get_username(mut conn: Connection<Db>, session_id: Uuid) -> Result<Option<String>, DbError> {
    Ok(sqlx::query("SELECT username FROM accounts WHERE session_id = $1")
        .bind(session_id)
        .fetch_optional(&mut *conn)
        .await
        .map(|maybe_row| maybe_row.and_then(|row| row.get("username")))?)
}

pub async fn does_email_exist(transaction: &mut Transaction<'_, Postgres>, username: &str) -> Result<bool, DbError> {
    Ok(sqlx::query("SELECT 1 FROM accounts WHERE email = $1")
        .bind(username)
        .fetch_optional(transaction)
        .await?
        .is_some())
}

pub async fn add_account(transaction: &mut Transaction<'_, Postgres>, username: &str, email: &str, password_hash: &str, salt: &[u8], first_name: &str, last_name: &str, gender: &Gender, graduation_year: i16) -> Result<(), DbError> {
    sqlx::query("INSERT INTO accounts ( username, email, password_hash, salt, first_name, last_name, gender, graduation_year ) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8 )")
        .bind(username)
        .bind(email)
        .bind(password_hash)
        .bind(salt)
        .bind(first_name)
        .bind(last_name)
        .bind(gender)
        .bind(graduation_year)
        .execute(transaction)
        .await?;

    Ok(())
}

pub async fn get_salt(transaction: &mut Transaction<'_, Postgres>, username: &str) -> Result<Option<Vec<u8>>, DbError> {
    Ok(sqlx::query("SELECT salt FROM accounts WHERE username = $1 ")
        .bind(username)
        .fetch_optional(transaction)
        .await
        .map(|maybe_row| maybe_row.and_then(|row| row.get("salt")))?)
}

pub async fn get_password_hash(transaction: &mut Transaction<'_, Postgres>, username: &str) -> Result<Option<String>, DbError> {
    Ok(sqlx::query("SELECT password_hash FROM accounts WHERE username = $1")
        .bind(username)
        .fetch_optional(transaction)
        .await
        .map(|maybe_row| maybe_row.and_then(|row| row.get("password_hash")))?)
}

pub async fn set_session_id(transaction: &mut Transaction<'_, Postgres>, username: &str, session_id: Uuid) -> Result<(), DbError> {
    sqlx::query("UPDATE accounts SET session_id = $1 WHERE username = $2")
        .bind(session_id)
        .bind(username)
        .execute(transaction)
        .await?;

    Ok(())
}

