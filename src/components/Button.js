const Button = ({ btn, input, setInput, currentNumber, setCurrentNumber, setOperator, dispensePressed, setDispensePressed }) => {

    const className = `btn ${btn.class}`;

    //safe version of the eval() function
    const safeEval = (newInput) => {
        //return if input is empty
        if (!input) {
            return currentNumber;
        }

        const inputArray = newInput ? newInput.split(' ') : input.split(' ');
        const numbers = [];
        const operators = [];

        //capture numbers and operators from input state
        for (let i = 0; i < inputArray.length; i++) {
            if (!isNaN(inputArray[i])) {
                numbers.push(parseFloat(inputArray[i]));
            } else if (inputArray[i].match(/^(\+|-)$/)) {
                operators.push(inputArray[i]);
            }
        }

        // calculate sum from current inputs
        const reducer = (total, value, index) => {
            switch (operators[index - 1]) {
                case '-':
                    return total - value;
                case '+':
                    return total + value;
                default:
                    return total;
            }
        }

        return numbers.reduce(reducer);
    }

    // reset state to intial settings
    const resetState = () => {
        setInput('');
        setCurrentNumber('0');
        setOperator(undefined);
        setDispensePressed(false);
    }

    // add new numbers to state
    const appendNumber = num => {
        if (equalPressed) {
            setCurrentNumber(`${num}`);
            setInput(`${num}`);
            setDispensePressed(false);
        } else if (currentNumber === '0') {
            setCurrentNumber(`${num}`);
            setInput(`${input}${num}`);
        } else {
            setCurrentNumber(`${currentNumber}${num}`);
            setInput(`${input}${num}`);
        }
    }

    // calculate current sum in the input state
    const calculateSum = () => {
        setEqualPressed(true);
        let newInput = undefined;
        
        // remove operator if input ends in one
        if (input.endsWith('</span> ')) {
            newInput = input.substring(0, input.length - 35);
            setInput(newInput);
        }
        setCurrentNumber(safeEval(newInput));
    }

    // action response to button clicks
    const handleClick = (value, type) => {
        switch (type) {
            case 'reset':
                resetState();
                break;
            case 'zero':
            case 'number':
                // do not allow number to start with zero
                if (type === 'zero' && currentNumber === '0') {
                    break;
                } else {
                    appendNumber(value);
                }
                break;
            case 'operator':
                appendOperator(value);
                break;
            case 'decimal':
                addDecimal();
                break;
            case 'equals':
                calculateSum();
                break;
            default:
                break;
        }
    }

    return (
        <button className={className} id={btn.id} onClick={() => handleClick(btn.label, btn.class)}>
            {btn.label}
        </button>
    );
}

export default Button;