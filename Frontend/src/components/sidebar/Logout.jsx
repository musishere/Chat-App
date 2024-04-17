import handleLogOut from '../../hooks/useLogOut';
import { BiLogOut } from 'react-icons/bi';

const LogoutButton = () => {
	const { loading, logOut } = handleLogOut();

	return (
		<div className='mt-auto'>
			{!loading ? (
				<BiLogOut
					className='w-6 h-6 text-white cursor-pointer'
					onClick={logOut}
				/>
			) : (
				<span className='loading loading-spinner'></span>
			)}
		</div>
	);
};
export default LogoutButton;
