document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const query = document.getElementById('search-input').value;
    searchImages(query);
});

function searchImages(query) {
    const API_KEY = '44858240-c00958abcea8d05c4a140bab8'; 
    const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true`;
    
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            if (data.hits.length === 0) {
                iziToast.error({
                    title: 'Error',
                    message: 'Sorry, there are no images matching your search query. Please try again!'
                });
            } else {
                displayImages(data.hits);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displayImages(images) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';
    
    images.forEach(image => {
        const card = document.createElement('div');
        card.classList.add('card');
        
        const imgLink = document.createElement('a');
        imgLink.href = image.largeImageURL;
        imgLink.dataset.lightbox = 'gallery';
        
        const img = document.createElement('img');
        img.src = image.webformatURL;
        img.alt = image.tags;
        
        imgLink.appendChild(img);
        
        const info = document.createElement('div');
        info.classList.add('info');
        
        const likes = document.createElement('p');
        likes.classList.add('likes');
        likes.textContent = `Likes ${image.likes}`;
        
        const views = document.createElement('p');
        views.classList.add('views');
        views.textContent = `Views ${image.views}`;
        
        const comments = document.createElement('p');
        comments.classList.add('comments');
        comments.textContent = `Comments ${image.comments}`;
        
        const downloads = document.createElement('p');
        downloads.classList.add('downloads');
        downloads.textContent = `Downloads ${image.downloads}`;
        
        info.appendChild(likes);
        info.appendChild(views);
        info.appendChild(comments);
        info.appendChild(downloads);
        
        card.appendChild(imgLink);
        card.appendChild(info);
        
        gallery.appendChild(card);
    });
    
    new SimpleLightbox('.gallery a');
}