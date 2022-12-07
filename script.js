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
} else if (this.operator == "÷") {
    result = prev / current;
} else {
    console.log("wooopsie!");
}
;
this.previousNum = result; 
this.operator = undefined
this.currentNum = ''
console.log(result);
screen.textContent = result;

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
   screen.textContent = Calculator.currentNum;
}
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
    } else if (Calculator.previousNum !=='' && Calculator.currentNum =='') {
        screen.textContent = Calculator.previousNum;
    }else{
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
    if(Calculator.currentNum == '') {
        screen.textContent = 0;
    }
})
decimal.addEventListener ('click', () => {
        if (!Calculator.currentNum.includes('.'))
        Calculator.appendNum(decimal.innerText);
        screen.textContent = Calculator.currentNum;
})