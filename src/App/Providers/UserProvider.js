import React, { Component, createContext } from "react";
import { auth } from "../firebase";


export const UserContext = createContext({ user: null });

class UserProvider extends Component {
    state = {
        user: null,
        ready: false,
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
