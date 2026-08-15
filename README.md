# 🌤️ Good Weather to Deliver

A weather-based delivery advisor for culinary UMKM (small food businesses). Checks real-time weather at the user's location and gives a clear delivery safety recommendation — **Aman**, **Berisiko**, or **Berbahaya** — so business owners can make fast, informed decisions before sending out orders.

**🔗 Live Demo:** [good-weather-to-deliver.netlify.app](https://good-weather-to-deliver.netlify.app)

---

## 📖 Tentang Project Ini

Kurir/UMKM kuliner sering harus mutusin cepat: "hari ini aman gak buat kirim orderan?" Daripada buka-buka app cuaca terpisah lalu mikir sendiri, app ini otomatis:

1. Mendeteksi lokasi user (geolocation)
2. Mengambil data cuaca real-time di lokasi tersebut
3. Menerjemahkan data itu jadi rekomendasi delivery yang jelas — lengkap dengan alasannya

## ✨ Fitur

- **Auto-geolocation** — gak perlu ketik lokasi manual, langsung deteksi posisi user
- **Real-time weather data** — suhu, kondisi cuaca, kecepatan angin, feels-like temperature
- **3-tier delivery status** dengan logic custom:
  - ✅ **Aman** — cuaca cerah/berawan, kondisi ideal untuk delivery
  - ⚠️ **Berisiko** — gerimis atau suhu ekstrem, delivery tetap jalan dengan kehati-hatian ekstra
  - 🚫 **Berbahaya** — hujan lebat, badai, atau angin kencang, delivery disarankan ditunda
- **Graceful error handling** — kalau user menolak akses lokasi atau API gagal, tetap dapat feedback yang jelas (bukan stuck loading)
- **Secure API key handling** — API key tersembunyi sepenuhnya di server-side, tidak pernah terekspos ke browser

## 🛠️ Tech Stack

| Layer | Teknologi |
|---|---|
| Frontend | HTML, CSS, Vanilla JavaScript |
| Geolocation | Browser Geolocation API |
| Backend | Netlify Functions (serverless) |
| Weather Data | OpenWeather API |
| Hosting | Netlify |

## 🏗️ Arsitektur

Project ini pakai pola **serverless function** supaya API key OpenWeather gak pernah terekspos ke publik:

```
Browser (app.js)
   │  fetch koordinat user
   ▼
Netlify Function (weather.js)  ← API key tersimpan aman di sini (server-side)
   │  fetch dengan API key
   ▼
OpenWeather API
   │  data cuaca mentah
   ▼
weather.js → app.js → render ke UI
```

Browser cuma pernah berkomunikasi dengan `weather.js` milik sendiri — tidak pernah langsung menghubungi OpenWeather. Ini mencegah siapa pun mengintip API key lewat DevTools/Inspect Element, sesuatu yang **tidak mungkin dilakukan** kalau key ditaruh langsung di kode frontend.

## 🚀 Menjalankan Secara Lokal

1. Clone repo ini
   ```bash
   git clone https://github.com/Lyant-Dev/good-weather-to-deliver.git
   cd good-weather-to-deliver
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Buat file `.env` di root project, isi dengan API key OpenWeather kamu sendiri
   ```
   OPENWEATHER_KEY=your_api_key_here
   ```
   (Dapatkan API key gratis di [openweathermap.org](https://openweathermap.org/api))

4. Install Netlify CLI (kalau belum ada)
   ```bash
   npm install netlify-cli -g
   ```

5. Jalankan development server
   ```bash
   netlify dev
   ```

6. Buka `http://localhost:8888` di browser

## 📌 Catatan Pengembangan

Project ini dibangun sebagai bagian dari roadmap belajar frontend development, dengan fokus khusus pada:
- Konsumsi API eksternal (fetch, async/await, error handling)
- Serverless architecture dan environment variable security
- Custom business logic berdasarkan data real-world
- Mobile-first responsive design

---

**Dibuat oleh Lyant** — sedang membangun jalur menuju freelance web development, dengan domain kuliner sebagai kekuatan khusus untuk melayani UMKM F&B.
