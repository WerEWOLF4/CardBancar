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

  cardNumberInput.addEventListener('input', () => {
    updateCardNumberLabel();
    updateCardType();
  });

  cardHolderInput.addEventListener('input', () => {
    updateCardHolder();
  });

  cardMonthInput.addEventListener('input', () => {
    updateCardDate();
  });

  cardYearInput.addEventListener('input', () => {
    updateCardDate();
  });

  cardCvvInput.addEventListener('input', () => {
    updateCvvBand();
  });

  submitButton.addEventListener('click', () => {
    toggleCardSide();
  });

  const updateCardNumberLabel = () => {
    let cardNumberValue = cardNumberInput.value;
    cardNumberValue = cardNumberValue.replace(/\D/g, ''); 
    cardNumberValue = cardNumberValue.slice(0, 16); 
    const formattedNumber = formatCardNumber(cardNumberValue);
    cardNumberLabel.textContent = formattedNumber;
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

  if (isValidMonth && isValidYear) {
    const expirationDate = `${monthValue} / ${yearValue}`;
    const cardDateItem = cardDate.querySelector('.card-item__dateItem');
    cardDateItem.textContent = expirationDate;
  } else console.log('Invalid date input');
};

    const updateCardTypeBack = () => {
      cardTypeImgBack.src = 'img/mastercard.png';
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

});


const cardBack = document.getElementById('cardBack');
const cardCvv = document.getElementById('cardCvv');

const rotateCardBack = (cvv) => {
 
  if (cvv.trim() !== '') {
    
    cardBack.style.transform = 'perspective(2000px) rotateY(0deg) rotateX(0deg) rotate(0deg)';

  } else {
    cardBack.style.transform = 'perspective(2000px) rotateY(-180deg) rotateX(0deg) rotate(0deg)';
  
  }
}

cardCvv.addEventListener('input', () => {
  rotateCardBack(cardCvv.value);
});

const updateCvvBand = () => {
  
  let cvvInput = document.getElementById("cardCvv").value;


  let cvvBandText = document.getElementById("cvvBandValue");
  cvvBandText.textContent = cvvInput;
}

let cardCvvInput = document.getElementById("cardCvv");
cardCvvInput.addEventListener("input", updateCvvBand ());
