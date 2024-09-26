import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin, adminLoginFailure } from "../../redux/admin/adminSlice.js";
import { toast } from "react-toastify";
import AdminHeader from "../../components/AdminHeader.jsx";

export default function Login() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { admin, isLogged } = useSelector((state) => state.admin);

  useEffect(() => {
    if (isLogged) {
      navigate("/admin/home");
    }
  }, [isLogged, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      dispatch(adminLogin(data));

      console.log(data);

      if (data.success === false) {
        dispatch(adminLoginFailure(data));
        navigate("/admin");
        toast.error(data.message, {
          autoClose: 500,
          hideProgressBar: true,
        });
        return;
      }
      navigate("/admin/home", { replace: true });
      toast.success("Login Successful", {
        autoClose: 500,
        className: "text-green-600",
        hideProgressBar: true,
      });
    } catch (error) {
      dispatch(adminLoginFailure(error));
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          <h1 className="text-4xl text-gray-800 text-center font-semibold mb-6">
            Admin Sign In
          </h1>
          <p className="text-red-600 font-semibold mb-4 text-center">
            {error ? error || "Something went wrong" : ""}
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Name"
              id="name"
              className="bg-gray-100 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              id="password"
              className="bg-gray-100 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={handleChange}
            />
            <button className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-900 transition duration-300 shadow-md">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
