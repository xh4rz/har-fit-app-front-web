'use client';

import { useRef, useState } from 'react';
import { Controller, Control, FieldValues, FieldPath } from 'react-hook-form';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { VideoPlayer } from '@/components/atoms';
import { UploadIcon, XIcon } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import { delay } from '@/utils';

type FormVideoUploadProps<T extends FieldValues> = {
	name: FieldPath<T>;
	control: Control<T>;
	label: string;
	required?: boolean;
	disabled?: boolean;
};

export const FormVideoUpload = <T extends FieldValues>({
	name,
	control,
	label,
	required,
	disabled
}: FormVideoUploadProps<T>) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [dragActive, setDragActive] = useState(false);
	const [isUploading, setIsUploading] = useState(false);

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => {
				const isError = fieldState.error;

				const file = isError ? undefined : (field.value as File | undefined);

				const handleFile = async (file: File) => {
					setIsUploading(true);
					await delay(1000);
					field.onChange(file);
					setIsUploading(false);
				};

				const removeFile = () => {
					field.onChange(undefined);
					if (inputRef.current) {
						inputRef.current.value = '';
					}
				};

				const videoUrl = file ? URL.createObjectURL(file) : '';

				return (
					<Field data-invalid={fieldState.invalid}>
						<FieldLabel>
							{label}
							{required && <span className="text-secondary">*</span>}
						</FieldLabel>
						<Card
							onClick={() =>
								!disabled && !isUploading && inputRef.current?.click()
							}
							onDragOver={(e) => {
								e.preventDefault();
								if (!disabled && !isUploading) setDragActive(true);
							}}
							onDragLeave={() => setDragActive(false)}
							onDrop={(e) => {
								e.preventDefault();
								setDragActive(false);
								if (disabled || isUploading) return;
								const file = e.dataTransfer.files?.[0];
								if (file) handleFile(file);
							}}
							className={cn(
								'border-2 border-dashed p-6 text-center cursor-pointer transition relative',
								dragActive && 'border-primary bg-primary/5',
								(disabled || isUploading) && 'opacity-60 cursor-not-allowed',
								isError && 'border-destructive'
							)}
						>
							<input
								ref={inputRef}
								type="file"
								accept="video/*"
								className="hidden"
								onChange={(e) => {
									const file = e.target.files?.[0];
									if (file) handleFile(file);
								}}
							/>
							<div className="min-h-24 flex items-center justify-center">
								{isUploading ? (
									<Spinner className="size-8" />
								) : !file ? (
									<div className="flex flex-col items-center gap-2 text-muted-foreground">
										<UploadIcon className="size-6" />
										<p className="text-sm">
											Drag & drop video or click to upload
										</p>
										<p className="text-xs">Video • Máx 2MB</p>
									</div>
								) : (
									<div className="flex flex-col items-center gap-2">
										<VideoPlayer url={videoUrl} />
										<p className="text-sm font-medium">{file.name}</p>
										<p className="text-xs text-muted-foreground">
											{(file.size / 1024 / 1024).toFixed(2)} MB
										</p>
										<Button
											type="button"
											size="xs"
											variant="destructive"
											onClick={(e) => {
												e.stopPropagation();
												removeFile();
											}}
										>
											<XIcon className="w-4 h-4 " />
											Remove
										</Button>
									</div>
								)}
							</div>
						</Card>
						{fieldState.error && <FieldError errors={[fieldState.error]} />}
					</Field>
				);
			}}
		/>
	);
};
