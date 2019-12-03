import { Component } from '@angular/core';
import {InterCalculator} from '../interfaces/InterCalculator';


@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.sass']
})
export class CalculatorComponent implements InterCalculator { // TODO: Check replacing operation function with switch
  opFlag: boolean = false;
  result: string = '';
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

    if (value === 'Clear') {
      this.result = '';
    }
    else if ((['+', '-', '*', '/'].indexOf(value) >= 0) &&    // refine the code
             (['+', '-', '*', '/'].indexOf(this.result[this.result.length - 1]) >= 0)) {
      this.result = this.result.slice(0, -1);
      this.result += value;

      // else if (((value === '+') || (value === '-') || (value === '*') || (value === '/')) &&
      // ((this.result[this.result.length - 1] === '+') || (this.result[this.result.length - 1] === '-') ||
      // (this.result[this.result.length - 1] === '*') || (this.result[this.result.length - 1] === '/'))) {
    }
    else if (value === '=') {
        if (this.result.includes('+', 0)) {
          let splitted = this.result.split('+');
          this.result = this.add(Number(splitted[0]), Number(splitted[1])).toString();
        }
        else if (this.result.includes('-', 0)) {
          let splitted = this.result.split('-');
          this.result = this.sub(Number(splitted[0]), Number(splitted[1])).toString();
        }
        else if (this.result.includes('*', 0)) {
          let splitted = this.result.split('*');
          this.result = this.mul(Number(splitted[0]), Number(splitted[1])).toString();
        }
        else if (this.result.includes('/', 0)) {
          let splitted = this.result.split('/');
          this.result = this.div(Number(splitted[0]), Number(splitted[1])).toString();
        }
        this.opFlag = false;
    } else {
        this.result += value;
    }
  }

}
