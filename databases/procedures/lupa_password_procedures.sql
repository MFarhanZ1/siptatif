DROP TABLE IF EXISTS unverified_email_lupa_password CASCADE;
CREATE TABLE IF NOT EXISTS unverified_email_lupa_password (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    verification_token VARCHAR(255) NOT NULL,
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    expires_at TIMESTAMP NOT NULL
);

CREATE OR REPLACE PROCEDURE reset_password(
	getEmail	    VARCHAR,
	getPassword     VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN
    -- memperbarui password akun mahasiswa dengan password yang baru, dan mengupdate timestamp
    UPDATE akun SET password = getPassword, updated_at = NOW() WHERE email = getEmail;

    -- menghapus data unverified email
    DELETE FROM unverified_email_lupa_password WHERE email = getEmail;
END;
$$;