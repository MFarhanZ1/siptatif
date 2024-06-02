CREATE SEQUENCE IF NOT EXISTS no_reg_ta_seq;

CREATE OR REPLACE PROCEDURE mahasiswa_mendaftar_ta(
	jenis_pendaftaran VARCHAR,
	judul_ta VARCHAR,
	kategori_ta VARCHAR,
	berkas BYTEA,
	status VARCHAR,
	nim VARCHAR,
	nidn_pembimbing1 VARCHAR,
	nidn_pembimbing2 VARCHAR
)
LANGUAGE plpgsql
AS $$
DECLARE
	v_no_reg_ta VARCHAR;

	v_kode_jenis_pendaftaran VARCHAR;
	v_kode_kategori_ta VARCHAR;
	v_digit_akhir_tahun VARCHAR;

	v_no_reg_ta_seq INT;
BEGIN

	SELECT nextval('no_reg_ta_seq') INTO v_no_reg_ta_seq;

	-- mendapatkan 2 digit terakhir dari tahun saat ini
	v_digit_akhir_tahun := SUBSTRING(CAST(DATE_PART('year', NOW()) AS TEXT), 3, 2);

	-- mengkonversi jenis pendaftaran menjadi kode numerik
	IF jenis_pendaftaran = 'INDIVIDU' THEN
		v_kode_jenis_pendaftaran := '1';
	ELSE 
		v_kode_jenis_pendaftaran := '2';
	END IF;

	-- mengkonversi kategori ta menjadi kode numerik
	IF kategori_ta = 'LAPORAN' THEN
		v_kode_kategori_ta := '1';
	ELSE 
		v_kode_kategori_ta := '2';
	END IF;

	v_no_reg_ta := CONCAT('TA', v_digit_akhir_tahun, v_kode_jenis_pendaftaran, v_kode_kategori_ta, LPAD(CAST(v_no_reg_ta_seq AS TEXT), 3, '0'));

	RAISE NOTICE '%', v_no_reg_ta;
END;
$$;