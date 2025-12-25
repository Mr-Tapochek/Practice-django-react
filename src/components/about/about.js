import img1 from "./static/img1.jpg"
import img2 from "./static/img2.jpg"
import img3 from "./static/img3.jpg"
import React from "react";
import "./about.scss";

const About = () => {
    return (
        <div className="about-container">
            <h1 className="about-title">О нас</h1>

            <div className="about-intro">
                <h2>Уютный очаг - ваш дом начинается с нас!</h2>
                <p>Мы создаем уют и комфорт в вашем доме с 2010 года. Каждая наша мебель - это сочетание качества, стиля и функциональности.</p>
            </div>

            <div className="cards-container">
                <div className="about-card">
                    <div className="card-image">
                        <img src={img1} alt="Дизайн" />
                    </div>
                    <div className="card-content">
                        <h3>Дизайн</h3>
                        <p>Наши дизайнеры
                            <br />
                            Команда опытных профессионалов с индивидуальным подходом к каждому проекту и использующих современные технологии.</p>
                    </div>
                </div>

                <div className="about-card">
                    <div className="card-image">
                        <img src={img2} alt="Поставщики" />
                    </div>
                    <div className="card-content">
                        <h3>Поставщики</h3>
                        <p>Проверенные поставщики
                            <br />
                            Работаем исключительно с ведущими брендами, обеспечивающими высокое качество материалов и мебели.</p>
                    </div>
                </div>

                <div className="about-card">
                    <div className="card-image">
                        <img src={img3} alt="Надежность" />
                    </div>
                    <div className="card-content">
                        <h3>Надежность</h3>
                        <p>С 2007 г на рынке
                            <br />
                            За 18 лет успешной работы реализовано множество проектов разного уровня, заслуживших доверие клиентов и партнеров.</p>
                    </div>
                </div>
            </div>

            <div className="contacts-section">
                <h2>Контакты</h2>

                <div className="contacts-grid">
                    <div className="contact-item">
                        <div className="contact-info">
                            <h4>Телефон</h4>
                            <p>8 (800) 123-45-67</p>
                            <p>8 (900) 987-65-43</p>
                        </div>
                    </div>

                    <div className="contact-item">
                        <div className="contact-info">
                            <h4>Адрес</h4>
                            <p>г. Ульяновск, ул. Мебельная, д. 15</p>
                            <p>ТЦ "Альянс", 2 этаж</p>
                        </div>
                    </div>

                    <div className="contact-item">
                        <div className="contact-info">
                            <h4>Почта</h4>
                            <p>uyutniochag73@mail.ru</p>
                            <p>uyutniochag@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default About;