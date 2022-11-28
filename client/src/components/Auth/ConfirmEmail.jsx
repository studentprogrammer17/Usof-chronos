import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from '../../api/axios';

const URL = `/api/auth/active/`;

const ConfirmEmail = () => {
    const { token } = useParams();
    const [active, setActive] = useState('Зараз чекаємо на активацію пошти');
    const navigate = useNavigate();
    useEffect(() => {
        const fetch = async () => {
            try {
                await axios.get(URL + token);
                setActive("Активація пошти успішна, ви зможете залогінитись через декілька секунд");
                setTimeout(() => navigate('/login'), 5000);
            }
            catch (e) {
                setActive("Скоріш за все, ви не встигли активувати пошту. Спробуйте знову");
                setTimeout(() => navigate('/registration'), 5000);

            }

        }
        fetch();

    }, []);
    return (
        <div className="form-background p-5 d-flex justify-content-center">
            <section className="email-reg text-white">
                <h1 className="text-center">Результат реєстрації</h1>
                <p className="text-center">{active}</p>
            </section>
        </div>
    )
}

export default ConfirmEmail;