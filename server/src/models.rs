use std::time::SystemTime;
use rocket::serde::{Deserialize, Serialize};
use diesel::{prelude::*, sql_types::Uuid};
use crate::schema::sql_types::{Gender, Point};


#[derive(Serialize, Deserialize)]
#[derive(Debug, PartialEq, FromSqlRow, AsExpression, Eq)]
#[diesel(sql_type = GenderType)]
pub enum Gender {
    Male,
    Female,
    Other,
}

#[derive(Insertable)]
#[diesel(table_name = accounts)]
pub struct NewAccount<'a> {
    username: &'a str,
    email: &'a str,
    password_hash: &'a str,
    name: &'a str,
    gender: Gender,
    graduation_year: i32
}

#[derive(Queryable)]
pub struct Account {
    id: i32,
    username: String,
    email: String,
    password_hash: String,
    session_id: Uuid,
    name: String,
    gender: Gender,
    graduation_year: i32
}

#[derive(Insertable)]
#[diesel(table_name = posts)]
pub struct NewPost<'a> {
    account_id: i32,
    message: &'a str,
    posted_at: SystemTime,
    coordinates: Point,
    location_name: &'a str,
    campus: &'a str,
    likes: i8,
}

#[derive(Queryable)]
pub struct Post {
    id: i32,
    account_id: i32,
    message: String,
    posted_at: SystemTime,
    coordinates: Point,
    location_name: String,
    campus: String,
    likes: i8,
}

#[derive(Insertable)]
#[diesel(table_name = comments)]
pub struct NewComment<'a> {
    post_id: i32,
    posted_at: SystemTime,
    message: &'a str,
    likes: i8,
}

#[derive(Queryable)]
pub struct Comment {
    id: i32,
    post_id: i32,
    posted_at: SystemTime,
    message: &'a str,
    likes: i8,
}
