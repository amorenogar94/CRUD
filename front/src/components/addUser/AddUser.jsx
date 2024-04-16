import React from 'react';
import useFormValidation from '../../hooks/useFormValidation';
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
	const initialUserData = {
		name: '',
		lastName: '',
		age: '',
		email: '',
	};

	const {
		userData,
		emailError,
		handleChange,
		validateForm,
		clearErrors,
		resetForm,
		snackbarOpen,
		snackbarMessage,
		snackbarSeverity,
		showSuccessMessage,
		showErrorMessage,
	} = useFormValidation(initialUserData);

	const handleSubmit = async () => {
		if (!validateForm()) {
			return;
		}

		try {
			await onSubmit(userData);
			showSuccessMessage('Usuario agregado con éxito');
			resetForm();
			onClose();
		} catch (error) {
			console.error('Error al agregar usuario:', error);
			showErrorMessage('Error al agregar usuario');
		}
	};

	const handleCloseSnackbar = () => {
		clearErrors();
	};

	const handleCloseDialog = () => {
		clearErrors();
		resetForm();
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
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
			>
				<SnackbarContent
					message={snackbarMessage}
					style={{
						backgroundColor:
							snackbarSeverity === 'success' ? 'green' : 'red',
					}}
				/>
			</Snackbar>
		</Dialog>
	);
};
