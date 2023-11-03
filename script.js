const previousOperationText = document.querySelector("#previous-operantion")
const currentOperationText = document.querySelector("#curret-operantion")
const button = document.querySelectorAll("#button-container button")

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = "";
    }
    // add digit to calculator screen
    addDigit(digit) {
        // check if curret operation already has a dot 
        if (digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }

        this.currentOperation = digit
        this.updateSreen()
    }

    //Process all calculator operations
    processOperation(operation) {
        //Check if  current is empty
        if(this.currentOperationText.innerText === "" && operation !== "C") {
            //Change operation 
            if (this.previousOperationText.innerText !== "") {
                this.changeOperation(operation);
            }
            return;
        }

        // Get current and previous value
        let opeartionValue
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch (operation) {
            case "+":
                opeartionValue = previous + current
                this.updateSreen(opeartionValue, operation, current, previous)
                break;
            case "-":
                opeartionValue = previous + current
                this.updateSreen(opeartionValue, operation, current, previous)
                break;
            case "/":
                opeartionValue = previous + current
                this.updateSreen(opeartionValue, operation, current, previous);
                break;
            case "*":
                opeartionValue = previous + current
                this.updateSreen(opeartionValue, operation, current, previous);
                break;
            case "DEL":
                this.processDelOperator();
                break;
            case "CE":
                this.processClearCurrentOperaation();
                break;
            case "C":
                this.processClearAllOperation();
                break;
            case "=":
                this.processEqualOperator();
                break;
            default:
                return;
        }

    }


    //Change value of the calculator screen
    updateSreen(operantionValue = null, operation = null, current = null, previous = null) {

        if(operantionValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            // Check if value is zero, if it is just current value 

            if (previous === 0) {
                operantionValue = current
            }

            // Add current value to previous
            this.previousOperationText.innerText = `${operantionValue} ${operation}`;
            this.currentOperationText.innerText = "";
        }
    }

    // Chenge math operation 
    chengeoperation(operation) {
        const mathOperations = ["*", "/", "+", "-"]

        if(!mathOperations.includes(operation)) {
            return;
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }
    // Delete the last digit
    processDelOperator() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }
    // Clear current operation 
    processClearCurrentOperaation() {
        this.currentOperationText.innerText = "";
    }
    // Clear all operation 
    processClearAllOperation() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }
    // Process an operation
    processEqualOperator() {
        const operation = previousOperationText.innerText.split(" ")[1];

        this.processOperation(operation);
    }
}

const calc = new Calculator(previousOperationText, currentOperationText);

button.forEach((btn) => {
    btn.addEventListener("click", (e) => {

        const value = e.target.innerText;

        if (+value >= 0 || value === ".") {
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    });
});