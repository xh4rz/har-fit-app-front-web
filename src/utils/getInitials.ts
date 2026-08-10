export const getInitials = (value: string): string => {
	return value
		.trim()
		.split(' ')
		.filter(Boolean)
		.slice(0, 2)
		.map((n) => n[0].toUpperCase())
		.join('');
};
