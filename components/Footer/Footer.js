import style from '@/styles/footer.module.css'
import {useRouter} from 'next/router'
import headerStyle from '@/styles/header.module.css'

const Footer = () => {
    const router = useRouter();
    function goTo(event) {
        event.preventDefault();
        if (router.pathname !== '/') {
            router.push('/#' + event.target.getAttribute('href'));
            return;
        }
        const link = event.target.getAttribute('href');
        const obj = document.getElementById(link);
        window.scrollTo({
            top: obj.offsetTop,
            behavior: 'smooth'
        });
    }

    return (
        <footer>
            <div className = {style.footer__wrapper}>
                <a className = {headerStyle.logo} href = "/">
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
                <div className = {headerStyle.info}>
                    +7 (962) 438-62-47
                </div>
            </div>
        </footer>
    );
}


export default Footer; 