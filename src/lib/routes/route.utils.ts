import { routes } from './route.constants';

const matchRoute = (path: string, route: string) => path.startsWith(route);

export const routeUtils = {
	isPrivate: (path: string) =>
		routes.private.some((route) => matchRoute(path, route)),
	isPublic: (path: string) =>
		routes.public.some((route) => matchRoute(path, route))
};
