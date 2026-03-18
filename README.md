<div  align="center">
    <div align="center">
        <img src="/assets/logo.png" alt="logo" width="200" height="auto" />
    </div>
    <h1 align="center">ᕷ˖°♪.¸¸♬•*¨*•.♫  Cadence  ♫.•*¨*•♬¸¸.♪°˖ᕷ</h1>  
    <p  align="center">
        A full-stack modern music player app using React, Zustand, Shadcn UI, Clerk, Express.js and MongoDB.        
    </p>
</div>

---

## ⚡ Features

🎵 Audio player with play/pause, next/previous song, volume control, a seekable progress bar along with autoplay<br>
🎧 Admin dashboard for managing songs, albums and statistics<br>
🎵 Cloudinary integration for media hosting and automated metadata extraction from uploaded audio files<br>
🎧 Global state management using Zustand<br>
🎵 Modern UI using Shadcn UI components and Tailwind CSS<br>
🎧 Google OAuth using Clerk

---

## 👾 Built With  

-  **Frontend:** [![React][React.js]][React-url] [![Typescript][Typescript]][Typescript-url] [![TailwindCSS][TailwindCSS]][TailwindCSS-url] [![ShadcnUI][ShadcnUI]][ShadcnUI-url]

-  **Backend:** [![Node][Node.js]][Node-url] [![Express][Express.js]][Express-url] [![MongoDB][MongoDB]][MongoDB-url] [![Cloudinary][Cloudinary]][Cloudinary-url]


[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/

[Typescript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[Typescript-url]: https://typescriptlang.org/

[TailwindCSS]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[TailwindCSS-url]: https://tailwindcss.com/

[ShadcnUI]: https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white
[ShadcnUI-url]: https://ui.shadcn.com/
 
[Express.js]:https://img.shields.io/badge/Express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[Express-url]: https://expressjs.com/

[Node.js]:https://img.shields.io/badge/Node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/

[MongoDB]:https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://mongodb.com/

[Cloudinary]: https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=Cloudinary&logoColor=white
[Cloudinary-url]: https://cloudinary.com/

---

## 🖥️ Preview
<div align="center">
    <img  src="/assets/screenshot-1.png"  alt="Screenshot"  width="800"  height="419"/>
    <br/>
    <img  src="/assets/screenshot-2.png"  alt="Screenshot"  width="800"  height="419"/>
    <br/>
    <img  src="/assets/screenshot-3.png"  alt="Screenshot"  width="800"  height="419"/>
    <br/>
    <img  src="/assets/screenshot-4.png"  alt="Screenshot"  width="800"  height="419"/>
</div>

---

## 🧩 Setup Guide

### 1️. Clone the Repository

```bash
git clone https://github.com/nithya711/cadence.git
cd cadence
```

#### 2️. Set Up Environment Variables

Create `.env` file in the server directory

```env
PORT=5000
NODE_ENV=development
ADMIN_EMAIL=admin-email-id

MONGO_URI=your-mongodb-connection-string

CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name

CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
CLERK_SECRET_KEY=your-clerk-secret-key
```
Create `.env` file in the client directory

```env
VITE_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
```
#### 3. Install the necessary packages  

```bash
cd  client
npm  install  

cd  server
npm  install
```
#### 4. Run the Application

Start the backend server

```bash
cd  server
npm  run dev
```  

Start the frontend

```bash
cd  client
npm  run dev
```