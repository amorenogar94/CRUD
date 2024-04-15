import React from 'react';
import { useParams } from 'react-router-dom';

export const DeleteUser = () => {
	let { id } = useParams();

	return (
		<div>
			<h2>Eliminar Usuario</h2>
			<p>ID del usuario a eliminar: {id}</p>
		</div>
	);
};
