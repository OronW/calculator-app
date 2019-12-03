import { Component } from '@angular/core';
import {InterCalculator} from '../interfaces/InterCalculator';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.sass']
})
export class CalculatorComponent implements InterCalculator { // TODO: Check replacing interface with switch

  result: string = ' ';
  numpadNumbers: string[] = ['7', '8', '9', '/',
                             '4', '5', '6', '*',
                             '1', '2', '3', '-',
                             '.', '0', '=', '+' ];
  clearBtn = ['Clear'];
  add(a: number, b: number): number {
    return (a + b);
  }

  div(a: number, b: number): number {
    return (a / b);
  }

  mul(a: number, b: number): number {
    return (a * b);
  }

  sub(a: number, b: number): number {
    return (a - b);
  }

  addToExpression(value: string) {
    if (value === '=') {
      // let ans: number = this.sub(12, 3);
      // let an: string = ans.toString();
      // let splitedArr = value.split('-');
    } else {
        this.result += value;
      }
  }
}
