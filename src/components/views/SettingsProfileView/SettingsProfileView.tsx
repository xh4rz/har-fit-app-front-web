'use client';

import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import { ProfileSkeleton } from '@/components/molecules';
import { ProfileForm } from '@/components/organism';

export const SettingsProfileView = () => {
	const { user, loading } = useAuthStore((state) => state);

	if (loading || !user) {
		return <ProfileSkeleton />;
	}

	return <ProfileForm />;
};
