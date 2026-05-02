'use client';

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';

type BaseSelectItem = {
	id: number;
	name: string;
	imageUrl: string;
};

type FormSelectProps<T extends BaseSelectItem> = {
	placeHolder: string;
	data?: T[];
	loading: boolean;
};

export const DefaultSelect = <T extends BaseSelectItem>({
	placeHolder,
	data,
	loading
}: FormSelectProps<T>) => {
	return (
		<Select>
			<SelectTrigger className="w-full" disabled={loading}>
				{loading ? (
					<div className="w-full flex items-center justify-center">
						<Spinner />
					</div>
				) : (
					<SelectValue placeholder={placeHolder} />
				)}
			</SelectTrigger>
			<SelectContent position="popper" className="rounded-sm">
				<SelectGroup>
					{!loading && !data && (
						<div className="py-4 text-sm text-muted-foreground  flex justify-center items-center h-full ">
							No options available
						</div>
					)}
					{data?.map((i) => (
						<SelectItem key={i.id} value={i.id.toString()}>
							{i.name}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};
