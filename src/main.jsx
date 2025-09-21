import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { AuthProvider } from "./auth/AuthContext.jsx";
import { ApiProvider } from "./api/ApiContext.jsx";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ApiProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApiProvider>
  </AuthProvider>
);
