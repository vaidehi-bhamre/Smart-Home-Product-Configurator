# Smart Home Product Configurator

A full-stack React + Node.js product configurator app built to demonstrate hands-on experience with JavaScript, React.js, and Node.js.

**Inspired by Kohler's digital product experience.**

---

## Project Structure

```
kohler-configurator/
├── backend/          # Node.js + Express REST API
│   ├── server.js
│   ├── routes/
│   │   ├── products.js
│   │   └── configure.js
│   └── data/
│       └── products.js
└── frontend/         # React.js app
    └── src/
        ├── App.js
        ├── components/
        │   ├── Navbar.jsx
        │   ├── ProductCard.jsx
        │   ├── OptionSelector.jsx
        │   ├── SummaryPanel.jsx
        │   └── AlertItem.jsx
        ├── pages/
        │   ├── Home.jsx
        │   ├── Configurator.jsx
        │   └── SavedConfigs.jsx
        └── hooks/
            └── useApi.js
```

---

## Tech Stack

| Layer    | Technology                        |
|----------|-----------------------------------|
| Frontend | React.js, CSS Modules             |
| Backend  | Node.js, Express.js               |
| API      | RESTful (JSON)                    |
| Styling  | CSS Variables, CSS Grid, Flexbox  |
| Deploy   | Netlify (frontend), Render (backend) |

---

## Setup & Run

### 1. Start the Backend

```bash
cd backend
npm install
npm run dev       # starts on http://localhost:5000
```

### 2. Start the Frontend

```bash
cd frontend
npm install
npm start         # starts on http://localhost:3000
```

---

## API Endpoints

| Method | Endpoint                    | Description                        |
|--------|-----------------------------|------------------------------------|
| GET    | `/api/products`             | List all products                  |
| GET    | `/api/products/:id`         | Get product with options           |
| GET    | `/api/products/:id/options` | Get options only for a product     |
| POST   | `/api/configure`            | Save a product configuration       |
| GET    | `/api/configure`            | List all saved configurations      |
| GET    | `/api/configure/:id`        | Get a specific saved configuration |
| GET    | `/api/health`               | Server health check                |

### POST `/api/configure` — Request body

```json
{
  "productId": "faucet-01",
  "selectedOptions": {
    "finish": "matte-black",
    "sprayMode": "stream-spray",
    "handle": "single"
  },
  "customerName": "Vaidehi Bhamre",
  "customerEmail": "vaidehi@example.com"
}
```

---

## Features

- **Product listing** with category filter (Kitchen / Bathroom)
- **Multi-option configurator** — color swatches for finish, radio buttons for other options
- **Live price calculation** — updates as user selects options
- **Save configuration** — POST to REST API with optional name/email
- **Saved configurations page** — fetches and displays all saved configs via GET
- **Dismissible alerts** — success/error notifications auto-dismiss after 4 seconds
- **Custom React hooks** — `useProducts`, `useProduct`, `useSaveConfig` in `hooks/useApi.js`
- **CSS Modules** — scoped styles, no conflicts
- **Responsive layout** — CSS Grid adapts to mobile

---

## Deployment

### Frontend → Netlify
1. `cd frontend && npm run build`
2. Deploy the `build/` folder to Netlify
3. Set env variable: `REACT_APP_API_URL=https://your-backend.onrender.com/api`

### Backend → Render
1. Push `backend/` to GitHub
2. Create a new Web Service on Render
3. Build command: `npm install`
4. Start command: `node server.js`

---

## Key Concepts Demonstrated

- **React hooks** — `useState`, `useEffect`, `useReducer`, `useCallback`
- **Custom hooks** — API data fetching abstracted into `useApi.js`
- **Component architecture** — reusable, single-responsibility components
- **REST API design** — proper HTTP verbs, status codes, error handling
- **Express middleware** — CORS, JSON body parser, request logger, error handler
- **CSS Modules** — component-scoped styles in React
- **State management** — `useReducer` for complex option selection logic
