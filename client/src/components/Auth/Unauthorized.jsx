import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
const Unauthorized = () => {

    const navigate = useNavigate();

    const goBack = () => navigate(-1);
    return (
        <div className="form-background p-5 d-flex justify-content-center">
            <section className="login bg-dark text-white rounded d-flex flex-column p-3 justify-content-center">
                <h3 className="text-center">У доступі відмовлено</h3>
                <p>Скоріш за все ви не авторизовані, або намагаєтесь потрапити на стрінку з адмінськими функціями без доступу</p>
                <div className="d-flex justify-content-around">
                    <Button className=" rounded mt-4" variant="secondary" onClick={() => navigate('/login')}>Вхід</Button>
                    <Button  className=" rounded mt-4" variant="secondary" onClick={goBack}>Назад</Button>
                </div>
            </section>
        </div>
    )
}

export default Unauthorized;