import React, { useState, useEffect} from 'react';


function App() {

  const [message, setMessage] = useState("");

  useEffect(() => {

    //call the backend
    fetch('http://localhost:3000')

    //get the response as text
      .then(res => res.text())

      //fetch the data and set the message into state
      .then(data => setMessage(data))

      //catch any error
      .catch(err => console.error(err));
  }, []);

  return(
    <div className='flex justify-center items-center h-50vh'>
      <div className='box-border border-4 p-10 m-4 border-indigo-600 rounded-2xl shadow-lg'>
      <h1 className='flex justify-center items-center text-4xl font-bold '>Message from Backend :</h1>
      <p className='flex justify-center items-center text-2xl font-bold leading-relaxed'>{message}</p>
     </div>
    </div>
  );
}

export default App;