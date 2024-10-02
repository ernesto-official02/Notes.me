import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  const getUserDetails = () => {
    fetch("http://localhost:8000/getUserDetails", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userID")
      })
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.success === false) {
          navigate("/login");
        } else {
          setUserData(data);
        }
      });
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-4xl font-bold text-blue-500"> {/* Increased font size */}
          Notes.Me
        </Link> 

        <div className="flex space-x-6"> {/* Increased spacing for better visibility */}
          <Link to="/search" className="text-lg text-gray-700 hover:text-blue-500"> {/* Increased font size */}
            Search
          </Link>
          <Link to="/profile" className="text-lg text-gray-700 hover:text-blue-500"> {/* Increased font size */}
            Profile
          </Link>
          {/* Add more links as needed */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
