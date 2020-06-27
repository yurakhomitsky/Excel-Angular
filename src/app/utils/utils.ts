import { ExcelState } from '../store/reducers/store.reducer';

export function capitalize(str: string) {
    if (typeof str !== 'string') {
        return '';
    }
    return str.charAt(0).toUpperCase() + str.slice(1);

}

export function parseId(element) {
    const parsed = element.dataset.id.split(':');
    return {
        row: +parsed[0],
        col: +parsed[1],
    };
}
export function range(start, end) {
    if (start > end) {
        [end, start] = [start, end];
    }
    return new Array(end - start + 1)
        .fill('')
        .map((_, index) => start + index);
}
export function storage(key, data = null) {
    if (!data) {
        return JSON.parse(localStorage.getItem(key));
    }
    localStorage.setItem(key, JSON.stringify(data));
}
export function storageName(param) {
    return 'excel:' + param;
}
export interface ExcelTable {
    id: string;
    state: ExcelState;
}

export function getAllKeys(): string[] {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key.includes('excel')) {
            continue;
        }
        keys.push(key);
    }
    return keys;
}
