-- DB login info with docker:
-- Username: postgres
-- Password: docker

-- To reset tables:
-- DROP SCHEMA public CASCADE;
-- CREATE SCHEMA public;

CREATE TYPE GENDER AS ENUM ('male', 'female', 'other');

CREATE TABLE IF NOT EXISTS accounts (
    username            TEXT PRIMARY KEY,
    email               TEXT NOT NULL,
    password_hash       TEXT NOT NULL,
    salt                BYTEA NOT NULL,
    session_id          UUID,
    first_name          TEXT NOT NULL,
    last_name           TEXT NOT NULL,
    gender              GENDER NOT NULL,
    graduation_year     INTEGER NOT NULL,

    UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS posts (
    id          SERIAL PRIMARY KEY,
    creator     TEXT NOT NULL,
    posted_at   TIMESTAMP NOT NULL,
    message     TEXT NOT NULL,
    location    POINT NOT NULL,

-- disabled currently so I can test posts
    CONSTRAINT genuine_user		FOREIGN KEY (creator) REFERENCES accounts(username)
);

CREATE TABLE IF NOT EXISTS comments (
    id          SERIAL PRIMARY KEY,
    post_id     SERIAL NOT NULL,
    creator     TEXT NOT NULL,
    posted_at   TIMESTAMP NOT NULL,
    content     TEXT NOT NULL,

    CONSTRAINT genuine_post		FOREIGN KEY (post_id) REFERENCES posts(id),
    CONSTRAINT genuine_user		FOREIGN KEY (creator) REFERENCES accounts(username)
)


--     name		TEXT NOT NULL,
--     public_key	TEXT NOT NULL,
--     CONSTRAINT pk_accounts		PRIMARY KEY (name),
--     CONSTRAINT uk_public_key	UNIQUE (public_key)