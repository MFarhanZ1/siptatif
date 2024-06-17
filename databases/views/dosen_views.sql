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
    kd.nidn = dosen.nidn;


-- data detail dosen view untuk format "Cyber Security, Machine Learning (ML), Mobile" (nanti digunakan untuk detail penguji dan pembimbing)
CREATE OR REPLACE VIEW view_detail_dosen AS
SELECT 
    dosen.nidn "nidn", 
    dosen.nama "nama",
    dosen.no_hp "no_hp",
    dosen.jenis_kelamin "jenis_kelamin",
    dosen.email "email",
    STRING_AGG(keahlian.nama, ', ') AS keahlian
FROM 
    keahlian_dosen kd,
    dosen,
    keahlian
WHERE
    kd.id_keahlian = keahlian.id AND
    kd.nidn = dosen.nidn
GROUP BY 
    dosen.nidn, 
    dosen.nama;