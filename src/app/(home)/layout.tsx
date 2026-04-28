import { AppSidebar } from '@/components/organism';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function HomeLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<SidebarProvider>
			<AppSidebar />

			<SidebarTrigger />

			<div className="w-full p-6">{children}</div>
		</SidebarProvider>
	);
}
