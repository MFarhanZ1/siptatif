CREATE TABLE IF NOT EXISTS unverified_emails (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    verification_token VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP NOT NULL
);

CREATE OR REPLACE PROCEDURE register_akun_mahasiswa(
	judul_ta VARCHAR,
	jenis_pendaftaran VARCHAR,
	kategori_ta VARCHAR,
	berkas BYTEA,
	nim VARCHAR,
	nidn_pembimbing1 VARCHAR,
	nidn_pembimbing2 VARCHAR
)
LANGUAGE plpgsql
AS $$
DECLARE