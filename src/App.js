import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import './pages/Pages.css';

import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import AccountSettingsPage from "./pages/AccountSettingsPage/AccountSettingsPage";
import YourAccountPage from "./pages/YourAccountPage/YourAccountPage";
import RankingPage from "./pages/RankingPage/RankingPage";
import UserAccountPage from "./pages/UserAccountPage/UserAccountPage";
import ChatPage from "./pages/ChatPage/ChatPage";
import SearchingUsersPage from "./pages/SearchingUsersPage/SearchingUsersPage";
import YourPartnersPage from "./pages/YourPartnersPage/YourPartnersPage";

import { auth } from "./firebase";
import { useEffect, useState } from "react";

import { useSelector } from 'react-redux';

function App() {

    const [isSignedIn, setIsSignedIn] = useState(false);
    const isLoading = useSelector(state => state.isLoading)

    useEffect(() => {
        auth.onAuthStateChanged(user => {
          if(user && !isLoading){
    
            setIsSignedIn(true);
          }else{
            setIsSignedIn(false);
          }
        })
      }, [])

  return (
    <BrowserRouter>
        {isSignedIn ? (
            <Routes>
                <Route exact path="/" element={<Navigate replace to="/home" />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/edit_account" element={<AccountSettingsPage />} />
                <Route path="/your_account" element={<YourAccountPage />} />
                <Route path="/your_partners" element={<YourPartnersPage />} />
                <Route path="/ranking" element={<RankingPage />} />
                <Route path="/searching_users" element={<SearchingUsersPage />} />
                <Route path="/user_account/:uid" element={<UserAccountPage />} />
                <Route path="/chat/:pid" element={<ChatPage />} />
                <Route path="*" element={<Navigate replace to="/home" />} />
            </Routes>
        ) : (
            <Routes>
                <Route exact path="/" element={<LoginPage />} />
                <Route path="/register_account" element={<AccountSettingsPage />} />
                <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
        )}
    </BrowserRouter>
  );
}

export default App;
//<Route exact path="/" element={<LoginPage />} />
/**
 * <BrowserRouter>
        {isSignedIn ? (
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/edit_common" element={<AccountSettingsPage />} />
            </Routes>
        ) : (
            <Routes>
                <Route exact path="/" element={<LoginPage />} />
                <Route path="/register_common" element={<AccountSettingsPage />} />
            </Routes>
        )}
    </BrowserRouter>
 */