const inputBill = document.querySelector(".input-bill");
const buttonsListTable = document.querySelector(".input-buttons__buttons");
const clickButtonsList = document.getElementsByClassName("input-buttons__button");
const inputButton = document.querySelector(".input-buttons__button_custom");
const inputCountOfPeople = document.querySelector(".input-count-of-people");
const countTipAmount = document.querySelector(".input-count-tip-amount");
const countPerson = document.querySelector(".input-count-person");
const buttonReset = document.querySelector(".button-reset");

const state = {
  bill: null,
  tip: null,
  countOfPeople: null
}

const stateFocus = {
  wasBill: false,
  wasTip: false,
  wasCountOfPeople: false
}

const constants = {
  ZERO_COUNT: '0,00',
  VALUE_ZERO: '',
  BORDER_GREY: '1px solid grey',
  BORDER_RED: '1px solid red',
  BORDER_NONE: 'none',
  BACKGROUND_DARK_AZURE: 'rgb(0,71,75)',
  BACKGROUND_LIGHT_AZURE: 'rgb(38,194,173)',
}

const keysInState = {
  bill: 'bill',
  tip: 'tip',
  countOfPeople: 'countOfPeople',
  wasBill: 'wasBill',
  wasTip: 'wasTip',
  wasCountOfPeople: 'wasCountOfPeople',
}

function writingToState(valueInInput, keyInState, el){
  if(Number(valueInInput) < 0){
    const replaceUnnecessarySign = valueInInput.replace('-', '');
    el.value = replaceUnnecessarySign;
    state[keyInState] = Number(replaceUnnecessarySign);
    return
  }

  state[keyInState] = Number(valueInInput);
  checkFullnessState();
}

function zeroingOutRigthMonitor(){
  countTipAmount.value = constants.ZERO_COUNT;
  countPerson.value = constants.ZERO_COUNT;
}

function zeroingOutAllApp(){
  state.bill = null;
  state.tip = null;
  state.countOfPeople = null;

  inputBill.value = constants.VALUE_ZERO;
  inputBill.style.border = constants.BORDER_GREY;
  inputButton.value = constants.VALUE_ZERO;
  buttonsListTable.style.border = constants.BORDER_NONE;
  inputCountOfPeople.value = constants.VALUE_ZERO;
  inputCountOfPeople.style.border = constants.BORDER_GREY;
  countTipAmount.value = constants.ZERO_COUNT;
  countPerson.value = constants.ZERO_COUNT;
}

function checkLengthCount(allTip){
  const allTipForChecking = Math.floor(allTip);

  if(String(allTipForChecking).length < 7){
    countTipAmount.value = (allTip / state.countOfPeople).toFixed(1);
    countPerson.value = ((state.bill + allTip) / state.countOfPeople).toFixed(1);
  } else {
    countTipAmount.value = (allTip / state.countOfPeople).toExponential(1);
    countPerson.value = ((state.bill + allTip) / state.countOfPeople).toExponential(1);
  }
}

function checkFullnessState() {
  let isFull = false;
  let countPositionInState = 0;

  for (let key in state) {
    if (state[key]) {
      countPositionInState += 1;
    }
  }

  if (countPositionInState === 3) {
    isFull = true;
  }

  if (isFull) {
    const allTip = state.bill * (state.tip / 100);
    checkLengthCount(allTip);
  } else {
    zeroingOutRigthMonitor();
  }
}

function checkFocus(element, keyInState, keyInStateFocus){
  if(element === inputBill || element === inputCountOfPeople){
    element.style.border = constants.BORDER_GREY;
  } else {
    element.style.border = constants.BORDER_NONE;
  }
  
  if(!state[keyInState] && !stateFocus[keyInStateFocus]){
    element.style.border = constants.BORDER_RED;
  }
}

inputBill.addEventListener("input", () => {
  writingToState(inputBill.value, keysInState.bill, inputBill);
  checkFocus(inputBill, keysInState.bill, keysInState.wasBill);
})

Array.prototype.map.call(clickButtonsList, (el) => {
  el.addEventListener("click", () => {
    Array.prototype.map.call(clickButtonsList, (el) => {
      el.style.backgroundColor = constants.BACKGROUND_DARK_AZURE;
    })

    inputButton.value = constants.VALUE_ZERO;
    state.tip = Number(el.value.split('').slice(0, -1).join(''));
    el.style.backgroundColor = constants.BACKGROUND_LIGHT_AZURE;
    checkFullnessState();
    checkFocus(buttonsListTable, keysInState.tip, keysInState.wasTip);
  })
})

inputButton.addEventListener("input", () => {
  Array.prototype.map.call(clickButtonsList, (el) => {
    el.style.backgroundColor = constants.BACKGROUND_DARK_AZURE;
  })
  if (!inputButton.value) {
    state.tip = null;
  }

  writingToState(inputButton.value, keysInState.tip, inputButton);
  checkFocus(buttonsListTable, keysInState.tip, keysInState.wasTip);
})

inputCountOfPeople.addEventListener("input", () => {
  writingToState(inputCountOfPeople.value, keysInState.countOfPeople, inputCountOfPeople);
  checkFocus(inputCountOfPeople, keysInState.countOfPeople, keysInState.wasCountOfPeople);
})

buttonReset.addEventListener("click", () => {
  Array.prototype.map.call(clickButtonsList, (el) => {
    el.style.backgroundColor = constants.BACKGROUND_DARK_AZURE;
  })

  zeroingOutAllApp();
})