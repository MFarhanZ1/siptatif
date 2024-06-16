CREATE OR REPLACE VIEW view_detail_akun AS
SELECT 
    akun.email "email", 
    akun.password "password", 
    role.nama "role" 
FROM 
    akun, 
    role
WHERE 
    role.id = akun.id_role;

CREATE OR REPLACE VIEW view_detail_akun_mahasiswa AS
SELECT 
    akun.email "email", 
    mahasiswa.nama "nama", 
    mahasiswa.nim "nim",
    akun.password "password", 
    role.nama "role" 
FROM 
    akun, 
    role, 
    mahasiswa 
WHERE 
    role.id = akun.id_role AND 
    akun.email = mahasiswa.email;

CREATE OR REPLACE VIEW view_detail_akun_dosen AS
SELECT 
    akun.email "email", 
    dosen.nama "nama", 
    dosen.nidn "nidn",
    akun.password "password", 
    role.nama "role" 
FROM 
    akun, 
    role, 
    dosen
WHERE 
    role.id = akun.id_role AND 
    akun.email = dosen.email;