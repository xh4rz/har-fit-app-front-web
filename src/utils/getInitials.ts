export const getInitials = (nombre: string): string => {
	return nombre
		.trim()
		.split(' ')
		.filter(Boolean) // elimina espacios dobles
		.slice(0, 2) // toma solo los dos primeros nombres
		.map((n) => n[0].toUpperCase())
		.join('');
};
