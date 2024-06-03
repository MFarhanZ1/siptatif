-- pembuatan TABLE role
CREATE TABLE role (
	id		SERIAL 	NOT NULL,
	nama	VARCHAR(255) NOT NULL,
	PRIMARY KEY (id)
);

-- pembuatan TABLE akun
CREATE TABLE akun (
	email 		VARCHAR(255) NOT NULL,
	password	VARCHAR(255) NOT NULL,
	id_role		INT NOT NULL,
	CONSTRAINT PK_Akun PRIMARY KEY (email),
	CONSTRAINT FK_Akun_Role FOREIGN KEY (id_role) REFERENCES role (id)
);

-- pembuatan TABLE mahasiswa 
CREATE TABLE mahasiswa (
	nim	 VARCHAR(12) NOT NULL,
	nama VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	CONSTRAINT PK_Mahasiswa PRIMARY KEY (nim),
	CONSTRAINT FK_Mahasiswa_Akun FOREIGN KEY(email) REFERENCES akun (email)
);

-- pembuatan TABLE dosen
CREATE TYPE TYPE_JENIS_KELAMIN AS ENUM ('L', 'P');

CREATE TABLE dosen (
	nidn			VARCHAR(20) NOT NULL,
	nama 			VARCHAR(255) NOT NULL,
	jenis_kelamin	TYPE_JENIS_KELAMIN NOT NULL,
	email 			VARCHAR(255) NOT NULL,
	CONSTRAINT PK_Dosen PRIMARY KEY(nidn),
	CONSTRAINT UQ_Dosen_Email UNIQUE (email)
);

-- pembuatan TABLE dosen_pembimbing
CREATE TABLE dosen_pembimbing (
	id		 SERIAL NOT NULL,
	kuota	 INT DEFAULT NULL,
	nidn	 VARCHAR(20) NOT NULL,
	CONSTRAINT PK_Dosen_Pembimbing PRIMARY KEY(id),
	CONSTRAINT FK_DOSPEM_Dosen FOREIGN KEY (nidn) REFERENCES dosen (nidn)
);

--pembuatan TABLE dosen_penguji
CREATE TABLE dosen_penguji (
	id		 SERIAL NOT NULL,
	kuota	 INT DEFAULT NULL,
	nidn	 VARCHAR(20) NOT NULL,
	CONSTRAINT PK_Dosen_Penguji PRIMARY KEY(id),
	CONSTRAINT FK_DOSUJI_Dosen FOREIGN KEY (nidn) REFERENCES dosen (nidn)
);

--pembuatan TABLE keahlian
CREATE TABLE keahlian (
	id 		SERIAL,
	nama 	VARCHAR(255) NOT NULL,
	CONSTRAINT PK_Keahlian PRIMARY KEY (id)
);

--pembuatan TABLE keahlian_dosen
CREATE TABLE keahlian_dosen (
	id		 		SERIAL,
	nidn		 	VARCHAR(20) NOT NULL,
	id_keahlian		INT NOT NULL,
	CONSTRAINT PK_Keahlian_Dosen PRIMARY KEY (id),
	CONSTRAINT FK_KDOS_Dosen FOREIGN KEY(nidn) REFERENCES dosen (nidn),
	CONSTRAINT FK_KDOS_Keahlian FOREIGN KEY (id_keahlian) REFERENCES keahlian (id)
);

--pembuatan TABLE tugas_akhir
CREATE TYPE TYPE_JENIS_PENDAFTARAN AS ENUM ('INDIVIDU', 'KELOMPOK'); 
CREATE TYPE TYPE_KATEGORI_TA AS ENUM ('LAPORAN', 'PAPERBASED');
CREATE TYPE TYPE_STATUS AS ENUM ('SETUJU', 'DITOLAK', 'MENUNGGU');
CREATE TABLE tugas_akhir (
	no_reg_ta				VARCHAR(10) NOT NULL,
	jenis_pendaftaran		TYPE_JENIS_PENDAFTARAN NOT NULL,
	judul_ta				VARCHAR(255) NOT NULL,
	kategori_ta				TYPE_KATEGORI_TA NOT NULL,
	berkas					BYTEA NOT NULL,
	status 					TYPE_STATUS DEFAULT 'MENUNGGU',
	timestamp 				TIMESTAMP DEFAULT NOW(),					
	nim 					VARCHAR(12) NOT NULL,
	nidn_pembimbing1		VARCHAR(20) NOT NULL,
	nidn_pembimbing2		VARCHAR(20),
	nidn_penguji1 			VARCHAR(20),
	nidn_penguji2			VARCHAR(20),
	CONSTRAINT PK_Tugas_Akhir PRIMARY KEY (no_reg_ta),
	CONSTRAINT FK_TA_Mahasiswa FOREIGN KEY(nim) REFERENCES mahasiswa (nim),
	CONSTRAINT FK_TA_Dospem1 FOREIGN KEY(nidn_pembimbing1) REFERENCES dosen(nidn),
	CONSTRAINT FK_TA_Dospem2 FOREIGN KEY(nidn_pembimbing2) REFERENCES dosen(nidn),
	CONSTRAINT FK_TA_Dosuji1 FOREIGN KEY(nidn_penguji1) REFERENCES dosen(nidn),
	CONSTRAINT FK_TA_Dosuji2 FOREIGN KEY(nidn_penguji2) REFERENCES dosen(nidn)
);

--pembuatan TABLE riwayat_pembimbing
CREATE TYPE TYPE_STATUS_RIWAYAT AS ENUM ('SELESAI', 'BELUM');
CREATE TABLE riwayat_pembimbing (
	id			SERIAL NOT NULL,
	no_reg_ta	VARCHAR(9) NOT NULL,
	nidn		VARCHAR(20) NOT NULL,
	status		TYPE_STATUS_RIWAYAT DEFAULT 'BELUM',
	CONSTRAINT 	PK_Riwayat_Pembimbing PRIMARY KEY (id),
	CONSTRAINT 	FK_Ripem_TA FOREIGN KEY (no_reg_ta) REFERENCES tugas_akhir(no_reg_ta),
	CONSTRAINT 	FK_Ripem_Dosen FOREIGN KEY(nidn) REFERENCES dosen (nidn)
);
--pembuatan 
CREATE TABLE riwayat_penguji (
	id			SERIAL NOT NULL,
	no_reg_ta	VARCHAR(9) NOT NULL,
	nidn		VARCHAR(20) NOT NULL,
	status		TYPE_STATUS_RIWAYAT DEFAULT 'BELUM',
	CONSTRAINT 	PK_Riwayat_Penguji PRIMARY KEY (id),
	CONSTRAINT 	FK_Riuji_TA FOREIGN KEY (no_reg_ta) REFERENCES tugas_akhir (no_reg_ta),
	CONSTRAINT 	FK_Riuji_Dosen FOREIGN KEY (nidn) REFERENCES dosen (nidn)
);

