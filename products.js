let genderBtn = "";
let productButtons = document.getElementById("typeBtns");


//men product types 
function menBtnClicked(){
  genderBtn = "Men";
  document.getElementById("output").innerHTML ="";
  productButtons.innerHTML = `
     <button id="pantsProducts" class="productsButtons"> Pants </button>
     <button id="tshirtProducts" class="productsButtons"> T-Shirts </button>
     <button id="shortsProducts" class="productsButtons"> Shorts </button>
  `;
  document.getElementById("pantsProducts").addEventListener('click', showMenPants);
  document.getElementById("tshirtProducts").addEventListener('click', showMenTShirts);
  document.getElementById("shortsProducts").addEventListener('click', showMenShorts);

}
//functions to show men products

function showMenPants(){

  productType = "Pants";

  showProducts();
}

function showMenTShirts(){
  productType = "T-Shirt";

  showProducts();
}

function showMenShorts(){
  productType = "Shorts";

  showProducts();
}


function womenBtnClicked(){
  genderBtn = "Women";
  document.getElementById("output").innerHTML ="";

  productButtons.innerHTML = `
  <button id="dressesProducts" class="productsButtons"> Dresses </button>
  <button id="shirtProducts" class="productsButtons"> Shirts </button>
  <button id="shoesProducts" class="productsButtons"> Shoes </button>
  <button id="jeansProducts" class="productsButtons"> Jeans </button>
  <button id="topsProducts" class="productsButtons"> Tops </button>
  <button id="pantsProducts" class="productsButtons"> Pants </button>
  `;
  document.getElementById("dressesProducts").addEventListener('click', showDresses);
  document.getElementById("shirtProducts").addEventListener('click', showShirts);
  document.getElementById("shoesProducts").addEventListener('click', showShoes);
  document.getElementById("jeansProducts").addEventListener('click', showJeans);
  document.getElementById("topsProducts").addEventListener('click', showTops);
  document.getElementById("pantsProducts").addEventListener('click', showPants);

}

//functions to show women products
function showDresses(){
  productType = "Dress";
  
  showProducts();
}

function showShirts(){
  productType = "Shirts";
  
  showProducts();
}

function showShoes(){
  productType = "Shoes";
  
  showProducts();
}

function showJeans(){
  productType = "Jeans";
  
  showProducts();
}

function showTops(){
  productType = "Tops";
  
  showProducts();
}

function showPants(){
  productType = "Pants";
  
  showProducts();
}


//show chosed products
  
function showProducts(){

  document.getElementById("output").innerHTML = "";

  fetch("products.json")
  .then((res) => res.json())
  .then((data) =>{

    data.forEach(function(product){
      
      if(product.gender === genderBtn && product.type === productType){
        let test = document.getElementById("output");
        //div for each product
        let mainDiv = document.createElement("div");
        mainDiv.setAttribute("id", product.id);
        mainDiv.setAttribute("class", "mainDiv");
        test.appendChild(mainDiv);
      
        //product image
        let imgElement = document.createElement("img");
        imgElement.setAttribute("class", "imgElement");
        imgElement.src = product.img;
        mainDiv.appendChild(imgElement);
      
        //product image
        let productInfo = document.createElement("div");
        productInfo.setAttribute("class", "productInfo");
        mainDiv.appendChild(productInfo);
      
        productInfo.innerHTML += `
        <p>
        <p><span class="product-name">${product.name}</span></p>
        <span class="product-price">$${product.price}</span>
        <p>${product.color}</p>
        </p> 
            `
      
        //add to cart button
        let addToCartBtn = document.createElement("button");
        addToCartBtn.setAttribute("id", "product" + product.id);
        addToCartBtn.setAttribute("class", "addToCartBtn");
        addToCartBtn.innerHTML = ("Add to Cart");
        addToCartBtn.addEventListener('click', addToCartClicked)
        productInfo.appendChild(addToCartBtn);
      }
    })
  })
}

function removeItem(event){
  let buttonClicked = event.target
  buttonClicked.parentElement.remove()

  updateCartTotal()
}

function quantityChanged(event) {
  let quantity = event.target;
  if (isNaN(quantity.value) || quantity.value <= 0){
    quantity.value = 1;
  }
  updateCartTotal()
}

function checkout(){
  alert('Congratulations on finding Good Deal! Thank you for your purchase!')
  let cartItems = document.getElementsByClassName('container')[0]
  
  while (cartItems.hasChildNodes()){
    cartItems.removeChild(cartItems.firstChild)
  }

  updateCartTotal()
}

//cart
function addToCartClicked(event){
  let button = event.target;
  let shopItem = button.parentElement;
  let name = shopItem.getElementsByClassName("product-name")[0].innerText;
  let price = shopItem.getElementsByClassName("product-price")[0].innerText;
  let image = shopItem.parentElement;
  let imageSrc = image.getElementsByClassName("imgElement")[0].src;

  addToCart(name, price, imageSrc);

  updateCartTotal()
}

function addToCart(name, price, imageSrc){
  let rows = document.getElementById('container');
  let newRow = document.createElement("div");
  newRow.classList.add('productRows');
  
  let cartRows = document.getElementsByClassName('productRows');

  for(let i =0; i < cartRows.length; i++){
    let cartRow = cartRows[i];

    let cartItemName = cartRow.getElementsByClassName('itemName')[0];
    if(cartItemName.innerHTML == name){
      alert("This item is already added to the cart!");
      return
    }
  }    
  let newRowContents = `
  <img class ="itemImage" src="${imageSrc}">
  <div class="itemName">${name}</div>
  <div class="itemPrice">${price}</div>
  <input type="number" class="itemQuantity" value="1">
  <button class="remove-item">Remove</button>
  `;

  newRow.innerHTML = newRowContents;
  rows.innerHTML  += "<hr>";
  document.getElementById('container').appendChild(newRow);
  newRow.getElementsByClassName('remove-item')[0].addEventListener('click', removeItem)
  newRow.getElementsByClassName('itemQuantity')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal(){
  let cartItemContainer = document.getElementsByClassName('container')[0];
  let cartRows = cartItemContainer.getElementsByClassName('productRows');
  let total = 0;
  for(let i = 0; i < cartRows.length; i++){
    let cartRow = cartRows[i];
    let itemPrice = cartRow.getElementsByClassName('itemPrice')[0];
    let itemQuantity = cartRow.getElementsByClassName('itemQuantity')[0];
    let price = parseFloat(itemPrice.innerHTML.replace('$', ''))
    let quantity = itemQuantity.value;
    total = total + (price * quantity)
  }
  total = (total * 1.13).toFixed(2);
  document.getElementById('totalNumber').innerHTML = '$' + total;
}
