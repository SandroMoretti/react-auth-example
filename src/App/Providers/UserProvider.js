import React, { Component, createContext } from "react";
import { auth } from "../firebase";


export const UserContext = createContext({ user: null });

class UserProvider extends Component {  // componente para que todas as telas possam acessar o usuário logado (caso tenha um)
    state = {
        user: null,     // state que salva os dados do usuário autenticado (caso tenha)
        ready: false,   // state para telas verificarem se já fez a autenticação no firebase
    };



    componentDidMount = async () => {
        auth.onAuthStateChanged(async userAuth => {
            const user = (userAuth);
            this.setState({ user: user, ready: true });
        });


    };

    render() {
        const { user, ready } = this.state;

        return (
            <UserContext.Provider value={{ user: user, ready: ready }}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}

export default UserProvider;
