import { useState } from 'react';

const useFormValidation = (initialUserData) => {
	const [userData, setUserData] = useState(initialUserData);
	const [emailError, setEmailError] = useState('');
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [snackbarSeverity, setSnackbarSeverity] = useState('error');

	const handleChange = (event) => {
		const { name, value } = event.target;
		setUserData({
			...userData,
			[name]: value,
		});

		if (name === 'email') {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(value)) {
				setEmailError(
					'Por favor ingresa un correo electrónico válido.'
				);
			} else {
				setEmailError('');
			}
		}
	};

	const validateForm = () => {
		const { name, lastName, age, email } = userData;

		if (!name || !lastName || !age || !email) {
			setSnackbarMessage('Por favor completa todos los campos (*)');
			setSnackbarSeverity('error');
			setSnackbarOpen(true);
			return false;
		}

		if (emailError) {
			setSnackbarMessage(emailError);
			setSnackbarSeverity('error');
			setSnackbarOpen(true);
			return false;
		}

		return true;
	};

	const clearErrors = () => {
		setEmailError('');
		setSnackbarOpen(false);
	};

	const resetForm = () => {
		setUserData(initialUserData);
	};

	const showSuccessMessage = (message) => {
		setSnackbarMessage(message);
		setSnackbarSeverity('success');
		setSnackbarOpen(true);
	};

	const showErrorMessage = (message) => {
		setSnackbarMessage(message);
		setSnackbarSeverity('error');
		setSnackbarOpen(true);
	};

	return {
		userData,
		emailError,
		handleChange,
		validateForm,
		clearErrors,
		resetForm,
		showSuccessMessage,
		showErrorMessage,
		snackbarOpen,
		snackbarMessage,
		snackbarSeverity,
		setSnackbarOpen,
	};
};

export default useFormValidation;
