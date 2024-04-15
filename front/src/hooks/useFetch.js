import { useState, useEffect } from 'react';

export function useFetch(url, method = 'GET') {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [controller, setController] = useState(null);
	const [shouldFetchData, setShouldFetchData] = useState(true);

	const fetchData = async () => {
		setLoading(true);
		try {
			const abortController = new AbortController();
			setController(abortController);

			const response = await fetch(url, {
				method: method,
				signal: abortController.signal,
			});
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			const json = await response.json();
			setData(json);
		} catch (error) {
			if (error.name === 'AbortError') {
				console.log('Cancelled request');
			} else {
				setError(error);
			}
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (shouldFetchData) {
			fetchData();
			setShouldFetchData(false);
		}

		return () => {
			if (controller) {
				controller.abort();
			}
		};
	}, [url, method, shouldFetchData]);

	const handleCancelRequest = () => {
		if (controller) {
			controller.abort();
			setError('Cancelled Request');
		}
	};

	return {
		data,
		loading,
		error,
		fetchData,
		setShouldFetchData,
		handleCancelRequest,
	};
}
