const getIdInUrl = () => {
    const urlParams = window.location.search;
    const params = new URLSearchParams(urlParams);
    const id = params.get("id"); //récupèration  de la valeur associée au paramètre id

    return id
}

const addToBasket = (teddy) => () => {
    const currentBasket = JSON.parse(localStorage.getItem("basket")) || [];

    const alreadyInBasket = currentBasket.find(
        (element) => element.id === teddy._id
        );

    if (alreadyInBasket) {
        alreadyInBasket.quantity++;
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

const fetchTeddyById = () => {
    const teddyId = getIdInUrl();
    fetch(`http://localhost:3000/api/teddies/${teddyId}`)
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(teddy) {
        const addToBasketButton = document.getElementById("addToBasket");
        addToBasketButton.addEventListener('click', addToBasket(teddy));

        let teddyHtml = document.getElementById("teddychoisie");

        
        
        let newH2 = document.createElement("h2");
        newH2.innerHTML = teddy.name;
        teddyHtml.appendChild(newH2);
        

        let newImg = document.createElement("img");
        newImg.src = teddy.imageUrl;
        teddyHtml.appendChild(newImg);


        let newP1 = document.createElement("p");
        newP1.innerHTML = teddy.description;
        teddyHtml.appendChild(newP1);

        let newP2 = document.createElement("p");
        newP2.innerHTML = teddy.price + "€";
        teddyHtml.appendChild(newP2);

    })
}



fetchTeddyById();



