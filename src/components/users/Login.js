import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        console.log("Отправляемые данные:", JSON.stringify(data, null, 2));

        try {
            await axios.post(
                'http://127.0.0.1:8000/login/',
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            reset();
            navigate('/catalog');
        } catch (error) {
            console.error('Ошибка:', error.response ? error.response.data : error.message);
            alert("Возникла ошибка при авторизации.");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="login">Логин:</label>
                    <input {...register("login", { required: true })} placeholder="Ваш логин или почта" />
                    {errors.login && <span style={{ color: "red" }}>Это поле обязательно!</span>}
                </div>

                <div>
                    <label htmlFor="password">Пароль:</label>
                    <input {...register("password", { required: true })} type="password" placeholder="Ваш пароль" />
                    {errors.password && <span style={{ color: "red" }}>Это поле обязательно!</span>}
                </div>

                <button type="submit">Войти</button>
            </form>
            <Link to='/register'>Ещё не регистрировались?</Link>
        </div>
    )
}

export default LoginForm;