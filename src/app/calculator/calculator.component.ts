import { Component } from '@angular/core';
import {InterCalculator} from '../interfaces/InterCalculator';


@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.sass']
})
export class CalculatorComponent implements InterCalculator { // TODO: Check replacing operation function with switch
  opFlag: boolean = false;
  startFlag: boolean = false;
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

  checkOpInString(str: string): number {   // check if a string contains an operation
    if (['+', '-', '*', '/'].indexOf(str) >= 0 ) {
      return 1;
    }
  }

  addToExpression(value: string) {
    if (value === 'Clear') {
      this.result = '';
    }
    else if (this.checkOpInString(value) && this.checkOpInString(this.result[this.result.length - 1])) { // don't allow multiple operators. refined code
      this.result = this.result.slice(0, -1);   // use only the last operator
      this.result += value;
    }
    else if ((value === '=') || (this.checkOpInString(value) && (this.opFlag === true))) { // allow only one operation at a time
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
      if (value === '=') { this.opFlag = false; } // if value was "=", reset condition
      else { this.result += value; }              // else, continue with next operation
    }
    else {
      if (this.checkOpInString(value) && ((this.result.length === 0) || (this.startFlag === true))) {
        this.result = 'Enter a number first';
        this.startFlag = true;
      }
      else {
        if (this.startFlag === true) {  // reset result ONLY if expression started with an operation
          this.result = '';
          this.startFlag = false;
        }
        this.result += value;
      }
      if (this.checkOpInString(this.result[this.result.length - 1])) {
        this.opFlag = true;
      }
    }
  }

}
