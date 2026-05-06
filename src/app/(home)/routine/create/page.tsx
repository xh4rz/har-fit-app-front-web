import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeftIcon, BarbellIcon } from '@phosphor-icons/react/dist/ssr';

export default function RoutineCreatePage() {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-row gap-2 items-center">
				<Link
					href="/routine"
					className={buttonVariants({ variant: 'outline', size: 'icon-lg' })}
				>
					<ArrowLeftIcon />
				</Link>
				<h2 className="text-2xl font-semibold flex-1">Create Routine</h2>
				<Button variant="secondary" size="lg">
					Save Routine
				</Button>
			</div>
			<Card className="min-h-96 h-96 rounded-lg p-4 flex justify-center items-center text-center gap-2">
				<>
					<BarbellIcon size={48} className="text-muted-foreground mb-4" />
					<h5 className="text-lg font-medium">No Exercises</h5>
					<span className="text-muted-foreground">
						So far, you haven&rsquo;t added any exercises to this routine.
					</span>
				</>
			</Card>
		</div>
	);
}
