import React, { useState, useEffect } from 'react';
import WebPlayback from '../components/WebPlayback'
import Login from '../components/Login'
import '../css_files/App.css';
import cors from 'cors'
const formcomp = () => {

  const [token, setToken] = useState('');

  useEffect(() => {

    async function getToken() {
      const response = await fetch('http://localhost:3000/api/webplayer/auth/token');
      const json = await response.json();
      setToken(json.access_token);
    }

    getToken();

  }, []);

  return (
    <>
        {<Login/> }
        {<WebPlayback token={token} />}
    </>
  );
}

export default formcomp;
