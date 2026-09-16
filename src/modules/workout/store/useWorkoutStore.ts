import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { RoutineFormInput } from '@/modules/routine/validation/routineFormSchema';

interface WorkoutStoreState {
	workout: RoutineFormInput | null;
	startedAt: number | null;
	setWorkout: (workout: RoutineFormInput) => void;
	startWorkout: () => void;
	finishWorkout: () => void;
}

export const useWorkoutStore = create<WorkoutStoreState>()(
	devtools(
		persist(
			(set) => ({
				workout: null,
				startedAt: null,
				setWorkout: (workout) => set({ workout }),
				startWorkout: () => set({ startedAt: Date.now() }),
				finishWorkout: () =>
					set({
						workout: null,
						startedAt: null
					})
			}),
			{
				name: 'routineWorkout'
			}
		),
		{ store: 'useWorkoutStore' }
	)
);
