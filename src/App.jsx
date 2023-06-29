import "./App.css";
import { RouterProvider } from "react-router-dom";
import "../styles/mixins/index.scss";
import router from "./routes/routeWrappers/routes";
import { Toaster } from "react-hot-toast";
import AppLogout from "./components/HOC/AppLogout";
function App() {
  return (
    <AppLogout>
      <Toaster
        containerStyle={{
          zIndex: "999999999999999999999999999",
        }}
      />
      <RouterProvider router={router} />
    </AppLogout>
  );
}

export default App;
