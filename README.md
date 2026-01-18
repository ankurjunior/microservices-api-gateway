#  API Gateway

A **production-grade API Gateway** built with **TypeScript and Express** for a  microservices platform.

This gateway acts as the **single entry point** for all backend services, enforcing **security guards, traffic control, and request proxying**, while keeping **business logic inside downstream services**.

---

## ✨ Key Features

- ✅ Single entry point for microservices
- 🔐 JWT authentication (gateway-level)
- 🛡️ IP allow/block guard
- 🚦 Rate limiting (in-memory, Redis-ready)
- 📱 Device header validation
- 🔗 Secure request proxying
- 🧵 Correlation IDs for distributed tracing
- ⚡ Lightweight, Docker-free local development
- 🧩 Easy transition to Docker / Kubernetes later

--- 

The gateway handles **cross-cutting concerns only**.  
All **business logic and data access live inside microservices**.


---

## 🔐 Security Design (Gateway Responsibilities)

### Implemented at Gateway
- IP filtering
- Rate limiting
- Device metadata validation
- JWT token verification
- Correlation IDs

### Implemented in Services
- User authorization
- Role checks
- Device trust decisions
- Business validation

> **Rule:** Gateway = traffic control, Services = business logic.

---

## ⚙️ Environment Variables

Create a `.env` file at project root:

```env
PORT=3000

AUTH_SERVICE=http://localhost:3001
PATIENT_SERVICE=http://localhost:3002

JWT_PUBLIC_KEY=your-public-key
