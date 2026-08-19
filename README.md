# ⚡ TaskEngine Enterprise

A high-performance, real-time task and sprint management engine engineered with a focus on data integrity, low-latency state synchronization, and layered software architecture.

---

### 🚀 Key Features

* **Layered MVC Architecture:** Clean separation of concerns across Data Access (`src/db`), Entity Models (`src/models`), Controllers/Routing (`src/app.js`), and HTTP/WebSocket orchestration (`server.js`).
* **Real-Time State Synchronization:** Full-duplex WebSocket communication via Socket.io to sync task transitions and updates across multiple client sessions instantly without polling.
* **ACID-Compliant Relational Storage:** Embedded SQLite database with strict `CHECK` constraints on priority and workflow states.
* **Soft-Delete Architecture:** Safe deletion lifecycle utilizing `deleted_at` timestamps to ensure auditability and prevent permanent data loss.
* **Composite Query Optimization:** Database index on `(status, deleted_at)` to guarantee $O(\log N)$ query speed for active backlog queries.
* **Interactive Dark-Mode Dashboard:** Linear/GitHub Projects-inspired UI built with Tailwind CSS, supporting dynamic Kanban transitions, real-time search, and priority metrics.

---

### 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** SQLite3
* **Real-time Protocol:** Socket.io (WebSockets)
* **Frontend:** Vanilla JavaScript, HTML5, Tailwind CSS
* **Design Pattern:** Data Access Object (DAO) / Modular MVC

---
