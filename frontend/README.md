# 🌡️ Sistem Monitoring Suhu dan Tekanan Tangki Industri Berbasis Website

Sistem Monitoring Suhu dan Tekanan Tangki Industri Berbasis Website merupakan aplikasi Internet of Things (IoT) yang digunakan untuk memantau kondisi tangki industri secara **real-time**. Sistem ini menggunakan **ESP32** sebagai perangkat utama untuk membaca data sensor, kemudian mengirimkan data ke server melalui **MQTT**. Data tersebut disimpan pada database dan ditampilkan dalam dashboard website yang interaktif.

---

## Profile
Nama   : Alfarisi Azhar
NIM    : 23552011180
Kelas  : TIF K23 B
   
---

## 📌 Fitur

- 📡 Monitoring suhu secara real-time
- 💨 Monitoring tekanan secara real-time
- 🚨 Indikator status kondisi tangki (Normal, Warning, Danger)
- 📊 Dashboard monitoring berbasis website
- 📈 Riwayat data sensor
- 📱 Responsive Web Interface
- 🔄 Komunikasi data menggunakan MQTT
- 🗄 Penyimpanan data menggunakan SQLite

---

## 🛠 Teknologi yang Digunakan

### Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- React Icons
- Recharts

### Backend
- Node.js
- Express.js
- SQLite3
- MQTT.js
- CORS

### IoT
- ESP32
- Wokwi Simulator
- DHT22
- Pressure Sensor
- OLED SSD1306
- MQTT Protocol

---

## 📂 Struktur Project

```
IndustrialTankMonitoring/
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── database/
│   ├── mqtt/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── esp32/
│   ├── src/
│   ├── include/
│   ├── lib/
│   ├── diagram.json
│   ├── wokwi.toml
│   └── platformio.ini
│
└── README.md
```

---

## ⚙️ Cara Menjalankan Project

### 1. Clone Repository

```bash
git clone https://github.com/AllFarISee/Sistem-Monitoring-Suhu-dan-Tekanan-Tangki-Industri-Berbasis-Website.git
```

Masuk ke folder project

```bash
cd Sistem-Monitoring-Suhu-dan-Tekanan-Tangki-Industri-Berbasis-Website
```

---

## 🚀 Menjalankan Backend

Masuk ke folder backend

```bash
cd backend
```

Install dependency

```bash
npm install
```

Jalankan server

```bash
npm start
```

atau

```bash
npm run dev
```

Server berjalan pada

```
http://localhost:3000
```

---

## 💻 Menjalankan Frontend

Masuk ke folder frontend

```bash
cd frontend
```

Install dependency

```bash
npm install
```

Jalankan aplikasi

```bash
npm run dev
```

Frontend berjalan pada

```
http://localhost:5173
```

---

## 🤖 Menjalankan ESP32 (Wokwi)

1. Buka folder `esp32`
2. Jalankan menggunakan PlatformIO
3. Start Wokwi Simulator
4. ESP32 akan mengirimkan data sensor melalui MQTT ke backend

---

## 📊 Status Monitoring

| Status | Kondisi |
|---------|----------|
| 🟢 Normal | Suhu dan tekanan dalam batas aman |
| 🟡 Warning | Salah satu parameter mendekati batas maksimum |
| 🔴 Danger | Suhu atau tekanan melebihi batas aman |

---

## 🔄 Alur Sistem

```
Sensor
   │
   ▼
ESP32
   │
 MQTT
   │
   ▼
Backend (Express)
   │
SQLite Database
   │
REST API
   │
   ▼
Frontend Dashboard
```

---

## 📷 Tampilan Aplikasi

### Dashboard

<img width="959" height="562" alt="1" src="https://github.com/user-attachments/assets/6fdd84fa-e89a-4c9a-afc4-1aa4e3be8cce" />
<img width="959" height="560" alt="2" src="https://github.com/user-attachments/assets/347ab40f-fd08-4f0d-816b-d621427fee9b" />
<img width="959" height="558" alt="3" src="https://github.com/user-attachments/assets/a977ccaf-a872-49ad-97af-060a188c24c9" />
<img width="959" height="557" alt="4" src="https://github.com/user-attachments/assets/30ee54f7-dbcf-43e8-8c25-2a9ea75bf073" />


### Wokwi Simulation

<img width="959" height="566" alt="5" src="https://github.com/user-attachments/assets/b094fc08-fa28-4153-be6b-7dc6da3bf4a9" />


## 📖 Pengembang

**Alfarisi Azhar**

Project ini dibuat sebagai bagian dari tugas akhir / proyek pembelajaran Sistem Mikrokontroller

---

