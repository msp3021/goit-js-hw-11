import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const API_KEY = 'YOUR_API_KEY'; // Umieść swój klucz API tutaj
const form = document.getElementById('search-form');
const gallery = document.getElementById('gallery');
const loader = document.getElementById('loader');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  gallery.innerHTML = '';
  const query = event.target.elements.query.value.trim();
  if (!query) return;

  loader.classList.remove('hidden');
  
  try {
    const response = await fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`);
    const data = await response.json();
    if (data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message: 'Sorry, there are no images matching your search query. Please try again!',
      });
      loader.classList.add('hidden');
      return;
    }

    const markup = data.hits.map(hit => `
      <li class="gallery-item">
        <a href="${hit.largeImageURL}">
          <img src="${hit.webformatURL}" alt="${hit.tags}" />
        </a>
        <div class="info">
          <p>Likes: ${hit.likes}</p>
          <p>Views: ${hit.views}</p>
          <p>Comments: ${hit.comments}</p>
          <p>Downloads: ${hit.downloads}</p>
        </div>
      </li>
    `).join('');
    gallery.innerHTML = markup;

    const lightbox = new SimpleLightbox('.gallery a');
    lightbox.refresh();
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
    });
  } finally {
    loader.classList.add('hidden');
  }
});