const products = [{

          id:1,
         image:'images/espresso.gif',
         name:'Espresso',
         price:200

},
{
  id:2,
image:'images/cappucino.gif',
name:'Cappuccino',
price:350
},
{
  id:3,
  image:'images/flatwhite.gif',
  name:'Flat White',
  price:400
},
{
  id:4,
  image:'images/latte.gif',
  name:'Latte',
  price:450
},
{
  id:5,
  image:'images/cortado.gif',
  name:'Cortado',
  price:350
},
{
  id:6,
  image:'images/blackcoffee.gif',
  name:'Black Coffee',
  price:250
},
{
  id:7,
  image:'images/americano.gif',
  name:'Americano',
  price:300
},
{
  id:8,
  image:'images/machiato.gif',
  name:'Macchiato',
  price:350
},
{
  id:9,
  image:'images/caramel.gif',
  name:'Caramel Coffee',
  price:450
},
{
  id:10,
  image:'images/honeyvanilla.gif',
  name:'Honey Vanilla Latte ',
  price:500
},
{
  id:11,
  image:'images/mocha.gif',
  name:'Mocha ',
  price:450
},
{
  id:12,
  image:'images/frap.gif',
  name:'Frappuccino',
  price:600
}
];
/*
let productsHTML = '';

products.forEach((product) =>{
  productsHTML+=
  `
     <div class="esp">
      
      <img  style = "margin-top: 40px;" height="250px" width="250px" src="${product.image}">
      <p style="margin-left: 10px;">${product.name} &nbsp; &nbsp; $${(product.price/100).toFixed(2)} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button  class = "js-add" data-product-name = "${product.name}" style = "vertical-align: top; color: white;background-color: black;cursor:pointer;">+</button>
      <button  style = "vertical-align: top; color: white;background-color: black; margin-left:5px;cursor:pointer;">-</button></p>

    </div>
    
    `;
});


document.querySelector('.js-products').innerHTML = productsHTML;



const detailsDiv = document.querySelector('.details');
detailsDiv.innerHTML += `
    <p style="font-size: 30px; margin-left: 550px;" class="your">Your Items...</p>
    <br>
    <table class="cart">
        <thead>
            <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
            </tr>
        </thead>
        <tbody>
       
        </tbody>
        <tfoot>
    
        </tfoot>
    </table>
`;

const cart = [];
document.querySelectorAll('.js-add').forEach((button) =>{
    button.addEventListener('click',() =>{
          const productName = button.dataset.productName;
          let matchingItem;
          
          cart.forEach((item) =>{

            if(productName === item.productName){
                  matchingItem = item;
              
            }
          });

          if(matchingItem){
            matchingItem.quantity+=1;
          }else{
            cart.push({
            
              productName:productName,
              quantity:1
            });
          }
          let cartQuantity = 0;
          cart.forEach((item) =>{
              cartQuantity+=item.quantity;
          });
            console.log(cartQuantity);
              console.log(cart);
        

    });


});*/

let cart = [];

function renderProducts() {
    let productsHTML = '';
    products.forEach((product, index) => {
        productsHTML += `
            <div class="esp">
                <img style="margin-top: 40px;" height="250px" width="250px" src="${product.image}" alt="${product.name}">
                <p style="margin-left: 10px;">
                    ${product.name} &nbsp; &nbsp; $${(product.price / 100).toFixed(2)} 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button style="vertical-align: top; color: white; background-color: black;cursor:pointer;" onclick="add(${index})">+</button>
                    <button style="vertical-align: top; color: white; background-color: black; cursor:pointer;" onclick="remove(${index})">-</button>
                </p>
            </div>
        `;
    });
    document.querySelector('.js-products').innerHTML = productsHTML;
}


function add(productIndex) {
    const product = products[productIndex];

    // Check if product already exists in the cart
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
     
        existingProduct.quantity += 1;
    } else {
   
        cart.push({ ...product, quantity: 1 });
    }

  
    renderCart();
}

function remove(productIndex) {
  const product = products[productIndex];

  // Find the product in the cart
  const existingProductIndex = cart.findIndex(item => item.id === product.id);

  if (existingProductIndex !== -1) {
      // Decrease the quantity if the product exists
      cart[existingProductIndex].quantity -= 1;

      if (existingProduct.quantity <= 0) {
        cart = cart.filter(item => item.id !== product.id); 
    }
}

  
  renderCart();
}


function renderCart() {
    let cartHTML = '';
    let totalPrice = 0;


    cart.forEach((item) => {
        const itemTotalPrice = (item.price * item.quantity) / 100;
        totalPrice += itemTotalPrice;

        cartHTML += `
        <tr>
            <td style="width: 20%;">${item.name}</td>
            <td style="width: 20%;">$${(item.price / 100).toFixed(2)}</td>
            <td style="width: 20%;">${item.quantity}</td>
            <td style="width: 20%;">$${itemTotalPrice.toFixed(2)}</td>
        </tr>
    `;
});

    document.querySelector('.cart tbody').innerHTML = cartHTML;


    document.querySelector('.cart tfoot').innerHTML = `
        <tr>
            <td colspan="3"><strong>Total:</strong></td>
            <td><strong>$${totalPrice.toFixed(2)}</strong></td>
        </tr>
        
    `;
}



renderProducts();



const detailsDiv = document.querySelector('.details');
detailsDiv.innerHTML += `
    <p style="font-size: 30px; margin-left: 550px;" class="your">Your Items...</p>
    <br>
    <table class="cart">
        <thead>
            <tr>
                 <th style="width: 20%;">Product</th>
                <th style="width: 20%;">Price</th>
                <th style="width: 20%;">Quantity</th>
                  <th style="width: 20%;">Total Price</th>
               
            </tr>
        </thead>
        <tbody>
       
        </tbody>
        <tfoot>
              <tr>
            <td colspan="3"><strong>Total:</strong></td>
            <td><strong>$0.00</strong></td>
        </tr>
        
        </tfoot>
    </table>
    <br>
    <br>
    <button class="proceed" onclick = "pay()"> Proceed to Payment</button>
`;

function pay(){
  if(cart.length===0){
       alert('Please add items in the cart before proceeding to payment!');
  }else{


  window.location.href = "pay.html";
  }
}