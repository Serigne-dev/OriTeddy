function getallTeddies{
  document.addEventListener('DOMContentLoaded', function() { // On écoute quand le document est chargé
    fetch(" http://localhost:3000/api/teddies")
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(value) {
      console.log("il y a " + value.length + " teddies"); // test
    printAllTeddies(value); //affiche ours
  })
    .catch(function(err) {
      console.log(err);
    });       
  });
}

/* affichage des ours */
function printAllTeddies(teddyList){
  for (let teddy of teddyList){

    let teddyHtml = document.getElementById("teddylist");

    let newDiv = document.createElement("div");
    newDiv.className = "teddyCard";

    let newA = document.createElement("a");
      // envoi vers page produit avec ID de l'ours dans l'URL
      newA.setAttribute ("href", "produits.html?id="+teddy._id); 
      
      let newH2 = document.createElement("h2");
      newH2.innerHTML = teddy.name;
      newA.appendChild(newH2);
      newDiv.appendChild(newA);

      let newImg = document.createElement("img");
      newImg.src = teddy.imageUrl;
      newA.appendChild(newImg);


      let newP1 = document.createElement("p");
      newP1.innerHTML = teddy.description;
      newDiv.appendChild(newP1);

      let newP2 = document.createElement("p");
      newP2.innerHTML = teddy.price+"€";
      newDiv.appendChild(newP2);

      teddyHtml.appendChild(newDiv);
    }
  }

  getallTeddies();