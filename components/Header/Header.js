import React from 'react'
import Link from 'next/link'
import style from '@/styles/header.module.css'
import Cookies from 'js-cookie';
import Router from 'next/router';

function MyComponent({isAuth, login}) {
    console.log(isAuth);
    console.log(login);
    function goTo(event) {
        event.preventDefault();
        const link = event.target.getAttribute('href');
        const obj = document.getElementById(link);
        window.scrollTo({
            top: obj.offsetTop,
            behavior: 'smooth'
        });
    }

    function logPanel() {
        return (
            <div className = {style.info}>
                    <ul>
                        <li><Link href = '/signup'>Зарегистрироваться</Link></li>
                        <li>|</li>
                        <li><Link href = '/login'>Войти</Link></li>
                    </ul>
            </div>
        )
    }

    function logOut(event) {
        event.preventDefault();

        Cookies.remove('auth');
        Cookies.remove('_ln');
        Cookies.remove('_pd');

        Router.reload();
    }

    function profilePanel() {
        return (
            <div className = {style.info}>
                    <ul>
                        <li>
                            {login}
                        </li>
                        <li>
                            <a onClick = {logOut} href = '/'>Выйти</a>
                        </li>
                    </ul>
            </div>
        )
    }

    return (
        <header className={style.header}>
            <div className = {style.header__wrapper}>
                <a className = {style.logo} href = "/">
                    <img src = 'logo.svg' alt = ''/>
                    <span>NovaModules</span>
                </a>
                <nav>
                    <ul>
                        <li><a onClick={goTo} href = 'about'>О нас</a></li>
                        <li><a onClick={goTo} href = 'portfolio'>Портфолио</a></li>
                        <li><a onClick={goTo} href = 'form' >Оставить заявку</a></li>
                    </ul>
                </nav>
                {isAuth ? profilePanel(): logPanel()}
            </div>
        </header>
    );
}

export default MyComponent;