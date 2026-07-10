import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import './styles/global.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/forms.css';
import './styles/modal.css';
import './styles/calendar.css';
import './styles/auth.css';
import './styles/user-menu.css';
import './styles/animations.css';
import './styles/responsive.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);