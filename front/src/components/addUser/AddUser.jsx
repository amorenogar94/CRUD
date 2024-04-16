import React, { useState, useEffect } from 'react';
import './AddUser.css';
import useFormValidation from '../../hooks/useFormValidation';
import {
	Button,
	TextField,
	Snackbar,
	SnackbarContent,
	Paper,
	Typography,
} from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
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
	const navigate = useNavigate();

	const [buttonDisabled, setButtonDisabled] = useState(false);

	const handleSubmit = async () => {
		if (!validateForm() || buttonDisabled) {
			return;
		}

		setButtonDisabled(true);

		try {
			await handleAddUser(userData);
			showSuccessMessage('Usuario agregado con éxito');
			resetForm();
			setTimeout(() => {
				setButtonDisabled(true);
				navigate('/');
			}, 1000);
		} catch (error) {
			console.error('Error al agregar usuario:', error);
			showErrorMessage('Error al agregar usuario');
		} finally {
			// setButtonDisabled(false);
		}
	};

	const handleCloseSnackbar = () => {
		clearErrors();
	};

	useEffect(() => {
		return () => {
			setButtonDisabled(false);
		};
	}, []);

	return (
		<div className="addUser__content">
			<Paper className="addUser__wrapper">
				<div className="addUser__header">
					<Typography
						variant="title"
						color="inherit"
						className="addUser__title"
					>
						Agregar usuario
					</Typography>
					<Link to="/">
						<Button color="primary">Volver</Button>
					</Link>
				</div>

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
				<div className="addUser__buttons">
					<Button
						onClick={handleSubmit}
						variant="contained"
						color="primary"
						disabled={buttonDisabled}
					>
						Agregar
					</Button>
					<Link to="/">
						<Button
							variant="contained"
							color="default"
							disabled={buttonDisabled}
						>
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
