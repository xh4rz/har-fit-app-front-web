interface WorkoutSet {
	set: number;
	reps: number;
	kg: number;
	completed: boolean;
}

interface WorkoutExercise {
	exerciseId: string;
	sets: WorkoutSet[];
}

export interface WorkoutRequest {
	title: string;
	duration: number;
	description?: string;
	createdAt: Date;
	exercises: WorkoutExercise[];
}

export interface WorkoutResponse {
	id: string;
	title: string;
	duration: number;
	volume: number;
	sets: number;
	createdAt: Date;
	exercises: (WorkoutExercise & {
		title: string;
		video: string;
		primaryMuscleName: string;
		restTimer: number;
	})[];
}
