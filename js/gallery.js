'use strict';

// Заполнение фото от других пользователей
(function () {

  var gallery = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var filtersBlock = document.querySelector('.img-filters');
  var photos = [];

  var renderPhotoElement = function (photo) {
    var photoElement = pictureTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

    photoElement.addEventListener('click', function () {
      window.fullsize.open(photo);
    });

    photoElement.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, function () {
        window.fullsize.open(photo);
      });
    });

    return photoElement;
  };

  var renderPhotos = function (info) {
    var fragment = document.createDocumentFragment();

    info.forEach(function (item) {
      fragment.appendChild(renderPhotoElement(item));
      photos.push(item);
    });

    gallery.appendChild(fragment);
    photos = [];
    filtersBlock.classList.remove('img-filters--inactive');
  };

  window.backend.load(renderPhotos, window.infoPopups.showError);

  window.gallery = {
    photos: photos,
    renderPhotos: renderPhotos
  };
})();
