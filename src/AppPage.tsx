import React, { useState, useEffect, useCallback } from 'react';
import { MapPin, Search, Users, Edit2, ChevronDown, ChevronUp, Move } from 'lucide-react';
import { Connections } from './Connections';

// Placeholder for UI components
const Alert = ({ children }: any) => (
  <div className="bg-gray-800 border border-cyan-500 rounded-lg p-4 mb-4">{children}</div>
);

// Placeholder for map component
const MapComponent = ({ center, zoom }: any) => (
  <div className="bg-gray-700 h-full flex items-center justify-center">
    <p>Map Component (Lat: {center?.lat?.toFixed(4)}, Lng: {center?.lng?.toFixed(4)}, Zoom: {zoom})</p>
  </div>
);

// Placeholder for Worldcoin authentication
const WorldcoinAuth = ({ onVerify }: any) => (
  <button onClick={onVerify} className="bg-cyan-500 text-black p-2 rounded hover:bg-cyan-400">
    Verify with Worldcoin
  </button>
);

const MainApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [userCoordinates, setUserCoordinates] = useState({});

  useEffect(() => {
    console.log("navigator", navigator)
    const successCallback = (position: any) => {
      console.log(position);
    };

    const errorCallback = (error: any) => {
      console.log(error);
    };

    navigator?.geolocation?.getCurrentPosition(successCallback, errorCallback);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: any) => {
          setUserCoordinates({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <UserProfile coordinates={userCoordinates} />;
      case 'connections':
        return <Connections userId="Asha" />;
      case 'search':
        return <SearchComponent />;
      default:
        return <UserProfile coordinates={userCoordinates} />;
    }
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <header className="p-4 border-b border-cyan-500 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-cyan-500 rounded-full mr-2"></div>
          <h1 className="text-2xl font-bold text-cyan-300">GeoNada</h1>
        </div>
      </header>
      <main className="p-4">
        {renderContent()}
      </main>
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 p-2">
        <div className="flex justify-around">
          <button onClick={() => setActiveTab('profile')} className="text-cyan-300 hover:text-cyan-100">
            <MapPin size={24} />
          </button>
          <button onClick={() => setActiveTab('connections')} className="text-cyan-300 hover:text-cyan-100">
            <Users size={24} />
          </button>
          <button onClick={() => setActiveTab('search')} className="text-cyan-300 hover:text-cyan-100">
            <Search size={24} />
          </button>
        </div>
      </nav>
    </div>
  );
};

const LoginScreen = ({ onLogin }: any) => {
  const handleVerify = () => {
    console.log("Worldcoin verification successful");
    onLogin();
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center font-sans">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4 text-cyan-300">Login to GeoNada</h2>
        <p className="mb-4">Prove your humanity with Worldcoin</p>
        <WorldcoinAuth onVerify={handleVerify} />
      </div>
    </div>
  );
};

const UserProfile = ({ coordinates }: any) => (
  <div>
    <h2 className="text-xl font-bold mb-4 text-cyan-300">User Profile</h2>
    <div className="bg-gray-900 p-4 rounded-lg mb-4 flex items-center">
      <div className="w-24 h-24 bg-cyan-500 rounded-full mr-4 flex items-center justify-center">
        <span className="text-black text-2xl font-bold">CU</span>
      </div>
      <div>
        <p className="text-lg font-bold">Asha</p>
        <p className="text-sm text-gray-400">Rank: High Trust</p>
      </div>
    </div>
    <Alert>
      <h3 className="font-bold">Current Location</h3>
      <p>{coordinates ? `Lat: ${coordinates.lat?.toFixed(4)}, Lng: ${coordinates.lng?.toFixed(4)}` : 'Location not available'}</p>
    </Alert>
    <div className="h-64 bg-gray-800 rounded-lg overflow-hidden mt-4">
      {coordinates && <MapComponent center={coordinates} zoom={13} />}
    </div>
  </div>
);

const SearchComponent = () => (
  <div>
    <h2 className="text-xl font-bold mb-4 text-cyan-300">Find Connections</h2>
    <div className="flex mb-4">
      <input className="flex-grow p-2 bg-gray-800 text-white rounded-l" type="text" placeholder="Search users..." />
      <button className="bg-cyan-500 text-black p-2 rounded-r hover:bg-cyan-400">
        <Search size={20} />
      </button>
    </div>
    <div className="bg-gray-900 p-4 rounded-lg">
      <p className="text-gray-400">Search results will appear here...</p>
    </div>
  </div>
);

export default MainApp;
