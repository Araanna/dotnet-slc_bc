// src/useAuth.ts

import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

/**
 * Custom hook to access authentication state and methods.
 * @returns {AuthContextType} The authentication context values.
 */
export const useAuth = () => {
    return useContext(AuthContext);
};