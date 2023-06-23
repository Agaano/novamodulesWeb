import style from '@/styles/login.module.css';
import InputBox from '@/components/input/inputbox';
import inputStyles from '@/components/input/input.module.css';
import { ButtonBox } from '@/components/input/inputbox';
import Cookies from 'js-cookie';
import {useState} from 'react';
import Router from 'next/router';

export default function() {
    const [login, setLogin] = useState(null);
    const [password, setPassword] = useState(null);
    const [repeatPassword, setRepeatPassword] = useState(null);

    async function handleSignup(event) {
        event.preventDefault();

        if (/[\u0400-\u04FF]/.test(password) || /[\u0400-\u04FF]/.test(login)) {
            alert('Пароль и логин должны состоять из латинских букв!')
            return;
        }

        if (password !== repeatPassword) {
            alert('Пароли не совпадают!');
            return;
        }

        const response = await fetch('./api/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({login, password})
        });
        if (response.ok) {
            Cookies.set('auth', 'true', {expires: 7});
            Cookies.set('_ln', btoa(login), {expires: 7});
            Cookies.set('_pd', btoa(password), {expires: 7});

            Router.push('/');
        } else {
            alert('Такой пользователь уже существует!');
        }
    }

    return (
        <>
            <div className = {style.login__wrapper}>
                <div className = {style.form__wrapper}>
                    <h1><colortext>Регистрация</colortext></h1>
                    <form className={inputStyles.form} onSubmit={handleSignup}>
                        <InputBox text = 'Логин' event = {setLogin} id = 'login'/>
                        <InputBox text = 'Пароль' event = {setPassword} id = 'password' isPassword/>
                        <InputBox text = '' event = {setRepeatPassword} id = 'repeatPassword' isPassword/>
                        <p className={inputStyles.form__text}>Уже есть аккаунт? <a href = '/login'>Войти</a></p>
                        <ButtonBox text = 'Зарегистрироваться'/>
                    </form>
                </div>
            </div>
        </>
    )
}