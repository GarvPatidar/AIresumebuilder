# 🚀 AI-Powered Resume Builder (MERN + Gemini API) BY GARV PATIDAR

An AI-powered Resume Builder built using the MERN Stack integrated with Gemini API.  
Users can create, enhance, preview, share, and download professional resumes with AI assistance.

---

## ✨ Features

- 🔐 User Authentication (JWT Based)
- 📝 Create Resume using structured forms
- 🤖 AI-Powered Professional Summary Generation
- ✨ AI Enhancement for Experience & Project Descriptions
- 👀 Live Resume Preview
- 🎨 Multiple Resume Templates
- 📄 Upload Existing Resume for AI Enhancement
- 🔗 Public Resume Sharing via Link
- ⬇️ Download Resume as PDF
- 💾 Save & Edit Resumes Anytime

---

## 🧠 AI Integration

AI is integrated in:

- **Professional Summary Section**
- **Experience Description**
- **Project Description Enhancement**

### AI Flow:

1. User enters basic information.
2. Frontend sends structured input to backend.
3. Backend formats input into optimized prompt.
4. Gemini API generates ATS-friendly content.
5. Response is sanitized and returned to frontend.
6. User approves before saving.

---

## 🏗 Tech Stack

### Frontend
- React.js
- Context API / Redux
- Axios
- Tailwind CSS / CSS
- React Router

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Gemini API Integration

---

## 📂 Project Structure


client/
├── components/
├── pages/
├── templates/
├── context/
└── services/

server/
├── controllers/
├── routes/
├── models/
├── middleware/
└── config/


---

## 🗃 Database Schema (Simplified)

### User Schema
- name
- email
- password
- resumes[]

### Resume Schema
- userId
- personalInfo
- education[]
- experience[]
- projects[]
- skills[]
- templateType
- isPublic
- shareId

---

## 🔐 Authentication

- JWT-based authentication
- Protected routes for resume creation & editing
- Public share link access without login

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/ai-resume-builder.git
cd ai-resume-builder
2️⃣ Setup Backend
cd server
npm install

Create .env file:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_api_key

Run server:

npm run dev
3️⃣ Setup Frontend
cd client
npm install
npm start
📄 Resume Sharing

Each resume can be shared using:

/resume/share/:shareId

If isPublic = true, anyone with link can view it.

📈 Future Improvements

ATS Score Analyzer

Job Description Matching

Cover Letter Generator

Drag & Drop Section Reordering

Resume Analytics (View Count)

Payment Integration for Premium Templates



🧑‍💻 Author

Garv Patidar
Full Stack Developer (MERN + AI Integration)
