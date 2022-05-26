#[macro_use] extern crate rocket;

use crate::db::Db;
use rocket_db_pools::Database;

mod api;
mod db;
mod posts;

#[launch]
fn rocket() -> _ {
    rocket::build().attach(Db::init()).mount("/", routes![posts::get_post, posts::get_all_posts, posts::add_post])
}
