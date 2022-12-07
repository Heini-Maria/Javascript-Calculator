const screen = document.querySelector('.screen');
const numbers = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.key');
const equal = document.querySelector('.equal');
const clear = document.querySelector('.clear');
const back = document.querySelector('.back');
const decimal = document.querySelector('.decimal')


const Calculator = {
currentNum: '',
operator: undefined,
previousNum: '',


operate () {
    let result;
    const prev = Number(this.previousNum);
    const current = Number(this.currentNum);
if (this.operator == "+") {
    result = (prev + current);
} else if (this.operator == "-") {
    result = prev - current;
} else if (this.operator == "*") {
    result = prev * current;
} else if (this.operator == "÷") {
    result = prev / current;
} else {
    console.log("wooopsie!");
}
this.currentNum = result; 
this.operator = undefined
this.previousNum = ''
console.log(result);
screen.textContent = result

},

appendNum (num) {
  this.currentNum = this.currentNum.toString() + num.toString();
  console.log(this.currentNum)
},
chooseOperator (operator) {
    if(!this.operator) {
    this.operator = operator; 
    console.log(this.currentNum);
    this.previousNum = this.currentNum;
    this.currentNum = '';
    } else {
        this.operator = operator;
    }
    console.log(this.operator);
    
    console.log(this.previousNum)
    console.log(this.currentNum);
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
   Calculator.appendNum(num.innerText)
   screen.textContent = Calculator.currentNum;
});
})
operators.forEach((operator) => {
    operator.addEventListener ('click', () => {
        Calculator.chooseOperator(operator.innerText);
        screen.textContent = Calculator.previousNum;
    })
})
equal.addEventListener ('click', () => {
    if(screen.textContent == '') {
        screen.textContent = 0;
    } else if(Calculator.previousNum == ''){
        screen.textContent = Calculator.currentNum;    
    } else {
        Calculator.operate();
    }
})   
clear.addEventListener ('click', () => {
    Calculator.clear();
    screen.textContent = 0;
})
back.addEventListener ('click', () => {
    Calculator.back();
    screen.textContent = Calculator.currentNum;
})
decimal.addEventListener ('click', () => {
        if (!Calculator.currentNum.includes('.'))
        Calculator.appendNum(decimal.innerText);
        screen.textContent = Calculator.currentNum;

})