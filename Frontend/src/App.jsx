import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/signUp/SignUp';
import { Toaster } from 'react-hot-toast';
import { Navigate, Route, Routes } from 'react-router-dom';
import { UseAuthContext } from './context/AuthContext';

function App() {
	const { authUser } = UseAuthContext();
	return (
		<>
			<div className='p-4 h-screen flex items-center justify-center'>
				<Routes>
					<Route
						path='/'
						element={authUser ? <Home /> : <Navigate to={'/login'} />}
					/>
					<Route
						path='/login'
						element={authUser ? <Navigate to='/' /> : <Login />}
					/>
					<Route
						path='/signup'
						element={authUser ? <Navigate to='/' /> : <SignUp />}
					/>
				</Routes>
				<Toaster />
			</div>
		</>
	);
}

export default App;
