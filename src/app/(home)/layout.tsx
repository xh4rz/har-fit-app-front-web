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

			<div className="flex justify-center items-center min-h-screen p-4 w-full">
				<div className="w-full max-w-md">{children}</div>
			</div>
		</SidebarProvider>
	);
}
