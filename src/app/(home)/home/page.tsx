import { HomeView } from '@/components/views';

export default function HomePage() {
	return (
		<div className="flex flex-col gap-4 h-full">
			<h2 className="text-2xl font-semibold">Home</h2>
			<HomeView />
		</div>
	);
}
