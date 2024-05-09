function morganAndString(a: string, b: string): string {
    let result: string = "";
    let i: number = 0;
    let j: number = 0;

    while (i < a.length && j < b.length) {
        if (a[i] < b[j]) {
            result += a[i];
            i++;
        } else {
            result += b[j];
            j++;
        }
    }

    result += a.slice(i) + b.slice(j);

    return result;
}


