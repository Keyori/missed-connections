#[macro_use]
extern crate rocket;

use crate::db::Db;
use rocket_db_pools::Database;

mod db;
mod error;
mod routes;
mod user_api;


#[launch]
fn rocket() -> _ {
    rocket::build().attach(Db::init()).mount(
        "/",
        routes![
            routes::posts::get_post,
            routes::posts::get_posts,
            routes::posts::add_post,
            routes::posts::get_posts_map,
            routes::user::create_account,
            routes::user::login],
    )
}

pub const INTERNAL_ERROR: &'static str = "An internal error has occured.";