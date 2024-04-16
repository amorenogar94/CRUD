import React, { useState } from 'react';
import './Home.css';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import UserTable from '../../components/userTable/UserTable';
import { EditUser } from '../../components/editUser/EditUser';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import useUserActions from '../../hooks/useUserActions';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

export const Home = () => {
	const [openDialog, setOpenDialog] = useState(false);
	const [editUser, setEditUser] = useState(null);
	const {
		data,
		loading,
		error,
		deleteUser,
		handleSubmitEditUser,
		snackbarOpen,
		snackbarSeverity,
		snackbarMessage,
		handleSnackbarClose,
	} = useUserActions();

	const navigate = useNavigate();

	const handleEditUser = (user) => {
		setEditUser(user);
		setOpenDialog(true);
	};

	const handleCloseDialog = () => {
		setEditUser(null);
		setOpenDialog(false);
	};

	const handleAddUserClick = () => {
		navigate('/add');
	};

	const handleEditUserSubmit = (editedUserData) => {
		handleSubmitEditUser(editedUserData);
		setOpenDialog(false);
	};

	return (
		<div>
			<AppBar position="static" color="default">
				<Toolbar>
					<Typography variant="h6" color="inherit">
						Test React
					</Typography>
				</Toolbar>
			</AppBar>
			<div className="home__content">
				<Paper>
					<div className="home__wrapper">
						<div className="home__header">
							<Typography
								variant="title"
								color="inherit"
								className="home__title"
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
						{loading && (
							<div className="home__loading">
								<CircularProgress />
							</div>
						)}
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
