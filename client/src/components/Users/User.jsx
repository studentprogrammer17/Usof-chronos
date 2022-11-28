import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import route from '../../api/route';
import updateIcon from '../../assets/svg/pencil-square.svg';
import Button from 'react-bootstrap/Button';
import useAuth from '../../hooks/useAuth';
import SpinnerLoading from "../Other/Spinner";
import NavDropdown from 'react-bootstrap/NavDropdown';
const User = () => {
    const currentUser = JSON.parse(localStorage.getItem('autorized'));
    const navigate = useNavigate();

    const [login, setLogin] = useState();
    const [fullName, setFullName] = useState();
    const [email, setEmail] = useState();
    const [photo, setPhoto] = useState();
    const [roleId, setRoleId] = useState();
    const [role, setRole] = useState();
    const [selfProfile, setSelfProfile] = useState();
    const { search, pathname } = useLocation();
    const id = pathname.split('/');

    const { auth, setAuth } = useAuth();
    const [isLoading, setLoading] = useState(false);
    const LOGOUT = '/api/auth/logout/'
    const logout = async () => {
        try {
            setLoading(true)
            const response = await axios.post(LOGOUT + currentUser.accessToken);
            // console.log(response.data);
            localStorage.removeItem('autorized');
            setAuth(false);
            setLoading(false);
            navigate('/');

        }
        catch (e) {
            setLoading(false);
            navigate('/500');
        }
    }
    const getUserInfo = async () => {
        try {
            const response = await axios.get(`/api/users/${id[2]}`);
            // console.log('user', response);
            setSelfProfile(currentUser.userId === +id[2] ? true : false)
            setLogin(response.data.values.result.login);
            setFullName(response.data.values.result.full_name);
            setEmail(response.data.values.result.email);
            setPhoto(response.data.values.result.photo);
            setRoleId(response.data.values.result.role_id);
            const role = await axios.get(`/api/roles/${response.data.values.result.role_id}`);
            setRole(role.data.values.result[0].title)
        }
        catch (e) {
            console.log(e)
            navigate('/500');
        }
    }
    useEffect(() => {
        if (currentUser.currentUser !== 'guest') {
            getUserInfo();
        }
    }, []);

    return (
        <>
            <div className="form-background p-5 d-flex justify-content-center">
                <section className='bg-dark text-white rounded d-flex flex-column p-3 justify-content-center'>
                    <div className='d-flex justify-content-center align-items-center'>
                        <h2 className='m-2'>{login}</h2>
                        <p className='m-2 text-muted'>{role}</p>
                        <div className="ms-5">{selfProfile ?
                            <>
                            <NavDropdown title="Налаштунки" id="collasible-nav-dropdown">
								<NavDropdown.Item href="/change-profile">Редагувати профіль</NavDropdown.Item>
								<NavDropdown.Item href="/change-avatar">
									Редагувати аватар
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item className="text-danger" onClick={logout}>
                                {isLoading ? <SpinnerLoading /> : 'Вийти'}
								</NavDropdown.Item>
							</NavDropdown>
                                
                            </>
                            : <></>}</div>
                    </div>
                    <div className='d-flex'>
                        <div className='d-flex flex-column align-items-center'>
                            <img src={photo && photo !== 'undefined' && photo !== undefined ? `${route.serverURL}/avatars/${photo}` : `${route.serverURL}/avatars/default_avatar.png`} className='link-header border border-secondary' height={100} width={100} alt='avatar' />

                        </div>
                        <div className='d-flex flex-column'>
                            <p>Name: {fullName}</p>
                            <p>Email: {email}</p>

                        </div>
                      

                    </div>

                </section>
            </div>
        </>)
}

export default User;