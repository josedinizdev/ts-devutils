export function sum(...valor) {
    return valor.reduce((acc, num) => acc + num, 0);
}
