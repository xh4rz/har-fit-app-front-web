'use client';

import { useTheme } from 'next-themes';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoonIcon, SunIcon } from '@phosphor-icons/react';

export const ThemeView = () => {
	const { theme, setTheme } = useTheme();

	return (
		<div className="flex flex-col gap-4">
			<h2 className="text-2xl font-semibold">Current Theme</h2>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" size="icon">
						<SunIcon className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90 text-primary" />
						<MoonIcon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 text-secondary" />
						<span className="sr-only">Toggle theme</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					align="start"
					onCloseAutoFocus={(event) => event.preventDefault()}
				>
					<DropdownMenuGroup>
						<DropdownMenuLabel>Select Theme</DropdownMenuLabel>
						<DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
							<DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value="system">
								System
							</DropdownMenuRadioItem>
						</DropdownMenuRadioGroup>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};
