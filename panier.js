/* affichage du panier et du prix total */
function printBasket(){
    const currentBasket = JSON.parse(localStorage.getItem("basket")) || [];

    let prixTotal=0;

    for (let teddy of currentBasket){

        let teddyHtml = document.getElementById("resume");
        let newDiv = document.createElement("div");
        newDiv.className = "teddyCard";
        
        let newH2 = document.createElement("h2");
        newH2.innerHTML = teddy.name;
        newDiv.appendChild(newH2);

        let newImg = document.createElement("img");
        newImg.src = teddy.img;
        newDiv.appendChild(newImg);

        let newP2 = document.createElement("p");
        newP2.innerHTML = teddy.price +"€";
        newDiv.appendChild(newP2);

        teddyHtml.appendChild(newDiv);

        prixTotal+=teddy.price;
    }
    localStorage.setItem("totalPrice", JSON.stringify(prixTotal));
    let prixhtml = document.getElementById("prixtotal");
    prixhtml.innerHTML = " Prix total : " + prixTotal + " €";
}

/* recupere le panier et le contact (formulaire) puis valide la commande */
function validerCommand(){
    const getProductId = (basket) => basket.map(product => product.id); // renvoi la liste des id des teddy du panier
    let validerCommande = document.getElementById("form");

    /* ecoute le bouton valider commande */
    validerCommande.addEventListener('submit', function(e){
        e.preventDefault(); // bloque l'action par defaut qui est d'aller sur la page confirmation.html

    //creation de l'objet contact
    let contact = 
    {
        firstName: document.getElementById("prenom").value,
        lastName: document.getElementById("nom").value,
        address: document.getElementById("adresse").value,
        city: document.getElementById("ville").value,
        email: document.getElementById("email").value
    };

    //recupere le panier d'ours
    const currentBasket = JSON.parse(localStorage.getItem("basket")) || [];
        // cree une liste d'id des ours du panier
        const products = getProductId(currentBasket);

// envoi au serveur la commande
fetch("http://localhost:3000/api/teddies/order", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
  },
  body: JSON.stringify({ contact, products })
})
.then(function(res){
    if(res.ok){
        return res.json();
    }
})
.then(function(value){
    console.log("validation de la commande :" + value.orderId);
            localStorage.setItem("basket", JSON.stringify([]));//vide le panier
            localStorage.setItem("orderId", JSON.stringify(value.orderId)); // enregistre numero de commande dans  le local storage
            window.location.href = 'confirmation.html'; // envoi vers la page confirmation
        });
});
}

printBasket(); // affiche ours du panier
validerCommand(); // validation de la commande



