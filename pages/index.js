import {useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import React from 'react';
import Image from 'next/image';
import InputBox from '@/components/input/inputbox.js';
import inputstyles from '@/components/input/input.module.css';
import style from '@/styles/body.module.css';

export default function Home({portfolio, isAuth}) {
  const [article, setArticle] = useState(null);
  const [email, setEmail] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/post', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        article: article,
        email: email,
        text: message 
      })
    })
    const mess = await response.json();
    alert(mess.message);
  }
  
  

  useEffect(() => {
    const pageEnd = document.getElementById('about').offsetTop;
    const chevron = document.getElementById('chevron');
    window.addEventListener("scroll", () => {
      if (document.documentElement.scrollTop >= pageEnd) {
        chevron.style.display = 'block';
      } else chevron.style.display = 'none';
    })
  },[]);

  const chevronScrolling = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
    <a className={style.chevron} id = 'chevron' onClick={chevronScrolling} href = 'body'><img src = 'chevron.svg'/></a>
      <div className={style.body}>
            <div className={style.body__main_content}>
              <div className={style.body__wrapper}>
                <h1>
                  <colortext> 
                    Разработка и поддержка <br/>
                    программных модулей
                  </colortext>
                  <hr/>
                </h1>
                <div className={style.main_text}>
                  Открывайте горизонты бизнеса вместе с NovaModules<br/> Инновационные решения для вашего успеха.
                </div>
              </div>
            </div>
            
            <div className={style.body__attachments} id = 'about'>
                <div className={style.body__wrapper}> 
                    <h1><colortext>О нас:</colortext></h1>
                    <hr className={style.hr1}/>
                    <br/>
                    Мы - команда программистов с большим опытом работы, которые занимаются созданием программных продуктов для клиентов из разных отраслей бизнеса.
                    Наша миссия - помогать компаниям повышать производительность, оптимизировать бизнес-процессы и экономить время и деньги благодаря нашим программным продуктам. 
                    У нас в команде работают эксперты в области программирования, которые обладают широкими знаниями и опытом для эффективного решения задач любой сложности. 
                    Мы готовы привнести разные инновационные идеи для каждого проекта, подходящие именно для Ваших потребностей. 
                    Команда NovaModules нацелена на долгосрочное планирование и стремится к сотрудничеству на взаимовыгодных условиях для достижения успеха вместе с нашими клиентами.
                </div>
            </div>
                
            <div className={style.body__portfolio} id = 'portfolio'>
              <div className={style.body__wrapper}>
                <h1><colortext>Наши работы</colortext></h1>
                <p>Станьте частью нашей истории!</p>
                <div className={style.image_holder}>
                  {portfolio.map((image) => (
                    getImages(image)
                  ))}
                </div>
              </div>
            </div>

            <div className={style.body__form} id = 'form'>
              <div className={style.body__wrapper}>
                <h1><colortext>Оставьте свою заявку</colortext></h1>
                <p>Мы ответим вам в течении 24 часов!</p>
                <hr1/>
                <form className = {inputstyles.form} name='form' onSubmit={handleSubmit}>
                  <InputBox text = 'Тема' id = 'article' event = {setArticle}/>
                  <InputBox text = 'Почта' id = 'email' event = {setEmail}/>
                  <div key = {2} className={inputstyles.input_box}>
                    <textarea id = 'message' autoComplete='off' required onChange = {(e) => {setMessage(e.target.value)}}/> 
                    <label htmlFor=''>Сообщение</label> 
                  </div>
                  <div key = {3} className={inputstyles.button_box}>
                    <button type = 'submit'>Отправить</button>
                  </div>
                </form>
              </div>
            </div>
        </div>
    </>
  )
}

import {Buffer} from 'buffer';

function getImages(data) {
  console.log(data);
  return (
    <Image 
      src = {"data:image/png;base64, " + data}
      width = {500}  
      height = {500}
      alt = "nothing"
      loading = "lazy"
    />
  )
}


import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient();

export async function getServerSideProps() {
  let data = {
    props: {
      portfolio: []
    }
  }
  await prisma.$connect()
  .then(async () => {
    const portfolio = await prisma.portfolio.findMany();
    let portfolioimgs = [];
    for (let i = 0; i < portfolio.length; i++) {
      portfolioimgs[i] = Buffer.from(portfolio[i]['image']).toString('base64');
    }
    data = {
      props: {
        portfolio: portfolioimgs
      }
    }
  }).catch((err) => {
    console.log(err);
    data = {
      props: {
        portfolio: []
      }
    }
  }).finally(() => {
    prisma.$disconnect();
  })
  return data;
}

