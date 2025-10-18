// src/App.tsx
import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
import Contracts from "./pages/Contract";
import { Toaster, toast } from "sonner";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // ✅ Check if user already logged in
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const loggedIn = localStorage.getItem("isLoggedIn") === "true";
        console.log("Auth check - loggedIn:", loggedIn);
        setIsAuthenticated(loggedIn);
      } catch (error) {
        console.error("Error checking auth status:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogin = () => {
    console.log("Login successful");
    localStorage.setItem("isLoggedIn", "true");
    setIsAuthenticated(true);
    toast.success("Login successful!");
  };

  const handleLogout = () => {
    console.log("Logging out");
    localStorage.removeItem("isLoggedIn");
    setIsAuthenticated(false);
    toast.success("Logged out successfully");
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-white">Loading...</p>
        </div>
        <Toaster position="top-right" richColors closeButton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="fixed top-0 w-full bg-green-900 text-white p-4 flex justify-between items-center z-50">
        <h1 className="text-lg font-bold">Admin Dashboard</h1>
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-sm font-semibold transition duration-200"
          >
            Logout
          </button>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-16 min-h-screen">
        {isAuthenticated ? (
          <div className="p-4">
            <Contracts />
          </div>
        ) : (
          <div className="flex items-center justify-center mt-16 ">
            <Login onLogin={handleLogin} />
          </div>
        )}
      </main>

      {/* Toast Container */}
      <Toaster position="top-right" richColors closeButton />
    </div>
  );
}

export default App;