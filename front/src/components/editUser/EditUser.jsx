import React, { useState, useEffect } from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	TextField,
	Snackbar,
	SnackbarContent,
} from '@material-ui/core';

export const EditUser = ({ user, open, onClose, onSubmit }) => {
	const initialUserData = user
		? {
				name: user.name || '',
				lastName: user.lastName || '',
				age: user.age || '',
				email: user.email || '',
		  }
		: {
				name: '',
				lastName: '',
				age: '',
				email: '',
		  };

	const [userData, setUserData] = useState(initialUserData);
	const [successMessage, setSuccessMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [snackbarOpen, setSnackbarOpen] = useState(false);

	useEffect(() => {
		if (user) {
			setUserData({
				name: user.name || '',
				lastName: user.lastName || '',
				age: user.age || '',
				email: user.email || '',
			});
		}
	}, [user]);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setUserData({
			...userData,
			[name]: value,
		});
	};

	const handleSubmit = async () => {
		try {
			await onSubmit({ id: user.id, ...userData });
			setSuccessMessage('Usuario editado con éxito');
			setErrorMessage('');
			setSnackbarOpen(true);
		} catch (error) {
			console.error('Error al editar usuario:', error);
			setErrorMessage('Error al editar usuario');
			setSuccessMessage('');
			setSnackbarOpen(true);
		}
	};

	const handleCloseSnackbar = () => {
		setSnackbarOpen(false);
	};

	const handleCloseDialog = () => {
		setUserData(initialUserData);
		onClose();
	};

	return (
		<Dialog
			open={open}
			onClose={handleCloseDialog}
			aria-labelledby="form-dialog-title"
		>
			<DialogTitle id="form-dialog-title">Editar Usuario</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					margin="dense"
					label="Nombre"
					name="name"
					value={userData.name}
					onChange={handleChange}
					fullWidth
				/>
				<TextField
					margin="dense"
					label="Apellido"
					name="lastName"
					value={userData.lastName}
					onChange={handleChange}
					fullWidth
				/>
				<TextField
					margin="dense"
					label="Edad"
					name="age"
					type="number"
					value={userData.age}
					onChange={handleChange}
					fullWidth
				/>
				<TextField
					margin="dense"
					label="Email"
					name="email"
					type="email"
					value={userData.email}
					onChange={handleChange}
					fullWidth
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleCloseDialog} color="primary">
					Cancelar
				</Button>
				<Button onClick={handleSubmit} color="primary">
					Guardar
				</Button>
			</DialogActions>
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
			>
				<SnackbarContent
					message={successMessage || errorMessage}
					style={{
						backgroundColor: successMessage ? 'green' : 'red',
					}}
				/>
			</Snackbar>
		</Dialog>
	);
};
