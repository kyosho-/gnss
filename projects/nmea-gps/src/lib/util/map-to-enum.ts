export function mapToEnum<T>(enumObject: T, value: any): T[keyof T] | undefined {
    if (typeof enumObject === 'object') {
        for (const key in enumObject) {
            if (enumObject.hasOwnProperty(key) && enumObject[key] === value) {
                return enumObject[key];
            }
        }
        // } else if (enumObject instanceof Array) {
        //     return enumObject.find(value);
    } else {
        throw new Error(`Unsupported operation.`);
    }
}
