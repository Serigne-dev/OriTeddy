/* recupere ID du teddy dans l'url  */
const getIdInUrl = () => {
    const urlParams = window.location.search;
    const params = new URLSearchParams(urlParams);
    const id = params.get("id"); //récupèration  de la valeur associée au paramètre id
    return id
}

/* ajoute teddy dans le panier (localStorage basket) */
const addToBasket = (teddy) => () => {
    const currentBasket = JSON.parse(localStorage.getItem("basket")) || [];

    const alreadyInBasket = currentBasket.find(
        (element) => element.id === teddy._id
        );

    if (alreadyInBasket) {
        alreadyInBasket.quantity++;
        console.log("Le teddy " + alreadyInBasket.name + " est deja dans le panier");
    } else {
        currentBasket.push({
            img: teddy.imageUrl,
            id: teddy._id,
            name: teddy.name,
            price: teddy.price,
            quantity: 1,
        });
    }

    localStorage.setItem("basket", JSON.stringify(currentBasket));
}

/* permet d'ajouter un teddy au panier et affiche le teddy selectionné */
const fetchTeddyById = () => {
    const teddyId = getIdInUrl(); // recupere l'id du teddy
    fetch(`http://localhost:3000/api/teddies/${teddyId}`) // recupere le teddy correspondant
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(teddy) {
        // ecoute le bouton ajouter au panier et ajoute le teddy au panier
        const addToBasketButton = document.getElementById("addToBasket");
        addToBasketButton.addEventListener('click', addToBasket(teddy));
        
        // affiche le teddy selectionné
        printTeddy(teddy);

    })
}

/* affiche le Teddy donné en parametre */
function printTeddy(teddy){
    let teddyHtml = document.getElementById("teddychoisie");

    let newDiv = document.createElement("div");
    newDiv.className = "teddyCard";

    
    let newH2 = document.createElement("h2");
    newH2.innerHTML = teddy.name;
    newDiv.appendChild(newH2);
    

    let newImg = document.createElement("img");
    newImg.src = teddy.imageUrl;
    newDiv.appendChild(newImg);


    let newP1 = document.createElement("p");
    newP1.innerHTML = teddy.description;
    newDiv.appendChild(newP1);

    let newP2 = document.createElement("p");
    newP2.innerHTML = teddy.price + "€";
    newDiv.appendChild(newP2);

    teddyHtml.appendChild(newDiv);
}



fetchTeddyById();



