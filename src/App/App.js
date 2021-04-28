import React, { useContext } from "react";
import SignIn from './Components/SignIn/SignIn';
import { UserContext } from "./Providers/UserProvider";
import './App.css';

function App() {
  const user = useContext(UserContext);
  return (
    user === null ?
      <SignIn></SignIn>
      :
      ""
  );
}

export default App;
