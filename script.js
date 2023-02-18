let arr = []
let st=""
let res

const ans = document.querySelector("#ans")
const AC = document.querySelector("#AC")
const cs = document.querySelector("#change_sign")
const perc = document.querySelector("#percentage")
const div = document.querySelector("#div")
const seven = document.querySelector("#seven")
const eight = document.querySelector("#eight")
const nine = document.querySelector("#nine")
const mult = document.querySelector("#multiply")
const four = document.querySelector("#four")
const five = document.querySelector("#five")
const six = document.querySelector("#six")
const minus = document.querySelector("#minus")
const one = document.querySelector("#one")
const two = document.querySelector("#two")
const three = document.querySelector("#three")
const plus = document.querySelector("#plus")
const zero = document.querySelector("#zero")
const lbr = document.querySelector("#lbracket")
const rbr = document.querySelector("#rbracket")
const equal = document.querySelector("#equal")

AC.onmousedown = function(){
    ans.innerText = 'ㅤ'
    arr=[]
    st=''
}

div.onmousedown = function(){
    arr.push('/')
    st+='/'
    ans.innerText = st
}
seven.onmousedown = function(){
    arr.push(7)
    st+='7'
    ans.innerText = st
}
eight.onmousedown = function(){
    arr.push(8)
    st+='8'
    ans.innerText = st
}
nine.onmousedown = function(){
    arr.push(9)
    st+='9'
    ans.innerText = st
}
mult.onmousedown = function(){
    arr.push('*')
    st+='*'
    ans.innerText = st
}
four.onmousedown = function(){
    arr.push(4)
    st+='4'
    ans.innerText = st
}
five.onmousedown = function(){
    arr.push(5)
    st+='5'
    ans.innerText = st
}
six.onmousedown = function(){
    arr.push(6)
    st+='6'
    ans.innerText = st
}
minus.onmousedown = function(){
    arr.push('-')
    st+='-'
    ans.innerText = st
}
one.onmousedown = function(){
    arr.push(1)
    st+='1'
    ans.innerText = st
}
two.onmousedown = function(){
    arr.push(2)
    st+='2'
    ans.innerText = st
}
three.onmousedown = function(){
    arr.push(3)
    st+='3'
    ans.innerText = st
}
plus.onmousedown = function(){
    arr.push('+')
    st+='+'
    ans.innerText = st
}
zero.onmousedown = function(){
    arr.push(0)
    st+='0'
    ans.innerText = st
}
lbr.onmousedown = function(){
    arr.push('(')
    st+='('
    ans.innerText = st
}
rbr.onmousedown = function(){
    arr.push(')')
    st+=')'
    ans.innerText = st
}

equal.onmousedown = function(){
    res = postfixEval(InfixtoPostfix(arr))
    ans.innerText = res
    arr = [res]
    st=res
}

// -----------------------------------------------------------------------------------------------------------------

// Created an empty array
var stackarr = [];

// Variable topp initialized with -1
var topp = -1;

// Push function for pushing
// elements inside stack
function push(e) {
	topp++;
	stackarr[topp] = e;
}

// Pop function for returning top element
function pop() {
	if (topp == -1)
		return 0;
	else {
		var popped_ele = stackarr[topp];
		topp--;
		return popped_ele;
	}
}

// Function to check whether the passed
// character is operator or not
function operator(op) {
	if (op == '+' || op == '-' ||
		op == '^' || op == '*' ||
		op == '/' || op == '(' ||
		op == ')') {
		return true;
	}
	else
		return false;
}

// Function to return the precedency of operator
function precedency(pre) {
	if (pre == '@' || pre == '(' || pre == ')') {
		return 1;
	}
	else if (pre == '+' || pre == '-') {
		return 2;
	}
	else if (pre == '/' || pre == '*') {
		return 3;
	}
	else if (pre == '^') {
		return 4;
	}
	else
		return 0;
}

// Function to convert Infix to Postfix
function InfixtoPostfix(infixval) {

	// Postfix array created
	var postfix = [];
	var temp = 0;
	push('@');
	//infixval = document.getElementById("infixvalue").value;

	// Iterate on infix string
	for (var i = 0; i < infixval.length; i++) {
		var el = infixval[i];

		// Checking whether operator or not
		if (operator(el)) {
			if (el == ')') {
				while (stackarr[topp] != "(") {
					postfix[temp++] = pop();
				}
				pop();
			}

			// Checking whether el is ( or not
			else if (el == '(') {
				push(el);
			}

			// Comparing precedency of el and
			// stackarr[topp]
			else if (precedency(el) > precedency(stackarr[topp])) {
				push(el);
			}
			else {
				while (precedency(el) <=
					precedency(stackarr[topp]) && topp > -1) {
					postfix[temp++] = pop();
				}
				push(el);
			}
		}
		else {
			postfix[temp++] = el;
		}
	}

	// Adding character until stackarr[topp] is @
	while (stackarr[topp] != '@') {
		postfix[temp++] = pop();
	}

	// String to store postfix expression
	// var st = "";
	// for (var i = 0; i < postfix.length; i++)
	// 	st += postfix[i];

	// To print postfix expression in HTML
	// document.getElementById("text").innerHTML = st;

    return postfix
}

//---------------------------------------------------------------------------------------------------------------------

function postfixEval( postfixArray ) {
    var stack = [];

    for( element of postfixArray){
        console.log("element: " + element);

        if(isNaN(element)){
            var x = stack.pop();
            var y = stack.pop();
            console.log("var x/y: " + x + " " + y + " element: " + element) ;
            if (element == "+"){
                result = (y+x);
                console.log("Expected Result: " + result)
                stack.push(y + x);
            } else if (element == '-'){
                stack.push(y - x);
            } else if (element == '*'){
                stack.push(y * x);
            } else if (element == '/'){
                stack.push(y / x);
            }
        } else {
            stack.push( parseFloat(element) );
        }
    }
    //final check for non numbers within the stack
    var returnValue = null;
    while( stack.length > 0 ){
        console.log( stack );
        var element = stack.pop();  
        if(isNaN(element)){
            continue;
        } else{
            returnValue = element;
        }
    }
    return returnValue;
}

// postfixEval(['7.7','7','+']);
