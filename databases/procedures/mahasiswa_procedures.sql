-- pembuatan TABLE tahun_pendaftaran_saat_ini
CREATE TABLE IF NOT EXISTS tahun_pendaftaran_saat_ini (
    tahun VARCHAR(4) PRIMARY KEY
);

-- pembuatan sequence untuk counter urutan id TA terakhir
CREATE SEQUENCE IF NOT EXISTS no_reg_ta_seq;

-- pembuatan FUNCTION untuk melakukan generate_no_reg_ta
CREATE OR REPLACE FUNCTION generate_no_reg_ta(
	jenis_pendaftaran VARCHAR,
	kategori_ta VARCHAR
)
RETURNS VARCHAR
LANGUAGE plpgsql
AS $$
DECLARE
	-- keperluan konfigurasi tahun
	v_tahun VARCHAR;
	v_cek_isi_tahun_terakhir INT;
	v_tahun_terakhir_dari_tabel VARCHAR;

	-- ambil digit akhir dari tahun untuk di kode id ta nantinya
	v_digit_akhir_tahun VARCHAR;

	-- kode biner simbolis data dari mahasiswa
	v_kode_jenis_pendaftaran VARCHAR;
	v_kode_kategori_ta VARCHAR;

	-- urutan digit urutan counter id TA terakhir di sequence
	v_no_reg_ta_seq VARCHAR;
BEGIN

	-- ===================================================================================

	-- mendapatkan data tahun sekarang
	SELECT (CAST(DATE_PART('year', NOW()) AS TEXT)) INTO v_tahun;

	-- cek apakah tahun terakhir di tabel ada atau tidak
	SELECT COUNT(*) INTO v_cek_isi_tahun_terakhir 
		FROM tahun_pendaftaran_saat_ini;

	-- jika tidak ada, maka tambahkan tahun terakhir
	IF v_cek_isi_tahun_terakhir = 0 THEN
		INSERT INTO tahun_pendaftaran_saat_ini VALUES (v_tahun);
	END IF;

	-- lalu tahun fix akan di insert ke v_tahun_terakhir_dari_tabel
	SELECT tahun INTO v_tahun_terakhir_dari_tabel FROM tahun_pendaftaran_saat_ini;

	-- jika ada, maka akan di cek tahun sekarang apakah beda dengan tahun di tabel
	IF v_tahun <> v_tahun_terakhir_dari_tabel THEN

		-- jika iya, akan di update table tsb ke tahun sekarang,
		UPDATE tahun_pendaftaran_saat_ini SET tahun = v_tahun WHERE tahun = v_tahun_terakhir_dari_tabel;

		-- lalu akan reset sequence no_reg_ta_seq kembali 1
		ALTER SEQUENCE no_reg_ta_seq RESTART WITH 1;

		v_tahun_terakhir_dari_tabel := v_tahun;

	END IF;

	-- ===================================================================================

	-- mendapatkan 2 digit terakhir dari tahun saat ini
	v_digit_akhir_tahun := SUBSTRING(v_tahun_terakhir_dari_tabel, 3, 2);

	-- mengkonversi jenis pendaftaran menjadi kode numerik
	v_kode_jenis_pendaftaran := CASE 
		WHEN jenis_pendaftaran = 'INDIVIDU' THEN '1'
		WHEN jenis_pendaftaran = 'KELOMPOK' THEN '2'
		ELSE NULL
	END;

	-- mengkonversi kategori ta menjadi kode numerik
	v_kode_kategori_ta := CASE 
		WHEN kategori_ta = 'LAPORAN' THEN '1'
		WHEN kategori_ta = 'PAPERBASED' THEN '2'
		ELSE NULL
	END;

	-- mendapatkan urutan digit counter id TA terakhir di sequence
	SELECT nextval('no_reg_ta_seq') INTO v_no_reg_ta_seq;

	-- menggabungkan semua kode
	RETURN CONCAT('TA', v_digit_akhir_tahun, v_kode_jenis_pendaftaran, v_kode_kategori_ta, LPAD(CAST(v_no_reg_ta_seq AS TEXT), 4, '0'));
END;
$$;

CREATE OR REPLACE PROCEDURE mahasiswa_mendaftar_ta(
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
	v_no_reg_ta VARCHAR := generate_no_reg_ta(jenis_pendaftaran, kategori_ta);
BEGIN
	RAISE NOTICE '% - GENERATE KODE REGISTER TA', v_no_reg_ta;
END;
$$;