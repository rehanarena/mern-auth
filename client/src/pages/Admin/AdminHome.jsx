import { useEffect, useState } from "react";
import AdminHeader from "../../components/AdminHeader";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

function AdminHome() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [data, setData] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/admin/home")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [data]);

  // Debounce implementation(to avoid frequent filtering while typing)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search); // Update debounced (search after a delay)
      setCurrentPage(1);
    }, 500); 

    return () => {
      clearTimeout(handler); // Clear timeout (if search changes within the delay)
    };
  }, [search]); // Run the effect only when search changes

  const handleEdit = (id) => {
    navigate(`/admin/edit/${id}`);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete this user. This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#F56565",
      cancelButtonColor: "#A0AEC0",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("adminToken");
        axios
          .get(`/api/admin/deleteUser/${id}`, {
            headers: {
              Authorization: token,
            },
          })
          .then((res) => {
            setData((prev) => prev + 1);
            Swal.fire("Deleted!", `User has been deleted.`, "success");
          })
          .catch((err) => console.log(err));
      }
    });
  };

  // Use the debounced search term for filtering users
  const filteredUsers = users.filter((val) =>
    val.username.toLowerCase().startsWith(debouncedSearch.toLowerCase())
  );

  // Get current users for the page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <>
      <AdminHeader />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
            User Management
          </h1>

          <div className="flex justify-between items-center mb-6">
            <Link to='/admin/addUser'>
              <button className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-500 transition duration-300 shadow-md">
                Add New User
              </button>
            </Link>
            <input
              className="border border-gray-300 rounded-lg py-2 px-4 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-1/3"
              type="search"
              placeholder="Search by User Name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto bg-white shadow-lg rounded-lg">
              <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <tr>
                  <th className="py-3 px-6 text-left">No</th>
                  <th className="py-3 px-6 text-left">Profile</th>
                  <th className="py-3 px-6 text-left">User Name</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm font-light">
                {currentUsers.map((user, index) => (
                  <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-100 transition duration-150">
                    <td className="py-3 px-6">{indexOfFirstUser + index + 1}</td>
                    <td className="py-3 px-6">
                      <img className="h-10 w-10 rounded-full border-2 border-gray-300" src={user.profilePicture} alt={user.username} />
                    </td>
                    <td className="py-3 px-6 font-semibold">{user.username}</td>
                    <td className="py-3 px-6">{user.email}</td>
                    <td className="py-3 px-6 text-center">
                      <button
                        onClick={() => handleEdit(user._id)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white py-1 px-3 rounded-lg shadow mr-2 transition duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg shadow transition duration-200"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => paginate(pageNumber)}
                className={`mx-1 px-3 py-2 rounded-lg ${
                  pageNumber === currentPage
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {pageNumber}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminHome;
