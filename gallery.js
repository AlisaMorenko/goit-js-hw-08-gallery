import img from './gallery-items.js';

const galleryEl = document.querySelector('.js-gallery');
const lightboxEl = document.querySelector('.js-lightbox');
const lightboxImageEl = document.querySelector('.lightbox__image');
const closeButtonEl = document.querySelector('[data-action="close-lightbox"]');

// Создание и рендер разметки по массиву данных и предоставленному шаблону.

const imagesMarkup = createImagesMarkup(img);
galleryEl.insertAdjacentHTML('afterbegin', imagesMarkup);

function createImagesMarkup(img) {
  return img
    .map(({ preview, original, description }) => {
      return `
        <li class="gallery__item">
          <a
            class="gallery__link"
            href="${original}"
          >
            <img
              class="gallery__image"
              src="${preview}"
              data-source="${original}"
              alt="${description}"
            />
          </a>
        </li>
      `;
    })
    .join(' ');
}
// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// Открытие модального окна по клику на элементе галереи.
// Подмена значения атрибута src элемента img.lightbox__image.

galleryEl.addEventListener('click', OnImageClick);

function OnImageClick(e) {
  e.preventDefault();
  lightboxEl.classList.add('is-open');
  lightboxImageEl.src = e.target.dataset.source;
  lightboxImageEl.alt = e.target.alt;
}

// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.

closeButtonEl.addEventListener('click', OnCloseButtonClick);

function OnCloseButtonClick() {
  lightboxEl.classList.remove('is-open');
  lightboxImageEl.src = '';
  lightboxImageEl.alt = '';
}
