pub trait Request {
    type Response;
    type Error;
    const ROUTE: &'static str;
}

struct CreateAccountRequest {
    username: String,
    password: String,
    first_name: String,
    email: String,
    gender: Gender,
    grad_year: u8
}

enum Gender {
    Male,
    Female,
    Other
}

enum CreateAccountError {
    InternalError = 0,
    InvalidUsername = 1,
    InvalidPassword = 2,
    InvalidGradYear = 3,
}

impl Request for CreateAccountRequest {
    type Response = ();
    type Error = CreateAccountError;
    const ROUTE: &'static str = "create-account";
}

struct LoginRequest {
    username: String,
    password: String
}

enum LoginError {
    InternalError = 0,
    InvalidCredentials = 1
}


