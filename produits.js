const getIdInUrl = () => {
    const urlParams = window.location.search;
    const params = new URLSearchParams(urlParams);
    const id = params.get("id"); //récupèration  de la valeur associée au paramètre id

    return id
}

const addToBasket = (teddie) => () => {
    const currentBasket = JSON.parse(localStorage.getItem("basket")) || [];

    const alreadyInBasket = currentBasket.find(
        (element) => element.id === teddie._id
    );

    if (alreadyInBasket) {
        alreadyInBasket.quantity++;
    } else {
        currentBasket.push({
            img: teddie.imageUrl,
            id: teddie._id,
            name: teddie.name,
            price: teddie.price,
            quantity: 1,
        });
    }

    localStorage.setItem("basket", JSON.stringify(currentBasket));
}

const fetchTeddieById = () => {
    const teddieId = getIdInUrl();
    fetch(`http://localhost:3000/api/teddies/${teddieId}`)
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(teddie) {
            const addToBasketButton = document.getElementById("addToBasket");
            addToBasketButton.addEventListener('click', addToBasket(teddie))
        })
}


fetchTeddieById();