# Application for Purchase of Goods [ID]
## Deskripsi
Proyek ini adalah aplikasi web sederhana untuk mengelola pengajuan pembelian barang di sebuah perusahaan. Aplikasi ini dibangun menggunakan React untuk frontend dan Laravel untuk backend, dengan menggunakan API RESTful untuk komunikasi antara frontend dan backend.
## Fitur Utama
- **Otentikasi Pengguna**: Sistem login dan logout untuk mengamankan akses.
- **Pengelolaan Pengajuan**: Menambahkan, memperbarui, dan menghapus pengajuan pembelian barang.
- **Pencarian**: Mencari pengajuan berdasarkan nama barang.
- **Validasi Input**: Validasi pada saat pengajuan untuk memastikan data yang masuk sesuai.
- **Paginasi (Pagination)**: Pagination untuk memudahkan navigasi melalui daftar pengajuan.
## Spesifikasi ##
### Frontend ###
- React.js
- Bootstrap
- MUI (Material-UI)
### Backend ###
- Express.js
- Node.js
- Axios (untuk permintaan HTTP)
### Basis Data ###
- MySQL
## Pemasangan (Instalasi) ##
### Persyaratan ###
- Node.js
- NPM atau Yarn
### Langkah-langkah ###
1. Clone repositori:
   `git clone https://github.com/imamtashbir95/application-for-purchase-of-goods.git`
2. Pindah ke direktori proyek:
   `cd application-for-purchase-of-goods`
4. Pasang dependensi (paket) untuk backend:
   `npm install`
6. Pasang dependensi (paket) untuk frontend:
   `cd resources\js\frontend`
   `npm install axios bootstrap @mui/material @mui/styled-engine-sc styled-components`
## Menjalankan Aplikasi ##
### Backend ###
1. Pindah ke direktori backend dan jalankan server:
   `php artisan serve`
### Frontend ###
1. Pindah ke direktori frontend dan jalankan aplikasi React.js:
   `npm start`
> [!NOTE]
> Pastikan backend dan frontend berjalan di port yang sesuai. Secara default, backend berjalan di `http://localhost:8000` dan frontend di `http://localhost:3000`.
## Penggunaan ##
1. Buka peramban web dan akses `http://localhost:3000`.
2. Login dengan kredensial yang sesuai.
3. Tambahkan pengajuan pembelian baru dengan mengisi formulir yang tersedia.
4. Gunakan fitur pencarian untuk mencari pengajuan berdasarkan nama barang.
5. Sunting atau hapus pengajuan jika diperlukan.
## Kontribusi ##
Kontribusi sangat diterima! Silakan buat pull request atau ajukan issue untuk perbaikan atau penambahan fitur.
## Lisensi ##
Proyek ini dilisensikan di bawah MIT License - lihat file LICENSE untuk detail lebih lanjut.
# Application for Purchase of Goods [EN]
## Description
This project is a simple web application designed to manage purchase requests for goods within a company. The application is built using React for the frontend and Laravel for the backend, utilizing RESTful APIs for communication between the frontend and backend.
## Key Features
- **User Authentication**: Login and logout system to secure access.
- **Request Management**: Add, update, and delete purchase requests.
- **Search Functionality**: Search requests based on item names.
- **Input Validation**: Validation during requests to ensure data accuracy.
- **Pagination**: Pagination to facilitate easy navigation through the list of requests.
## Specification ##
### Frontend ###
- React.js
- Bootstrap
- MUI (Material-UI)
### Backend ###
- Express.js
- Node.js
- Axios (untuk permintaan HTTP)
### Database ###
- MySQL
## Installation ##
### Requirements ###
- Node.js
- NPM or Yarn
### Langkah-langkah ###
1. Clone the repository:
   `git clone https://github.com/imamtashbir95/application-for-purchase-of-goods.git`
2. Navigate to the project directory::
   `cd application-for-purchase-of-goods`
4. Install backend dependencies:
   `npm install`
6. Install frontend dependencies:
   `cd resources\js\frontend`
   `npm install axios bootstrap @mui/material @mui/styled-engine-sc styled-components`
## Running the Application ##
### Backend ###
1. Navigate to the backend directory and start the server:
   `php artisan serve`
### Frontend ###
1. Navigate to the frontend directory and start the React.js application:
   `npm start`
> [!NOTE]
> Ensure that both the backend and frontend are running on the appropriate ports. By default, the backend runs on `http://localhost:8000` and the frontend on `http://localhost:3000`.
## Usage ##
1. Open your web browser and go to `http://localhost:3000`.
2. Log in with the appropriate credentials.
3. Add a new purchase request by filling out the provided form.
4. Use the search feature to find requests based on the item name.
. Edit or delete requests as needed.
## Contribution ##
Contributions are welcome! Please submit a pull request or open an issue for any improvements or feature additions.
## License ##
This project is licensed under the MIT License - see the LICENSE file for details.