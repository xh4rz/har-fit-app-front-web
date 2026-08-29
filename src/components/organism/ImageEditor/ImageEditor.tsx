'use client';

import { useCallback, useEffect, useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import { Dialog } from '@/components/molecules';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
	ArrowArcLeftIcon,
	ArrowArcRightIcon,
	ArrowsClockwiseIcon,
	FloppyDiskIcon,
	TrashIcon
} from '@phosphor-icons/react';
import { getCroppedImage } from '@/utils';

interface ImageEditorProps {
	open: boolean;
	image: string;
	hasSavedImage: boolean;
	onOpenChange: (open: boolean) => void;
	onSave: (file: File) => void;
	onDelete: () => void;
	onReplace: () => void;
}

export const ImageEditor = ({
	open,
	image,
	hasSavedImage,
	onOpenChange,
	onSave,
	onDelete,
	onReplace
}: ImageEditorProps) => {
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [rotation, setRotation] = useState(0);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

	const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
		setCroppedAreaPixels(croppedAreaPixels);
	}, []);

	const rotateLeft = () => {
		setRotation((prev) => prev - 90);
	};

	const rotateRight = () => {
		setRotation((prev) => prev + 90);
	};

	const handleSave = async () => {
		if (!croppedAreaPixels) return;
		const file = await getCroppedImage(image, croppedAreaPixels, rotation);
		onSave(file);
		onOpenChange(false);
	};

	const handleDelete = () => {
		onDelete();
		onOpenChange(false);
	};

	const handleReplace = () => {
		onReplace();
	};

	useEffect(() => {
		return () => {
			setTimeout(() => {
				setCrop({ x: 0, y: 0 });
				setZoom(1);
				setRotation(0);
			}, 300);
		};
	}, [open]);

	return (
		<div>
			<Dialog open={open} onOpenChange={onOpenChange} title="Edit Image">
				<div className="flex flex-col min-h-125">
					<div className="relative mx-auto h-100 w-full max-w-100 ">
						<Cropper
							image={image}
							crop={crop}
							zoom={zoom}
							rotation={rotation}
							aspect={1}
							cropShape="round"
							showGrid={false}
							onCropChange={setCrop}
							onZoomChange={setZoom}
							onRotationChange={setRotation}
							onCropComplete={onCropComplete}
						/>
					</div>
					<div className="p-6 flex flex-col gap-4">
						<div className="flex gap-2 justify-center">
							<Button size="icon-sm" variant="outline" onClick={rotateLeft}>
								<ArrowArcLeftIcon />
							</Button>

							<Button size="icon-sm" variant="outline" onClick={rotateRight}>
								<ArrowArcRightIcon />
							</Button>
						</div>
						<div className="flex flex-col gap-1">
							<label className="text-sm font-medium">Zoom</label>
							<Slider
								value={[zoom]}
								min={1}
								max={3}
								step={0.01}
								onValueChange={([value]) => setZoom(value)}
							/>
						</div>
						<div className="flex flex-col gap-1">
							<label className="text-sm font-medium">Rotate</label>
							<Slider
								value={[rotation]}
								min={-180}
								max={180}
								step={1}
								onValueChange={([value]) => setRotation(value)}
							/>
						</div>
					</div>
				</div>
				<div className="flex justify-center items-center w-full border-t p-4 gap-4 ">
					{hasSavedImage && (
						<Button
							variant="destructive"
							iconLeft={<TrashIcon />}
							onClick={handleDelete}
						>
							Delete
						</Button>
					)}

					<Button
						variant="outline"
						iconLeft={<ArrowsClockwiseIcon />}
						onClick={handleReplace}
					>
						Replace
					</Button>

					<Button
						variant="secondary"
						iconLeft={<FloppyDiskIcon />}
						onClick={handleSave}
					>
						Save
					</Button>
				</div>
			</Dialog>
		</div>
	);
};
