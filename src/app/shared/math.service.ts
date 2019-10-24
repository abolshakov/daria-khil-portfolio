import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MathService {
  public round(number: number, precision?: number): number {
    if (!precision) { return Math.round(number); }
    const factor = Math.pow(10, precision);
    const tempNumber = number * factor;
    const roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
  }

  public ceil(value: number, precision?: number): number {
    if (!precision) { return Math.ceil(value); }
    const pow = 10 ** precision;
    return Math.sign(value) * Math.ceil(Math.abs(value) * pow) / pow;
  }
}
