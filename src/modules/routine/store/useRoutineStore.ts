import { create } from 'zustand';
import { RoutineExercise } from '../types/exerciseRoutine';

export interface RoutineStoreState {
	title: string;
	selectedExercises: RoutineExercise[];
	setTitle: (title: string) => void;
	setSelectedExercises: (exercises: RoutineExercise[]) => void;
	toggleExercise: (exercise: RoutineExercise) => void;
	clearRoutine: () => void;
	hasSelectedExercises: () => boolean;
}

export const useRoutineStore = create<RoutineStoreState>((set, get) => ({
	title: '',
	selectedExercises: [],
	setTitle: (title) => set({ title }),
	setSelectedExercises: (exercises) => set({ selectedExercises: exercises }),
	toggleExercise: (item) =>
		set((state) => {
			const exists = state.selectedExercises.some((e) => e.id === item.id);

			return {
				selectedExercises: exists
					? state.selectedExercises.filter((e) => e.id !== item.id)
					: [...state.selectedExercises, item]
			};
		}),
	clearRoutine: () =>
		set({
			title: '',
			selectedExercises: []
		}),
	hasSelectedExercises: () => get().selectedExercises.length > 0
}));
