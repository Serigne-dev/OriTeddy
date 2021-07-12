const orderId = JSON.parse(localStorage.getItem("orderId")); // recupere le numero de commande

/*affiche le numero de commande */
let commandeHTML = document.getElementById("numeroCommande");
commandeHTML.innerHTML = "Numero: "+ orderId ;

const price = JSON.parse(localStorage.getItem("totalPrice")); // recupere le prix total

/* afiche le prix total */
let priceHTML = document.getElementById("prixCommande");
priceHTML.innerHTML = "D'un montant de: "+ price + "€" ;



