import { useEffect, useState } from "react";
import { HideEyeIcon, VisibleEye } from "../assets/eye";
import {
  FormInput,
  FormLabel,
  FormSubmit,
  FormCheckBox,
  FormHeader,
} from "./Form";
import { Link } from "react-router-dom";
import { useSignUp } from "./hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../setup/store/store";
import { clearErrors } from "../setup";
export const SignUpForm = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch]);
  const [showPassword, setShowPassword] = useState(false);

  const { signUpData, handleChange, handleSubmit, isLoading } = useSignUp();
  const message = useSelector((state: RootState) => state.auth.message);
  const inputlabelbox = `relative bg-opacity-90 rounded-md text-white px-4 md:px-8 py-2 focus-within:text-red-400 group transition-all duration-300 ease-in`;
  const inputStyles = `bg-zinc-800 px-5 py-2 w-full rounded-md focus:bg-black focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all duration-500  border border-white border-opacity-5`;
  return (
    <div
      className={`flex-1 gap-3 bg-gradient-to-r from-zinc-800 to-black flex flex-col sm:px-5 justify-center h-screen`}
    >
      <FormHeader className={`text-red-400 py-2`} heading="Create an Account" />
      <form className={``}>
        <div className={`bg-gray-950 bg-opacity-5 py-4 rounded-md`}>
          {/* name */}
          <div className={inputlabelbox}>
            <FormLabel
              label={`Username`}
              className={`flex text-md focus:text-red-400 opacity-0 group-focus-within:opacity-100  ${
                signUpData.username.length >= 7
                  ? "opacity-100 text-green-500"
                  : ""
              } `}
            />
            <FormInput
              name="username"
              value={signUpData.username}
              type={`text`}
              placeholder={`Username`}
              onChange={(e) => handleChange(e)}
              className={inputStyles}
            />
          </div>
          {/* email */}
          <div className={inputlabelbox}>
            <FormLabel
              label={`Email`}
              className={`flex text-md  opacity-0 group-focus-within:opacity-100  ${
                signUpData.email.length > 12 ? "opacity-100 text-green-500" : ""
              }`}
            />
            <FormInput
              name="email"
              className={inputStyles}
              value={signUpData.email}
              type={`email`}
              placeholder={`email`}
              onChange={(e) => handleChange(e)}
            />
          </div>
          {/* password */}
          <div className={inputlabelbox}>
            <FormLabel
              label={`Password`}
              className={`flex text-sm  opacity-0 group-focus-within:opacity-100  ${
                signUpData.password.length > 8
                  ? "opacity-100 text-green-500"
                  : ""
              } `}
            />
            <span
              className={`cursor-pointer right-10 top-9 text-xl absolute `}
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
              value={signUpData.password}
              type={`${showPassword ? "text" : "password"}`}
              placeholder={`password`}
              onChange={(e) => handleChange(e)}
              className={inputStyles}
            />
          </div>
          {/* checkbox */}
          <div className={inputlabelbox}>
            <FormCheckBox />
          </div>
          {/* errors */}
          <div className={`text-red-400 text-sm px-8 py-3`}>
            {message && (
              <p
                className={`${
                  message === "Email verified Successfully"
                    ? "text-green-500"
                    : "text-red-600"
                }`}
              >
                {message}
                {/* {error.error.} */}
              </p>
            )}
          </div>
          {/* submit */}
          <div className={`text-center`}>
            <FormSubmit
              label="SignUp"
              loading={isLoading}
              className={`bg-red-500`}
              onClick={handleSubmit}
            />
          </div>
          <p className={`text-white  p-5`}>
            Already a member?{" "}
            <Link to="/auth/login" className={`text-red-400`}>
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};
