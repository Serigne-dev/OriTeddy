const orderId = JSON.parse(localStorage.getItem("orderId"));


let commandeHTML = document.getElementById("numeroCommande");
commandeHTML.innerHTML = "Numero: "+ orderId ;

const price = JSON.parse(localStorage.getItem("totalPrice"));
let priceHTML = document.getElementById("prixCommande");
priceHTML.innerHTML = "D'un montant de: "+ price + "€" ;



