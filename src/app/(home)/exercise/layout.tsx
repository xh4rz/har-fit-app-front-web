import React from 'react';
import { ExerciseView } from '@/components/views';

export default function ExerciseLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col lg:flex-row gap-4">
			<div className="flex flex-col gap-4 w-full">{children}</div>
			<div className="w-full max-w-full lg:max-w-80">
				<ExerciseView />
			</div>
		</div>
	);
}
