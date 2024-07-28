import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx"
import ChatConatainer from "./components/ChatContainer.jsx"
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/chat/:id",
      element:<ChatConatainer />
    }
  ]
)

ReactDOM.createRoot(document.getElementById("root")).render(
  <div>
    <RouterProvider router={router} />
  </div>
);
