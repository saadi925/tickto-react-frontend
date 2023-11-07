import { useDispatch } from "react-redux";
import { setAuthenticated } from "../../setup";

const AppHeader = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setAuthenticated(false));
  };
  return (
    <div
      className={`w-full h-head bg-black border-b border-blue-500 flex items-center px-3 justify-between`}
    >
      <div className={``}>
        <span className={`text-3xl font-semibold text-blue-400`}>Tickto</span>
      </div>
      <ul
        className={`hidden text-xl gap-2 pr-5 font-semibold text-white md:flex`}
      >
        <li
          className={`px-4 py-1.5  cursor-pointer rounded-md hover:text-blue-500 transition-all duration-500`}
        >
          Home
        </li>
        <li
          className={`px-4 py-1.5  cursor-pointer rounded-md hover:text-blue-500 transition-all duration-500`}
        >
          Tickets
        </li>
        <li
          className={`px-4 py-1.5  cursor-pointer rounded-md hover:text-blue-500 transition-all duration-500`}
        >
          Users
        </li>
        <button
          className={`px-3  py-1.5 bg-blue-600 bg-opacity-80 ease-in transition-colors cursor-pointer  hover:bg-opacity-100  rounded-md`}
          onClick={handleLogout}
        >
          Logout
        </button>
      </ul>
    </div>
  );
};

export default AppHeader;
