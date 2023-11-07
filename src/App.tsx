import { BrowserRouter as Router } from "react-router-dom";
import "./global.css";
import useAuthentication from "./pages/auth/hook/useAuthentication";
import { AuthRoutes } from "./routes/AuthRoutes";
import { AppRoutes } from "./routes";

const App = () => {
  const { authenticated } = useAuthentication();
  console.log("autenticated : ", authenticated);

  return <Router>{authenticated ? <AppRoutes /> : <AuthRoutes />}</Router>;
};

export default App;
