'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import { useRouter } from 'next/navigation';

export default function HomePage() {
	const router = useRouter();

	const { user, logout } = useAuthStore();

	const handleLogout = async () => {
		await logout();
		router.replace('/login');
	};

	return (
		<Card className="p-5">
			<h3>Hello {user?.fullName}</h3>

			<Button onClick={handleLogout}>Logout</Button>
		</Card>
	);
}
