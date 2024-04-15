import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../components/home/Home';

import { EditUser } from '../components/editUser/EditUser';
import { AddUser } from '../components/addUser/AddUser';

const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/add" element={<AddUser />} />
			<Route path="/user/:id/edit" element={<EditUser />} />
			<Route path="/user/:id" element={<EditUser />} />
		</Routes>
	);
};

export default AppRoutes;
