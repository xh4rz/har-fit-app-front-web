import { Area } from 'react-easy-crop';

export const getCroppedImage = async (
	imageSrc: string,
	pixelCrop: Area,
	rotation = 0,
	flip = { horizontal: false, vertical: false }
): Promise<File> => {
	const image = await createImage(imageSrc);

	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');

	if (!ctx) {
		throw new Error('Could not get canvas context');
	}

	const rotRad = getRadianAngle(rotation);

	const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
		image.naturalWidth,
		image.naturalHeight,
		rotation
	);

	canvas.width = bBoxWidth;
	canvas.height = bBoxHeight;

	ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
	ctx.rotate(rotRad);

	ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);

	ctx.translate(-image.naturalWidth / 2, -image.naturalHeight / 2);

	ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);

	const croppedCanvas = document.createElement('canvas');
	const croppedCtx = croppedCanvas.getContext('2d');

	if (!croppedCtx) {
		throw new Error('Could not get cropped canvas context');
	}

	croppedCanvas.width = pixelCrop.width;
	croppedCanvas.height = pixelCrop.height;

	croppedCtx.drawImage(
		canvas,
		pixelCrop.x,
		pixelCrop.y,
		pixelCrop.width,
		pixelCrop.height,
		0,
		0,
		pixelCrop.width,
		pixelCrop.height
	);

	return new Promise<File>((resolve, reject) => {
		croppedCanvas.toBlob(
			(file) => {
				if (!file) {
					reject(new Error('Could not create image blob'));
					return;
				}

				resolve(
					new File([file], 'profile-image.jpg', {
						type: 'image/jpeg'
					})
				);
			},
			'image/jpeg',
			1
		);
	});
};

const getRadianAngle = (degreeValue: number) => {
	return (degreeValue * Math.PI) / 180;
};

const rotateSize = (width: number, height: number, rotation: number) => {
	const rotRad = getRadianAngle(rotation);

	return {
		width:
			Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),

		height:
			Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height)
	};
};

const createImage = (url: string) => {
	return new Promise<HTMLImageElement>((resolve, reject) => {
		const image = new Image();

		image.addEventListener('load', () => resolve(image));
		image.addEventListener('error', reject);
		image.setAttribute('crossOrigin', 'anonymous');
		image.src = url;
	});
};
