const roundDecimal = (value: number, decimalPlance: number) => {
    switch (decimalPlance) {
        case 0:
            return Math.round((value + Number.EPSILON) * 1) / 1;
        case 1:
            return Math.round((value + Number.EPSILON) * 10) / 10;
        case 2:
            return Math.round((value + Number.EPSILON) * 100) / 100;
        case 3:
            return Math.round((value + Number.EPSILON) * 1000) / 1000;
        case 4:
            return Math.round((value + Number.EPSILON) * 10000) / 10000;
        default:
            return 0;
    }
};

export default roundDecimal;
