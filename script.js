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


  const visaRegex = /^4/;
  const mastercardRegex = /^5[1-5]/;

  cardNumberInput.addEventListener('input', () => {updateCardNumberLabel();});

  cardHolderInput.addEventListener('input', () => {updateCardHolder();});
  cardMonthInput.addEventListener('input', () => {updateCardDate();});

  cardNumberInput.addEventListener('focus', () => {cardItemNumber.classList.add('bordered');});
  cardHolderInput.addEventListener('focus', () => {cardItemInfo.classList.add('bordered');});
  cardMonthInput.addEventListener('focus', () => {cardItemData.classList.add('bordered');});
  cardNumberInput.addEventListener('blur', () => {cardItemNumber.classList.remove('bordered');});
  cardHolderInput.addEventListener('blur', () => {cardItemInfo.classList.remove('bordered');});
  cardMonthInput.addEventListener('blur', () => {cardItemData.classList.remove('bordered');});

  cardYearInput.addEventListener('input', () => {
    updateCardDate();
  });

  cardCvvInput.addEventListener('input', () => {
    updateCvvBand();
  });

  submitButton.addEventListener('click', () => {
    toggleCardSide();
  });

  const cardNumberInp = document.getElementById('cardNumber');
  cardNumberInp.addEventListener('input', () => updateCardNumberLabel());

  const updateCardNumberLabel = () => {
      const cardNumberLabel = document.getElementById('cardNumberLabel');
      const cardNumberItems = cardNumberLabel.getElementsByClassName('card-item__numberItem');

      const inputText = cardNumberInput.value;
      const inputDigits = inputText.replace(/\D/g, ''); // Remove non-numeric characters

      for (var i = 0; i < cardNumberItems.length; i++) {
        if (i % 5 === 4) {
            cardNumberItems[i].textContent = ''; // Add empty space every 4 digits
        } else {
            if (i >= 4 && i <= 13) {
                cardNumberItems[i].textContent = '*'; // Replace # with * from 5th to 12th digit
            } else {
                cardNumberItems[i].textContent = inputDigits[i - Math.floor(i / 5)] || '#';
            }
        }
      }
  };

const updateCardHolder = () => {
  const cardHolderValue = cardHolderInput.value;
  const cardHolder = document.querySelector('.card-item__name');
  cardHolder.textContent = cardHolderValue || 'Full Name';
};

const updateCardDate = () => {
  const monthValue = cardMonthInput.value;
  const yearValue = cardYearInput.value.slice(-2);
  const isValidMonth = /^\d{2}$/.test(monthValue) && parseInt(monthValue, 10) >= 1 && parseInt(monthValue, 10) <= 12;
  const isValidYear = /^\d{2}$/.test(yearValue);
  const deleteYY = document.querySelector('.deleteYY');

  if (isValidMonth && isValidYear) {
    const cardDateItem = cardDate.querySelector('.card-item__dateItem span');
    cardDateItem.textContent = `${monthValue} ${yearValue}`;
    deleteYY.textContent = '';
    
  } else {
    console.log('Invalid date input');
  }
};

    const updateCardTypeBack = () => {
      cardTypeImgBack.src = "img/amex.png";
    };

  const updateCvvBandBack = () => {
    const cvvValue = cardCvvInput.value;
    const cvvBand = cardItemBack.querySelector('.card-item__cvvBand');
    cvvBand.textContent = cvvValue;
  };


const formatCardNumber = (value) => {
  return value.replace(/(\d{4})/g, '$1 ').trim();
};

  const toggleCardSide = () => {
    cardItem.classList.toggle('card-item__side--front');
    cardItem.classList.toggle('card-item__side--back');
    updateCardTypeBack(); 
    updateCvvBandBack(); 
  };

  //still in development
  if(cardNumberInput === visaRegex) {
    cardTypeImg.src = "img/mastercard.png";
  } else if (mastercardRegex.test(cardNumberInput.value)) {
    cardTypeImg.src = "img/mastercard.png";
  } else {
    cardTypeImg.src = "img/visa.png";
  }
});

const cardBack = document.getElementById('cardBack');
const cardCvv = document.getElementById('cardCvv');
const cardFront = document.getElementById("card-item__side__front");

const rotateCardBack = (cvv) => {
  const cardNumberInput = document.getElementById('cardNumber');
  const cardHolderInput = document.getElementById('cardHolder');
  const cardMonthInput = document.getElementById('cardMonth');
  const cardYearInput = document.getElementById('cardYear');

  [cardNumberInput, cardHolderInput, cardMonthInput, cardYearInput].forEach(inputField => {
    inputField.addEventListener('input', () => {
    
      const hasInput = [cardNumberInput, cardHolderInput, cardMonthInput, cardYearInput]
        .some(input => input.value.trim() !== '');

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
  'img/amex.png',
  'img/visa.png',
  'img/mastercard.png',
  'img/visa.png',
];

let currentImageIndex = 0;
    let cardTypeImg = document.getElementById('cardTypeImg');
    const changeImage = () => {
        cardTypeImg.style.opacity = 0;
        setTimeout(() =>{
            cardTypeImg.src = imageSources[currentImageIndex];
            currentImageIndex = (currentImageIndex + 1) % imageSources.length;
            cardTypeImg.style.opacity = 1;
        }, 500); 
    }
setInterval(changeImage, 5000);

document.getElementById('cardNumber').addEventListener('input', (e) => {
  let inputValue = e.target.value;
  let numericValue = inputValue.replace(/\D/g, '');

  if (inputValue !== numericValue) {
   
    e.target.value = numericValue;
  }
  
  let formattedValue = formatCardNumber(numericValue);
  e.target.value = formattedValue;
});

const formatCardNumber = (value) => {
  let formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
  return formattedValue ;
}

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


  let cardCvvInput = document.getElementById("cardCvv");

  cardCvvInput.addEventListener("input", (event) => {

    let inputValue = event.target.value;
    inputValue = inputValue.replace(/[^0-9]/g, '');

    if (inputValue.length > 4) {
      inputValue = inputValue.slice(0, 4);
    }
    cardCvvInput.value = inputValue;
  });