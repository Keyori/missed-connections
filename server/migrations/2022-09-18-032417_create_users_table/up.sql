-- Start server: docker run --name postgres-db -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

-- Login info for SQL editor:
-- Username: postgres
-- Password: docker

CREATE TYPE GENDER_TYPE AS ENUM ('male', 'female', 'other');

CREATE TABLE IF NOT EXISTS accounts
(
    id              SERIAL PRIMARY KEY,
    username        TEXT NOT NULL,
    email           TEXT    NOT NULL,
    password_hash   TEXT    NOT NULL,
    session_id      UUID,
    name            TEXT    NOT NULL,
    gender          GENDER_TYPE  NOT NULL,
    graduation_year INTEGER NOT NULL,

    UNIQUE (email),
    UNIQUE (username)
);

CREATE TABLE IF NOT EXISTS posts
(
    id                  SERIAL PRIMARY KEY,
    account_id          SERIAL      NOT NULL,
    message   TEXT      NOT NULL,
    posted_at TIMESTAMP NOT NULL DEFAULT (now() AT TIME ZONE 'UTC'),
    coordinates         POINT,
    location_name       TEXT,
    campus    TEXT,
    likes     INT8      NOT NULL,

-- disabled currently so I can test posts
    CONSTRAINT genuine_user FOREIGN KEY (account_id) REFERENCES accounts (id)
);

CREATE TABLE IF NOT EXISTS comments
(
    id        SERIAL PRIMARY KEY,
    post_id   SERIAL      NOT NULL,
    posted_at TIMESTAMP NOT NULL DEFAULT (now() AT TIME ZONE 'UTC'),
    message   TEXT      NOT NULL,
    likes     INT8      NOT NULL,

    CONSTRAINT genuine_post FOREIGN KEY (post_id) REFERENCES posts (id)
);

-- CREATE TABLE IF NOT EXISTS message
-- (
--     id        SERIAL PRIMARY KEY,
--     account_id   SERIAL      NOT NULL,
--     posted_at TIMESTAMP NOT NULL,
--     message   TEXT      NOT NULL,

--     CONSTRAINT genuine_user FOREIGN KEY (account_id) REFERENCES accounts (id)
-- )
