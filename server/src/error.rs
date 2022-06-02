use crate::db::DbError;

#[derive(Responder)]
pub enum ServerError<T> {
    Expected(T),
    #[response(status = 500)]
    Unexpected(String)
}

impl<T> From<sqlx::Error> for ServerError<T> {
    fn from(err: sqlx::Error) -> Self {
        ServerError::Unexpected(format!("{:?}", err))
    }
}

impl<T> From<DbError> for ServerError<T> {
    fn from(err: DbError) -> Self {
        ServerError::Unexpected(format!("{:?}", err))
    }
}