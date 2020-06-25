
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
// export function parse(value = '') {
//     if (value.startsWith('=')) {
//         try {
//             return eval(value.slice(1));
//         } catch (e) {
//             return value;
//         }
//     }
//     return value;
// }
