import React, {FC, Suspense, useEffect} from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import {Navigate, Route, Routes} from 'react-router-dom'
import News from './components/News/News'
import Music from './components/Music/Music'
import Settings from './components/Settings/Settings'
import {useDispatch, useSelector} from 'react-redux'
import {initializeApp} from './store/appSlice'
import Preloader from './components/common/Preloader/Preloader'
import {AppDispatch} from './store/store'
import Users from './components/Users/Users'
import {getInitialized} from './store/appSelector'
import Header from './components/Header/Header'
import LoginForm from './components/Login/LoginForm'

const Dialogs = React.lazy(() => import("./components/Dialogs/Dialogs"))
const Profile = React.lazy(() => import("./components/Profile/Profile"))
const Chat = React.lazy(() => import("./components/Chat/Chat"))

const App: FC = () => {
    const dispatch: AppDispatch = useDispatch()

    const initialized = useSelector(getInitialized)

    useEffect(() => {
        dispatch(initializeApp())
    }, [initialized]);

    if (!initialized) {
        return <Preloader/>
    }

    return (
        <div className="App">
            <Suspense fallback={<Preloader/>}>
                <Header/>
                <Navbar/>
                <div className="App-content">
                    <Routes>
                        <Route path={"/"} element={<Navigate to={"/profile"}/>}/>
                        <Route path={"/login"} element={<LoginForm/>}/>

                        <Route path={"/chat"} element={<Chat/>}/>
                        <Route path={"/profile/:userId?"} element={<Profile/>}/>
                        <Route path={"/news"} element={<News/>}/>
                        <Route path={"/messages"} element={<Dialogs/>}/>
                        <Route path={"/users"} element={<Users/>}/>
                        <Route path={"/music"} element={<Music/>}/>
                        <Route path={"/settings"} element={<Settings/>}/>
                    </Routes>
                </div>
            </Suspense>
        </div>
    )
};

export default App;
