import React from "react";
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {Navigate, Route, Routes} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import ProfileContainer from "./components/Profile/ProfileContainer";
import LoginContainer from "./components/Login/LoginContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import {connect} from "react-redux";
import {initializeApp} from "./store/appSlice";
import {useEffect} from "react";
import Preloader from "./components/common/Preloader/Preloader";


const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"))
const UsersContainer = React.lazy(() => import("./components/Users/UsersContainer"));

const App = ({initialized, initializeApp}) => {
    useEffect(() => {
        initializeApp()
    },[initialized]);

    if (!initialized) {
        return <Preloader />
    }

    return (
        <div className="App">
            <HeaderContainer/>
            <Navbar/>
            <div className="App-content">
                <Routes>
                    <Route path={"/"} element={<Navigate to={"/profile"}/>}/>
                    <Route path={"/login"} element={<LoginContainer/>}/>

                    <Route path={"/profile/:userId?"} element={<ProfileContainer/>}/>
                    <Route path={"/news"} element={<News/>}/>
                    <Route path={"/messages"} element={<DialogsContainer/>}/>
                    <Route path={"/users"} element={<UsersContainer/>}/>
                    <Route path={"/music"} element={<Music/>}/>
                    <Route path={"/settings"} element={<Settings/>}/>
                </Routes>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

export default connect(mapStateToProps, {initializeApp})(App);
