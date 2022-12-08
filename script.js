const screen = document.querySelector('.screen');
const numbers = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.key');
const equal = document.querySelector('.equal');
const clear = document.querySelector('.clear');
const back = document.querySelector('.back');
const decimal = document.querySelector('.decimal');

const Calculator = {
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
} else {
    console.log("wooopsie!");
};
this.previousNum = result.toString(); 
this.operator = undefined
this.currentNum = ''
console.log(result);
this.screenWork();
},

appendNum (num) {
  this.currentNum = this.currentNum.toString() + num.toString();
  console.log(this.currentNum)
},
chooseOperator (operator) {
    if(!this.operator && this.currentNum !='') {
    this.operator = operator; 
    console.log(this.currentNum);
    this.previousNum = this.currentNum;
    this.currentNum = '';
    } else if (this.currentNum != '' && this.previousNum !='') {
    this.operate();
    console.log(this.currentNum)
    this.operator = operator;
    } else {
        this.operator = operator;
    }
    console.log(this.operator);
    
    console.log(this.previousNum)
    console.log(this.currentNum);
},
screenWork() {
    if (this.currentNum =='' && this.previousNum == '') {
        screen.textContent = 0;
    } if (this.currentNum != '' && this.previousNum == '' || this.currentNum != '' && this.previousNum != '' && this.operator != undefined || this.currentNum != '' && this.previousNum != '') {
        screen.textContent = Calculator.currentNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    } if (this.previousNum != '' && this.currentNum == '' && this.operator == undefined ) { 
        if(!this.previousNum.includes('.')) {
            screen.textContent = this.previousNum.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        } else {
        const fixedResult = parseFloat(this.previousNum).toFixed(3);
        screen.textContent = fixedResult.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "); 
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
   if(Calculator.currentNum.length < 8) {
    Calculator.appendNum(num.innerText)
    Calculator.screenWork();
}
});
})
operators.forEach((operator) => {
    operator.addEventListener ('click', () => {
        Calculator.chooseOperator(operator.innerText);
        Calculator.screenWork();
    })
})
equal.addEventListener ('click', () => {
    if (Calculator.previousNum == '' || Calculator.operator == undefined) {
        Calculator.screenWork();
    }else{
        Calculator.operate();
    }
})   
clear.addEventListener ('click', () => {
    Calculator.clear();
    Calculator.screenWork();
})
back.addEventListener ('click', () => {
    Calculator.back();
    Calculator.screenWork();
})
decimal.addEventListener ('click', () => {
        if (!Calculator.currentNum.includes('.'))
        Calculator.appendNum(decimal.innerText);
        Calculator.screenWork();
})
document.addEventListener('keydown', function(e) {
    const numberPattern = /[0-9]/g;
    const operatorPattern = /[+\-*\/]/g;
    if (e.key.match(numberPattern)) {
        e.preventDefault();
        if(Calculator.currentNum.length < 8) {
            Calculator.appendNum(e.key);
            Calculator.screenWork();
    }
} if (e.key.match(operatorPattern)) {
    e.preventDefault();
    Calculator.chooseOperator(e.key);
    Calculator.screenWork();
} if (e.key === "Enter" || e.key === "=") {
    e.preventDefault();
    if(Calculator.previousNum == '' || Calculator.operator == undefined) {
        Calculator.screenWork();
    }else{
        Calculator.operate();
} 
}if (e.key === "Delete") {
    e.preventDefault();
    Calculator.clear();
    Calculator.screenWork();
} if (e.key === "Backspace") {
    e.preventDefault();
    Calculator.back();
    Calculator.screenWork();
} if (e.key === ".") {
    e.preventDefault();
    if (!Calculator.currentNum.includes('.'))
    Calculator.appendNum(decimal.innerText);
    Calculator.screenWork();
}
});

