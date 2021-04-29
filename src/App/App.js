import React, { useContext } from "react";
import SignIn from './Components/SignIn/SignIn';
import UserProfile from './Components/UserProfile/UserProfile';
import { UserContext } from "./Providers/UserProvider";
import './App.css';
import { LinearProgress } from "@material-ui/core";

function App() {
  const user = useContext(UserContext);
  return (
    !user.ready ? // enquanto tiver verificando se o usuário está ou não online carrega um loading ao invés das telas
      <div className="loading-root">
        <LinearProgress />
      </div>
      : user.user === null ?            // caso não tenha usuário autenticado carrega a página Sign In
        <SignIn></SignIn>
        :
        <UserProfile></UserProfile>     // caso tenha usuário autenticado carrega a página UserProfile
  );
}

export default App;
