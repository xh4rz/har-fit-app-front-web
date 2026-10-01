import Confetti from 'react-confetti';

export const SuccessConfetti = () => {
	return (
		<Confetti
			width={window.innerWidth}
			height={window.innerHeight}
			numberOfPieces={160}
			recycle={false}
			tweenDuration={4000}
			style={{
				position: 'fixed',
				inset: 0,
				pointerEvents: 'none',
				zIndex: 9999
			}}
		/>
	);
};
