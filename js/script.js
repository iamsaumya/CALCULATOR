class Stack {

    constructor() {
        this.item = [];
    }

    push(element) {
        this.item.push(element);
    }

    pop() {
        if (this.item.length == 0) {
            return "Operands Underflow!";
        }

        return this.item.pop();
    }

    peek() {
        return this.item[this.item.length - 1];
    }

    isEmpty() {
        return this.item.length === 0;
    }

    printStack() {
        let str = "";
        for (let i = 0; i < this.item.length; i++) {
            str += this.item[i] + " ";
        }

        return str;
    }


}

let numberStack = new Stack();
let operatorStack = new Stack();
let solved = false;
let decimalison = false;

let displaycontent = "";
const allclear = document.getElementById("allclear");
const clear = document.getElementById("8");
const percentage = document.getElementById("53");
const divide = document.getElementById("111");
const numbers = document.querySelectorAll(".numbers");
const displayarea = document.getElementById("displayarea");
const multiply = document.getElementById("106");
const minus = document.getElementById("109");
const addition = document.getElementById("107");
const signchange = document.querySelector("#signchange");
const decimal = document.getElementById("110");
const ans = document.getElementById("13");

numbers.forEach(number => number.addEventListener("click", addToContent));
multiply.addEventListener("click", addToContent);
divide.addEventListener("click", addToContent);
minus.addEventListener("click", addToContent);
addition.addEventListener("click", addToContent);
percentage.addEventListener("click", addToContent);
ans.addEventListener("click", solve);
decimal.addEventListener("click", addDecimal);
clear.addEventListener("click", clearlastchar);


window.addEventListener("keydown", function (e) {
    const keycode = e.keyCode;
    const key = document.getElementById(`${e.keyCode}`);
    if (keycode == 13) {
        solve(e);
    } else if (keycode == 110) {
        addDecimal(e);
    } else if (keycode == 8) {
        clearlastchar(e);
    } else {
        addToContent(e);
    }
});

allclear.addEventListener("click", () => {
    displaycontent = "";
    displayarea.innerHTML = displaycontent;
});


function clearlastchar(e) {
    displaycontent = displaycontent.slice(0, displaycontent.length - 1);
    displayarea.innerHTML = displaycontent;
}

function addDecimal() {
    if (!decimalison) {
        if (isOperator(displaycontent.charAt(displaycontent.length - 1)))
            display('0.');
        else
            display('.');
        decimalison = true;
    }
}

function precedence(op) {
    if (op == '+' || op == '-')
        return 1;
    if (op == '*' || op == '/' || op == '%')
        return 2;
    return 0;
}

function applyOp(a, b, op) {
    if (a === "Operands Underflow!") {
        return a;
    }
    switch (op) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return a / b;
        case '%':
            return (a / b) * 100;
    }
}

function isOperator(op) {
    if (op == '*' || op == '/' || op == '%' || op == '+' || op == '-') {
        return true;
    }
    return false;
}

function isNumber(num) {
    if (parseInt(num, 10) >= 0 && parseInt(num, 10) <= 9) {
        return true;
    }
    return false;
}

function solve(e) {
    for (let i = 0; i < displaycontent.length; i++) {
        if (!isNaN(parseInt(displaycontent.charAt(i), 10))) {
            let val = 0;
            let singleDigit = true;
            let foundDecimal = false;
            let multiplier = 1;

            while (i < displaycontent.length && (!isNaN(parseInt(displaycontent.charAt(i), 10)) || (displaycontent.charAt(i) == '.'))) {
                if (displaycontent.charAt(i) == '.') {
                    foundDecimal = true;
                } else {
                    val = (val * 10) + parseInt(displaycontent.charAt(i), 10);
                    singleDigit = false;
                    if (foundDecimal) multiplier = multiplier * 10;
                }
                i++;
            }
            if (!singleDigit) {
                i--;
            }
            console.log(multiplier);
            val = val / multiplier;
            numberStack.push(val);
        } else {
            while (!operatorStack.isEmpty() && precedence(operatorStack.peek()) >= precedence(displaycontent.charAt(i))) {
                let b = numberStack.pop();
                let a = numberStack.pop();
                let op = operatorStack.pop();
                let answer = applyOp(a, b, op);
                numberStack.push(answer);
            }
            operatorStack.push(displaycontent.charAt(i));
        }
    }

    while (!operatorStack.isEmpty()) {
        let b = numberStack.pop();
        let a = numberStack.pop();
        let op = operatorStack.pop();
        let answer = applyOp(a, b, op);
        console.log(answer);
        numberStack.push(answer);
    }

    displayarea.innerHTML = numberStack.pop();
    displaycontent = displayarea.innerHTML;
    solved = true;
}


function display(value) {
    if (isOperator(displaycontent.slice(-1)) && isOperator(value)) {
        displaycontent = displaycontent.slice(0, displaycontent.length - 1);
    };

    displaycontent = displaycontent + value;
    if (displaycontent.length > 26) {
        window.alert("You have exceeded the size of input.");
        displaycontent = "";
    }
    displayarea.innerHTML = displaycontent;
}

function addToContent(e) {
    if (solved) {
        displaycontent = "";
        displayarea.innerHTML = displaycontent;
        solved = false;
    }
    let char;
    console.log(e);
    if (e.type == "keydown")
        char = e.key;
    else
        char = e.target.textContent;
    if (isOperator(char))
        decimalison = false;

    display(char);
}
