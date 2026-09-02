import { ThemeProvider as NextThemesProvider } from 'next-themes';

export const ThemeContextProvider = ({
	children
}: React.ComponentProps<typeof NextThemesProvider>) => {
	return (
		<NextThemesProvider
			enableSystem
			attribute="class"
			defaultTheme="system"
			storageKey="appTheme"
		>
			{children}
		</NextThemesProvider>
	);
};
