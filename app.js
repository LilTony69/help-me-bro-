fetch(`https://655045947d203ab6626da933.mockapi.io/stats`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    for (let i of data) {
      let card = document.createElement("div");
      card.classList.add("card");

      let imgContainer = document.createElement("div");
      imgContainer.classList.add("image-container");

      let image = document.createElement("img");
      image.setAttribute("src", i.img);
      imgContainer.appendChild(image);
      card.appendChild(imgContainer);

      let con = document.createElement("div");
      con.classList.add("container");

      let hang = document.createElement("div");
      // con = <div class="container"></div>

      let title = document.createElement("h5");
      title.classList.add("product-name");
      title.innerHTML = i.name;
      con.appendChild(title);

      let price = document.createElement("h5");
      price.innerHTML = i.price;
      con.appendChild(price);

      card.appendChild(con);

      // h5.innerHTML =""
      document.getElementById("products").appendChild(card);
    }

    document.getElementById("search").addEventListener("click", () => {
      let searchInput = document.getElementById("search-input").value;
      let cards = document.querySelectorAll(".card");
      let productsName = document.querySelectorAll(".product-name");

      productsName.forEach((item, index) => {
        if (item.innerText.includes(searchInput)) {
          cards[index].classList.remove("hide");
        } else {
          cards[index].classList.add("hide");
        }
      });
    });
  });
