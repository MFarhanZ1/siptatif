CREATE OR REPLACE VIEW view_list_detail_pendaftaran_ta AS
SELECT
    TA.no_reg_ta AS "no_reg_ta",
    TA.jenis_pendaftaran AS "jenis_pendaftaran",
    TA.judul_ta AS "judul_ta",
    TA.kategori_ta AS "kategori_ta",
    TA.berkas AS "berkas",
    TA.timestamp AS "timestamp",
    TA.nim AS "nim",
    mahasiswa.nama AS "nama_mahasiswa",
    mahasiswa.email AS "email_mahasiswa",
    TA.nidn_pembimbing1 AS "nidn_pembimbing1",
    TA.nidn_pembimbing2 AS "nidn_pembimbing2",
    d1.nama AS "dosen_pembimbing1",
    d2.nama AS "dosen_pembimbing2",
    TA.nidn_penguji1 AS "nidn_penguji1",
    TA.nidn_penguji2 AS "nidn_penguji2",
    d3.nama AS "dosen_penguji1",
    d4.nama AS "dosen_penguji2",
    TA.status AS "status",
    TA.catatan AS "catatan"
FROM
    tugas_akhir TA
JOIN
    mahasiswa ON TA.nim = mahasiswa.nim
LEFT JOIN
    dosen d1 ON TA.nidn_pembimbing1 = d1.nidn
LEFT JOIN
    dosen d2 ON TA.nidn_pembimbing2 = d2.nidn
LEFT JOIN
    dosen d3 ON TA.nidn_penguji1 = d3.nidn
LEFT JOIN
    dosen d4 ON TA.nidn_penguji2 = d4.nidn;
