CREATE OR REPLACE VIEW view_keahlian_dosen AS
SELECT 
    dosen.nidn "nidn", 
    dosen.nama "nama",
    keahlian.nama "keahlian",
    keahlian.id "id_keahlian"
FROM 
    keahlian_dosen kd,
    dosen,
    keahlian
WHERE
    kd.id_keahlian = keahlian.id AND
    kd.nidn = dosen.nidn
ORDER BY
    CASE
        WHEN dosen.nama LIKE 'Prof. Dr.%' THEN 1
        WHEN dosen.nama LIKE 'Dr.%' THEN 2
        ELSE 3
    END,
    dosen.nama;


-- data detail dosen view untuk format "Cyber Security, Machine Learning (ML), Mobile" (nanti digunakan untuk detail penguji dan pembimbing)
CREATE OR REPLACE VIEW view_detail_dosen AS
SELECT 
    dosen.nidn AS "nidn", 
    dosen.nama AS "nama",
    dosen.no_hp AS "no_hp",
    dosen.jenis_kelamin AS "jenis_kelamin",
    dosen.email AS "email",
    STRING_AGG(keahlian.nama, ', ') AS keahlian
FROM 
    dosen
LEFT JOIN 
    keahlian_dosen kd ON dosen.nidn = kd.nidn
LEFT JOIN 
    keahlian ON kd.id_keahlian = keahlian.id
GROUP BY 
    dosen.nidn, 
    dosen.nama
ORDER BY
    CASE
        WHEN dosen.nama LIKE 'Prof. Dr.%' THEN 1
        WHEN dosen.nama LIKE 'Dr.%' THEN 2
        ELSE 3
    END,
    dosen.nama;

-- mencoba auto mengurangkan kuota yang tersedia dengan kuota yang dipake di riwayat penguji
CREATE OR REPLACE VIEW view_detail_dosen_penguji AS
SELECT 
    vd.nidn "nidn", 
    vd.nama "nama", 
    vd.keahlian "keahlian", 
    dp.kuota "kuota_awal",
    CAST((
        SELECT 
            COUNT(rp.nidn) 
        FROM 
            riwayat_penguji rp 
        WHERE 
            rp.nidn = vd.nidn AND 
            rp.status = 'BELUM'
    ) AS INTEGER) "kuota_terpakai",
    dp.kuota - CAST((
        SELECT 
            COUNT(rp.nidn) 
        FROM 
            riwayat_penguji rp 
        WHERE 
            rp.nidn = vd.nidn AND 
            rp.status = 'BELUM'
    ) AS INTEGER) "kuota_tersisa"
FROM 
    view_detail_dosen vd, 
    dosen_penguji dp 
WHERE 
    dp.nidn = vd.nidn
ORDER BY
    CASE
        WHEN vd.nama LIKE 'Prof. Dr.%' THEN 1
        WHEN vd.nama LIKE 'Dr.%' THEN 2
        ELSE 3
    END,
    vd.nama;

-- mencoba auto mengurangkan kuota yang tersedia dengan kuota yang dipake di riwayat pembimbing
CREATE OR REPLACE VIEW view_detail_dosen_pembimbing AS
SELECT 
    vd.nidn "nidn", 
    vd.nama "nama", 
    vd.keahlian "keahlian", 
    dp.kuota "kuota_awal",
    CAST((
        SELECT 
            COUNT(rp.nidn) 
        FROM 
            riwayat_pembimbing rp 
        WHERE 
            rp.nidn = vd.nidn AND 
            rp.status = 'BELUM'
    ) AS INTEGER) "kuota_terpakai",
    dp.kuota - CAST((
        SELECT 
            COUNT(rp.nidn) 
        FROM 
            riwayat_pembimbing rp 
        WHERE 
            rp.nidn = vd.nidn AND 
            rp.status = 'BELUM'
    ) AS INTEGER) "kuota_tersisa"
FROM 
    view_detail_dosen vd, 
    dosen_pembimbing dp 
WHERE 
    dp.nidn = vd.nidn
ORDER BY
    CASE
        WHEN vd.nama LIKE 'Prof. Dr.%' THEN 1
        WHEN vd.nama LIKE 'Dr.%' THEN 2
        ELSE 3
    END,
    vd.nama;