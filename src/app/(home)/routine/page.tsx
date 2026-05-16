import { RoutineView } from '@/components/views';

export default function RoutinePage() {
	return (
		<div className="flex flex-col gap-4 items-center">
			<div className="flex flex-col gap-4 w-full max-w-5xl">
				<div className="w-full">
					<h2 className="text-2xl font-semibold">Routine</h2>
				</div>
				<RoutineView />
			</div>
		</div>
	);
}
