export interface ApiError {
	error: string;
	message: string | string[];
	statusCode: number;
}
