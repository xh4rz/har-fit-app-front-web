/* eslint-disable @typescript-eslint/no-unused-vars */

import Cookies from 'js-cookie';

export class StorageAdapter {
	static getItem(key: string): string | null {
		try {
			return Cookies.get(key) ?? null;
		} catch (error) {
			return null;
		}
	}

	static setItem(key: string, value: string): void {
		try {
			Cookies.set(key, value);
		} catch (error) {
			throw new Error(`Error setting item ${key} ${value}`);
		}
	}

	static removeItem(key: string): void {
		try {
			Cookies.remove(key);
		} catch (error) {
			throw new Error(`Error removing item ${key}`);
		}
	}
}
