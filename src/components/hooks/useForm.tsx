import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateUserMutation,
  useLoginUserMutation,
} from "../../setup/query/apiSlice";

export const useSignUp = () => {
  const [createUser, { isLoading, error, isError, isSuccess }] =
    useCreateUserMutation();
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password: "",
    role: "client",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await createUser(signUpData).unwrap();
    if (data.success) {
      navigate("/auth/confirm_email");
    }
  };

  return {
    handleChange,
    handleSubmit,
    signUpData,
    isLoading,
    error,
    isError,
    isSuccess,
  };
};

export const useLogin = () => {
  // const navigate = useNavigate();
  const [loginUser, { isLoading, isError, error }] = useLoginUserMutation();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await loginUser(loginData);
    console.log(data);
  };
  return { loginData, handleChange, handleSubmit, isLoading, isError, error };
};
