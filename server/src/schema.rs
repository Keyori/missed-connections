// @generated automatically by Diesel CLI.

pub mod sql_types {
    #[derive(diesel::sql_types::SqlType)]
    #[diesel(postgres_type(name = "gender_type"))]
    pub struct GenderType;

    #[derive(diesel::sql_types::SqlType)]
    #[diesel(postgres_type(name = "point", schema = "pg_catalog"))]
    pub struct Point;
}

diesel::table! {
    use diesel::sql_types::*;
    use super::sql_types::GenderType;

    accounts (id) {
        id -> Int4,
        username -> Text,
        email -> Text,
        password_hash -> Text,
        session_id -> Nullable<Uuid>,
        name -> Text,
        gender -> GenderType,
        graduation_year -> Int4,
    }
}

diesel::table! {
    comments (id) {
        id -> Int4,
        post_id -> Int4,
        posted_at -> Timestamp,
        message -> Text,
        likes -> Int8,
    }
}

diesel::table! {
    use diesel::sql_types::*;
    use super::sql_types::Point;

    posts (id) {
        id -> Int4,
        account_id -> Int4,
        message -> Text,
        posted_at -> Timestamp,
        coordinates -> Nullable<Point>,
        location_name -> Nullable<Text>,
        campus -> Nullable<Text>,
        likes -> Int8,
    }
}

diesel::joinable!(comments -> posts (post_id));
diesel::joinable!(posts -> accounts (account_id));

diesel::allow_tables_to_appear_in_same_query!(
    accounts,
    comments,
    posts,
);
