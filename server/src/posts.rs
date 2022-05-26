use rocket_db_pools::{Connection, sqlx};
use rocket::serde::json::Json;
use crate::{Db, db};
use crate::db::Post;

#[get("/posts/<id>")]
pub async fn get_post(mut db: Connection<Db>, id: i64) -> Json<Post> {
    Json(db::get_post(db, id).await.unwrap())
}

#[get("/posts")]
pub async fn get_all_posts(mut db: Connection<Db>) -> Json<Vec<Post>> {
    Json(db::get_all_posts(db).await)
}

#[post("/add-post", data = "<post>")]
pub async fn add_post(mut db: Connection<Db>, post: Json<Post>) {
    db::add_post(db, post.0).await
}



