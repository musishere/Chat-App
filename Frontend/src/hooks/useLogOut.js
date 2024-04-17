import React from 'react';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { UseAuthContext } from '../context/AuthContext';

function handleLogOut() {
	const { setAuthUser } = UseAuthContext();
	const [loading, setLoading] = useState(false);
	const logOut = async () => {
		setLoading(true);
		try {
			const res = await fetch('/api/auth/logout', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
			});

			const data = res.json();

			if (data.error) {
				throw new Error(data.error);
			}

			localStorage.removeItem('chat-user');
			setAuthUser(null);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, logOut };
}

export default handleLogOut;
