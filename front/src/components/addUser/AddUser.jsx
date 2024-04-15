import React, { useState } from 'react';
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

export const AddUser = ({ open, onClose, onSubmit }) => {
	const [userData, setUserData] = useState({
		name: '',
		lastName: '',
		age: '',
		email: '',
	});
	const [successMessage, setSuccessMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [snackbarOpen, setSnackbarOpen] = useState(false);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setUserData({
			...userData,
			[name]: value,
		});
	};

	const handleSubmit = async () => {
		try {
			await onSubmit(userData);
			setSuccessMessage('Usuario agregado con éxito');
			setErrorMessage('');
			setSnackbarOpen(true);
			setUserData({
				name: '',
				lastName: '',
				age: '',
				email: '',
			});
		} catch (error) {
			console.error('Error al agregar usuario:', error);
			setErrorMessage('Error al agregar usuario');
			setSuccessMessage('');
			setSnackbarOpen(true);
		}
	};

	const handleCloseSnackbar = () => {
		setSnackbarOpen(false);
	};

	const handleCloseDialog = () => {
		setUserData({
			name: '',
			lastName: '',
			age: '',
			email: '',
		});
		onClose();
	};

	return (
		<Dialog
			open={open}
			onClose={handleCloseDialog}
			aria-labelledby="form-dialog-title"
		>
			<DialogTitle id="form-dialog-title">Agregar Usuario</DialogTitle>
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
					Agregar
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
