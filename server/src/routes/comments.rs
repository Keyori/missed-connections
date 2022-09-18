use rocket::serde::json::Json;
use rocket::serde::uuid::Uuid;
use crate::{Db, db};
use crate::error::ServerError;
use crate::routes::posts::AddPostRequest;
use crate::user_api::AuthorizedUser;
use rocket::serde::{Deserialize, Serialize};
use rocket_db_pools::Connection;
use sqlx::Acquire;

#[derive(Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
#[serde(rename_all = "camelCase")]
pub struct AddCommentRequest {
    pub post_id: Uuid,
    pub message: String, // add character limit
}

#[post("/comments", data = "<request>")]
pub async fn add_comment(
    mut db: Connection<Db>,
    _account: AuthorizedUser,
    request: Json<AddCommentRequest>,
) -> Result<(), ServerError<()>> {
    let mut transaction = (&mut *db).begin().await?;

    db::add_comment(
        &mut transaction,
        uuid::Uuid::from_bytes(*request.post_id.as_bytes()),
        &request.message
    )
        .await?;

    transaction.commit().await?;

    Ok(())
}
