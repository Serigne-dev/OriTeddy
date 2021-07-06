document.addEventListener('DOMContentLoaded', function() { // On écoute quand le document est chargé
  fetch(" http://localhost:3000/api/teddies")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    for (let teddy of value){

      let teddyHtml = document.getElementById("teddylist");

      let newA = document.createElement("a");
      newA.setAttribute ("href", "produits.html?id="+teddy._id);
      
      let newH2 = document.createElement("h2");
      newH2.innerHTML = teddy.name;
      newA.appendChild(newH2);
      teddyHtml.appendChild(newA);

      let newImg = document.createElement("img");
      newImg.src = teddy.imageUrl;
      newA.appendChild(newImg);


      let newP1 = document.createElement("p");
      newP1.innerHTML = teddy.description;
      teddyHtml.appendChild(newP1);

      let newP2 = document.createElement("p");
      newP2.innerHTML = teddy.price+"€";
      teddyHtml.appendChild(newP2);
    }
  })
  .catch(function(err) {
    // Une erreur est survenue
  });       
});

