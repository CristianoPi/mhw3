function stampa(results, sez){
  
}
function onJson(json) {
  console.log('JSON1 ricevuto');
  console.log(json);
  // Leggi il numero di risultati
  let num_results = json.num_found;
  console.log("NUYMERO: "+num_results);
  const results = json.hits;
  const sez=document.querySelector(".s1");
  sez.innerHTML = '';
  if(results.length == 0)
    {
    const errore = document.createElement("h1"); 
    const messaggio = document.createTextNode("Nessun risultato!"); 
    errore.appendChild(messaggio); 
    sez.appendChild(errore);
    }

  // Processa ciascun risultato
  let i=0;
  for(result of results)
  {
    i++;
    const img_url = result.webformatURL;
    // Creiamo il div che conterrà immagine 
    const riga = document.createElement('div');
    riga.classList.add('riga');
    const numero = document.createElement('div');
    numero.classList.add('numero');
    numero.textContent = i+".";
    const istanza = document.createElement('istanza');
    istanza.classList.add('istanza');

    // Creiamo l'immagine
    const img = document.createElement('img');
    img.classList.add('foto');
    img.src = img_url;

    // Aggiungiamo immagine al div
    istanza.appendChild(img);
    riga.appendChild(numero);
    riga.appendChild(istanza);
    sez.appendChild(riga);

    //sez.insertBefore(riga, sez.firstChild);
  }
}
function onJson_gif(json) {
  console.log('JSON GIF ricevuto');
  console.log(json);
  const sez=document.querySelector(".s1");
  sez.innerHTML = '';
  // Leggi il numero di risultati
  const results = json.data

  if(results.length == 0)
  {
	const errore = document.createElement("h1"); 
	const messaggio = document.createTextNode("Nessun risultato!"); 
	errore.appendChild(messaggio); 
	sez.appendChild(errore);
  }
  let i=0;
  for(result of results)
  {
    i++;
    const img_url = result.images.downsized_large.url;
    // Creiamo il div che conterrà immagine 
    const riga = document.createElement('div');
    riga.classList.add('riga');
    const numero = document.createElement('div');
    numero.classList.add('numero');
    numero.textContent = i+".";
    const istanza = document.createElement('istanza');
    istanza.classList.add('istanza');

    // Creiamo l'immagine
    const img = document.createElement('img');
    img.classList.add('foto');
    img.src = img_url;

    // Aggiungiamo immagine al div
    istanza.appendChild(img);
    riga.appendChild(numero);
    riga.appendChild(istanza);
    sez.appendChild(riga);

    //sez.insertBefore(riga, sez.firstChild);
  }
}
function onResponse(response) {
  console.log('Risposta ricevuta');
  return response.json();
 
}


function search_img(event)
{
  // Impedisci il submit del form
  event.preventDefault();
  // Leggi valore del campo di testo
  const photo_input = document.querySelector('#photo');
  const photo_value = encodeURIComponent(photo_input.value);
  console.log('Eseguo ricerca: ' + photo_value);
  // Prepara la richiesta
  rest_url = 'https://pixabay.com/api/?key=35639613-13f0d441c1f3a6eed2bda39be&q=' + photo_value;
  console.log('URL: ' + rest_url);
  // Esegui fetch
  fetch(rest_url).then(onResponse).then(onJson);
}
function img_ani(event){
  event.preventDefault();
  const gif = document.querySelector('#gif');
  const text = encodeURIComponent(gif.value);
  console.log('Gif: ' + text);
  // Prepara la richiesta
  rest_url = 'http://api.giphy.com/v1/gifs/search?api_key=T8jk1cuGx5f0M6xdpMkKpj8VvpoR6G8r&q='+text+' wallpapers';
  console.log('URL: ' + rest_url);
  // Esegui fetch
  fetch(rest_url).then(onResponse).then(onJson_gif);
}



// Aggiungi event listener al form
const form1 = document.querySelector('#form1'); 
form1.addEventListener('submit', search_img);
const form2 = document.querySelector('#form2'); 
form2.addEventListener('submit', img_ani);
