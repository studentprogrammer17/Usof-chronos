import '../css/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './Auth/Layout';
import NotFound from './Errors/NotFound';
import RequreAuth from './Auth/RequireAuth';
import ServerError from './Errors/ServerError';
import Login from './Auth/Login';
import Register from './Auth/Register';
import ResetPassword from './Auth/ResetPassword';
import ResetPasswordWT from './Auth/ResetPasswordWT';
import Calendar from './Calendar/Calendar';
import ConfirmEmail from './Auth/ConfirmEmail';
import User from './Users/User';
import ChangeUserAvatar from './Users/ChangeAvatar'
import ChangeProfile from './Users/ChangeProfile';
import Unauthorized from './Auth/Unauthorized';
import About from './Other/About';
function App() {
	if (!localStorage.getItem('autorized')) {
		localStorage.setItem(
			'autorized',
			JSON.stringify({ currentUser: 'guest' })
		);
	}
	return (
		<Routes>
			<Route path="/" element={<Layout />} >
				{/* Auth module */}
				
				<Route path='login' element={<Login />} />
				<Route path='registration' element={<Register />} />
				<Route path="confirm-email/:token" element={<ConfirmEmail />} />
				<Route path='reset-password' element={<ResetPassword />} />
				<Route path='reset-password/:token' element={<ResetPasswordWT />} />
				<Route path='unauthorized' element={<Unauthorized />} />
				<Route path='about' element={<About />} />
				{/* only authorized users */}
				<Route element={<RequreAuth allowedRoles={['user', 'admin']} />} >
					<Route path='/' element={<NotFound />} />
					<Route path='calendar' element={<Calendar />} />
					<Route path='user/:id' element={<User />} />
					<Route path='change-avatar' element={<ChangeUserAvatar />} />
					<Route path='change-profile' element={<ChangeProfile />} />
				</Route>
				<Route element={<RequreAuth allowedRoles={['admin']} />} >
				</Route>
				<Route path="*" element={<NotFound />} />
				<Route path='500' element={<ServerError />} />
			</Route>
		</Routes>
	);
}

export default App;
