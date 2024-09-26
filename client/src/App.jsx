import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Login from "./pages/Admin/Login";
import AdminHome from './pages/Admin/AdminHome';
import AddUser from './pages/Admin/AddUser';
import PrivateRoute from "./components/PrivateRoute";
import AdminPrivateRoute from "./components/AdminPrivateRoute";
import EditUser from "./pages/Admin/EditUser";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-up" element={<SignUp />} />

        {/* Private Route for User */}
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<Login />} />
        <Route element={<AdminPrivateRoute />}>
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/edit/:id" element={<EditUser/>}/>
        </Route>
          <Route path="/admin/addUser" element={<AddUser />} />
      </Routes>
    </BrowserRouter>
  );
}
