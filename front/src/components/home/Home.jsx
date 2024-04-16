import React, { useState, useEffect } from 'react';
import './Home.css';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import { useFetch } from '../../hooks/useFetch';
import UserTable from '../userTable/UserTable';
import { AddUser } from '../addUser/AddUser';
import { EditUser } from '../editUser/EditUser';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

export const Home = () => {
	const [openDialog, setOpenDialog] = useState(false);
	const [editUser, setEditUser] = useState(null);
	const { data, loading, error, setShouldFetchData } = useFetch(
		'http://localhost:9090/users/',
		'GET'
	);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [snackbarSeverity, setSnackbarSeverity] = useState('success');

	// useEffect(() => {
	// 	if (window.location.pathname === '/add') {
	// 		setOpenDialog(true);
	// 	}
	// }, []);

	const deleteUser = async (id) => {
		try {
			const response = await fetch(`http://localhost:9090/users/${id}`, {
				method: 'DELETE',
			});
			if (!response.ok) {
				throw new Error('Error al eliminar usuario');
			}
			setShouldFetchData(true);
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
			setShouldFetchData(true);
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
			setShouldFetchData(true);
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

	const handleEditUser = (user) => {
		setEditUser(user);
		setOpenDialog(true);
	};

	const handleCloseDialog = () => {
		setEditUser(null);
		setOpenDialog(false);
	};

	const handleSnackbarClose = () => {
		setSnackbarOpen(false);
	};

	return (
		<div className="home">
			<AppBar position="static" color="default">
				<Toolbar>
					<Typography variant="h6" color="inherit">
						Test React
					</Typography>
				</Toolbar>
			</AppBar>
			<div className="content">
				<Paper>
					<div className="wrapper">
						<div className="header">
							<Typography
								variant="title"
								color="inherit"
								className="title"
							>
								Listado de usuarios
							</Typography>
							<Button
								color="primary"
								variant="contained"
								onClick={() => setOpenDialog(true)}
							>
								Agregar Usuario
							</Button>
						</div>
						<AddUser
							open={openDialog}
							onClose={handleCloseDialog}
							onSubmit={handleAddUser}
						/>
						{loading && <p>Loading...</p>}
						{error && <p>{error.message}</p>}
						{data && (
							<UserTable
								users={data}
								onEdit={handleEditUser}
								onDelete={deleteUser}
							/>
						)}
						{editUser && (
							<EditUser
								user={editUser}
								open={openDialog}
								onClose={handleCloseDialog}
								onSubmit={handleSubmitEditUser}
							/>
						)}
						<Snackbar
							open={snackbarOpen}
							autoHideDuration={6000}
							onClose={handleSnackbarClose}
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
					</div>
				</Paper>
			</div>
		</div>
	);
};
