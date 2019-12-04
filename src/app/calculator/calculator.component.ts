import { Component } from '@angular/core';
import {InterCalculator} from '../interfaces/InterCalculator';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.sass']
})
export class CalculatorComponent implements InterCalculator {
  opFlag = false;
  startFlag = false;
  equalFlag = false;

  result: string = '';
  numpadNumbers: string[] = ['7', '8', '9', '/',
                             '4', '5', '6', '*',
                             '1', '2', '3', '-',
                             '.', '0', '=', '+' ];
  clearBtn = ['Clear'];
  add(a: number, b: number): number { return (a + b); }
  div(a: number, b: number): number { return (a / b); }
  mul(a: number, b: number): number { return (a * b); }
  sub(a: number, b: number): number { return (a - b); }

  checkOpInString(str: string): number {            // check if a string contains an operation
    return (['+', '-', '*', '/'].indexOf(str) >= 0 ) ? 1 : 0;
  }

  forceOneOperationOnly(value: string): boolean {  // allow only one operation at a time
    return ((value === '=') || (this.checkOpInString(value) && (this.opFlag === true)));
  }

  checkMultipleOperations(value: string): number {  // don't allow multiple operators.
    return (this.checkOpInString(value) && (this.result.length > 0) && (this.checkOpInString(this.result[this.result.length - 1]))) ;
  }

  checkIfLegal(value: string): boolean {            // don't start with operation
    return (this.checkOpInString(value) && ((this.result.length === 0) || (this.startFlag === true)));
  }

  checkNewExpression(value: string): boolean {      // check if a new expression had started
   return ((this.equalFlag === true) && (value !== '=') && !(this.checkOpInString(value))) ;
  }

  calculateExpression(expression: string): string { // split the input string for calculation
    if (expression.includes('+', 0)) {
      const splitted = this.result.split('+');
      return (this.add(Number(splitted[0]), Number(splitted[1])).toString());
    } else if (expression.includes('-', 0)) {
        const splitted = this.result.split('-');
        return (this.sub(Number(splitted[0]), Number(splitted[1])).toString());
    } else if (expression.includes('*', 0)) {
        const splitted = this.result.split('*');
        return (this.mul(Number(splitted[0]), Number(splitted[1])).toString());
    } else if (expression.includes('/', 0)) {
        const splitted = this.result.split('/');
        return (this.div(Number(splitted[0]), Number(splitted[1])).toString());
    }
  }

  addToExpression(value: string) {    // build the input string according to the rules
    if (value === 'Clear') {
      this.result = '';
    }

    else if (this.checkMultipleOperations(value)) {   // don't allow multiple operators. refined code
      this.result = this.result.slice(0, -1);         // use only the last operator
      this.result += value;
    }

    else if (this.forceOneOperationOnly(value))  {          // allow only one operation at a time
      this.result = this.calculateExpression(this.result);  // return the result of the operation
      if (value === '=') {                                  // if value was "=", reset operation flag
        this.opFlag = false;
        this.equalFlag = true;
      }
      else { this.result += value; }                        // else, continue with next operation
    }

    else {
      if (this.checkIfLegal(value)) {
        this.result = 'Enter a number first';
        this.startFlag = true;
      }
      else {
        if (this.startFlag === true ) {   // if expression started with an operation - reset the string
          this.result = '';
          this.startFlag = false;
        }
        if (this.checkNewExpression(value)) {   // if started a new expression - reset the string
          this.result = '';
        }
        this.result += value;
        this.equalFlag = false;
      }
      if (this.checkOpInString(this.result[this.result.length - 1])) {
        this.opFlag = true;
      }
    }
  }

}
