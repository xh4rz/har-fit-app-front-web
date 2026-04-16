export default function AuthLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<div className=" flex justify-center items-center min-h-screen p-4">
			<div className="w-full max-w-md">{children}</div>
		</div>
	);
}
