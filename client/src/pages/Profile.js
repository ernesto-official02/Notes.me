import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Note from '../components/Note';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [notes, setNotes] = useState([]);
  const [importantNotes, setImportantNotes] = useState([]);
  const [normalNotes, setNormalNotes] = useState([]);
  const [profilePic, setProfilePic] = useState(null);
  const [isPicUploaded, setIsPicUploaded] = useState(false);

  const navigate = useNavigate();

  const getUserDetails = async () => {
    const response = await fetch("http://localhost:8000/getUserDetails", {
      mode: "cors",
      method: "POST",
      headers: {
        "Application-Type": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId: localStorage.getItem("userID") })
    });
    const data = await response.json();
    setUserDetails(data);
  };

  const getNotes = async () => {
    try {
      const response = await fetch("http://localhost:8000/getNotes", {
        mode: "cors",
        method: "POST",
        headers: {
          "Application-Type": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId: localStorage.getItem("userID") })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setNotes(data);
        setImportantNotes(data.filter(note => note.isImportant));
        setNormalNotes(data.filter(note => !note.isImportant));
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handlePicUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        setIsPicUploaded(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePic = () => {
    setProfilePic(null);
    setIsPicUploaded(false);
  };

  useEffect(() => {
    getUserDetails();
    getNotes();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-between w-screen h-[300px] px-[50px]">
        <div className="flex items-center gap-4">
          <div className="profileCircle w-[150px] h-[150px] rounded-full bg-gray-300">
            {profilePic && <img src={profilePic} alt="Profile" className="w-full h-full rounded-full object-cover" />}
          </div>
          <div>
            <h3 className='text-[23px]'>{userDetails ? userDetails.name : ""}</h3>
            <p className='text-gray-500 text-[15px]'>Joined In {userDetails ? new Date(userDetails.date).toDateString() : ""}</p>
          </div>
        </div>

        <div className='relative h-[40%] pr-10'>
          <div className='text-gray-500 mb-2'>
            Total Notes: {notes.length || 0} | Important Notes: {importantNotes.length || 0}
          </div>
          {/* Move buttons below the note counts */}
          <div className='mt-4 flex items-center gap-4 flex-wrap'>
            <label className="btnNormal cursor-pointer">
              {isPicUploaded ? "Update Picture" : "Add Pic"}
              <input type="file" onChange={handlePicUpload} className="hidden" />
            </label>
            {isPicUploaded && (
              <button className="btnNormal" onClick={handleRemovePic}>Remove Photo</button>
            )}
            <button className="btnNormal" onClick={() => navigate("/addNewNote")}>Add Note</button>
          </div>
        </div>
      </div>

      <div className='w-screen px-[50px]'>
        <h3 className='text-[26px]'>Your <span className="text-[#578df5]">Important</span> Notes</h3>
      </div>
      <div className="gridItems grid grid-cols-1 gap-4 px-[50px] border border-gray-300 rounded-md p-4">
        {importantNotes.map((note, index) => (
          <Note key={note._id} note={note} index={index} />
        ))}
      </div>

      <div className='w-screen px-[50px] mt-4'>
        <h3 className='text-[26px]'>Your <span className="text-[#578df5]">Normal</span> Notes</h3>
      </div>
      <div className="gridItems grid grid-cols-1 gap-4 px-[50px] border border-gray-300 rounded-md p-4 mb-3">
        {normalNotes.map((note, index) => (
          <Note key={note._id} note={note} index={index} />
        ))}
      </div>

      <Footer />
    </>
  );
}

export default Profile;
