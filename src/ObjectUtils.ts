

export const hasProperty = <S>(object: Record<string, S>, key: string): boolean => {
    return Object.prototype.hasOwnProperty.call(object, key) === true;
}

