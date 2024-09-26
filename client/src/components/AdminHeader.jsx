import { Link, useNavigate } from "react-router-dom";
import { adminLogout } from "../redux/admin/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function AdminHeader() {
  const { admin } = useSelector((state) => state.admin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    try {
      await fetch("/api/admin/logout");
      dispatch(adminLogout());
      navigate("/admin");
      toast.success("Sign Out Successful", {
        className: "text-green-600",
        autoClose: 1000,
        hideProgressBar: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-slate-400 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
        <Link to="/">
          <h1 className="text-2xl font-bold hover:text-blue-300 transition duration-200">
            User Management App
          </h1>
        </Link>
        <ul className="flex items-center gap-6">
          {admin ? (
            <>
              <li className="font-semibold">{admin.name}</li>
              <li
                onClick={handleLogOut}
                className="text-red-700 font-bold cursor-pointer hover:text-red-200 transition duration-200"
              >
                Sign Out
              </li>
            </>
          ) : null}
        </ul>
      </div>
    </div>
  );
}
