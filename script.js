
const Calculator = {
currentNum: '0',



operate (num1, operator, num2) {
if (operator === "+") {
    return num1 + num2;
} else if (operator === "-") {
    return num1 - num2;
} else if (operator === "&times;") {
    return num1 * num2;
} else if (operator === "÷") {
    return num1 / num2;
} else {
    console.log("wooopsie!");
}
},

appendNum (num) {
    this.currentNum = num;    
    /* console.log(Calculator.currentNum); */
}

}

const screen = document.querySelector('.screen');
const numbers = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.key');

numbers.forEach((num) => {
   num.addEventListener ('click', () => {
    if(Calculator.currentNum === '0') {
        screen.textContent = num.innerText;
        Calculator.appendNum(num.innerText);
    } else {
        const newNum = Calculator.currentNum + num.innerText;
        screen.textContent = newNum;
        Calculator.appendNum(newNum);
    }
    
operators.forEach((operator) => {
    operator.addEventListener ('click', () => {
        screen.textContent = '';

    })
})   
});
})

   

console.log(Calculator.currentNum); 