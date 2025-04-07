import { getState, getCountry } from './locale.js';

document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');
  const wheel = document.querySelector('.wheel');
  const spinBtn = document.querySelector('.spinBtn');
  const modal = document.querySelector('.modal');
  const modalOverlay = document.querySelector('.modalOverlay');
  const modalText = document.querySelector('.modalText');

  let deg = 0;


  const beepSound = new Audio('./assets/beep.mp3');  

  const getInfo = () => {
    const userCountry = getCountry();
    const userState = getState();
    modalText.textContent = `الدولة: ${userCountry} - المنطقة: ${userState}`;
  };

  const showModal = () => {
    modal.classList.remove('hideModal');
    modalOverlay.classList.remove('hideModal');
    body.classList.add('bodyOverflow');
    getInfo();
    beepSound.play();  
  };

  const hideModal = () => {
    modal.classList.add('hideModal');
    modalOverlay.classList.add('hideModal');
    body.classList.remove('bodyOverflow');
  };

  spinBtn.addEventListener('click', () => {
    spinBtn.disabled = true;               
    deg = Math.floor(Math.random() * 360) + 3600; 
    wheel.style.transition = 'transform 4s ease-out';
    wheel.style.transform = `rotate(${deg}deg)`;
  });

  wheel.addEventListener('transitionend', () => {
    spinBtn.disabled = false;             
    wheel.style.transition = 'none';     
    const actualDeg = deg % 360;
    wheel.style.transform = `rotate(${actualDeg}deg)`;
    showModal();                           
  });

  modalOverlay.addEventListener('click', hideModal);
});
