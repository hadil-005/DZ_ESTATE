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
- **Database design** — designing the schema/data model for property listings, users, and related entities in [Database — e.g. MongoDB/PostgreSQL]
- **API development** — building the REST API endpoints consumed by the frontend (listings CRUD, search/filtering, authentication, etc.)
- **Core backend logic** — request validation, error handling, and connecting the API layer to the database

The frontend (React or equivalent, under `Frontend/`) was built by other team members and consumes the API I built.

## 🛠️ Tech Stack (Backend)

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | [Fill in — e.g. MongoDB / PostgreSQL / MySQL] |
| API Style | REST |

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
# configure your .env (DB connection string, PORT, etc. — see .env.example if present)
npm start
```

## 🤝 Acknowledgements / Team

This was a collaborative team project. Frontend development and additional contributions were made by teammates including [teammate names/handles, e.g. @khenkhg]. This copy is maintained here to showcase my individual contribution (backend architecture and development) as part of my portfolio.

## 📄 License

See the original repository for license details.

---

<div align="center">
<sub>Originally developed as a team project — this copy highlights my backend contribution.</sub>
</div>
