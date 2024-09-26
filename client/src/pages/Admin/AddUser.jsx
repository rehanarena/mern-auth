import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddUser() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // For loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      if (formData.username.trim() === "") {
        setError("Please enter a valid name");
        toast.error("Please enter a valid name");
        return;
      }
      if (formData.email.trim() === "") {
        setError("Please enter a valid email");
        toast.error("Please enter a valid email");
        return;
      }
      if (formData.password.trim() === "" || formData.password.length < 8) {
        setError("Please enter a valid password");
        toast.error("Please enter a valid password (minimum 8 characters)");
        return;
      }

      setError("");
      const res = await fetch('/api/admin/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const errorData = await res.text(); // Get error response as text
        throw new Error(errorData || 'Failed to add user'); // Use fallback message
      }

      const data = await res.json();
      if (data.success === false) {
        setError(data.message || 'Failed to add user');
        toast.error(data.message || 'Failed to add user');
        return;
      }

      toast.success('User added successfully', {
        autoClose: 700,
        className: 'text-green-600',
        hideProgressBar: true
      });

      // Clear form fields after successful submission
      setFormData({ username: "", email: "", password: "" });
      navigate('/admin/home');
    } catch (err) {
      console.log(err);
      setError('Failed to add user');
      toast.error('Failed to add user: ' + err.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto mt-14">
      <h1 className="text-3xl text-slate-700 font-semibold text-center my-7">Add User</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          placeholder="User Name"
          type="text"
          id="username"
          className="bg-slate-100 rounded-lg p-3"
          value={formData.username}
          onChange={handleChange}
          autoComplete="username"
        />
        <input
          placeholder="Email"
          type="email"
          id="email"
          className="bg-slate-100 rounded-lg p-3"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
        />
        <input
          placeholder="Password"
          type="password"
          id="password"
          className="bg-slate-100 rounded-lg p-3"
          value={formData.password}
          onChange={handleChange}
          autoComplete="new-password"
        />
        <button 
          type="submit" 
          className={`bg-slate-600 text-white rounded-lg uppercase hover:opacity-85 disabled:opacity-80 max-w-lg p-2 my-2 ${loading ? 'opacity-50' : ''}`} 
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Adding...' : 'Add User'}
        </button>
      </form>
      {error && <p className="text-red-700 mt-5">{error}</p>}
    </div>
  );
}

export default AddUser;
