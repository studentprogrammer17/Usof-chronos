// import { useState } from 'react';
// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import useAuth from '../../hooks/useAuth';
import logo from '../../assets/images/icon.png'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import route from '../../api/route';
import CalendarModal from '../Calendar/CalendarModal';


const checkToken = async (token, setAuth) => {
	try {
		const response = await axios.get(`/api/users/check-token/${token}`);
		console.log(response.data.status, response.data.values.message);
	}
	catch (e) {
		// console.log(e);
		if (e?.response.data.status === 401) {
			localStorage.removeItem('autorized');
			setAuth(false);
		}
	}
}
const Header = () => {
	const { auth, setAuth } = useAuth();
	const navigate = useNavigate();
	const currentUser = JSON.parse(localStorage.getItem('autorized'));
	// console.log(currentUser);
	const [isLoading, setLoading] = useState(false);
	const [userAvatar, setUserAvatar] = useState();
	const [modalOpen, setModalOpen] = useState(false);


	useEffect(() => {
		if (currentUser.currentUser !== 'guest') {
			if (auth) {
				checkToken(currentUser.accessToken, setAuth);
				if (currentUser) {
					setAuth({ ...currentUser });
				} else {
					setAuth(false);
				}
			}
		}
	}, []);
	const getUserInfo = async () => {
		try {
			const response = await axios.get(`/api/users/${currentUser.userId}`);
			// console.log('userAvatar', response);
			setUserAvatar(response.data.values.result.photo);
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
		<div>
			<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
				<Container >
					<img src={logo} height={40} alt='logo' />
					<Navbar.Brand href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" target={'_blank'}>Chronos</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link href="/calendar">Календар</Nav.Link>
							<Nav.Link href="/about">Розробники</Nav.Link>
							<NavDropdown title="Дії" id="collasible-nav-dropdown">
								<NavDropdown.Item onClick={() => setModalOpen(true)} href="">Створити календар</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item className="text-danger" href="https://birds-attack.web.app/">
									Тут пріколи
								</NavDropdown.Item>
							</NavDropdown>
						</Nav>
						<Nav>
							{auth.user ?
								<>
									<div className='d-flex align-items-center'>
										<div className='d-flex '>
											<Nav.Link className='link-header' href={`/user/${currentUser.userId}`}>{currentUser.user}</Nav.Link>
											<img src={userAvatar && userAvatar !== 'undefined' && userAvatar !== undefined ? `${route.serverURL}/avatars/${userAvatar}` : `${route.serverURL}/avatars/default_avatar.png`} className='link-header border border-secondary rounded-circle' height={40} width={40} alt='avatar' />
										</div>
											

									</div>
								</>
								:
								<>
									<Nav.Link href="/login">Вхід</Nav.Link>
									<Nav.Link eventKey={2} href="/registration">
										Реєстрація
									</Nav.Link>
								</>}

						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>


			<CalendarModal
				isOpen={modalOpen}
				closeModal={() => setModalOpen(false)}
				event={{
					title: '',
				}}
			/>
		</div>
	)
}
export default Header;