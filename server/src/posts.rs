use crate::db::Post;
use crate::{db, Db};
use rocket::serde::json::Json;
use rocket_db_pools::Connection;
use crate::user_api::AuthorizedUser;

// make stuff return errors and also impl a from trait for the errors from db to be automatically be converted to something rocket can handle

#[get("/posts/<id>")]
pub async fn get_post(db: &Db, account: AuthorizedUser, id: i64) -> Json<Option<Post>> {
    Json(db::get_post(&mut db.0.begin().await.unwrap(), id).await.unwrap())
}

#[get("/posts?<id>&<limit>")]
pub async fn get_all_posts(db: &Db, account: AuthorizedUser, id: u64, limit: u64) -> Json<Vec<Post>> {
    Json(db::get_all_posts(&mut db.0.begin().await.unwrap()).await.unwrap())
}

#[post("/add-post", data = "<post>")]
pub async fn add_post(db: &Db, account: AuthorizedUser, post: Json<Post>) {
    db::add_post(&mut db.0.begin().await.unwrap(), post.0).await.unwrap()
}
