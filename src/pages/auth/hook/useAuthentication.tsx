import { useDispatch, useSelector } from "react-redux";
import { setAuthenticated } from "../../../setup/slices/authSlice";
import { useCallback, useEffect } from "react";
import { AppDispatch, RootState } from "../../../setup/store/store";

const useAuthentication = () => {
  const dispatch = useDispatch<AppDispatch>();
  const authenticated = useSelector(
    (state: RootState) => state.auth.authenticated
  );

  const checkAuthentication = useCallback(() => {
    const token = localStorage.getItem("token");

    const isAuthenticated = !!token; // Example: Check if token exists
    dispatch(setAuthenticated(isAuthenticated));
  }, [dispatch]);

  useEffect(() => {
    checkAuthentication();
  }, [authenticated, checkAuthentication]);

  return { authenticated };
};

export default useAuthentication;
