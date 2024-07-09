import{i as o,S as m}from"./vendor-8c59ed88.js";const c="YOUR_API_KEY",d=document.getElementById("search-form"),n=document.getElementById("gallery"),r=document.getElementById("loader");d.addEventListener("submit",async t=>{t.preventDefault(),n.innerHTML="";const a=t.target.elements.query.value.trim();if(a){r.classList.remove("hidden");try{const s=await(await fetch(`https://pixabay.com/api/?key=${c}&q=${a}&image_type=photo&orientation=horizontal&safesearch=true`)).json();if(s.hits.length===0){o.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"}),r.classList.add("hidden");return}const l=s.hits.map(e=>`
      <li class="gallery-item">
        <a href="${e.largeImageURL}">
          <img src="${e.webformatURL}" alt="${e.tags}" />
        </a>
        <div class="info">
          <p>Likes: ${e.likes}</p>
          <p>Views: ${e.views}</p>
          <p>Comments: ${e.comments}</p>
          <p>Downloads: ${e.downloads}</p>
        </div>
      </li>
    `).join("");n.innerHTML=l,new m(".gallery a").refresh()}catch{o.error({title:"Error",message:"Something went wrong. Please try again later."})}finally{r.classList.add("hidden")}}});
//# sourceMappingURL=page2-226bc06c.js.map
