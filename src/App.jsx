import { useState } from 'react'

import './App.css'

function App() {
  const [valueInput, setValueInput] = useState(0);
  const [inputSplit, setInputSplit] = useState("");

  const handleChangeInputNum = (event) => {
    if (valueInput === 0) {
      setValueInput(event.target.value)
    } else {
      setValueInput(prev => prev += event.target.value)
    }
    
  }

  const handleChangeInputSign = (event) => {
    setValueInput(prev => prev += event.target.value)
  }

  const ClearDisplay = () => {
    setValueInput(0)
  }

  const handleInputDecimal = (e) => {
    
    if (valueInput === 0) {
      setValueInput(pre => pre + e.target.value)
    } else {
      const inputSplitArray = valueInput.split(/x|\/|\-|\+/g);
      const lastNumber = inputSplitArray[inputSplitArray.length - 1] ;
      const isValidDecimal = lastNumber.split("").filter(num => num === ".").length;
    
      if (isValidDecimal <= 0) {
      
        setValueInput(pre => pre + e.target.value)
      }
    }
    

    
  }

  const handleChangeInput0 = (e) => {

    if (valueInput === 0) {
      return null
    } else {
      const inputSplitArray = valueInput.split(/x|\/|\-|\+/g);
      const lastNumber = inputSplitArray[inputSplitArray.length - 1];
      

      if (lastNumber != 0 || lastNumber.length < 1 || lastNumber.includes(".") ) {
      setValueInput(pre => pre + e.target.value)
      }
    }
    


  }

  const performDiv = (a, b) => {
    const result = parseFloat(a / b);
    return result
  }

  const performMult = (a, b) => {
    const result = parseFloat(a * b);
    return result
  }

  const performSub = (a, b) => {
    const result = parseFloat(a - b);
    return result
  }

  const performAdd = (a, b) => {
    const result = parseFloat(a + b);
    return result
  }


  const decimalHandle = (result) => {   
    
    const decimalIndex = result.toString().search(/\./)    
    const resultDecimals = result.toString().slice(decimalIndex);  

    if ( resultDecimals.match(/\.\d{5,}\b/) ) {
        return setValueInput(result.toFixed(4));
    } else {
      return setValueInput(result);
    }
  }

  const performOp = () => {
    
    if (valueInput == 0) {
      setValueInput(0);
    } else if (valueInput < 0 ) {
      console.log("We need more character to perform a Valir Op");
      return null;
      

    } else if (valueInput.match(/[\d]+/g).length <= 1 ) {
      const inputDisplay = valueInput.match(/\d+/g);      
      console.log("We need more character to perform a Valir Op");
      return null;

    } else if (valueInput.match(/[\-*\d*\.]\+|\-|x|\/[\d+]/g).length ) {      
      const inputSplitArray = valueInput.split(/[x|\/|\-|\+]+/g);      
      const opSignsArray = valueInput.split(/[\d*\.\d*]/g).filter(sign => sign.match(/[x\/\+\-]/g) )
      
      if (inputSplitArray[0] == "" && opSignsArray[0] == "-") {
        inputSplitArray.splice(0, 1 , 0);
        
      }
      opSignsArray.map((sign, index) => {
        if (sign.length <= 1) {
          inputSplitArray.splice(((index *2)+1), 0, sign )
          
        } else if (sign.length > 1 && sign[sign.length - 1] == "-") {
          inputSplitArray.splice(((index *2)+1), 0, sign[sign.length - 2]);
          inputSplitArray.splice(((index *2)+2), 1, (inputSplitArray[(index * 2) + 2] *(-1)) );
          
        } else {
          inputSplitArray.splice(((index *2)+1), 0, sign[sign.length - 1]);
          
        }
        
      }) 
      
      if(inputSplitArray.includes("")) {
        
        console.log("Returning Null line 81")
        return null
      }
      while (inputSplitArray.includes("/")) {
        const indexOfSignDiv = inputSplitArray.indexOf("/");
        if(inputSplitArray.length > 3) {
          const resultDiv = performDiv(inputSplitArray[indexOfSignDiv - 1],  inputSplitArray[indexOfSignDiv + 1]);
          inputSplitArray.splice((indexOfSignDiv - 1), 3 , resultDiv);
          
        } else {
          const resultDiv = performDiv(inputSplitArray[0],  inputSplitArray[2]);
          return decimalHandle(resultDiv);
          
        }        
        
      }
        //work on the extra cases o double signs
      while (inputSplitArray.includes("x")) {
        const indexOfSignMult = inputSplitArray.indexOf("x");
        if(inputSplitArray.length > 3) {
          const resultMult = performMult(inputSplitArray[indexOfSignMult - 1],  inputSplitArray[indexOfSignMult + 1]);
          inputSplitArray.splice((indexOfSignMult - 1), 3 , resultMult);
          
        } else {
          const resultMult = performMult(inputSplitArray[0],  inputSplitArray[2]);
          return decimalHandle(resultMult);
          
        }
      }

      while (inputSplitArray.includes("-")) {
        const indexOfSignSub = inputSplitArray.indexOf("-");
        if(inputSplitArray.length > 3) {
          const resultSub = performSub(inputSplitArray[indexOfSignSub - 1],  inputSplitArray[indexOfSignSub + 1]);
          inputSplitArray.splice((indexOfSignSub - 1), 3 , resultSub);
          
        } else {
          const resultSub = performSub(inputSplitArray[0],  inputSplitArray[2]);
          return decimalHandle(resultSub);
          
        }
      }

      while (inputSplitArray.includes("+")) {
        const indexOfSignAdd = inputSplitArray.indexOf("+");
        if(inputSplitArray.length > 3) {
          const resultAdd = performAdd(parseFloat(inputSplitArray[indexOfSignAdd - 1]),  parseFloat(inputSplitArray[indexOfSignAdd + 1]));
          inputSplitArray.splice((indexOfSignAdd - 1), 3 , resultAdd);
          
        } else {
          const resultAdd = performAdd(parseFloat(inputSplitArray[0]),  parseFloat(inputSplitArray[2]));
          return decimalHandle(resultAdd);
          
        }
      }


      
    } else {
      return null
    }
    
  }

  return (
    <>
      <div className='calculator-wrapper'>
        <input type="text" name="number" id="display" placeholder='0' disabled onChange={(e) => handleChangeInput(e)} value={valueInput}/>
        <div className='btn-wrapper'>
          <button className="btn ac" id='clear' onClick={ClearDisplay}>AC</button>
          <button className="btn sign" id='divide' value={`/`} onClick={(e) => handleChangeInputSign(e)}>&#247;</button>
          <button className="btn sign" id='multiply' value={`x`} onClick={(e) => handleChangeInputSign(e)} >&#215;</button>
          <button className="btn" id='seven' value={7} onClick={(e) => handleChangeInputNum(e)}>7</button>
          <button className="btn" id='eight' value={8} onClick={(e) => handleChangeInputNum(e)}>8</button>
          <button className="btn" id='nine' value={9} onClick={(e) => handleChangeInputNum(e)}>9</button>
          <button className="btn sign" id='subtract' value={`-`} onClick={(e) => handleChangeInputSign(e)}>&#45;</button>
          <button className="btn" id='four' value={4} onClick={(e) => handleChangeInputNum(e)}>4</button>
          <button className="btn" id='five' value={5} onClick={(e) => handleChangeInputNum(e)}>5</button>
          <button className="btn" id='six' value={6} onClick={(e) => handleChangeInputNum(e)}>6</button>
          <button className="btn sign" id='add' value={`+`} onClick={(e) => handleChangeInputSign(e)}>&#43;</button>
          <button className="btn" id='one' value={1} onClick={(e) => handleChangeInputNum(e)}>1</button>
          <button className="btn" id='two' value={2} onClick={(e) => handleChangeInputNum(e)}>2</button>
          <button className="btn" id='three' value={3} onClick={(e) => handleChangeInputNum(e)}>3</button>
          <button className="btn equal" id='equals' onClick={performOp}>&#61;</button>
          <button className="btn zero" id='zero' value={0} onClick={(e) => handleChangeInput0(e)}>0</button>
          <button className="btn" id='decimal' value={`.`} onClick={(e) => handleInputDecimal(e)}>.</button>
        </div>

      </div>
      <div id="showResults">{inputSplit}</div>

        
    </>
  )
}

export default App
