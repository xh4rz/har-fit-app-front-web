export const getCloudinaryThumbnail = (url: string, time = 2) => {
	return url
		.replace('/upload/', `/upload/so_${time},f_jpg,w_200,h_200,c_fill/`)
		.replace('.mp4', '.jpg');
};
