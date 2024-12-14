import { sign } from "./sign.js";
import { splitFractionDouble } from "./splitFractionDouble.js";

const doubleRoundLimit = 1E16;
const roundPower10Double = [1E0, 1E1, 1E2, 1E3, 1E4, 1E5, 1E6, 1E7, 1E8, 1E9, 1E10, 1E11, 1E12, 1E13, 1E14, 1E15];

enum Modelo {
    Normal = 0,
    ABNT = 1,
}

export function round(value: number, digits: number = 0, mode: Modelo = Modelo.ABNT) 
{
    if (Math.abs(value) < doubleRoundLimit) {
        let power10 = roundPower10Double[digits];
        value *= power10;
        if (mode == Modelo.ABNT) {                
            let fraction = splitFractionDouble(value)[1]; 
	        value = splitFractionDouble(value)[0];

            if (value % 2 != 0 && Math.abs(fraction) * 1000 == 500)
                value += sign(fraction);
            else if (Math.abs(fraction) > 0.5) {
                value += sign(fraction);
            }
        }
        else {
            value = Math.round(value);
        }
        value /= power10;
    }
    return value;
}