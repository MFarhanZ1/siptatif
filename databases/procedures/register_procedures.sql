CREATE TABLE IF NOT EXISTS unverified_emails (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    verification_token VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP NOT NULL
);

CREATE OR REPLACE PROCEDURE register_akun_mahasiswa(
	email				VARCHAR,
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
	INSERT INTO akun(email, password, id_role) VALUES (email, password, 3);

	-- tambahkan data mahasiswa
	INSERT INTO mahasiswa(nim, nama, tanggal_lahir, no_hp, email) VALUES (nim, nama, tanggal_lahir, no_hp, email);
END;
$$;