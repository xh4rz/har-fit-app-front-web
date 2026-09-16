import { useEffect, useState } from 'react';

export const useTimer = (startedAt: number | null) => {
	const calculateTimer = () =>
		startedAt ? Math.floor((Date.now() - startedAt) / 1000) : 0;

	const [elapsedSeconds, setElapsedSeconds] = useState(calculateTimer);

	const minutes = Math.floor(elapsedSeconds / 60);

	const seconds = elapsedSeconds % 60;

	useEffect(() => {
		if (!startedAt) return;

		const interval = setInterval(() => {
			setElapsedSeconds(calculateTimer());
		}, 1000);

		return () => clearInterval(interval);
	}, [startedAt]);

	return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};
