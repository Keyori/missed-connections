use rocket_db_pools::sqlx::FromRow;
use rocket_db_pools::{sqlx, Database, Connection};
use sqlx::{Error, Postgres, Row, Transaction};
use sqlx::types::time::PrimitiveDateTime;
use uuid::Uuid;
use crate::user_api::Gender;

#[derive(Database)]
#[database("sqlx_postgres")]
pub struct Db(pub sqlx::PgPool);

#[derive(FromRow)]
pub struct DbPost {
    pub id: Uuid,
    pub creator: String,
    pub message: String,
    pub posted_at: PrimitiveDateTime,
    pub longitude: f32,
    pub latitude: f32,
    pub location: String,
}

#[derive(Debug)]
pub enum DbError {
    RowNotFound,
    Unexpected(String)
}

impl From<sqlx::Error> for DbError {
    fn from(err: Error) -> Self {
        match err {
            Error::RowNotFound => DbError::RowNotFound,
            _ => DbError::Unexpected(format!("{:?}", err))
        }
    }
}

pub async fn get_post(transaction: &mut Transaction<'_, Postgres>, post_id: Uuid) -> Result<Option<DbPost>, DbError> {
    Ok(sqlx::query_as!(DbPost, r#"SELECT id, location, creator, posted_at, longitude, latitude, message FROM posts WHERE id = $1"#, post_id)
        .fetch_optional(transaction)
        .await?)
}

pub async fn get_posts(transaction: &mut Transaction<'_, Postgres>, id: Uuid, limit: i64) -> Result<Vec<DbPost>, DbError> {
    Ok(sqlx::query_as!(DbPost, "SELECT id, creator, message, posted_at, longitude, latitude, location FROM posts WHERE id = $1 ORDER BY id DESC LIMIT $2", id, limit)
        .fetch_all(transaction)
        .await?)
}

pub async fn get_newest_posts(transaction: &mut Transaction<'_, Postgres>) -> Result<Vec<DbPost>, DbError> {
    Ok(sqlx::query_as!(DbPost, "SELECT id, creator, message, posted_at, longitude, latitude, location FROM posts ORDER BY posted_at DESC LIMIT 100")
        .fetch_all(transaction)
        .await?)
}

pub async fn add_post(transaction: &mut Transaction<'_, Postgres>, username: &str, message: &str, geo_location: (f32, f32), location: &str, campus: &str) -> Result<(), DbError> {
    sqlx::query!(r#"
        INSERT INTO posts ( id, creator, message, longitude, latitude, location, campus ) VALUES ( $1, $2, $3, $4, $5, $6, $7 )
        "#,
        Uuid::new_v4(),
        username,
        message,
        geo_location.0,
        geo_location.1,
        location,
        campus
    )
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



