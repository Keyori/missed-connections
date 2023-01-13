-- Start server: docker run --name postgres-db -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

-- Login info for SQL editor:
-- Username: postgres
-- Password: docker

CREATE TYPE GENDER AS ENUM ('male', 'female', 'other');

CREATE TABLE IF NOT EXISTS accounts
(
--     have an account id that is related to through other tables
    username        TEXT PRIMARY KEY,
    email           TEXT    NOT NULL,
    password_hash   TEXT    NOT NULL,
    session_id      UUID,
    first_name      TEXT    NOT NULL,
    last_name       TEXT    NOT NULL,
    gender          GENDER  NOT NULL,
    graduation_year INTEGER NOT NULL,

    UNIQUE (email),
    UNIQUE (username)
);

CREATE TABLE IF NOT EXISTS posts
(
    id        UUID PRIMARY KEY,
    creator   TEXT      NOT NULL,
    message   TEXT      NOT NULL,
    posted_at TIMESTAMP NOT NULL DEFAULT (now() AT TIME ZONE 'UTC'),
    longitude FLOAT4    NOT NULL,
    latitude  FLOAT4    NOT NULL,
    location  TEXT      NOT NULL,
    campus    TEXT      NOT NULL,
    likes     INT8      NOT NULL,
    dislikes  INT8      NOT NULL,

-- disabled currently so I can test posts
    CONSTRAINT genuine_user FOREIGN KEY (creator) REFERENCES accounts (username)
);

CREATE TABLE IF NOT EXISTS comments
(
    id        SERIAL PRIMARY KEY,
    post_id   UUID      NOT NULL,
    posted_at TIMESTAMP NOT NULL DEFAULT (now() AT TIME ZONE 'UTC'),
    message   TEXT      NOT NULL,
    likes     INT8      NOT NULL,

    CONSTRAINT genuine_post FOREIGN KEY (post_id) REFERENCES posts (id)
);

-- CREATE TABLE IF NOT EXISTS message
-- (
--     id        SERIAL PRIMARY KEY,
--     creator   TEXT      NOT NULL,
--     posted_at TIMESTAMP NOT NULL,
--     message   TEXT      NOT NULL,
--
--     CONSTRAINT genuine_user FOREIGN KEY (creator) REFERENCES accounts (username)
-- )
