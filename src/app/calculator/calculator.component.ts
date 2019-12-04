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
    else if ((['+', '-', '*', '/'].indexOf(value) >= 0) &&    // don't allow multiple operators. refined code
             (['+', '-', '*', '/'].indexOf(this.result[this.result.length - 1]) >= 0)) {
      this.result = this.result.slice(0, -1);                 // use only the last operator
      this.result += value;
    }
    else if ((value === '=') ||
            ((['+', '-', '*', '/'].indexOf(value) >= 0) && (this.opFlag === true))) { // allow only one operation at a time
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
      if (value === '=') { this.opFlag = false; } // if value is "=", reset condition
      else { this.result += value; }              // else, continue with next operation
      // if (this.opFlag === true) {this.result += value;} - replaced by the above else
    }
    else {
      this.result += value;
      if (['+', '-', '*', '/'].indexOf(this.result[this.result.length - 1]) >= 0) {
        this.opFlag = true;
      }
    }
  }

}
