import logo from './logo.svg';
import React, {useState} from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import UserData from './components/UserData';
import Login from './components/Login';


function setLocalToken(userToken) {
  localStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = localStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken;
}


function App() {

  const [token, setToken] = useState();

  const localToken = getToken()

  const router = createBrowserRouter([
    {
      path: "/dashboard",
      element: <Dashboard />
    },
    {
      path: "/userData",
      element: <UserData/>
    },
    {
      path: "/login",
      element: <Login setToken={setToken} setLocalToken={setLocalToken}/>
    }
  
  ])

  if ((!localToken || !localToken.authenticated) && (!token || !token.authenticated)) {
    return <Login setToken={setToken} setLocalToken={setLocalToken} />
  }

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
