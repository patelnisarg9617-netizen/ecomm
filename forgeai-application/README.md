# ForgeAI Application  

A modern, full‑stack web application that provides secure authentication, full CRUD management, and real‑time dashboard analytics. Built with **React**, **Node.js**, and **PostgreSQL**, ForgeAI is designed for rapid development, easy scaling, and production‑grade reliability.

---  

## Table of Contents  

| # | Section |
|---|---------|
| 1 | [Overview](#overview) |
| 2 | [Tech Stack](#tech-stack) |
| 3 | [Prerequisites](#prerequisites) |
| 4 | [Local Setup](#local-setup) |
| 5 | [Environment Variables](#environment-variables) |
| 6 | [API Reference](#api-reference) |
| 7 | [Deployment](#deployment) |
| 8 | [License](#license) |
| 9 | [Contributing](#contributing) |

---  

## Overview  

ForgeAI is a production‑ready starter kit for SaaS‑style applications. It includes:

* **Authentication** – JWT‑based login / registration with password hashing.  
* **CRUD Management** – Create, read, update, delete items through a clean REST API.  
* **Dashboard Analytics** – Real‑time charts and tables powered by the backend.  

The project follows a **monorepo** layout:

```
/
├─ frontend/      # React SPA
├─ backend/       # Node.js/Express API
└─ db/            # PostgreSQL migrations & seed data
```

---  

## Tech Stack  

| Layer | Technology | Reason |
|-------|------------|--------|
| **Frontend** | **React** (v18) + **React Router** + **Axios** | Component‑driven UI, fast client‑side routing, and simple HTTP handling. |
| **Backend** | **Node.js** (v20) + **Express** | Minimalist, high‑performance server with a rich ecosystem. |
| **Database** | **PostgreSQL** (v15) | ACID‑compliant relational DB, powerful query capabilities, and native JSON support. |
| **Auth** | **jsonwebtoken**, **bcrypt** | Secure password storage and stateless JWT tokens. |
| **Analytics** | **Chart.js** (frontend) + custom aggregation queries (backend) | Lightweight, interactive visualisations. |
| **Containerisation** | **Docker** | Consistent dev / prod environments. |
| **CI/CD** | **Vercel** (frontend) + **Docker Hub** (backend) | Zero‑config deployments. |

---  

## Prerequisites  

| Tool | Minimum Version | Install |
|------|-----------------|--------|
| **Node.js** | 20.x | `brew install node` / `choco install nodejs` |
| **npm** | 9.x (bundled with Node) | `npm install -g npm@latest` |
| **Docker** | 24.x | <https://docs.docker.com/get-docker/> |
| **psql** (PostgreSQL client) | 15.x | `brew install libpq` / `choco install postgresql` |
| **Git** | 2.30+ | <https://git-scm.com/downloads> |

> **Note** – No Python or .NET runtime is required for this stack.

---  

## Local Setup  

### 1. Clone the repository  

```bash
git clone https://github.com/your-org/forgeai-application.git
cd forgeai-application
```

### 2. Set up the database  

```bash
# Start a PostgreSQL container (optional if you have a local instance)
docker run --name forgeai-pg -e POST