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
	const [emailError, setEmailError] = useState('');
	const [snackbarOpen, setSnackbarOpen] = useState(false);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setUserData({
			...userData,
			[name]: value,
		});

		if (name === 'email') {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(value)) {
				setEmailError(
					'Por favor ingresa un correo electrónico válido.'
				);
			} else {
				setEmailError('');
			}
		}
	};

	const validateForm = () => {
		const { name, lastName, age, email } = userData;

		if (!name || !lastName || !age || !email) {
			setSnackbarOpen(true);
			setSuccessMessage('');
			return false;
		}

		if (emailError) {
			setSnackbarOpen(true);
			setSuccessMessage('');
			return false;
		}

		return true;
	};

	const handleSubmit = async () => {
		if (!validateForm()) {
			return;
		}

		try {
			await onSubmit(userData);
			setSuccessMessage('Usuario agregado con éxito');
			setSnackbarOpen(true);
			setUserData({
				name: '',
				lastName: '',
				age: '',
				email: '',
			});
		} catch (error) {
			console.error('Error al agregar usuario:', error);
			setSuccessMessage('');
		}
	};

	const clearErrors = () => {
		setEmailError('');
		setSuccessMessage('');
		setSnackbarOpen(false);
	};

	const handleCloseSnackbar = () => {
		setSnackbarOpen(false);
	};

	const handleCloseDialog = () => {
		clearErrors();
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
					required
				/>
				<TextField
					margin="dense"
					label="Apellido"
					name="lastName"
					value={userData.lastName}
					onChange={handleChange}
					fullWidth
					required
				/>
				<TextField
					margin="dense"
					label="Edad"
					name="age"
					type="number"
					value={userData.age}
					onChange={handleChange}
					fullWidth
					required
				/>
				<TextField
					margin="dense"
					label="Email"
					name="email"
					type="email"
					value={userData.email}
					onChange={handleChange}
					fullWidth
					required
					error={!!emailError}
					helperText={emailError}
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
			<Snackbar open={snackbarOpen} onClose={handleCloseSnackbar}>
				<SnackbarContent
					message={
						successMessage ||
						'Por favor completa todos los campos (*).'
					}
					style={{
						backgroundColor: successMessage ? 'green' : 'red',
					}}
				/>
			</Snackbar>
		</Dialog>
	);
};
