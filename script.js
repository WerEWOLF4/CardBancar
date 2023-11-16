 document.addEventListener('DOMContentLoaded', () => {
    const cardNumberInput = document.getElementById('cardNumber');
    const cardHolderInput = document.getElementById('cardHolder');
    const cardMonthInput = document.getElementById('cardMonth');
    const cardYearInput = document.getElementById('cardYear');
    const cardCvvInput = document.getElementById('cardCvv');
    const cardDate = document.getElementById('cardDate');
    const cardNumberLabel = document.getElementById('cardNumberLabel');
    const cardTypeImg = document.getElementById('cardTypeImg');
    const cardCvvBand = document.querySelector('.card-item__cvvBand');
    const cardItem = document.getElementById('cardItem'); 
    const submitButton = document.querySelector('.card-form__button');

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
      const cardNumberValue = cardNumberInput.value;
      const formattedNumber = formatCardNumber(cardNumberValue);
      cardNumberLabel.textContent = formattedNumber;
    };

    const updateCardHolder = () => {
      const cardHolderValue = cardHolderInput.value;
      const cardHolder = document.querySelector('.card-item__name');
      cardHolder.textContent = cardHolderValue || 'Full Name';
    };

    const updateCardType = () => {
      cardTypeImg.src = 'img/visa.png';
    };

    const updateCardDate = () => {
      const monthValue = cardMonthInput.value.padStart(2, '0');
      const yearValue = cardYearInput.value.slice(-2);
      const expirationDate = `${monthValue}/${yearValue}`;
      const cardDateItem = cardDate.querySelector('.card-item__dateItem');
      cardDateItem.textContent = expirationDate;
    };

    const updateCvvBand = () => {
      const cvvValue = cardCvvInput.value;
      const cvvBand = cardCvvBand;
      cvvBand.textContent = cvvValue;
    };

    const formatCardNumber = (value) => {
      return value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim();
    };

    const toggleCardSide = () => {
    };
  });