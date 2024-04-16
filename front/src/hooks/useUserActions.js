import { useEffect, useState } from 'react';

const useUserActions = () => {
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [snackbarSeverity, setSnackbarSeverity] = useState('success');
	const [data, setData] = useState(null);

	const fetchData = async () => {
		try {
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
		}
	};

	const handleAction = async (url, method, body, successMessage) => {
		try {
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
		fetchData();
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
	};
};

export default useUserActions;
