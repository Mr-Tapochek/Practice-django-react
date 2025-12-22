import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const RegistrationForm = () => {
    const navigate = useNavigate();

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        if (!data.agree_to_terms) {
            return;
        }

        delete data.agree_to_terms;

        console.log("Отправляемые данные:", JSON.stringify(data, null, 2));
        try {
            await axios.post(
                'http://127.0.0.1:8000/register/',
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            reset();
            navigate('/login');
        } catch (error) {
            console.error('Ошибка:', error.response ? error.response.data : error.message);
            alert("Возникла ошибка при регистрации.");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="username">Логин:</label>
                    <input {...register("username", { required: true })} placeholder="Логин" />
                    {errors.username && <span style={{ color: "red" }}>Это поле обязательно!</span>}
                </div>

                <div>
                    <label htmlFor="nickname">Никнейм:</label>
                    <input {...register("nickname", { required: true, maxLength: 50 })} placeholder="Никнейм" />
                    {errors.nickname && <span style={{ color: "red" }}>
                        {errors.nickname.type === "required" ? "Обязательно заполнить" : "Максимальная длина 50 символов"}</span>}
                </div>

                <div>
                    <label htmlFor="firstName">Имя:</label>
                    <input {...register("first_name", { required: true, pattern: /^[а-яё]+$/i })} placeholder="Имя" />
                    {errors.first_name && <span style={{ color: "red" }}>
                        {errors.first_name.type === "pattern" ? "Допустимы только русские буквы" : "Обязательно заполнить"}</span>}
                </div>

                <div>
                    <label htmlFor="lastName">Фамилия:</label>
                    <input {...register("last_name", { required: true, pattern: /^[а-яё]+$/i })} placeholder="Фамилия" />
                    {errors.last_name && <span style={{ color: "red" }}>
                        {errors.last_name.type === "pattern" ? "Допустимы только русские буквы" : "Обязательно заполнить"}</span>}
                </div>

                <div>
                    <label htmlFor="patronymic">Отчество:</label>
                    <input {...register("patronymic", { pattern: /^[а-яё]*$/i })} placeholder="Отчество" />
                    {errors.patronymic && <span style={{ color: "red" }}>
                        {errors.patronymic.type === "pattern" ? "Допустимы только русские буквы" : ""}</span>}
                </div>

                <div>
                    <label htmlFor="gender">Пол:</label>
                    <select {...register("gender")}>
                        <option value="">Выберите</option>
                        <option value="male">Мужской</option>
                        <option value="female">Женский</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="email">E-mail:</label>
                    <input {...register("email", { required: true })} placeholder="E-mail" />
                    {errors.email && <span style={{ color: "red" }}>Обязательно заполнить</span>}
                </div>

                <div>
                    <label htmlFor="phoneNumber">Телефон:</label>
                    <input {...register("phone_number", { required: true })} placeholder="8XXXXXXXXXX" />
                    {errors.phone_number && <span style={{ color: "red" }}>Обязательно заполнить</span>}
                </div>

                <div>
                    <label htmlFor="password">Пароль:</label>
                    <input {...register("password", { required: true })} type="password" placeholder="Пароль" />
                    {errors.password && <span style={{ color: "red" }}>Обязательно заполнить</span>}
                </div>

                <div>
                    <label>
                        <input {...register("agree_to_terms", { required: true })} type="checkbox" />
                        Я согласен с обработкой моих персональных данных.
                    </label>
                    {errors.agree_to_terms && <span style={{ color: "red" }}>Необходимо подтвердить согласие</span>}
                </div>

                <button type="submit">Зарегистрироваться</button>
            </form>
            <Link to='/login'>Уже регистрировались?</Link>
        </div>
    );
};

export default RegistrationForm;