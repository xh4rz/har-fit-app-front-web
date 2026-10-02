import { ProfileView } from '@/components/views';

export default function ProfilePage() {
	return (
		<div className="flex flex-col gap-4 items-center">
			<div className="flex flex-col gap-4 w-full max-w-5xl">
				<h2 className="text-2xl font-semibold">Profile</h2>
				<ProfileView />
			</div>
		</div>
	);
}
