import React, { useState } from 'react';
import './Home.css';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import UserTable from '../userTable/UserTable';
import { AddUser } from '../addUser/AddUser';
import { EditUser } from '../editUser/EditUser';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import useUserActions from '../../hooks/useUserActions';

export const Home = () => {
	const [openDialog, setOpenDialog] = useState(false);
	const [editUser, setEditUser] = useState(null);
	const {
		data,
		loading,
		error,
		deleteUser,
		handleAddUser,
		handleSubmitEditUser,
		snackbarOpen,
		snackbarSeverity,
		snackbarMessage,
		handleSnackbarClose,
	} = useUserActions();

	const handleEditUser = (user) => {
		setEditUser(user);
		setOpenDialog(true);
	};

	const handleCloseDialog = () => {
		setEditUser(null);
		setOpenDialog(false);
	};

	const handleAddUserClick = () => {
		setOpenDialog(true);
	};

	const handleAddUserSubmit = (userData) => {
		handleAddUser(userData);
		setOpenDialog(false);
	};

	const handleEditUserSubmit = (editedUserData) => {
		handleSubmitEditUser(editedUserData);
		setOpenDialog(false);
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
								onClick={handleAddUserClick}
							>
								Agregar Usuario
							</Button>
						</div>
						<AddUser
							open={openDialog}
							onClose={handleCloseDialog}
							onSubmit={handleAddUserSubmit}
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
								onSubmit={handleEditUserSubmit}
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

export default Home;
