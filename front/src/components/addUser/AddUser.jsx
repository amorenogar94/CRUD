import React from 'react';
import './AddUser.css';
import useFormValidation from '../../hooks/useFormValidation';
import {
	Button,
	TextField,
	Snackbar,
	SnackbarContent,
	Paper,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import useUserActions from '../../hooks/useUserActions';

const AddUser = () => {
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

	const { handleAddUser } = useUserActions();

	const handleSubmit = async () => {
		if (!validateForm()) {
			return;
		}

		try {
			await handleAddUser(userData);
			showSuccessMessage('Usuario agregado con éxito');
			resetForm();
		} catch (error) {
			console.error('Error al agregar usuario:', error);
			showErrorMessage('Error al agregar usuario');
		}
	};

	const handleCloseSnackbar = () => {
		clearErrors();
	};

	return (
		<div className="content">
			<Paper className="wrapper">
				<h2>Agregar Usuario</h2>
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
				<div className="form-actions">
					<Button
						onClick={handleSubmit}
						variant="contained"
						color="primary"
					>
						Agregar
					</Button>
					<Link to="/" className="cancel-button">
						<Button variant="contained" color="default">
							Cancelar
						</Button>
					</Link>
				</div>
				<Snackbar
					open={snackbarOpen}
					autoHideDuration={6000}
					onClose={handleCloseSnackbar}
				>
					<SnackbarContent
						message={snackbarMessage}
						style={{
							backgroundColor:
								snackbarSeverity === 'success'
									? 'green'
									: 'red',
						}}
					/>
				</Snackbar>
			</Paper>
		</div>
	);
};

export default AddUser;
