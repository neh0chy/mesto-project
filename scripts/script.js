// ОБЩИЕ ПЕРЕМЕННЫЕ
const sectionProfile = document.querySelector('.profile');
const popupProfile = document.querySelector('.popup_type_profile');
const popupPlace = document.querySelector('.popup_type_place');
const popupImage = document.querySelector('.image-viewer');
const cardContainer = document.querySelector('#card-template').content;

const profilePopupOpenButton = sectionProfile.querySelector('.button-edit');
const profilePopupCloseButton = popupProfile.querySelector('.button-close');
const profilePopupSaveButton = popupProfile.querySelector('.button-submit');

const placePopupOpenButton = sectionProfile.querySelector('.button-new');
const placePopupCloseButton = popupPlace.querySelector('.button-close');
const placePopupSaveButton = popupPlace.querySelector('.button-submit');

const imageViewerCloseButton = popupImage.querySelector('.button-close');
const imageViewerSaveButton = popupImage.querySelector('.button-submit');

// ПЕРЕМЕННЫЕ ДЛЯ ОБРАБОТКИ САБМИТА РЕДАКТИРОВАНИЯ ПРОФИЛЯ
const popupFormProfile = popupProfile.querySelector('.popup__form');
const popupFormPlace = popupPlace.querySelector('.popup__form');
const profileName = sectionProfile.querySelector('.profile__name');
const profileDescription = sectionProfile.querySelector('.profile__description');
const popupInputName = popupFormProfile.querySelector('.popup__input_field_name');
const popupInputDescription = popupFormProfile.querySelector('.popup__input_field_description');

// ПЕРЕМЕННЫЕ ДЛЯ ОБРАБОТКИ САБМИТА СОЗДАНИЯ НОВОЙ КАРТОЧКИ
const placeInput = popupPlace.querySelector('.popup__input_field_name');
const linkInput = popupPlace.querySelector('.popup__input_field_link');

// ПЕРЕМЕННЫЕ РЕНДЕРА НОВОЙ КАРТОЧКИ
const cardTemplate = document.querySelector('.cards');

// ПЕРЕМЕННЫЕ ПРОСМОТОРЩИКА ИЗОБРАЖЕНИЯ
const viewerImage = popupImage.querySelector('.image-viewer__image');
const viewerCaption = popupImage.querySelector('.image-viewer__caption');


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// ЗАГРУЗКА ДАННЫХ О ПОЛЬЗОВАТЕЛЕ В ПОПАП
function loadProfileInfo () {
  popupInputName.setAttribute('value', profileName.textContent);
  popupInputDescription.setAttribute('value', profileDescription.textContent);
}

// ОБРАБОТКА САБМИТА ДЛЯ РЕДАКТИРОВАНИЯ ПРОФИЛЯ
function handleProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileDescription.textContent = popupInputDescription.value;
  closePopup(popupProfile);
  popupFormProfile.reset();
}

// ОБРАБОТКА САБМИТА ДЛЯ СОЗДАНИЯ НОВОЙ КАРТОЧКИ
function handleCardRender(evt) {
  evt.preventDefault();
  const cardEdit = renderCard(placeInput.value, linkInput.value);
  cardTemplate.prepend(cardEdit);
  closePopup(popupPlace);
  popupFormPlace.reset();
}


// РЕНДЕР НОВОЙ КАРТОЧКИ
function renderCard(cardTitle, cardLink) {
  const cardNew = cardContainer.cloneNode(true);
  const cardImage = cardNew.querySelector('.card__image');
  const cardCaption = cardNew.querySelector('.card__title');

  cardImage.src = cardLink;
  cardCaption.textContent = cardTitle;
  cardImage.alt = cardTitle;

  cardNew.querySelector('.button-like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('button-like_active');
  });
  cardNew.querySelector('.button-delete').addEventListener('click', function (evt) {
    evt.target.closest('.card').remove();
  });

  cardNew.querySelector('.card__image').addEventListener('click', openImageViewer);
  return cardNew;
}

initialCards.forEach(function (item) {
  const render = renderCard(item.name, item.link);
  cardTemplate.append(render);
});

// ОТКРЫТИЕ ПРОСМОТРА ИЗОБРАЖЕНИЯ
function openImageViewer (evt) {
  viewerImage.src = evt.target.src;
  viewerCaption.alt = evt.target.alt;
  viewerCaption.textContent = viewerCaption.alt;
  console.log(evt.target.alt);
  openPopup(popupImage);
}


// ОТКРЫТИЕ И ЗАКРЫТИЕ ПОПАПОВ
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}


// СОБЫТИЯ НА КНОПКАХ
popupFormProfile.addEventListener('submit', handleProfileForm);
popupFormPlace.addEventListener('submit', handleCardRender);

profilePopupOpenButton.addEventListener('click', function() {
  openPopup(popupProfile);
  loadProfileInfo();
});

profilePopupCloseButton.addEventListener('click', function() {
  closePopup(popupProfile);
});

placePopupOpenButton.addEventListener('click', function() {
  openPopup(popupPlace);
});

placePopupCloseButton.addEventListener('click', function() {
  closePopup(popupPlace);
});

imageViewerCloseButton.addEventListener('click', function() {
  closePopup(popupImage);
});