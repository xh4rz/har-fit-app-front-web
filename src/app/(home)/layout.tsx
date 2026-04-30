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

			<main className="w-full p-6 flex justify-center items-center ">
				<div className="max-w-7xl w-full">{children}</div>
			</main>
		</SidebarProvider>
	);
}
