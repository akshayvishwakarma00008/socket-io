import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Header from "./components/Header.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <div className="max-w-7xl">
    <Header />
    <App />
  </div>
);
