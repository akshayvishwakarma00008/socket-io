import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx"
import ChatConatainer from "./components/ChatContainer.jsx"
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/chat/:id",
      element: <ChatConatainer />
    },
    {
      path: "/chat",
      element: <Navigate to="/" replace />,
    },
    {
      path: "*",
      element: <Navigate to="/" replace />,
    }
  ]
)

ReactDOM.createRoot(document.getElementById("root")).render(
  <div>
    <RouterProvider router={router} />
  </div>
);
