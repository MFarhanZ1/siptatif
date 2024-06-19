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