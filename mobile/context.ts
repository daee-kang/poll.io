import React, { createContext } from 'react';

export const AuthContext = createContext({
    //default values
    signIn: async (data: any) => { },
    signUp: async (data: any, callback: (err: string) => void) => { },
    signOut: () => { },
    getToken: () => String
});