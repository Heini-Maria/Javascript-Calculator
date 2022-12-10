const screen = document.querySelector('.screen');
const numbers = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.key');
const equal = document.querySelector('.equal');
const clear = document.querySelector('.clear');
const back = document.querySelector('.back');
const decimal = document.querySelector('.decimal');

const calculator = {
currentNum: '',
operator: undefined,
previousNum: '',

operate () {
    const prev = parseFloat(this.previousNum);
    const current = parseFloat(this.currentNum);
    if (this.operator == "+") {
        result = (prev + current);
    } else if (this.operator == "-") {
        result = prev - current;
    } else if (this.operator == "*") {
        result = prev * current;
    } else if (this.operator == "÷" || this.operator == "/") {
        result = prev / current;
    } 
    this.previousNum = result.toString(); 
    this.operator = undefined
    this.currentNum = ''
    this.screenWork();
},

appendNum (num) {
  this.currentNum = this.currentNum.toString() + num.toString();
},

chooseOperator (operator) {
    if(!this.operator && this.currentNum !='') {
        this.operator = operator; 
        this.previousNum = this.currentNum;
        this.currentNum = '';
    } else if (this.currentNum !='' && this.previousNum !='') {
        this.operate();
        this.operator = operator;    
    } else {
        this.operator = operator;
    }
},

screenWork() {
    if (this.currentNum =='' && this.previousNum == '') {
        screen.textContent = 0;
    } if (this.currentNum != '' && this.previousNum == '' || this.currentNum != '' && this.previousNum != '' && this.operator != undefined || this.currentNum != '' && this.previousNum != '') {
         let parts = this.currentNum.split('.');
         parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
         screen.textContent = parts.join('.');
    } if (this.previousNum != '' && this.currentNum == '' && this.operator == undefined ) { 
        if(!this.previousNum.includes('.')) {
            let parts = this.previousNum.split('.');
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            screen.textContent = parts.join('.');
        } else {
        const fixedResult = parseFloat(this.previousNum).toFixed(4);
        let parts = fixedResult.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        screen.textContent = parts.join('.'); 
}  
}
},

clear () {
    this.currentNum = '';
    this.previousNum = '';
    this.operator = undefined;
    screen.textContent = '';
},

back () {
    this.currentNum = this.currentNum.toString().slice(0,-1);
}
}

numbers.forEach((num) => {
   num.addEventListener ('click', () => {
    if(screen.textContent == '0' && num.innerText == '0') {
        return;
    }
    if(calculator.currentNum.length < 8) {
    calculator.appendNum(num.innerText)
    calculator.screenWork();
}
});
})
operators.forEach((operator) => {
    operator.addEventListener ('click', () => {
        calculator.chooseOperator(operator.innerText);
        calculator.screenWork();
    })
})

equal.addEventListener ('click', () => {
    if (calculator.currentNum == '' || calculator.operator == undefined) {
        calculator.screenWork();
    } else if (calculator.previousNum == '') {
        calculator.previousNum = calculator.currentNum;
        calculator.currentNum = '';
        calculator.screenWork();
    } else {
        calculator.operate();
    }
})

clear.addEventListener ('click', () => {
    calculator.clear();
    calculator.screenWork();
})

back.addEventListener ('click', () => {
    calculator.back();
    calculator.screenWork();
})

decimal.addEventListener ('click', () => {
    if (!calculator.currentNum.includes('.'))
        calculator.appendNum(decimal.innerText);
        calculator.screenWork();
})

document.addEventListener('keydown', function(e) {
    const numberPattern = '^[0-9]+$';
    const operatorPattern = /[+\-*\/]/g;
    if (e.key.match(numberPattern)) {
        e.preventDefault();
        if(calculator.currentNum.length < 8) {
            calculator.appendNum(e.key);
            calculator.screenWork();
    }
    } if (e.key.match(operatorPattern)) {
        e.preventDefault();
        calculator.chooseOperator(e.key);
        calculator.screenWork();
    } if (e.key === "Enter" || e.key === "=") {
        e.preventDefault();
        if (calculator.currentNum == '' || calculator.operator == undefined) {
            calculator.screenWork();
        } else if (calculator.previousNum == '') {
            calculator.previousNum = calculator.currentNum;
            calculator.currentNum = '';
            calculator.screenWork();
        } else {
            calculator.operate();
        }
    } if (e.key === "Delete") {
        e.preventDefault();
        calculator.clear();
        calculator.screenWork();
    } if (e.key === "Backspace") {
        e.preventDefault();
        calculator.back();
        calculator.screenWork();
    } if (e.key === ".") {
        e.preventDefault();
        if (!calculator.currentNum.includes('.'))
        calculator.appendNum(decimal.innerText);
        calculator.screenWork();
    }
});

