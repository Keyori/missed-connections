#[macro_use]
extern crate rocket;

use crate::db::Db;
use rocket_db_pools::Database;

mod db;
mod posts;
mod user;
mod user_api;
mod error;

#[launch]
fn rocket() -> _ {
    rocket::build().attach(Db::init()).mount(
        "/",
        routes![posts::get_post, posts::get_all_posts, posts::add_post, user::create_account, user::login],
    )
}

pub const INTERNAL_ERROR: &'static str = "An internal error has occured.";