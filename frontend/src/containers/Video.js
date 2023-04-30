// Importing necessary hooks from react and react-router-dom
import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Video = () => {
  // Initializing state variable 'value' and its setter function 'setValue'
  const [value, setValue] = useState("");
  // Getting the 'navigate' function from useNavigate hook
  const navigate = useNavigate()
    
  // Defining a function called 'handleJoinRoom' using useCallback hook
  const handleJoinRoom = useCallback(() =>{
    // Navigating user to '/room/{value}' when this function is called
    navigate(`/room/${value}`)
  },[navigate,value])
  
  // Returning JSX elements that will be rendered in the DOM
  return (
    <div style={{ margin: "200px" }}>
      {/* An input field for user to enter room code */}
      <input 
      value={value} 
      onChange={(e)=> setValue(e.target.value)}
      type="text" 
      placeholder="Enter room code" />
      {/* A button that triggers 'handleJoinRoom' function defined above */}
      <button onClick={handleJoinRoom}>Join</button>
    </div>
  );
};

// Exporting the 'Video' component as default export
export default Video;