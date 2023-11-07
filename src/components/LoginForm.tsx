import { useEffect, useState } from "react";
import { HideEyeIcon, VisibleEye } from "../assets/eye";
import { FormInput, FormLabel, FormSubmit, FormHeader } from "./Form";
import { Link } from "react-router-dom";
import { useLogin } from "./hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../setup/store/store";
import { clearErrors } from "../setup";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { handleChange, loginData, handleSubmit, isLoading } = useLogin();
  const message = useSelector((state: RootState) => state.auth.message);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch]);
  const inputlabelbox = `relative bg-opacity-90 rounded-md text-white px-4 md:px-8 py-2 focus-within:text-blue-500 group `;
  const inputStyles = `bg-zinc-800 px-5 py-2 w-full rounded-md focus:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-500`;
  return (
    <div
      className={` flex-1 gap-3 bg-gradient-to-r from-zinc-800 to-black flex flex-col sm:px-5 justify-center h-screen`}
    >
      <FormHeader heading="Log in to Continue" />
      <form className={``}>
        <div className={`bg-gray-950 bg-opacity-5 py-4 rounded-md`}>
          {/* name */}
          <div className={inputlabelbox}>
            <FormLabel
              label={`User Name`}
              className={`flex text-md focus:text-red-400 opacity-0 group-focus-within:opacity-100  ${
                loginData.username.length >= 7
                  ? "opacity-100 text-green-500"
                  : ""
              } `}
            />
            <FormInput
              name="username"
              value={loginData.username}
              type={`text`}
              placeholder={`User Name`}
              onChange={(e) => handleChange(e)}
              className={inputStyles}
            />
          </div>
          {/* password */}
          <div className={inputlabelbox}>
            <FormLabel
              label={`Password`}
              className={`flex text-md focus:text-red-400 opacity-0 group-focus-within:opacity-100  ${
                loginData.password.length >= 7
                  ? "opacity-100 text-green-500"
                  : ""
              } `}
            />
            <span
              className={`right-10 top-9 text-xl absolute`}
              onClick={() => setShowPassword(!showPassword)}
            >
              {!showPassword ? (
                <HideEyeIcon size={"32"} />
              ) : (
                <VisibleEye size={"32"} />
              )}
            </span>
            <FormInput
              name="password"
              value={loginData.password}
              type={`${showPassword ? "text" : "password"}`}
              placeholder={`password`}
              onChange={(e) => handleChange(e)}
              className={inputStyles}
            />
          </div>
          {/* errors */}
          <div className={`px-8 py-3`}>
            {message && (
              <div>
                <p
                  className={`${
                    message === "Login successful" ||
                    message === "Email verified Successfully"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {message}
                </p>
              </div>
            )}
          </div>
          {/* submit */}
          <div className={`text-center`}>
            <FormSubmit
              loading={isLoading}
              label="Sign In"
              className={` `}
              onClick={(e) => handleSubmit(e)}
            />
          </div>
          <p className={`text-white  p-5`}>
            Doesn't have an account?{" "}
            <Link to="/auth/signup" className={`text-blue-500`}>
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};
