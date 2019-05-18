/* 
Activité 1-2-3
*/

// Liste des liens Web à afficher. Un lien est défini par :
// - son titre
// - son URL
// - son auteur (la personne qui l'a publié)
var listeLiens = [
  {
    titre: "So Foot",
    url: "http://sofoot.com",
    auteur: "yann.usaille"
  },
  {
    titre: "Guide d'autodéfense numérique",
    url: "http://guide.boum.org",
    auteur: "paulochon"
  },
  {
    titre: "L'encyclopédie en ligne Wikipedia",
    url: "http://Wikipedia.org",
    auteur: "annie.zette"
  }
];

//récupéation des données
fetch('https://oc-jswebsrv.herokuapp.com/api/liens').then(function(response) { 
	//  JSON parsed
	return response.json();
}).then(function(parsedLink) {
	// chaque objet est ajouté dans le tableau listeLiens
	listeLiens.unshift(...parsedLink)
}).then(function(){
  // le contenu du tableau est affiché sur la page 
  // seulement si listeLiens a bien été actualisé
  displayLink();
}).catch(function(err) {
  //si non, la cause de l'erreur est affichée dans la console.
  console.log(err);
});

const contenu = document.querySelector("#contenu");
const form = document.querySelector("form");
const add = document.querySelector("button");

function displayLink () { 
  for (let element of listeLiens) {

    const linkBloc = document.createElement("div");
    linkBloc.innerHTML = `<p> <h2><a href="${element.url}">${element.titre}</a></h2> 
    <span>${element.url}</span> </p> 
    <p> ajouté par ${element.auteur}</p>`;
    linkBloc.classList.add("lien");

    const h1 = linkBloc.querySelector("h2");
    const a = linkBloc.querySelector("a");
    h1.style.display = "inline";
    a.style.color = "#428bca";
    a.style.textDecoration = "none";

    contenu.appendChild(linkBloc);
    };
}

function addLink () {
  const link = {
    titre: form.elements[1].value,
    url: form.elements[2].value,
    auteur: form.elements[0].value
  };

  if (link.url.includes("http://") === true ||
  link.url.includes("https://") === true) {
    link
  }
  else {
    link.url = `https://${form.elements[2].value}`
  }
  
  listeLiens.unshift(link);
  
  fetch('https://oc-jswebsrv.herokuapp.com/api/lien', {
    method: 'POST',
    body: JSON.stringify(link),
    headers: {'Content-Type': 'application/json'}
  }).then(response => console.log(response)) 
    .then(function () {
      contenu.innerHTML = '';
      displayLink();
    })
    .catch(error => console.log(error));

}

function displayInfo() {
  const infoDiv = document.createElement("div");
  infoDiv.textContent = `Le lien "${form[1].value}" a bien été ajouté !`;
  const info = document.querySelector("#info");
  info.appendChild(infoDiv);
  form.style.display = "none";
   
  setTimeout( () => {
    infoDiv.remove();
    add.style.display = "initial";
  }, 2000);
}

form.addEventListener("submit",function (e) {
  e.preventDefault();
  addLink();
  displayInfo();
  form.reset();
});

add.addEventListener("click", function() {
  form.style.display ="initial";
  add.style.display = "none";
})
