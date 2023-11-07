import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { RootState } from "../setup/store/store";
import AuthPage from "../pages/auth/AuthPage";
import { EmailVerifyForm, LoginForm, SignUpForm } from "../components";
import { FormImage } from "../components/Form";
import { Images } from "../data/fakeImages";
export const AuthRoutes = () => {
  const user_email = useSelector((state: RootState) => state.auth.email);
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/auth/login" />} />
      <Route
        path="/auth/login"
        element={
          <AuthPage
            Form={<LoginForm />}
            Image={<FormImage src={Images[0].url} alt="cup_login" />}
          />
        }
      />
      <Route
        path="/auth/signup"
        element={
          <AuthPage
            Form={<SignUpForm />}
            Image={
              <FormImage
                src={
                  "https://images.unsplash.com/photo-1637775297509-19767f6fc225?auto=format&fit=crop&q=80&w=1227&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                alt="cup_register"
              />
            }
          />
        }
      />

      {user_email && (
        <Route
          path="/auth/confirm_email"
          element={
            <AuthPage
              Form={<EmailVerifyForm email={user_email} />}
              Image={<ColorsWaver />}
            />
          }
        />
      )}
    </Routes>
  );
};

const ColorsWaver = () => {
  return (
    <div className="flex-1 bg-blue-500  ">
      <div
        className={`h-screen bg-gradient-to-l from-black to-gray-950  box`}
      ></div>
    </div>
  );
};
