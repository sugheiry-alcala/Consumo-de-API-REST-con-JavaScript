const API_URL_RANDOM = 'https://api.thedogapi.com/v1/images/search?limit=5&api_key=7c412e32-e580-49ed-be93-3de8e5961e92';
const API_URL_FAVOURITES = 'https://api.thedogapi.com/v1/favourites?/limit=5&api_key=7c412e32-e580-49ed-be93-3de8e5961e92';
const API_URL_FAVOURITES_DELETE = (id) => `https://api.thedogapi.com/v1/favourites/${id}?api_key=7c412e32-e580-49ed-be93-3de8e5961e92`;

const spanError = document.getElementById('error')

async function loadRandomPerris() {
  const res = await fetch(API_URL_RANDOM);
  const data = await res.json();

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status;
  } else {
    const section = document.getElementById('randowPerris');
    //Borrar los perris anteriores
    [...section.querySelectorAll('article')].map(article => article.remove());
    data.map(perris => {
      const article = document.createElement('article');
      const img = document.createElement('img');
      const btn = document.createElement('button');
      const btnText = document.createTextNode('Guardar al perris de favoritos');

      img.src = perris.url;
      img.width = 150;
      btn.addEventListener('click', () => saveFavouritePerris(perris.id));
      btn.appendChild(btnText);
      article.appendChild(img);
      article.appendChild(btn);
      section.appendChild(article);
    });
  }
}
async function loadFavouritePerris() {
  const res = await fetch(API_URL_FAVOURITES);
  const data = await res.json();
  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    const section = document.getElementById('favoritesPerris');
    section.innerHTML = "";
    const h2 = document.createElement('h2');
    const h2Text = document.createTextNode('Perris Favoritos'); 
    h2.appendChild(h2Text);
    section.appendChild(h2);

    data.map(perris => {
      const article = document.createElement('article');
      const img = document.createElement('img');
      const btn = document.createElement('button');
      const btnText = document.createTextNode('Sacar al perris de favoritos');

      img.src = perris.image.url;
      img.width = 150;
      btn.appendChild(btnText);
      btn.addEventListener('click', () => deleteFavouritePerris(perris.id)); 
      article.appendChild(img);
      article.appendChild(btn);
      section.appendChild(article);
    });
  }
}
async function saveFavouritePerris(id) {
  if (!id) return false;
  const res = await fetch(API_URL_FAVOURITES, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      image_id: id
    }),
  });
  const data = await res.json();

  console.log('SAVE')
  console.log(res)

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    console.log('Guardado en favoritos')
    loadFavouritePerris();
  }
}

async function deleteFavouritePerris(id) {
  const res = await fetch(API_URL_FAVOURITES_DELETE(id), {
    method: 'DELETE',
  });
  const data = await res.json();
  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    console.log('Eliminado de favoritos');
    loadFavouritePerris();
  }
}
loadRandomPerris();
loadFavouritePerris();

