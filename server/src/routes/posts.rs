use crate::db::{DbError, DbPost};
use crate::error::ServerError;
use crate::error::ServerError::{Expected, Unexpected};
use crate::user_api::AuthorizedUser;
use crate::{db, Db};
use rocket::serde::json::Json;
use rocket::serde::uuid::Uuid;
use rocket::serde::{Deserialize, Serialize};
use rocket_db_pools::Connection;
use sqlx::Acquire;

#[derive(Responder)]
pub enum GetPostError {
    #[response(status = 400)]
    InvalidId(String),
}

#[get("/posts/<id>")]
pub async fn get_post(
    db: &Db,
    _account: AuthorizedUser,
    id: Uuid,
) -> Result<Json<Post>, ServerError<GetPostError>> {
    let db_post = db::get_post(
        &mut db.0.begin().await.unwrap(),
        uuid::Uuid::from_bytes(*id.as_bytes()),
    )
    .await?
    .ok_or(Expected(GetPostError::InvalidId(
        "This id is invalid.".to_string(),
    )))?;

    Ok(Json(Post::from(db_post)))
}

#[derive(Responder)]
pub enum GetPostsError {
    #[response(status = 400)]
    InvalidId(String),
    // #[response(status = 400)]
    // LimitTooLarge(String),
}

#[derive(Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
#[serde(rename_all = "camelCase")]
pub struct Post {
    pub id: Uuid,
    pub message: String,
    pub posted_at: (i32, u8, u8),
    pub longitude: f32,
    pub latitude: f32,
    pub location: String,
    pub likes: i64,
    pub dislikes: i64,
}

impl From<DbPost> for Post {
    fn from(db_post: DbPost) -> Self {
        Post {
            id: Uuid::from_bytes(*db_post.id.as_bytes()),
            message: db_post.message,
            posted_at: db_post.posted_at.date().as_ymd(),
            longitude: db_post.longitude,
            latitude: db_post.latitude,
            location: db_post.location,
            likes: db_post.likes,
            dislikes: db_post.dislikes,
        }
    }
}

#[get("/posts?<id>&<limit>")]
pub async fn get_posts(
    db: &Db,
    _account: AuthorizedUser,
    id: Uuid,
    limit: i64,
) -> Result<Json<Vec<Post>>, ServerError<GetPostsError>> {
    let db_posts: Vec<DbPost> = db::get_posts(
        &mut db.0.begin().await.unwrap(),
        uuid::Uuid::from_bytes(*id.as_bytes()),
        limit,
    )
    .await
    .map_err(|err| match err {
        DbError::RowNotFound => {
            Expected(GetPostsError::InvalidId("This id is invalid.".to_string()))
        }
        DbError::Unexpected(_) => Unexpected(format!("{:?}", err)),
    })?;

    Ok(Json(
        db_posts
            .into_iter()
            .map(|db_post| Post::from(db_post))
            .collect(),
    ))
}

#[derive(Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
#[serde(rename_all = "camelCase")]
pub struct AddPostRequest {
    pub message: String,
    pub geo_location: (f32, f32),
    pub location: String,
    pub campus: String,
}

#[post("/posts", data = "<request>")]
pub async fn add_post(
    mut db: Connection<Db>,
    account: AuthorizedUser,
    request: Json<AddPostRequest>,
) -> Result<(), ServerError<()>> {
    let mut transaction = (&mut *db).begin().await?;

    db::add_post(
        &mut transaction,
        &account.username,
        &request.message,
        request.geo_location,
        &request.location,
        &request.campus,
    )
    .await?;

    transaction.commit().await?;

    Ok(())
}

#[get("/posts/map")]
pub async fn get_posts_map(
    db: &Db,
    _account: AuthorizedUser,
) -> Result<Json<Vec<Post>>, ServerError<()>> {
    let db_posts: Vec<DbPost> = db::get_newest_posts(&mut db.0.begin().await.unwrap()).await?;

    Ok(Json(
        db_posts
            .into_iter()
            .map(|db_post| Post::from(db_post))
            .collect(),
    ))
}
