import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {CalculatorComponent} from './calculator/calculator.component';
import {Calculator} from '@angular-devkit/build-angular/src/angular-cli-files/utilities/bundle-calculator';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CalculatorComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'calculator-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('calculator-app');
  });

  it('should add two numbers and show the result', () => {
    const calculatorTest = new CalculatorComponent();
    const ans =  calculatorTest.add(2, 3);
    expect(ans).toBe(5);
  });


  it('should check if string is a math operation', () => {
    const calculatorTest = new CalculatorComponent();
    const ans =  calculatorTest.checkOpInString('*');
    expect(ans).toBeTruthy();
  });

  it('should calculate the expression', () => {
    const calculatorTest = new CalculatorComponent();
    const ans =  calculatorTest.checkNewExpression('=');
    expect(ans).toBeFalsy();
  });


});
