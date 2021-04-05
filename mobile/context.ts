import React, { createContext } from 'react';

export const AuthContext = createContext({
    //default values
    signIn: (data: any, callback: (err: string) => void) => { },
    signUp: (data: any, callback: (err: string) => void) => { },
    signOut: () => { },
});