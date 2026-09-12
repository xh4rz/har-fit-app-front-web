import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { RoutineFormInput } from '@/modules/routine/validation/routineFormSchema';

interface WorkoutStoreState {
	workout: RoutineFormInput | null;
	setWorkout: (workout: RoutineFormInput) => void;
	finishWorkout: () => void;
}

export const useWorkoutStore = create<WorkoutStoreState>()(
	devtools(
		persist(
			(set) => ({
				workout: null,
				setWorkout: (workout) => set({ workout }),
				finishWorkout: () => set({ workout: null })
			}),
			{
				name: 'routineWorkout'
			}
		),
		{ store: 'useWorkoutStore' }
	)
);
