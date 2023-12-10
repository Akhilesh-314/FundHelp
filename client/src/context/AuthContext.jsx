// AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const history = useHistory();
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    const logout = () => {
        localStorage.removeItem('token');
        history.push('/');
        setIsUserLoggedIn(false);
    };
    return (
        <AuthContext.Provider value={{ isUserLoggedIn, setIsUserLoggedIn, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
