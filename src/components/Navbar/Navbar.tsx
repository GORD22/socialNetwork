import React, {FC} from 'react'
import style from './Navbar.module.css'
import NavbarControl from '../common/NavbarControl/NavbarControl'

const profile_icon: string = require('../../assets/img/navbar/profile_icon.svg').default
const news_icon: string = require('../../assets/img/navbar/news_icon.svg').default
const dialogs_icon: string = require('../../assets/img/navbar/dialogs_icon.svg').default
const users_icon: string = require('../../assets/img/navbar/users_icon.svg').default
const music_icon: string = require('../../assets/img/navbar/music_icon.svg').default
const settings_icon: string = require('../../assets/img/navbar/settings_icon.svg').default
const chat_icon: string = require('../../assets/img/navbar/chat_icon.svg').default

const Navbar: FC = () => {
    return (
        <div className={style.navbar}>
            <NavbarControl style={style} icon={profile_icon} element={'Profile'}/>
            <NavbarControl style={style} icon={news_icon} element={'News'}/>
            <NavbarControl style={style} icon={chat_icon} element={'Chat'}/>
            <NavbarControl style={style} icon={dialogs_icon} element={'Messages'}/>
            <NavbarControl style={style} icon={users_icon} element={'Users'}/>
            <NavbarControl style={style} icon={music_icon} element={'Music'}/>
            <NavbarControl style={style} icon={settings_icon} element={'Settings'}/>
        </div>
    )
}

export default Navbar