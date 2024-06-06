CREATE TABLE IF NOT EXISTS unverified_emails (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    verification_token VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP NOT NULL
);