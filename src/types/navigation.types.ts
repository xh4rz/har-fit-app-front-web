import { Route } from 'next';
import { Icon } from '@phosphor-icons/react';

export interface MenuItem {
	name: string;
	url: Route;
	icon: Icon;
}
