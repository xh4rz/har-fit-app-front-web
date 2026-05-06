import Link from 'next/link';
import { Card } from '@/components/ui/card';
import {
	Item,
	ItemActions,
	ItemContent,
	ItemMedia,
	ItemTitle
} from '@/components/ui/item';
import {
	BarbellIcon,
	CaretRightIcon,
	FilePlusIcon
} from '@phosphor-icons/react/ssr';

export default function RoutinePage() {
	return (
		<div className="flex flex-col gap-4 items-center">
			<div className="flex flex-col gap-4 w-full max-w-5xl">
				<div className="w-full">
					<h2 className="text-2xl font-semibold">Routine</h2>
				</div>
				<div className="flex flex-col lg:flex-row gap-4">
					<Card className="lg:flex-2 min-h-96 rounded-lg p-4 flex flex-col justify-center items-center text-center gap-2">
						<BarbellIcon size={48} className="text-muted-foreground mb-4" />
						<h5 className="text-lg font-medium">Get started</h5>
						<span className="text-muted-foreground">
							Start by creating a routine!
						</span>
					</Card>
					<Card className="lg:flex-1 h-20 rounded-lg p-4 flex justify-center items-center text-center gap-2">
						<Item size="sm" asChild>
							<Link href={`/routine/create`}>
								<ItemMedia className="text-secondary">
									<FilePlusIcon className="size-6" />
								</ItemMedia>
								<ItemContent>
									<ItemTitle className="text-secondary">New Routine</ItemTitle>
								</ItemContent>
								<ItemActions className="text-secondary">
									<CaretRightIcon className="size-6" />
								</ItemActions>
							</Link>
						</Item>
					</Card>
				</div>
			</div>
		</div>
	);
}
