CREATE TABLE IF NOT EXISTS unverified_email_lupa_password (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    verification_token VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP NOT NULL
);

CREATE OR REPLACE PROCEDURE reset_password(
	getEmail	    VARCHAR,
	getPassword     VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE akun SET password = getPassword, updated_at = NOW() WHERE email = getEmail;
END;
$$;