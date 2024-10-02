import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Note from '../components/Note';
import Footer from '../components/Footer'; // Corrected import
import Oops from '../components/Oops';
import oopsImg from "../Images/oops2.png";
import { useSearchParams, useNavigate } from 'react-router-dom';
import debounce from 'lodash.debounce'; // Install lodash.debounce if not already installed

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const myParam = searchParams.get('query') || '';

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState("");
  const [searchInput, setSearchInput] = useState(myParam); // State for input field
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getNotes();
  }, []);

  useEffect(() => {
    if (data.length > 0 && myParam) {
      const filtered = data.filter(note => 
        note.title.toLowerCase().includes(myParam.toLowerCase()) || 
        note.description.toLowerCase().includes(myParam.toLowerCase()) ||
        note.content.toLowerCase().includes(myParam.toLowerCase())
      );
      setFilteredData(filtered);
      console.log('Filtered Data:', filtered);
    } else {
      setFilteredData([]);
    }
  }, [data, myParam]);

  const getNotes = () => {
    setIsLoading(true);
    fetch("http://localhost:8000/getNotes", {
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
    .then(responseData => {
      setIsLoading(false);
      if (responseData.success === false) {
        setError(responseData.msg);
      } else {
        console.log('Fetched Data:', responseData);
        // Adjust based on actual response structure
        const notes = responseData.notes || responseData; // If responseData has 'notes' field
        setData(notes);
      }
    })
    .catch(error => {
      console.error('Error fetching notes:', error);
      setError('Failed to fetch notes.');
      setIsLoading(false);
    });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    debouncedSetSearchParams(value);
  };

  // Debounce the search to limit the number of updates
  const debouncedSetSearchParams = debounce((value) => {
    if (value.trim()) {
      setSearchParams({ query: value.trim() });
    } else {
      setSearchParams({});
    }
  }, 300); // 300ms delay

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ query: searchInput.trim() });
    } else {
      setSearchParams({});
    }
  };

  return (
    <>
      <Navbar/>
      <div className="div flex items-center pr-5 pt-4 justify-end">
        <div className="inputBox !w-[400px] !p-[5px]">
          <form onSubmit={handleSearchSubmit}>
            <input 
              type="text" 
              placeholder='Search Notes' 
              value={searchInput}
              onChange={handleSearchChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </form>
        </div>
      </div>
      <div className="gridItems gridOne">
        { isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <Oops title={error} image={oopsImg} buttonTitle="Go Back" buttonLink="/" />
        ) : myParam ? (
          filteredData.length > 0 ? (
            filteredData.map((el, index) => (
              <Note key={el._id} index={index} note={el} height="180px" />
            ))
          ) : (
            <Oops 
              title={`No Search Results Found for "${myParam}"`} 
              image={oopsImg} 
              buttonTitle="Go Back" 
              buttonLink="/" 
            />
          )
        ) : (
          data.length > 0 ? (
            data.map((el, index) => (
              <Note key={el._id} index={index} note={el} height="180px" />
            ))
          ) : (
            <Oops 
              title="No Notes Available" 
              image={oopsImg} 
              buttonTitle="Go Back" 
              buttonLink="/" 
            />
          )
        )}
      </div>
      <Footer/>
    </>
  );
};

export default SearchPage;
