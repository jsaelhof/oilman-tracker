// export const format = (val) => `$${val / 1000}k`;
export const format = (val) => `$${new Intl.NumberFormat().format(val)}`;
