import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdForm from "./components/AdForm";
import AdList from "./components/AdList";
import AdSearch from "./components/AdSearch";
import Auth from "./components/Auth";
import PrivateRoute from "./components/PrivateRoute";
import './index.css';
import { Search, Plus, List, LogOut } from "lucide-react";

function App() {
  const [activeTab, setActiveTab] = useState("create");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated on initial load
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const tabs = [
    { id: "create", label: "Create Ad", icon: Plus },
    { id: "list", label: "All Ads", icon: List },
    { id: "search", label: "Search Ads", icon: Search }
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  const MainContent = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Ad Management Portal
            </h1>
            <p className="text-gray-600 text-lg">Create, manage, and discover amazing advertisements</p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-2xl shadow-xl p-2 max-w-md">
              <div className="flex space-x-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                        activeTab === tab.id
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                          : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                      }`}
                    >
                      <Icon size={18} />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  );
                })}
                {isAuthenticated && (
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center px-4 py-3 rounded-xl font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all duration-300"
                  >
                    <LogOut size={18} />
                    <span className="hidden sm:inline ml-2">Logout</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 min-h-[600px]">
            <div className="transition-all duration-500 ease-in-out">
              {activeTab === "create" && <AdForm />}
              {activeTab === "list" && <AdList />}
              {activeTab === "search" && <AdSearch />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Router>
    <Routes>
    <Route path="/login" element={<Auth mode="login" setIsAuthenticated={setIsAuthenticated} />} />
    <Route path="/register" element={<Auth mode="register" setIsAuthenticated={setIsAuthenticated} />} />
    <Route
      path="/"
      element={
        <PrivateRoute>
          <MainContent />
        </PrivateRoute>
      }
    />
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
  </Router>
  )
}

export default App;