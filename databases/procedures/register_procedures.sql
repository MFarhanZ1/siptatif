DROP TABLE IF EXISTS unverified_email_register CASCADE;
CREATE TABLE IF NOT EXISTS unverified_email_register(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    verification_token VARCHAR(255) NOT NULL,
	is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    expires_at TIMESTAMP NOT NULL
);

CREATE OR REPLACE PROCEDURE register_akun_mahasiswa(
	getEmail			VARCHAR,
	password		 	VARCHAR,
	nim					VARCHAR,
	nama				VARCHAR,
	tanggal_lahir		DATE,
	no_hp				VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN
	-- buatkan akun mahasiswa + role bakal auto jadi (3) alias mahasiswa
	INSERT INTO akun(email, password, id_role) VALUES (getEmail, password, 3);

	-- tambahkan data mahasiswa
	INSERT INTO mahasiswa(nim, nama, tanggal_lahir, no_hp, email) VALUES (nim, nama, tanggal_lahir, no_hp, getEmail);

	-- hapus data unverified email
	DELETE FROM unverified_email_register WHERE email = getEmail;
END;
$$;