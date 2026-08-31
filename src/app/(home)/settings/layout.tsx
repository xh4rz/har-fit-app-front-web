import { SettingsSidebar } from '@/components/organism';
import { Card } from '@/components/ui/card';

export default function SettingsLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col lg:flex-row gap-4 max-w-4xl mx-auto w-full">
			<Card className="flex w-full flex-col p-4 md:flex-row">
				<div>
					<SettingsSidebar />
				</div>
				<div className="w-full">{children}</div>
			</Card>
		</div>
	);
}
