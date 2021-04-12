import img from './gallery-items.js';

const galleryEl = document.querySelector('.js-gallery');
const lightboxEl = document.querySelector('.js-lightbox');
const lightboxImageEl = document.querySelector('.lightbox__image');
const closeButtonEl = document.querySelector('[data-action="close-lightbox"]');

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

galleryEl.addEventListener('click', OnImageClick);

function OnImageClick(e) {
  if (!e.target.classList.contains('gallery__image')) {
    return;
  }
  closeButtonEl.addEventListener('click', OnCloseButtonClick);
  e.preventDefault();
  lightboxEl.classList.add('is-open');
  lightboxImageEl.src = e.target.dataset.source;
  lightboxImageEl.alt = e.target.alt;
}

function OnCloseButtonClick() {
  closeButtonEl.removeEventListener('click', OnCloseButtonClick);
  lightboxEl.classList.remove('is-open');
  lightboxImageEl.src = '';
  lightboxImageEl.alt = '';
}
