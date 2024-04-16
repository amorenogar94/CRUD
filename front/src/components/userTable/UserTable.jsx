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
	paperContainer: {
		minWidth: 'fit-content',
	},
});

const headers = [
	{ label: 'ID', align: 'center', field: 'id' },
	{ label: 'Nombre', align: 'center', field: 'name' },
	{ label: 'Apellido', align: 'center', field: 'lastName' },
	{ label: 'Edad', align: 'center', field: 'age' },
	{ label: 'Email', align: 'center', field: 'email' },
	{ label: 'Gestión', align: 'center', actions: true },
];

const UserTable = ({ users, onEdit, onDelete, classes }) => {
	return (
		<div className={classes.tableWrapper}>
			<Paper className={classes.paperContainer}>
				<Table className={classes.table} aria-label="user table">
					<TableHead>
						<TableRow>
							{headers.map((header, index) => (
								<TableCell key={index} align={header.align}>
									{header.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{users.map((user) => (
							<TableRow key={user.id}>
								{headers.map((header, index) => (
									<TableCell key={index} align={header.align}>
										{header.actions ? (
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
													onClick={() =>
														onDelete(user.id)
													}
												>
													<DeleteIcon />
												</IconButton>
											</div>
										) : (
											user[header.field]
										)}
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Paper>
		</div>
	);
};

export default withStyles(styles)(UserTable);
