# **LearnCanvas AI**

**LearnCanvas AI** is a full-stack web application that uses Generative AI and the Canvas LMS API to provide personalized tutoring and feedback on student assignments. This project aims to make education more accessible and impactful by combining AI capabilities with Canvas LMS.

---

## **Table of Contents**

1. [Why LearnCanvas AI?](#why-learncanvas-ai)
2. [Features](#features)
3. [Demo](#demo)
4. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Environment Variables](#environment-variables)
5. [Technologies Used](#technologies-used)
6. [Contributing](#contributing)
7. [License](#license)
8. [Contact](#contact)
9. [Future Enhancements](#future-enhancements)

---

## **Why LearnCanvas AI?**

Learning platforms often lack personalized and immediate support for students. LearnCanvas AI bridges this gap by using AI-powered feedback to analyze assignments, helping students understand their assignments and grow academically.

## **Features**

- **AI-Powered Tutoring**  
  Provides personalized feedback using Groq's API.

- **Canvas LMS Integration**  
  Connects with the Canvas LMS to retrieve and analyze student assignments.

- **User-Friendly Dashboard**  
  An intuitive interface for students and educators to manage submissions and access feedback.

---

## **Demo**

🎥 **Video Demonstration:** [Watch here](https://youtu.be/1NmYPafCBRQ)  
🌐 **Live Application:** [LearnCanvas AI](https://learncanvas-ai.vercel.app)

**Demo Credentials:**

- **Username:** alohademo123@gmail.com
- **Password:** aloha@123

---

## **Getting Started**

### **Prerequisites**

- Node.js v16+
- MongoDB instance
- Access to Canvas LMS and OpenAI API keys

### **Installation**

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Tidbit0519/learncanvas-ai.git
   cd learncanvas-ai
   ```

2. **Install Dependencies**

   - **Backend:**
     ```bash
     cd backend
     npm install
     ```
   - **Frontend:**
     ```bash
     cd frontend
     npm install
     ```

3. **Set Up Environment Variables**

   Create the following `.env` files in their respective directories.

   **Backend (`/backend/.env`):**

   ```plaintext
   CORS_ORIGIN=<your_frontend_url>
   NODE_ENV=development
   PORT=3000
   JWT_SECRET=<your_jwt_secret>
   REFRESH_TOKEN_SECRET=<your_refresh_token_secret>
   MONGODB_URI=<your_mongodb_uri>
   DATABASE_NAME_PROD=<your_production_db_name>
   DATABASE_NAME_DEV=<your_development_db_name>
   GROQ_API_KEY=<your_groq_api_key>
   ```

   **Frontend (`/frontend/.env`):**

   ```plaintext
   VITE_API_URL=<your_backend_url>
   ```

   Replace the placeholders (`<...>`) with your actual values.

4. **Run the Application**
   - **Backend:**
     ```bash
     cd backend
     npm start
     ```
   - **Frontend:**
     ```bash
     cd frontend
     npm start
     ```

---

## **Technologies Used**

- **Frontend:** React.js, Redux Toolkit, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **AI Integration:** Groq API
- **LMS Integration:** Canvas LMS API

---

## **Contributing**

Contributions are welcome! Follow these steps to get involved:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

---

## **License**

This project is licensed under the MIT License. See the [LICENSE](https://github.com/Tidbit0519/learncanvas-ai/blob/main/LICENSE) file for details.

---

## **Contact**

For inquiries, feel free to contact:  
**Jason Ban Tze Tan**  
✉️ jasonbantze.tan@gmail.com

---

## **Future Enhancements**

- Add reset password feature for users.
- Add features for educators.
- Add localization support for non-English users.
