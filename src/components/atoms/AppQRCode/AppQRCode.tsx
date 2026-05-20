import QRCode from 'react-qr-code';

interface AppQRCodeProps {
	value: string;
	size?: number;
}

export const AppQRCode = ({ value, size = 256 }: AppQRCodeProps) => {
	return <QRCode value={value} size={size} />;
};
