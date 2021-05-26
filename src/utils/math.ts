// Same as the compare function in the IComparer interface from c#
// https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic.comparer-1.compare?view=net-5.0#System_Collections_Generic_Comparer_1_Compare__0__0_
// if num1 is "bigger" then num2 => positive number
// if num2 is "bigger" then num1 => negative number
// if num1 is "equal" then num2 => zero

type Compare<T> = (num1: T, num2: T) => number;

function getMaxIndexByComparer<T>(arr: T[], compare: Compare<T>) {
    let currentMax: T;
    let currentMaxIndex = -1;
    arr.forEach((num, index) => {
        if (index === 0) {
            currentMax = num;
            currentMaxIndex = index;
        } else if (compare(num, currentMax) > 0) {
            currentMax = num;
            currentMaxIndex = index;
        }
    })
    return currentMaxIndex;
}

const getBigger: Compare<number> = ((num1, num2) => num1 - num2)

function getMaxIndex(arr: number[]) {
    return getMaxIndexByComparer(arr, getBigger)
}

const getSmaller: Compare<number> = ((num1, num2) => num2 - num1)

function getMinIndex(arr: number[]) {
    return getMaxIndexByComparer(arr, getSmaller)
}

export {getMaxIndex, getMinIndex};