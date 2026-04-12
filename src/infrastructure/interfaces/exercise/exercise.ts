export interface Exercise {
	id: string;
	title: string;
	instruction: string[];
	video: string;
	equipment: OptionItem;
	primaryMuscle: OptionItem;
	secondaryMuscles?: OptionItem[];
}

interface OptionItem {
	id: number;
	name: string;
	imageUrl: string;
}
