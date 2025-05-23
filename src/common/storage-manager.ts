/**
 * A module with methods for managing data in local storage
 */
import { doesWindowExist } from './utilities.ts';

const storage = doesWindowExist() ? window.localStorage : null;

/**
 * Set the value of a key in local storage
 */
function storageSet(key: string, value: boolean) {
	storage?.setItem(key, JSON.stringify(value));
}

/**
 * Gets the value of a key from local storage.
 *
 * Returns the default value if the key does not exist or if the window object does not exist.
 */
export function storageGet(key: string, defaultValue: boolean): boolean {
	if (!storage) {
		return defaultValue;
	}

	const loadedValue = storage.getItem(key);

	// If there is no stored value, return the default value. Loose equality is intentional
	return loadedValue == null ? defaultValue : JSON.parse(loadedValue);
}

/**
 * Set the value of a key in local storage if an input flag is true
 */
export function storageSetIf(doSet: boolean, key: string, value: boolean) {
	doSet && storageSet(key, value);
}

/**
 * Remove a key from local storage
 */
export function storageRemove(key: string) {
	storage?.removeItem(key);
}
