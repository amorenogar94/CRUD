import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../components/home/Home';
import { AddUser } from '../components/addUser/AddUser';

const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/add" element={<AddUser />} />
		</Routes>
	);
};

export default AppRoutes;
