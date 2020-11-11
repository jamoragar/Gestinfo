import React from 'react';
import './App.css';
import Routes from './Components/Routes/Routes';
import {useLogin} from './Components/Hooks/useLogin';



function App(props) {
  const Login = useLogin();

  return (
    <div className="App">
      <Routes {...props}/>
    </div>
  );
}

export default App;
