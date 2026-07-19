<div align="center">

# 🏠 DZ Estate — Real Estate Platform

### A full-stack real estate listing platform, built as a team project

![Node.js](https://img.shields.io/badge/backend-Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/framework-Express-000000?style=flat-square&logo=express&logoColor=white)
![Team Project](https://img.shields.io/badge/type-team%20project-blueviolet?style=flat-square)
![Status](https://img.shields.io/badge/status-completed-brightgreen?style=flat-square)

</div>

---

## 📖 About

DZ Estate is a real estate listing web application built collaboratively as a team project, with a separated **Frontend** and **Backend** codebase. Users can browse, search, and view property listings through a web interface backed by a dedicated API and database layer.

> This repository is a personal copy of a team project, kept here for portfolio purposes. Full credit for the frontend and any shared design decisions goes to the rest of the team — see the [Acknowledgements](#-acknowledgements--team) section below. The original repository can be found at [CeliaRami/DZ_ESTATE](https://github.com/CeliaRami/DZ_ESTATE).

## 🙋 My Role: Backend Development

I was responsible for the **entire backend of this project**, including:

- **Backend architecture** — structuring the Node.js/Express application (routing, middleware, controllers, models)
- **Database design** — designing the PostgreSQL schema for property listings, users, and related entities (hosted on Neon serverless Postgres)
- **API development** — building the REST API endpoints consumed by the frontend (listings CRUD, search/filtering, authentication, etc.)
- **Authentication** — JWT-based auth plus Google OAuth 2.0 login via Passport.js
- **Real-time features** — Socket.io integration for live messaging/chat between users
- **Media handling** — image upload pipeline using Multer + Cloudinary for property photos
- **Core backend logic** — request validation, error handling, and connecting the API layer to the database
- **Deployment** — backend deployed on Vercel/Render

The frontend (under `Frontend/`) was built by other team members and consumes the API I built.

## 🛠️ Tech Stack (Backend)

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | PostgreSQL (hosted on Neon) |
| Authentication | JWT + Google OAuth 2.0 (Passport.js) |
| Real-time | Socket.io |
| Media Storage | Cloudinary (via Multer) |
| API Style | REST |
| Deployment | Vercel / Render |

## 🌲 Project Structure

```text
DZ_ESTATE/
├── Backend/     ← my primary contribution (architecture, API, database)
├── Frontend/    ← built by teammates
└── README.md
```

## 🚀 Running the Backend Locally

```bash
cd Backend
npm install
# create a .env file with the variables below, then:
npm run dev   # or: npm start
```

**Required environment variables (`.env`):**

```env
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
JWT_SECRET=your_jwt_secret
SESSION_SECRET=your_session_secret
PORT=3000
```

> **Note:** this was a learning/academic project, and earlier versions of the codebase had some of these values hardcoded directly in source rather than read from environment variables. If you're reusing any part of this code, make sure every secret above is loaded via `process.env` and that `.env` is listed in `.gitignore` before deploying or making the repo public.

## 🤝 Acknowledgements / Team

This was a collaborative team project. Frontend development and additional contributions were made by teammates including [teammate names/handles, e.g. @khenkhg]. This copy is maintained here to showcase my individual contribution (backend architecture and development) as part of my portfolio.

## 📄 License

See the original repository for license details.

---

<div align="center">
<sub>Originally developed as a team project — this copy highlights my backend contribution.</sub>
</div>
