CREATE OR REPLACE PROCEDURE koordinator_verifikasi_ta(
	p_no_reg_ta VARCHAR,
    p_status TYPE_STATUS,
    p_catatan TEXT,
    p_nidn_penguji1 VARCHAR,
    p_nidn_penguji2 VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE tugas_akhir SET status = p_status, catatan = p_catatan, nidn_penguji1 = p_nidn_penguji1, nidn_penguji2 = p_nidn_penguji2 WHERE no_reg_ta = p_no_reg_ta;
    
    -- jika status ditolak, maka akan dihapus data riwayat pembimbing yang ia pilih, 
    -- jadinya kuota terpakai pembimbing terkait akan bertambah 1 lagi
    IF p_status = 'DITOLAK' THEN
        DELETE FROM riwayat_pembimbing WHERE no_reg_ta = p_no_reg_ta;
    ELSIF p_status = 'SETUJU' THEN
        DELETE FROM riwayat_penguji WHERE no_reg_ta = p_no_reg_ta;
        INSERT INTO riwayat_penguji(no_reg_ta, nidn) VALUES (p_no_reg_ta, p_nidn_penguji1);
        INSERT INTO riwayat_penguji(no_reg_ta, nidn) VALUES (p_no_reg_ta, p_nidn_penguji2);
    END IF;
END;
$$;