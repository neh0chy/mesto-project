// VARIABLES
const sectionProfile = document.querySelector('.profile');
const popupProfile = document.querySelector('.popup_type_profile');
const popupPlace = document.querySelector('.popup_type_place');
const popupImage = document.querySelector('.image-viewer');

const profilePopupOpenButton = sectionProfile.querySelector('.button-edit');
const profilePopupCloseButton = popupProfile.querySelector('.button-close');
const profilePopupSaveButton = popupProfile.querySelector('.button-submit');

const placePopupOpenButton = sectionProfile.querySelector('.button-new');
const placePopupCloseButton = popupPlace.querySelector('.button-close');
const placePopupSaveButton = popupPlace.querySelector('.button-submit');

const imageViewerCloseButton = popupImage.querySelector('.button-close');
const imageViewerSaveButton = popupImage.querySelector('.button-submit');

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


// CODE SECTION TO HANDLE USER SUBMITS

const popupFormProfile = popupProfile.querySelector('.popup__form');
const popupFormPlace = popupPlace.querySelector('.popup__form');

function profileFormHandler(evt) {
  evt.preventDefault();
  sectionProfile.querySelector('.profile__name').textContent = popupFormProfile.querySelector('.popup__input_field_name').value;
  sectionProfile.querySelector('.profile__description').textContent = popupFormProfile.querySelector('.popup__input_field_description').value;
  closePopup(popupProfile);
}

// CODE SECTION TO HANDLE NEW PLACE CREATION SUBMIT

const placeInput = popupPlace.querySelector('.popup__input_field_name');
const linkInput = popupPlace.querySelector('.popup__input_field_link');

const popupFieldName = popupFormPlace.querySelector('.popup__input_field_name');
const popupFieldJob = popupFormPlace.querySelector('.popup__input_field_link')

function createCardHandler(evt) {
  evt.preventDefault();
  const cardEdit = renderCard(placeInput.value, linkInput.value);
  cardTemplate.prepend(cardEdit);
  closePopup(popupPlace);
  popupFieldName.value = '';
  popupFieldJob.value = '';
}


// CODE SECTION TO RENDER NEW CARD BY EVERY ARRAY ITERATION

const cardTemplate = document.querySelector('.cards');

function renderCard(cardTitle, cardLink) {
  const cardContainer = document.querySelector('#card-template').content;
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


// FUNCTION TO OPEN IMAGE VIEWER

const viewerImage = popupImage.querySelector('.image-viewer__image');
const viewerCaption = popupImage.querySelector('.image-viewer__caption');

function openImageViewer (evt) {
  viewerImage.src = evt.target.src;
  viewerCaption.alt = evt.target.alt;
  viewerCaption.textContent = viewerCaption.alt;
  console.log(evt.target.alt);
  openPopup(popupImage);
}


// FUNCTIONS TO OPEN AND CLOSE POPUPS

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}


// EVENT LISTENERS

popupFormProfile.addEventListener('submit', profileFormHandler);
popupFormPlace.addEventListener('submit', createCardHandler);

profilePopupOpenButton.addEventListener('click', function() {
  openPopup(popupProfile);
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