export const menuModal = () => {
  const menuButton = document.querySelector('.header__menu-btn');
  const modal = document.querySelector('.modal');
  const menu = document.querySelector('.header__nav-menu');
  const menuButtonImg = menuButton.children[0];

  const openMenu = () => {
    menu.style.right = '0';
    menuButtonImg.src = './img/icons/close.svg';
    menuButtonImg.alt = 'Закрыть меню';
    modal.classList.remove('d-none');
  };

  const closeMenu = () => {
    menu.style.right = '-67%';
    menuButtonImg.src = './img/icons/burger.svg';
    menuButtonImg.alt = 'Открыть меню';
    modal.classList.add('d-none');
  };

  menuButton.addEventListener('click', () => {
    if (modal.classList.contains('d-none')) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  modal.addEventListener('click', closeMenu);
};
