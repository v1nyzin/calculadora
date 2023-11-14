const previousOperationText = document.querySelector("#previous-operantion");
const currentOperationtext = document.querySelector("#curret-operantion");
const buttons = document.querySelectorAll("#button-container button");

class Calculator {
    constructor(previousOperationText, currentOperationtext) {
        this.previousOperationText = previousOperationText
        this.currentOperationtext = currentOperationtext
        this.currentOperation = ""
    }
    //ADD DIGIT TO CALCULAATOR SCREEN
    addDigit(digit) {
        //CHECK IF CURRENT OPERATION ALREADY HAS A DOT
        if (digit === "." && this.currentOperationtext.innerText.includes(".")) {
            return
        }

        this.currentOperation = digit
        this.updateScreen()
    }

    //PROCESS ALL CALCULATOR OPERATIONS
    processOperation(operation) {
        // CKECK IF CURRENT IS EMPTY
        if(this.currentOperationtext.innerText === "" && operation !== "C") {   
              // CHENGE OPERATION
            if(this.previousOperationText.innerText !== "") {
                this.changeOperation(operation);
            }
            return;
        }

        //GET CURRET AND PREVIUS VALUE
        let operationValue
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationtext.innerText;

        switch (operation) {
            case "+":
                operationValue = previous + current
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "-":
                operationValue = previous - current
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "/":
                operationValue = previous / current
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "*":
                operationValue = previous * current
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "DEL":
            this.processDelOperator();
                break;
            case "CE":
            this.processClearCurrentOperation();
                break;
            case "C":
            this.processClearOperation();
                break;
            case "=":
            this.processEqualOperator();
                break;
            default:
                return;
        }
    }

    //CHANGE VALUE OF THE CALCULATOR SCREEN
    updateScreen(operationValue = null, operantion = null, current = null, previous = null) {

        console.log(operationValue, operantion, current, previous)

        if (operationValue === null) {
            this.currentOperationtext.innerText += this.currentOperation;
        } else {
            //CKECK IF VALUE IS ZERO, IF IT IS JUST CURRNT VALUE
            if (previous === 0) {
                operationValue = current
            }
            //ADD CURRENT VALUE TO PREVIOUS
            this.previousOperationText.innerText = `${operationValue} ${operantion}`
            this.currentOperationtext.innerText = "";
        }
    }

    // CHANGE MATH OPERATION
    changeOperation(operantion) {

        const mathOperations = ["*", "/", "+", "-"]

        if(!mathOperations.includes(operantion)) {
            return
        }
        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operantion;
    }
    // DELETE THE LAST DIGIT
    processDelOperator(){
        this.currentOperationtext.innerText = this.currentOperationtext.innerText.slice(0, -1)
    }
    //CLEAR CURRENT OPERATION
    processClearCurrentOperation() {
        this.currentOperationtext.innerText = ""
    }
    //CLEAR ALL OPERATIONS
    processClearOperation() {
        this.currentOperationtext.innerText = ""
        this.previousOperationText.innerText = ""
    }
    //PROCESS AN OPERATION
    processEqualOperator() {
        const operantion = previousOperationText.innerText.split(" ")[1]

        this.processOperation(operantion)
    }

}

const calc = new Calculator(previousOperationText, currentOperationtext);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {

        const value = e.target.innerText;

        if (+value >= 0 || value === ".") {
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    })
})