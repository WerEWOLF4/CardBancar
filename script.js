document.addEventListener('DOMContentLoaded', () => {
  const cardNumberInput = document.getElementById('cardNumber');
  const cardHolderInput = document.getElementById('cardHolder');
  const cardMonthInput = document.getElementById('cardMonth');
  const cardYearInput = document.getElementById('cardYear');
  const cardCvvInput = document.getElementById('cardCvv');
  const cardDate = document.getElementById('cardDate');
  const cardNumberLabel = document.getElementById('cardNumberLabel');
  const cardCvvBand = document.querySelector('.card-item__cvvBand');
  const cardItem = document.getElementById('cardItem');
  const submitButton = document.querySelector('.card-form__button');
  const cardItemBack = document.querySelector('.card-item__side.-back');
  const cardTypeImgBack = cardItemBack.querySelector('.card-item__typeImg');
  const cardTypeImg = document.querySelector('.card-item__typeImg');
  const cardItemNumber = document.querySelector('#Numbers');
  const cardItemInfo = document.querySelector('.card-item__info');
  const cardItemData = document.querySelector('.card-item__date');
  const cardNumberInp = document.getElementById('cardNumber');
  const cardNumberYear = document.getElementById('cardYear');



  cardNumberInput.addEventListener('input', () => {updateCardNumberLabel();});
  cardHolderInput.addEventListener('input', () => {updateCardHolder();});
  cardMonthInput.addEventListener('input', () => {updateCardDate();});
  cardYearInput.addEventListener('input', () => {updateCardDate();});


  cardNumberInput.addEventListener('focus', () => {cardItemNumber.classList.add('bordered');});
  cardHolderInput.addEventListener('focus', () => {cardItemInfo.classList.add('bordered');});
  cardMonthInput.addEventListener('focus', () => {cardItemData.classList.add('bordered');});
  cardNumberYear.addEventListener('focus', () => {cardItemData.classList.add('bordered');});

  cardNumberInput.addEventListener('blur', () => {cardItemNumber.classList.remove('bordered');});
  cardHolderInput.addEventListener('blur', () => {cardItemInfo.classList.remove('bordered');});
  cardMonthInput.addEventListener('blur', () => {cardItemData.classList.remove('bordered');});
  cardNumberYear.addEventListener('blur', () => {cardItemData.classList.remove('bordered');});


  cardYearInput.addEventListener('input', () => {updateCardDate();});
  cardCvvInput.addEventListener('input', () => {updateCvvBand();});
  submitButton.addEventListener('click', () => {toggleCardSide();});

  
  cardNumberInp.addEventListener('input', () => updateCardNumberLabel());


  const updateCardNumberLabel = () => {
    let inputText = cardNumberInput.value;
    let inputDigits = inputText.replace(/\D/g, '');
  
    let maskedInput;
    if (inputDigits.startsWith('3')) {
      maskedInput = maskAmexFormat(inputDigits); 
    } else {
      maskedInput = maskMiddleDigits(inputDigits);
    }
  
    const spanElements = cardNumberLabel.querySelectorAll('.card-item__numberItem');
    for (let i = 0; i < spanElements.length; i++) {
      if (i < maskedInput.length) {
        if (spanElements[i].textContent !== maskedInput[i]) {
          animateTextChange(spanElements[i], maskedInput[i]);
          spanElements[i].textContent = maskedInput[i];
        }
      } else {
        if ((i + 1) % 5 === 0) {
          spanElements[i].textContent = ''; 
        } else {
          spanElements[i].textContent = '#';
        }
      }
    }
  };
  const maskAmexFormat = (inputDigits) => {
    const indices = [
      new Array(4).fill(0).map((_, j) => j),
      new Array(6).fill(0).map((_, j) => j + 4),
      new Array(5).fill(0).map((_, j) => j + 10)
    ];

    const maskedChunks = indices.map(indicesSet => {
        return indicesSet.map(index => {
            if (index >= 4 && index <= 9) {
                return inputDigits.charAt(index).replace(/\d/g, '*') || '#';
            } else {
                return inputDigits.charAt(index) || '#';
            }
        }).join('');
    });

    return maskedChunks.join('  ');
};

  
const maskMiddleDigits = (inputDigits) => {
  let maskedString = "";

  for (let i = 0; i < inputDigits.length; i += 4) {
    const chunk = inputDigits.slice(i, i + 4);
    maskedString += (i === 4 || i === 8) ?
      chunk.replace(/\d/g, '*') || '#' :
      chunk || '#';

    if (i < inputDigits.length - 4) {
      maskedString += " ";
    }
  }

  return maskedString;
};
  

  
  const updateCardHolder = () => {
    const cardHolderValue = cardHolderInput.value;
    const cardHolder = document.querySelector('.card-item__name');
    cardHolder.textContent = cardHolderValue || "Full Name"
  };
  
  const animateTextChange = (element) =>{
    element.classList.add('text-change-animation');
    setTimeout(() => {
      element.classList.remove('text-change-animation');
    }, 500);
  }
  
  const cardMonthSelect = document.getElementById("cardMonth");
  const cardYearSelect = document.getElementById("cardYear");
  const cardDateItemMM = document.querySelector('.card-item__dateItem .deleteMM');
  const cardDateItemYY = document.querySelector('.card-item__dateItem .deleteYY');
  
  const updateCardDate = () => {
    const selectedMonth = cardMonthSelect.value || 'MM';
    const selectedYear = (cardYearSelect.value || '').slice(-2);
  
    cardDateItemMM.textContent = selectedMonth;
    cardDateItemYY.textContent = selectedYear || 'YY';
  }
  
  cardMonthSelect.addEventListener("change", updateCardDate);
  cardYearSelect.addEventListener("change", updateCardDate);

    const updateCardTypeBack = () => {
      cardTypeImgBack.src = "img/amex.png";
    };

  const updateCvvBandBack = () => {
    const cvvValue = cardCvvInput.value;
    const cvvBand = cardItemBack.querySelector('.card-item__cvvBand');
    cvvBand.textContent = cvvValue;
  };

  const toggleCardSide = () => {
    cardItem.classList.toggle('card-item__side--front');
    cardItem.classList.toggle('card-item__side--back');
    updateCardTypeBack(); 
    updateCvvBandBack(); 
  };
});

const cardBack = document.getElementById('cardBack');
const cardCvv = document.getElementById('cardCvv');
const cardFront = document.getElementById("card-item__side__front");

const rotateCardBack = () => {

  [cardCvv].forEach(inputField => {
    inputField.addEventListener('input', () => {
    
      const hasInput = [cardCvv]
        .some(input => input.value.trim() === '');

        cardBack.style.transform = hasInput
        ? 'perspective(2000px) rotateY(-180deg) rotateX(0deg) rotate(0deg)'
        : 'perspective(2000px) rotateY(0deg) rotateX(0deg) rotate(0deg)';

      cardFront.style.transform = hasInput
        ? 'perspective(2000px) rotateY(0deg) rotateX(0deg) rotate(0deg)'
        : 'perspective(2000px) rotateY(-180deg) rotateX(0deg) rotate(0deg)';
    });
  });
}

cardCvv.addEventListener('input', () => {
  rotateCardBack(cardCvv.value);
});

cardCvv.addEventListener("blur", () => {
  cardBack.style.transform = 'perspective(2000px) rotateY(-180deg) rotateX(0deg) rotate(0deg)';
  cardFront.style.transform = 'perspective(2000px) rotateY(0deg) rotateX(0deg) rotate(0deg)';
})

cardCvv.addEventListener("focus", () => {
  cardBack.style.transform = 'perspective(2000px) rotateY(0deg) rotateX(0deg) rotate(0deg)';
  cardFront.style.transform = 'perspective(2000px) rotateY(-180deg) rotateX(0deg) rotate(0deg)';
})

const updateCvvBand = () => {
  const cvvInput = cardCvv.value;

  const maskedCvv = cvvInput.replace(/./g, '*');

  const cvvBandText = document.getElementById("cvvBandValue");
  cvvBandText.textContent = maskedCvv;
}

cardCvv.addEventListener("input", updateCvvBand);

let imageSources = [
  'img/visa.png',
  'img/amex.png',
  'img/mastercard.png',
];

let currentImageIndex = 0;
let cardTypeImg = document.getElementById('cardTypeImg');
let isFirstDigitIntroduced = false;

cardTypeImg.src = imageSources[currentImageIndex];

const cardNumberInput = document.getElementById('cardNumber');
cardNumberInput.addEventListener('input', () => {
  const firstDigit = cardNumberInput.value.charAt(0);

  if (!isFirstDigitIntroduced && firstDigit) {
      let newIndex;

      switch (firstDigit) {
          case '3':
              newIndex = 1;
              break;
          case '4':
              newIndex = 0;
              break;
          case '5':
              newIndex = 2;
              break;
          default:
              newIndex = 0;
      }

      if (newIndex !== currentImageIndex) {
          cardTypeImg.style.opacity = 0;
          setTimeout(() => {
              cardTypeImg.src = imageSources[newIndex];
              cardTypeImg.style.opacity = 1;
              currentImageIndex = newIndex;
              isFirstDigitIntroduced = true;
          }, 500); 
      }
  } else if (!firstDigit) {
   
      if (currentImageIndex !== 0) {
          cardTypeImg.style.opacity = 0;
          setTimeout(() => {
              cardTypeImg.src = imageSources[0];
              cardTypeImg.style.opacity = 1;
              currentImageIndex = 0;
              isFirstDigitIntroduced = false;
          }, 500);
      }
  }
});

document.getElementById('cardNumber').addEventListener('input', (e) => {
  let inputValue = e.target.value;
  let numericValue = inputValue.replace(/\D/g, '');

 
  if (numericValue.startsWith('3')) {
    numericValue = numericValue.substring(0, 15);
  }

 
  if (numericValue.startsWith('3')) {
   
    let formattedValue = formatAmexCardNumberInstant(numericValue);
    e.target.value = formattedValue;
  } else {
   
    let formattedValue = formatDefaultCardNumberInstant(numericValue);
    e.target.value = formattedValue;
  }
});

const formatAmexCardNumberInstant = (value) => {
  
  let formattedValue = value.replace(/^(\d{4})(\d{6})?(\d{0,5})?$/, '$1 $2 $3').trim();
  return formattedValue;
};

const formatDefaultCardNumberInstant = (value) => {
  
  let formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
  return formattedValue;
};

document.addEventListener("DOMContentLoaded", () => {
  
  let cardItemName = document.querySelector(".card-item__name");
  let cardHolderInput = document.getElementById("cardHolder");

  cardHolderInput.addEventListener("input", (e) => {

    let content = cardItemName.innerText;
    let inputValue = e.target.value;
    inputValue = inputValue.replace(/[^a-zA-Z ]/g, '');
    cardHolderInput.value = inputValue.replace(/[^a-zA-Z ]/g, '');
    let sanitizedContent = content.replace(/[^a-zA-Z ]/g, '');
    
    cardItemName.innerText = sanitizedContent || "Full Name";
  });
});

const detectCardType = () => {
  let cardNumberInput = document.getElementById('cardNumber');
  let firstDigit = cardNumberInput.value.charAt(0);
  let cardTypeImage = document.getElementById("backImage");

  if (firstDigit === '3') {
      cardTypeImage.src = 'img/amex.png';
  } else {
      cardTypeImage.src = 'img/mastercard.png';
  }
}


document.getElementById('cardNumber').addEventListener('input', detectCardType);
  
const cardCvvInput = document.getElementById("cardCvv");

cardCvvInput.addEventListener("input", (event) => {
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/[^0-9]/g, '');
    cardCvvInput.value = inputValue;
});

