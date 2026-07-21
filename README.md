# diecocan-tools

Day-to-day administration tools. Spring Boot backend + React frontend, currently featuring an Owners management page (list, filter, create, edit, delete) backed by an H2 database.


## Tech stack

- **Backend**: Java 17, Spring Boot 3.4.1, Spring Data JPA, H2 (file-based, local dev database)
- **Frontend**: React 19, Webpack 5 (no Create React App), `react-router-dom`, `axios`
- **Tooling**: ESLint (flat config)

## Prerequisites

- Java 17+
- Maven
- Node.js (developed and tested with v23) and npm

## Setup & running

### Backend

```bash
mvn spring-boot:run
```

Runs on `http://localhost:8080`. The H2 database file lives at `./data/diecocan-tools-db` (created automatically on first run, gitignored).

### Frontend

```bash
cd frontend
npm install     # first time only
npm start
```

Runs on `http://localhost:3000`. Requests to `/v1/owners` are proxied to the backend on port 8080 in development (see `frontend/webpack.config.js`).

Other frontend scripts:
```bash
npm run build      # production bundle
npm run lint        # ESLint check
npm run lint:fix    # ESLint check, auto-fix what's safe
```

## Configuration

- **H2 console**: `http://localhost:8080/h2-console` — JDBC URL `jdbc:h2:file:./data/diecocan-tools-db`, username `sa`, password `password` (local dev only).
- **API base path**: `/v1/owners`, set in `frontend/src/constants/constants.js` and `OwnerController.java`'s `@RequestMapping`.

## API overview

| Method | Path | Description |
|---|---|---|
| GET | `/v1/owners` | List all owners |
| GET | `/v1/owners/{id}` | Get a single owner |
| POST | `/v1/owners` | Create an owner |
| PUT | `/v1/owners/{id}` | Update an owner |
| DELETE | `/v1/owners/{id}` | Delete an owner |

## Testing

No automated tests yet, for either the backend or the frontend.

## Roadmap

- Flesh out backend test coverage and add frontend tests
- Add loading/error/empty states to the Owners table (currently only `console.error`s on failure)
- Add client-side validation beyond the `required` attribute on the name field
- Consider an nginx reverse proxy for production deployment
