import React from 'react';
import { ExerciseView } from '@/components/views';

export default function RoutineCreateLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col lg:flex-row gap-4 max-w-5xl mx-auto w-full">
			<div className="w-full">{children}</div>
			<div className="w-full max-w-full lg:max-w-80">
				<ExerciseView mode="select" />
			</div>
		</div>
	);
}
