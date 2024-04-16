import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = (theme) => ({
	table: {
		minWidth: 650,
	},
	tableWrapper: {
		overflowX: 'auto',
	},
	actionCell: {
		display: 'inline-flex',
		justifyContent: 'center',
	},
});

const UserTable = ({ users, onEdit, onDelete, classes }) => {
	return (
		<div className={classes.tableWrapper}>
			<Paper>
				<Table className={classes.table} aria-label="user table">
					<TableHead>
						<TableRow>
							<TableCell align="center">ID</TableCell>
							<TableCell align="center">Name</TableCell>
							<TableCell align="center">Last Name</TableCell>
							<TableCell align="center">Age</TableCell>
							<TableCell align="center">Email</TableCell>
							<TableCell align="center">Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users.map((user) => (
							<TableRow key={user.id}>
								<TableCell align="center">{user.id}</TableCell>
								<TableCell align="center">
									{user.name}
								</TableCell>
								<TableCell align="center">
									{user.lastName}
								</TableCell>
								<TableCell align="center">{user.age}</TableCell>
								<TableCell align="center">
									{user.email}
								</TableCell>
								<TableCell align="center">
									<div className={classes.actionCell}>
										<IconButton
											color="primary"
											aria-label="edit user"
											onClick={() => onEdit(user)}
										>
											<EditIcon />
										</IconButton>
										<IconButton
											color="secondary"
											aria-label="delete user"
											onClick={() => onDelete(user.id)}
										>
											<DeleteIcon />
										</IconButton>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Paper>
		</div>
	);
};

export default withStyles(styles)(UserTable);
