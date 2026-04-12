import axiosClient from '@/api/axiosClient';
import { Equipment } from '@/infrastructure/interfaces';

export const getEquipments = async () => {
	try {
		const { data } = await axiosClient.get<Equipment[]>('/equipments');

		return data;
	} catch {
		throw new Error('error get exercises');
	}
};
