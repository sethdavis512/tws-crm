export const truncateString = (
    s: string,
    length: number,
    ellipsis: boolean = true
): string =>
    `${s.split(' ').slice(0, length).join(' ')}${ellipsis ? `...` : ''}`;
