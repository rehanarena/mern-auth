import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminHeader from '../../components/AdminHeader';

function EditUser() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/admin/edit/${id}`)
      .then((res) => {
        setUserName(res.data.username);
        setEmail(res.data.email);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setError('Failed to fetch user data');
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`/api/admin/edit/${id}`, { userName, email })
      .then((res) => {
        if (res.data.success) {
          console.log(res.data);
          navigate("/admin/home");
          toast.success('User updated successfully', {
            autoClose: 700,
            className: 'text-green-600',
            hideProgressBar: true,
          });
        } else {
          setError('Failed to update user');
        }
      })
      .catch((err) => {
        console.log(err);
        setError('Failed to update user');
      });
  };

  return (
    <>
      <AdminHeader />
      <div className="p-6 max-w-lg mx-auto mt-14 bg-white shadow-lg rounded-lg border border-gray-300">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-indigo-600">Edit User</h1>
        {error && <p className="text-red-600 text-center mb-4 font-medium">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">Username</label>
            <input
              value={userName}
              type="text"
              id="username"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-teal-400 focus:outline-none transition duration-150 ease-in-out"
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              value={email}
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-teal-400 focus:outline-none transition duration-150 ease-in-out"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-500 transition duration-300 shadow-md"
          >
            Update User
          </button>
        </form>
      </div>
    </>
  );
}

export default EditUser;
