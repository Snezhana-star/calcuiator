import { print } from './utils/print.js';

const main = () => {
    const calculator = new Calculator();

    return (state: string) => {
        if (state === 'С') {
            calculator.clear();
        } else if (state === 'АС') {
            calculator.deleteLast();
        } else if (state === 'Ответ') {
            calculator.calculate();
        } else {
            if (/\d/.test(state)) {
                calculator.appendNumber(state);
            } else if (/[+\-x/]/.test(state)) {
                calculator.appendOperator(state);
            }
        }
    };
};

export default main;

class Calculator {
    private currentInput: string;
    private result: number;

    constructor() {
        this.currentInput = '';
        this.result = 0;
    }

    clear() {
        this.currentInput = '';
        this.result = 0;
        this.updateDisplay();
    }

    deleteLast() {
        this.currentInput = this.currentInput.slice(0, -1);
        this.updateDisplay();
    }

    appendNumber(number: string) {
        this.currentInput += number;
        this.updateDisplay();
    }

    appendOperator(operator: string) {
        if (this.currentInput === '' && this.result !== 0) {
            this.currentInput = this.result.toString();
        }

        if (this.isOperator(this.currentInput.slice(-1))) {
            this.currentInput = this.currentInput.slice(0, -1);
        }

        this.currentInput += ` ${operator} `;
        this.updateDisplay();
    }

    calculate() {
        try {
            this.result = this.evaluateExpression(this.currentInput.replace('x', '*'));
            this.currentInput = '';
            this.updateDisplay();
        } catch (error) {
            this.result = 0;
            this.updateDisplay();
        }
    }

    private evaluateExpression(expression: string): number {
        const fn = new Function(`return ${expression}`);
        return fn();
    }

    private updateDisplay() {
        print(this.currentInput || this.result.toString());
    }

    private isOperator(char: string) {
        return /[+\-x/]/.test(char);
    }
}
