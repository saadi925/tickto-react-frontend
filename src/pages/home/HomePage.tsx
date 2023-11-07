import { useGetUserQuery } from "../../setup/query/apiSlice";
import { AppHeader, AppWindow } from "../../components";

const HomePage = () => {
  const token = localStorage.getItem("token")!;
  const { data } = useGetUserQuery(token);
  console.log(data);

  return (
    <div className={`font-robo`}>
      <AppHeader />
      <AppWindow />
    </div>
  );
};

export default HomePage;
