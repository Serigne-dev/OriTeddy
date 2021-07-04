function findFromBasket(){
    const currentBasket = JSON.parse(localStorage.getItem("basket")) || [];
    
    let prixTotal=0;

    for (let teddy of currentBasket){

        let teddyHtml = document.getElementById("resume");
        
        let newH2 = document.createElement("h2");
        newH2.innerHTML = teddy.name;
        teddyHtml.appendChild(newH2);

        let newImg = document.createElement("img");
        newImg.src = teddy.img;
        console.log("img:"+teddy.img);
        teddyHtml.appendChild(newImg);

        let newP2 = document.createElement("p");
        newP2.innerHTML = teddy.price;
        teddyHtml.appendChild(newP2);
        
        prixTotal+=teddy.price;
    }

    let prixhtml = document.getElementById("prixtotal");
    prixhtml.innerHTML = "prix total :"+ prixTotal;
}

findFromBasket();

