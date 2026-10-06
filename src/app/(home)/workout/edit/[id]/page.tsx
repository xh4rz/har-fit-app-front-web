import { WorkoutEditView } from '@/components/views';

export default function WorkoutEditPage() {
	return (
		<div className="flex flex-col lg:flex-row gap-4 mx-auto w-full max-w-2xl">
			<div className="w-full">
				<WorkoutEditView />
			</div>
		</div>
	);
}
