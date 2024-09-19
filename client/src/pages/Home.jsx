import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const [username, setUsername] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername || "Guest");
  }, []);

  return (
    <div className="p-5 max-w-lg mx-auto text-center">
      <h1 className="text-4xl font-bold my-6">Welcome to My App</h1>

      <p className="text-xl mb-4">
        Hello, {currentUser?.username || username}!
      </p>

      <p className="mb-4 text-slate-700">
        This MERN stack app features user authentication with sign-up, log-in, and log-out functionality.
      </p>

      <p className="mb-4 text-slate-700">
        Built with React for the front-end and Node.js with Express for the back-end, it uses MongoDB for data storage and JWT for secure authentication.
      </p>

      <p className="text-slate-700">
        Explore the app to see how it works, and use this template to kickstart your own full-stack projects!
      </p>
    </div>
  );
}
