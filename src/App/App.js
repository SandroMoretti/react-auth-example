import React, { useContext } from "react";
import SignIn from './Components/SignIn/SignIn';
import UserProfile from './Components/UserProfile/UserProfile';
import { UserContext } from "./Providers/UserProvider";
import './App.css';
import { LinearProgress } from "@material-ui/core";

function App() {
  const user = useContext(UserContext);
  return (
    !user.ready ?
      <div className="loading-root">
        <LinearProgress />
      </div>
      : user.user === null ?
        <SignIn></SignIn>
        :
        <UserProfile></UserProfile>
  );
}

export default App;
