#[macro_use]
extern crate rocket;

#[macro_use]
extern crate diesel;

use crate::db::Db;

mod db;
mod error;
mod models;
mod schema;
mod routes;
mod user_api;

#[launch]
fn rocket() -> _ {
    rocket::build()
        .attach(Db::fairing())
        .mount(
        "/",
        routes![
            routes::user::create_account,
            routes::user::login,
        ],
    )
        .mount("/posts",
        routes![
            routes::posts::get_post,
            routes::posts::get_posts,
            routes::posts::add_post,
            routes::posts::get_posts_map,
        ])
        .mount("/comments",
        routes![
            routes::comments::post_comment
        ])
}

pub const INTERNAL_ERROR: &'static str = "An internal error has occured.";
