interface WorkoutStatsProps {
	duration: string;
	volume: number;
	sets: number;
}

export const WorkoutStats = ({ duration, volume, sets }: WorkoutStatsProps) => {
	return (
		<div className="flex flex-wrap gap-x-5 gap-y-3">
			<div className="flex min-w-20 flex-col gap-1">
				<span className="text-xs text-muted-foreground">Duration</span>
				<span className="text-xs text-secondary tabular-nums">{duration}</span>
			</div>
			<div className="flex min-w-20 flex-col gap-1">
				<span className="text-xs text-muted-foreground">Volume</span>
				<span className="text-xs text-secondary">{volume} kg</span>
			</div>
			<div className="flex min-w-20 flex-col gap-1">
				<span className="text-xs text-muted-foreground">Sets</span>
				<span className="text-xs text-secondary">{sets}</span>
			</div>
		</div>
	);
};
