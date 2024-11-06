import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    readonly getItem = (key: string): string | null => localStorage.getItem(key);

    readonly setItem = (key: string, value: string): void => localStorage.setItem(key, value);

    readonly removeItem = (key: string): void => localStorage.removeItem(key);

    readonly clear = (): void => localStorage.clear();
}
