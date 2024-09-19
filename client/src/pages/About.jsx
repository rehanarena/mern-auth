import React from 'react';

export default function About() {
  return (
    <div className='px-4 py-12 max-w-2xl mx-auto'>
      <h1 className='text-3xl font-bold mb-4 text-slate-800'>About</h1>
      
      <p className='mb-4 text-slate-700'>
        This application is built using the MERN stack (MongoDB, Express, React, Node.js). It includes user authentication with sign-up, log-in, and log-out features, ensuring that only authenticated users can access protected routes.
      </p>
      
      <p className='mb-4 text-slate-700'>
        The front-end is powered by React and React Router, while the back-end is managed with Node.js and Express. MongoDB is used for data storage, and JSON Web Tokens (JWT) handle authentication.
      </p>
      
      <p className='text-slate-700'>
        Use this app as a template to build your own full-stack projects with authentication. Feel free to customize and expand as needed!
      </p>
    </div>
  );
}
