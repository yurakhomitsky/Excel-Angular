import { MAX_ROW, CODES } from './table.constants';
export function nextSelector(key, { col, row }) {
    const MIN_VALUE = 0;
    const increaseColumn = () => `${row}:${checkMaxCol(col)}`;

    const increaseRow = () => `${checkMaxRow(row)}:${col}`;

    const decreaseRow = () => `${checkMinValue(row)}:${col}`;

    const decreaseColumn = () => `${row}:${checkMinValue(col)}`;

    function checkMinValue(value) {
        return value - 1 < MIN_VALUE ? MIN_VALUE : value - 1;
    }
    function checkMaxCol(value) {
        return value + 1 > CODES.Z - CODES.A ? CODES.Z - CODES.A : value + 1;
    }
    function checkMaxRow(value) {
        return value + 1 > MAX_ROW - 1 ? MAX_ROW - 1 : value + 1;
    }

    const keyEvents = {
        Enter: increaseRow,
        ArrowDown: increaseRow,
        Tab: increaseColumn,
        ArrowRight: increaseColumn,
        ArrowLeft: decreaseColumn,
        ArrowUp: decreaseRow,
    };
    return keyEvents[key]();
}
