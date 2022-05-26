use rocket_db_pools::{sqlx, Database, Connection};
use rocket_db_pools::sqlx::FromRow;
use rocket::serde::{Serialize, Deserialize};
use sqlx::types::Json;

#[derive(Database)]
#[database("sqlx_postgres")]
pub struct Db(sqlx::PgPool);

#[derive(FromRow, Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct Post {
    pub creator: String,
    pub posted_at: i64,
    pub longitude: f32,
    pub latitude: f32,
    pub content: String
}

pub async fn get_post(mut db: Connection<Db>, post_id: i64) -> Option<Post> {
    sqlx::query_as("SELECT * FROM posts WHERE id = $1").bind(post_id).fetch_optional(&mut *db).await.unwrap()
}

pub async fn get_all_posts(mut db: Connection<Db>) -> Vec<Post> {
    sqlx::query_as("SELECT * FROM posts").fetch_all(&mut *db).await.unwrap()
}

pub async fn add_post(mut db: Connection<Db>, post: Post) {
    sqlx::query("INSERT INTO posts ( creator, posted_at, longitude, latitude, content ) VALUES ( $1, $2, $3, $4, $5 )").bind(post.creator).bind(post.posted_at).bind(post.longitude).bind(post.latitude).bind(post.content).execute(&mut *db).await.unwrap();
}



