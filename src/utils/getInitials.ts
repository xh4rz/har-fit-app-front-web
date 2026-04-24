export const getInitials = (nombre: string): string => {
	return nombre
		.trim()
		.split(' ')
		.filter(Boolean)
		.slice(0, 2)
		.map((n) => n[0].toUpperCase())
		.join('');
};
