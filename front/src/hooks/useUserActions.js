import { useState } from 'react';

const useUserActions = () => {
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [snackbarSeverity, setSnackbarSeverity] = useState('success');

	const deleteUser = async (id) => {
		try {
			const response = await fetch(`http://localhost:9090/users/${id}`, {
				method: 'DELETE',
			});
			if (!response.ok) {
				throw new Error('Error al eliminar usuario');
			}
			setSnackbarSeverity('success');
			setSnackbarMessage('Usuario eliminado con éxito');
			setSnackbarOpen(true);
		} catch (error) {
			console.error('Error al eliminar usuario:', error);
			setSnackbarSeverity('error');
			setSnackbarMessage('Error al eliminar usuario');
			setSnackbarOpen(true);
		}
	};

	const handleAddUser = async (userData) => {
		try {
			const response = await fetch('http://localhost:9090/users/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(userData),
			});
			if (!response.ok) {
				throw new Error('Error al agregar usuario');
			}
			setSnackbarSeverity('success');
			setSnackbarMessage('Usuario agregado con éxito');
			setSnackbarOpen(true);
		} catch (error) {
			console.error('Error al agregar usuario:', error);
			setSnackbarSeverity('error');
			setSnackbarMessage('Error al agregar usuario');
			setSnackbarOpen(true);
		}
	};

	const handleSubmitEditUser = async (editedUserData) => {
		try {
			const { id, ...userData } = editedUserData;
			const response = await fetch(`http://localhost:9090/users/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(userData),
			});
			if (!response.ok) {
				throw new Error('Error al editar usuario');
			}
			setSnackbarSeverity('success');
			setSnackbarMessage('Usuario editado con éxito');
			setSnackbarOpen(true);
		} catch (error) {
			console.error('Error al editar usuario:', error);
			setSnackbarSeverity('error');
			setSnackbarMessage('Error al editar usuario');
			setSnackbarOpen(true);
		}
	};

	const handleSnackbarClose = () => {
		setSnackbarOpen(false);
	};

	return {
		deleteUser,
		handleAddUser,
		handleSubmitEditUser,
		snackbarOpen,
		snackbarMessage,
		snackbarSeverity,
		handleSnackbarClose,
	};
};

export default useUserActions;
