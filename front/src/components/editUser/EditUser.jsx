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

	const {
		userData,
		handleChange,
		clearErrors,
		resetForm,
		validateForm,
		showSuccessMessage,
		showErrorMessage,
		snackbarOpen,
		snackbarMessage,
		snackbarSeverity,
		setSnackbarOpen,
	} = useFormValidation(initialUserData);

	const handleSubmit = async () => {
		if (!validateForm()) {
			return;
		}

		try {
			await onSubmit({ id: user.id, ...userData });
			showSuccessMessage('Usuario editado con éxito');
			resetForm();
			onClose();
		} catch (error) {
			console.error('Error al editar usuario:', error);
			showErrorMessage('Error al editar usuario');
		}
	};

	const handleCloseSnackbar = () => {
		clearErrors();
		setSnackbarOpen(false);
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
					message={snackbarMessage}
					style={{
						backgroundColor:
							snackbarSeverity === 'error' ? 'red' : 'green',
					}}
				/>
			</Snackbar>
		</Dialog>
	);
};
