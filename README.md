# 📦 Online File Storage System (AWS S3 + React + Node.js)

A full-stack **document sharing portal** built with **React (Vite)**, **Node.js/Express**, and **AWS S3**.  
It allows **students** to upload assignments and **faculty** to view, download, and manage them — all with secure PIN-based access.

---

## 🚀 Features
- 👨‍🎓 **Student Portal** → Upload assignments (name + roll number).  
- 👩‍🏫 **Faculty Portal** → View, download, and delete uploaded files.  
- 🔒 **PIN-protected access** for both students and faculty.  
- 🗑️ Faculty can **delete old files**.  
- ⏳ Upload time is recorded and displayed.  
- 🌍 AWS S3 for scalable and secure file storage.  
- 🎨 Modern responsive UI with **Tailwind CSS** and **Framer Motion animations**.  

---

## 🏗️ Tech Stack
**Frontend**:
- React (Vite)
- Tailwind CSS
- Axios
- React Router DOM
- Framer Motion (animations)

**Backend**:
- Node.js + Express
- Multer (file upload middleware)
- AWS SDK v3
- dotenv

**Storage**:
- AWS S3 (Buckets, Lifecycle Policies, Public/Private Access)

---

## 📂 Project Structure
```bash
Online-File-Storage-System/
│── backend/
│ ├── routes/
│ │ ├── studentRoutes.js
│ │ ├── facultyRoutes.js
│ ├── controllers/
│ │ ├── studentController.js
│ │ ├── facultyController.js
│ ├── index.js
│ ├── package.json
│
│── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── Upload.jsx
│ │ │ ├── FacultyPage.jsx
│ │ │ ├── FacultyGate.jsx
│ │ │ ├── StudentGate.jsx
│ │ │ ├── Navbar.jsx
│ │ │ ├── HomePage.jsx
│ │ ├── App.jsx
│ │ ├── main.jsx
│ ├── index.html
│ ├── package.json
│
│── .gitignore
│── README.md
```


---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repo
```bash
git clone https://github.com/<your-username>/Online-File-Storage-System.git
cd Online-File-Storage-System
```
### 2️⃣ Backend Setup
```bash
cd backend
npm install
```
### Create a .env file inside backend/:
```bash
AWS_ACCESS_KEY=your-aws-key
AWS_SECRET_KEY=your-aws-secret
AWS_REGION=eu-north-1
AWS_BUCKET=your-bucket-name
FACULTY_PIN=1234
STUDENT_PIN=5678
```
### Start backend:
```bash
node index.js
```
## Runs at 👉 http://localhost:5000

### 3️⃣ Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```
## Runs at 👉 http://localhost:5173

