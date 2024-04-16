import { useEffect, useState } from 'react';

const useUserActions = () => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarSeverity, setSnackbarSeverity] = useState('success');

	const fetchData = async () => {
		try {
			setLoading(true);
			const response = await fetch('http://localhost:9090/users/', {
				method: 'GET',
			});
			if (!response.ok) {
				throw new Error('Error fetching data');
			}
			const jsonData = await response.json();
			setData(jsonData);
		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleAction = async (url, method, body, successMessage) => {
		try {
			setLoading(true);
			const options = {
				method: method,
				headers: {
					'Content-Type': 'application/json',
				},
			};

			if (body) {
				options.body = JSON.stringify(body);
			}

			const response = await fetch(url, options);
			if (!response.ok) {
				throw new Error(
					`Error ${method === 'GET' ? 'fetching' : 'updating'} data`
				);
			}
			if (successMessage) {
				setSnackbarSeverity('success');
				setSnackbarMessage(successMessage);
				setSnackbarOpen(true);
			}
		} catch (error) {
			console.error(
				`Error ${method === 'GET' ? 'fetching' : 'updating'} data:`,
				error
			);
			setSnackbarSeverity('error');
			setSnackbarMessage(
				`Error ${method === 'GET' ? 'fetching' : 'updating'} data`
			);
			setSnackbarOpen(true);
		} finally {
			setLoading(false);
		}
	};

	const deleteUser = async (id) => {
		await handleAction(
			`http://localhost:9090/users/${id}`,
			'DELETE',
			null,
			'Usuario eliminado con éxito'
		);
		fetchData();
	};

	const handleAddUser = async (userData) => {
		await handleAction(
			'http://localhost:9090/users/',
			'POST',
			userData,
			'Usuario agregado con éxito'
		);
	};

	const handleSubmitEditUser = async (editedUserData) => {
		const { id, ...userData } = editedUserData;
		await handleAction(
			`http://localhost:9090/users/${id}`,
			'PUT',
			userData,
			'Usuario editado con éxito'
		);
		fetchData();
	};

	const handleSnackbarClose = () => {
		setSnackbarOpen(false);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return {
		deleteUser,
		handleAddUser,
		handleSubmitEditUser,
		snackbarOpen,
		snackbarMessage,
		snackbarSeverity,
		handleSnackbarClose,
		data,
		loading,
	};
};

export default useUserActions;
