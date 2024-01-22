import {print} from './utils/print.js';

const main = () => {
    const calculator = new Calculator();

    return (state) => {
        if (state === 'С') {
            calculator.clear();
        } else if (state === 'АС') {
            calculator.deleteLast();
        } else if (state === '=') {
            calculator.calculate();
        } else {
            if (/\d|\./.test(state)) {
                calculator.appendNumber(state);
            } else if (/[+\-x/]/.test(state)) {
                calculator.appendOperator(state);
            }
        }
    }
};

export default main;

class Calculator {
    constructor() {
        this.currentInput = '';
        this.result = 0;
    }

    //добавление в строку числа
    appendNumber(number) {
        this.currentInput += number;
        this.updateDisplay();
    }

    //добавление в строку операторов
    appendOperator(operator) {
        if (this.currentInput === '' && this.result !== 0) {
            this.currentInput = this.result.toString();
        }
        if(!this.isOperatorOrSpace(this.currentInput.slice(-1))) {
            this.currentInput += ` ${operator} `;
            this.updateDisplay();
        }
    }
    // Проверка на оператор или пробел
    isOperatorOrSpace(char) {
        return /[+\-x/]/.test(char) || char === ' ';
    }

    // Вычисления с заменой оператора умножения
    calculate() {
        try {
            this.result = this.countInString(this.currentInput.replace('x', '*'));
            this.currentInput = '';
            this.updateDisplay();
        } catch (error) {
            this.result = 'Error';
            this.updateDisplay();
        }
    }
    countInString(str) {
        const fn = new Function(`return ${str}`);
        return fn();
    }

// Отчистка всей строки
    clear() {
        this.currentInput = '';
        this.result = 0;
        this.updateDisplay();
    }

// удаление последнего символа
    deleteLast() {
        this.currentInput = this.currentInput.slice(0, -1);
        this.updateDisplay();
    }


// Вывод строки
    updateDisplay() {
        print(this.currentInput || this.result.toString());
    }

}

