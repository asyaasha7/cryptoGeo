import React, { useState, useEffect, useCallback } from 'react';
import { MapPin, Search, Users, Edit2, ChevronDown, ChevronUp, Move } from 'lucide-react';
import { Connections } from './Connections';
import { MapComponent } from './Map';
import { Menu } from 'lucide-react';

const Logo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-8 h-8 mr-2">
    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan-400" />
    <path d="M50 5 L95 50 L50 95 L5 50 Z" fill="none" stroke="currentColor" strokeWidth="2" className="text-fuchsia-400" />
    <circle cx="50" cy="50" r="5" fill="currentColor" className="text-fuchsia-400" />
    <path d="M50 20 Q70 50 50 80 Q30 50 50 20" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan-400" />
  </svg>
);

// Placeholder for UI components
const Alert = ({ children }: any) => (
  <div className="bg-gray-800 border border-cyan-500 rounded-lg p-4 mb-4">{children}</div>
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
      <header className="p-4 bg-gray-800 flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
          <Logo />
          GeoTrust
        </h1>
        {isLoggedIn && (
          <nav>
            <Menu className="text-cyan-400 cursor-pointer" onClick={() => {/* Toggle menu */ }} />
          </nav>
        )}
      </header>
      <main className="p-4">
        {renderContent()}
      </main>
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 p-4">
        <div className="flex justify-around">
          <button onClick={() => setActiveTab('profile')} className="text-cyan-300 hover:text-cyan-100">
            <MapPin size={30} />
          </button>
          <button onClick={() => setActiveTab('connections')} className="text-cyan-300 hover:text-cyan-100">
            <Users size={30} />
          </button>
          <button onClick={() => setActiveTab('search')} className="text-cyan-300 hover:text-cyan-100">
            <Search size={30} />
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
      <div className="w-24 h-24 bg-green-400 rounded-full mr-8 flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="30" r="20" fill="#1a1a1a" />
          <rect x="30" y="55" width="40" height="40" fill="#1a1a1a" />
          <circle cx="35" cy="25" r="5" fill="#4ade80" />
          <circle cx="65" cy="25" r="5" fill="#4ade80" />
          <rect x="40" y="70" width="20" height="5" fill="#4ade80" />
        </svg>
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
    <div className="h-96 bg-gray-800 rounded-lg overflow-hidden mt-4">
      {coordinates && <MapComponent long={coordinates?.lng} lat={coordinates?.lat} zoom={13} />}
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
