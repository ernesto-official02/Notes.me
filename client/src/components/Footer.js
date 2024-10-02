import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token and userID from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userID");

    // Navigate to the login page
    navigate("/login");
  };

  return (
    <div className="footer h-[120px] w-full bg-[#f4f4f4] flex items-center justify-around fixed bottom-0">
      <Link to="/" className="text-2xl cursor-pointer"> 
        Notes.me
      </Link>

      <div className='text-center text-[gray]'>
        <p>Designed By <span className='sp-text'>Ernest</span></p>
        <p>Copy Right 2024 All Right Reserved</p>
      </div>

      <div>
        <button 
          onClick={handleLogout} 
          className="btnNormal">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Footer;
