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
  const cardInputInput = document.querySelector('.card-input__input');

  cardNumberInput.addEventListener('input', () => {updateCardNumberLabel();});
  cardHolderInput.addEventListener('input', () => {updateCardHolder();});

  cardMonthInput.addEventListener('input', () => {updateCardDate();});
  cardYearInput.addEventListener('input', () => {updateCardDate();});

  cardNumberInput.addEventListener('focus', () => {cardItemNumber.classList.add('bordered');});
  cardHolderInput.addEventListener('focus', () => {cardItemInfo.classList.add('bordered');});
  cardMonthInput.addEventListener('focus', () => {cardItemData.classList.add('bordered');});
  cardNumberInput.addEventListener('blur', () => {cardItemNumber.classList.remove('bordered');});
  cardHolderInput.addEventListener('blur', () => {cardItemInfo.classList.remove('bordered');});
  cardMonthInput.addEventListener('blur', () => {cardItemData.classList.remove('bordered');});

  cardCvvInput.addEventListener('input', () => {updateCvvBand();});
  submitButton.addEventListener('click', () => {toggleCardSide();});

  const updateCardNumberLabel = () => {
    let inputValue = cardInputInput.value.replace(/\D/g, '');
    inputValue = inputValue.slice(0, 16);
    const formatedValue = inputValue.replace(/(\d{4})/g, '$1 ').trim();
    cardInputInput.value = formatedValue;


  submitButton.addEventListener('click', () => {
    toggleCardSide();
  });

  let cardNumberInp = document.getElementById('cardNumber');
  cardNumberInp.addEventListener('input', updateCardNumber);

  const updateCardNumber = () => {
      let cardNumberLabel = document.getElementById('cardNumberLabel');
      let cardNumberItems = cardNumberLabel.getElementsByClassName('card-item__numberItem');

      let inputText = cardNumberInput.value;
      let inputDigits = inputText.replace(/\D/g, ''); // Remove non-numeric characters

      for (let i = 0; i < cardNumberItems.length; i++) {
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
  }

const updateCardHolder = () => {
  const cardHolderValue = cardHolderInput.value;
  const cardHolder = document.querySelector('.card-item__name');
  cardHolder.textContent = cardHolderValue || 'Full Name';
};

    let cardNumberValue = cardNumberInput.value;
    cardNumberValue = cardNumberValue.replace(/\D/g, ''); 
    cardNumberValue = cardNumberValue.slice(0, 16); 
    const formattedNumber = cardNumberValue.replace(/(\d{4})/g, '$1 ').trim();
    const hiddenNumbers = formattedNumber.slice(5, -5).replace(/\d/g, '*'); 
    const finalFormattedNumber = `${formattedNumber.slice(0, 5)}${hiddenNumbers}${formattedNumber.slice(-5)}`;
    cardNumberLabel.textContent = finalFormattedNumber;
  };


  const updateCardHolder = () => {
    const cardHolderValue = cardHolderInput.value;
    const cardHolder = document.querySelector('.card-item__name');
    cardHolder.textContent = cardHolderValue || 'Full Name';
  };

  const updateCardDate = () => {
  const monthValue = cardMonthInput.value;
  const yearValue = cardYearInput.value.slice(-2);
  const isValidMonth = /^\d{1,2}$/.test(monthValue) && parseInt(monthValue, 10) >= 1 && parseInt(monthValue, 10) <= 12;
  const isValidYear = /^\d{2}$/.test(yearValue);
  const deleteYY = document.querySelector('.deleteYY');
  const cardDateItem = cardDate.querySelector('.card-item__dateItem span');

  if (isValidMonth || isValidYear) {
    if (isValidMonth && isValidYear) {
      cardDateItem.textContent = `${monthValue} ${yearValue}`;
      deleteYY.textContent = '';
    } else if (isValidMonth) {
      cardDateItem.textContent = monthValue;
      deleteYY.textContent = 'YY';
    } else if (isValidYear) {
      cardDateItem.textContent = yearValue;
      deleteYY.textContent = 'MM';
    }
  } else {
    console.log('Invalid date input');
  }
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

  cardBack.style.transform = `perspective(2000px) rotateY(${cvv.trim() !== '' ? '0deg' : '-180deg'}) rotateX(0deg) rotate(0deg)`;
  cardFront.style.transform = `perspective(2000px) rotateY(${cvv.trim() !== '' ? '-180deg' : '0deg'}) rotateX(0deg) rotate(0deg)`;
}

cardCvv.addEventListener('input', () => {rotateCardBack(cardCvv.value);});

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