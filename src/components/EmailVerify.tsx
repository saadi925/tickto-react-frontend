import { FormHeader, FormInput, FormLabel, FormSubmit } from "./Form";
import { useState } from "react";
import {
  useResendConfirmationMutation,
  useVerifyEmailMutation,
} from "../setup/query/apiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../setup/store/store";
export const EmailVerifyForm = ({ email }: { email: string }) => {
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  const [resendConfirmation, loading] = useResendConfirmationMutation();
  const [code, setCode] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };
  const handleEmailConfirmation = (e: React.FormEvent) => {
    e.preventDefault();
    verifyEmail({ code, email }).unwrap();
  };
  const handleResendConfirmation = (e: React.FormEvent) => {
    e.preventDefault();
    resendConfirmation(email);
  };
  const message = useSelector((state: RootState) => state.auth.message);
  const successMessages =
    message === "Email verified Successfully" ||
    message === "Verification email sent successfully";
  const inputlabelbox = `relative bg-opacity-90 rounded-md text-white px-8 py-2 focus-within:text-blue-500`;
  const inputStyles = `bg-zinc-800 px-5 py-2 w-full rounded-md focus:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-500`;
  return (
    <div
      className={` flex-1 gap-3 bg-gradient-to-r from-zinc-800 to-black flex flex-col px-5 justify-center h-screen`}
    >
      <FormHeader heading="Verify you Email to Login" />
      <form className={``}>
        <div className={`bg-gray-950 bg-opacity-5 rounded-md `}>
          {/* name */}
          <div className={inputlabelbox}>
            <FormLabel
              label={`Code`}
              className={`flex text-md focus:text-blue-500`}
            />
            <FormInput
              maxLength={5}
              name="code"
              value={code}
              type={`text`}
              placeholder={`Enter the code here`}
              onChange={(e) => handleChange(e)}
              className={`${inputStyles} max-w-[12rem]`}
            />
          </div>

          {/* messages */}
          {message && (
            <div>
              <p
                className={`${
                  successMessages ? "text-green-500" : "text-red-500"
                }  px-8 py-3`}
              >
                {message}
              </p>
            </div>
          )}
          {/* submit */}
          <div className={`flex w-full gap-3 justify-between px-5 flex-wrap  `}>
            <FormSubmit
              loading={loading.isLoading}
              label="Resend code"
              className={`border border-blue-500 bg-transparent hover:bg-blue-500`}
              onClick={(e) => handleResendConfirmation(e)}
            />
            <FormSubmit
              loading={isLoading}
              label="Confirm"
              className={``}
              onClick={(e) => handleEmailConfirmation(e)}
            />
          </div>
          <p className={`px-10 py-3 text-white `}>
            Change the email address <br />{" "}
            <span className={`text-blue-500 font-semibold`}>{email}</span>
          </p>
        </div>
      </form>
    </div>
  );
};
