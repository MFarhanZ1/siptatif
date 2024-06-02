<div align="center" style="margin-bottom: 59px;">
  <a href="https://github.com/MFarhanZ1/siptatif">
    <img width="650px" src="https://i.ibb.co.com/hK9WK0D/rtnepsql.png" alt="RTNEPSQL Logo" />
  </a>
</div>

<p align="center">
  SIPTATIF: Sistem Informasi Pendaftaran Tugas Akhir Teknik Informatika UIN Suska Riau
  </br> 
  <i>(build with 💚💜 using: ReactJS + TailwindCSS + NodeJS + ExpressJS + PostgreSQL)</i>
</p>

<div align="center">
  <a href="https://circleci.com/gh/mfarhanz1/siptatif">
    <img src="https://img.shields.io/circleci/project/github/mfarhanz1/siptatif/master.svg?style=flat-square" alt="CircleCI branch" />
  </a>
  <a href="https://github.com/mfarhanz1/siptatif/network">
    <img src="https://img.shields.io/github/forks/mfarhanz1/siptatif.svg" alt="GitHub forks" />
  </a>
  <a href="https://github.com/mfarhanz1/siptatif/stargazers">
    <img src="https://img.shields.io/github/stars/mfarhanz1/siptatif.svg" alt="GitHub stars" />
  </a>
  <a href="https://github.com/mfarhanz1/siptatif/issues">
    <img src="https://img.shields.io/github/issues/mfarhanz1/siptatif.svg" alt="GitHub issues" />
  </a>
  <a href="https://github.com/mfarhanz1/siptatif/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/mfarhanz1/siptatif.svg" alt="GitHub license" />
  </a>
  <a href="https://coveralls.io/github/mfarhanz1/siptatif">
    <img src="https://coveralls.io/repos/github/mfarhanz1/siptatif/badge.svg" alt="Coverage Status" />
  </a>
</div>


---

**SIPTATIF** merupakan singkatan dari _Sistem Informasi Pendaftaran Tugas Akhir Teknik Infomatika_, aplikasi ini dibangun untuk memfasilitasi proses pendaftaran judul tugas akhir khususnya bagi mahasiswa program studi Teknik Informatika dikampus [Universitas Islam Negeri Sultan Syarif Kasim Riau](https://www.uin-suska.ac.id/), aplikasi ini juga dikembangkan untuk membantu kinerja koordinator tugas akhir dalam mengelola data dosen penguji, dosen pembimbing, dan status pendaftaran TA mahasiswa.

## Before You Begin
Before you begin we recommend you read about the basic building blocks that assemble a ReactJS application with TailwindCSS, Node.js, Express, and PostgreSQL:
* ReactJS - Start with the [ReactJS Official Website](https://reactjs.org/). The [Getting Started](https://reactjs.org/docs/getting-started.html) guide is very helpful, as well as the [ReactJS Tutorial](https://reactjs.org/tutorial/tutorial.html).
* TailwindCSS - Visit the [TailwindCSS Official Website](https://tailwindcss.com/). The [Documentation](https://tailwindcss.com/docs) provides a comprehensive guide on how to use TailwindCSS.
* Node.js - Begin with the [Node.js Official Website](http://nodejs.org/) and refer to this [StackOverflow Thread](http://stackoverflow.com/questions/2353818/how-do-i-get-started-with-node-js) for additional resources.
* Express - Understand Express through its [Official Website](http://expressjs.com/), which includes a [Getting Started](http://expressjs.com/starter/installing.html) guide and an [ExpressJS Guide](http://expressjs.com/en/guide/routing.html) for general topics. You can also explore this [StackOverflow Thread](http://stackoverflow.com/questions/8144214/learning-express-for-node-js) for more resources.
* PostgreSQL - Go through the [PostgreSQL Official Website](https://www.postgresql.org/), and proceed to the [Documentation](https://www.postgresql.org/docs/) to better understand PostgreSQL.

## Prerequisites
Make sure you have installed all of the following prerequisites on your development machine:
* Git - [Download & Install Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.
* Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager. If you encounter any problems, you can also use this [GitHub Gist](https://gist.github.com/isaacs/579814) to install Node.js.
* PostgreSQL - [Download & Install PostgreSQL](https://www.postgresql.org/download/), and make sure it's running on the default port (5432).
* TailwindCSS - You can install TailwindCSS using npm. Make sure you've installed Node.js and npm first, then install TailwindCSS by [refers to its official docs](https://tailwindcss.com/docs/installation)

## Fitur Utama

Aplikasi ini dirancang untuk memudahkan koordinator tugas akhir dalam mengelola berbagai aspek penting dari proses tugas akhir. Berikut adalah fitur-fitur utama yang disediakan:

### 1. Manajemen Dosen Penguji
Koordinator tugas akhir dapat memasukkan dan mengelola data dosen penguji yang akan menilai tugas akhir mahasiswa. Fitur ini mencakup:
- Penambahan dosen penguji baru.
- Pembaruan data dosen penguji, termasuk kuota yang tersedia.

### 2. Manajemen Dosen Pembimbing
Data dosen pembimbing dapat ditambahkan dan dikelola melalui aplikasi ini untuk memastikan keterlibatan yang efektif dalam proses tugas akhir mahasiswa. Fitur ini mencakup:
- Penambahan dosen pembimbing baru.
- Pembaruan informasi dosen pembimbing, termasuk kuota bimbingan yang tersedia.

### 3. Pengelolaan Data Mahasiswa
Koordinator dapat memperbaiki dan mengelola data mahasiswa yang telah melakukan pendaftaran judul tugas akhir. Fitur ini mencakup:
- Perubahan judul tugas akhir mahasiswa.
- Pemberian status diterima atau ditolak untuk pendaftaran tugas akhir.

## Cara Penggunaan
Berikut skenario sederhana jika kita login sebagai aktor koordinator TA:
- Login: Masuk menggunakan akun koordinator tugas akhir.
- Manajemen Dosen Penguji: Tambahkan atau perbarui data dosen penguji, seperti kuota yang tersedia.
- Manajemen Dosen Pembimbing: Kelola atau tambahkan informasi dosen pembimbing yang akan terlibat dalam proses tugas akhir, seperti kuota yang akan tersedia.
- Pengelolaan Data Mahasiswa: Periksa data mahasiswa (berupa kelengkapan berkas dan lain sebagainya), Anda juga dapat memberikan catatan kepada mahasiswa terkait jika terdapat kekeliruan perihal berkas menurut anda, terakhir anda dapat memberikan status pendaftaran TA mahasiswa, apakah ditolak atau diterima.

## Contributing
Kontribusi terhadap pengembangan aplikasi ini sangat dihargai. Untuk kontribusi, silakan buat pull request dengan perubahan yang ingin Anda usulkan. Pastikan untuk membuka issue terlebih dahulu untuk mendiskusikan perubahan yang diinginkan.

## License
[AGPL-3.0 license](LICENSE.md)
