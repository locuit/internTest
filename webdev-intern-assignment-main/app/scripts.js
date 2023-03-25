
let cart = {};
InitApp();
function InitApp(){
  const Add_to_cart_btn = document.querySelectorAll('.App_shopItemButton');
  Add_to_cart_btn.forEach(function(button){
      button.addEventListener('click',function(){
          var btnItem = event.target;
          var product = btnItem.parentElement.parentElement.parentElement;
          var productId = product.querySelector(".App_shopItemId").getAttribute('id');
          var productImage = product.querySelector("img").src;
          var productBackground = product.querySelector(".App_shopItemImage").style.backgroundColor;
          var productName = product.querySelector(".App_shopItemName").innerText;
          var productPrice = product.querySelector(".App_shopItemPrice").innerText;
          productPrice = productPrice.replace('$','');
          if (document.getElementById('AddComment')){
            var commentApp_cartEmpty = document.getElementById('AddComment');        
            var comment = document.createComment('');
            commentApp_cartEmpty.parentNode.replaceChild(comment, commentApp_cartEmpty);
          }

          Add_Cart(productId,productImage,productBackground,productName,productPrice);
          if (cart[productId]){
            cart[productId].quantity += 1;
          }else{
            cart[productId] = {
              quantity: 1,
              price: productPrice
            }
            var App_shopItemButton = product.querySelector(".App_shopItemBottom");
            inactiveDiv = document.createElement('div');
            inactiveDiv.classList.add('App_inactive','App_shopItemButton');
            var App_shopItemButtonCover = document.createElement('div');
            App_shopItemButtonCover.classList.add('App_shopItemButtonCover');
            var App_shopItemButtonCoverCheckIcon = document.createElement('div');
            App_shopItemButtonCoverCheckIcon.classList.add('App_shopItemButtonCoverCheckIcon');

            inactiveDiv.appendChild(App_shopItemButtonCover);
            App_shopItemButtonCover.appendChild(App_shopItemButtonCoverCheckIcon);
            
            const oldButton = App_shopItemButton.querySelector('.App_shopItemButton');
            App_shopItemButton.replaceChild(inactiveDiv,oldButton);
            totalPrice();
          }

        })
  }); 
}
function Add_Cart(productId,productImage,productBackground,productName,productPrice)
{
  var divCheck = document.querySelector('#content');
  var App_cartItem = document.createElement('div');
  var App_cartItemLeft = document.createElement('div');
  var App_cartItemRight = document.createElement('div');
  var App_cartItemImage = document.createElement('div');
  var App_cartItemImageBlock = document.createElement('div');
  var App_cartItemName = document.createElement('div');
  var App_cartItemPrice = document.createElement('div');
  var App_cartItemActions = document.createElement('div');
  var App_cartItemCount = document.createElement('div');
  var App_cartItemRemove = document.createElement('div');

  var App_cartItemCountButtonMiner = document.createElement('div');
  var App_cartItemCountButtonPlus = document.createElement('div');
  var App_cartItemCountNumber = document.createElement('div');

  
  divCheck.appendChild(App_cartItem);
  App_cartItem.classList.add('App_cartItem');
  App_cartItem.setAttribute('id',productId);


  App_cartItem.appendChild(App_cartItemLeft);
  App_cartItemLeft.classList.add('App_cartItemLeft');
  App_cartItemLeft.classList.add('cartItemLeft');

  App_cartItemLeft.appendChild(App_cartItemImage);
  App_cartItemImage.classList.add('App_cartItemImage','cartItemImage');
  App_cartItemImage.style.backgroundColor= productBackground;
  App_cartItemImage.appendChild(App_cartItemImageBlock);
  App_cartItemImageBlock.classList.add('App_cartItemImageBlock');
  App_cartItemImageBlock.appendChild(document.createElement('img')).setAttribute('src',productImage);



  App_cartItem.appendChild(App_cartItemRight);
  App_cartItemRight.classList.add('App_cartItemRight');
  App_cartItemRight.classList.add('cartItemRight');


  App_cartItemRight.appendChild(App_cartItemName);
  App_cartItemName.classList.add('App_cartItemName');
  App_cartItemName.classList.add('cartItemName');
  App_cartItemName.appendChild(document.createTextNode(productName));


  App_cartItemRight.appendChild(App_cartItemPrice);
  App_cartItemPrice.classList.add('App_cartItemPrice');
  App_cartItemPrice.classList.add('cartItemPrice');
  App_cartItemPrice.appendChild(document.createTextNode(productPrice));

  App_cartItemRight.appendChild(App_cartItemActions);
  App_cartItemActions.classList.add('App_cartItemActions');
  App_cartItemActions.classList.add('cartItemActions');
  
  
  App_cartItemActions.appendChild(App_cartItemCount);
  App_cartItemCount.classList.add('App_cartItemCount');
  App_cartItemCount.classList.add('cartItemCount');

  App_cartItemCount.appendChild(App_cartItemCountButtonMiner);
  App_cartItemCountButtonMiner.classList.add('App_cartItemCountButton');
  App_cartItemCountButtonMiner.setAttribute('onclick','changeQuantity('+productId+',cart['+productId+'].quantity-1)');
  App_cartItemCountButtonMiner.textContent = '-';



  App_cartItemCount.appendChild(App_cartItemCountNumber);
  App_cartItemCountNumber.classList.add('App_cartItemCountNumber');
  App_cartItemCountNumber.setAttribute('id',+productId);
  App_cartItemCountNumber.textContent = '1';

  

  App_cartItemCount.appendChild(App_cartItemCountButtonPlus);
  App_cartItemCountButtonPlus.classList.add('App_cartItemCountButton');
  App_cartItemCountButtonPlus.setAttribute('onclick','changeQuantity('+productId+',cart['+productId+'].quantity+1)');
  App_cartItemCountButtonPlus.textContent = '+';


  App_cartItemActions.appendChild(App_cartItemRemove);
  App_cartItemRemove.classList.add('App_cartItemRemove');
  App_cartItemRemove.classList.add('cartItemRemove');
  App_cartItemRemove.setAttribute('onclick','changeQuantity('+productId+',0)','deleteItemCart('+productId+'),totalPrice()');
  App_cartItemRemove.appendChild(document.createElement('img')).setAttribute('src','./assets/trash.png');
   

}

function changeQuantity(productId,quantity){
  if (quantity == 0){
    deleteItemCart(productId);
    delete cart[productId];
  }else{
    cart[productId].quantity = quantity;
    var App_cartItemCountNumber = document.querySelectorAll('.App_cartItemCountNumber');
    App_cartItemCountNumber.forEach(function(App_cartItemCountNumber){
      if (App_cartItemCountNumber.id == productId){
        App_cartItemCountNumber.textContent = quantity;
      }
    })
  }
  totalPrice();
}
function totalPrice(){
  var total = 0;
  for (var productId in cart){
    total += cart[productId].price * cart[productId].quantity;
  }
  var spans = document.getElementsByTagName('span');
  spans[0].textContent ='$'+ total.toFixed(2);
}

function deleteItemCart(id){
  var divDelete = document.createElement('div');
  var childContent = document.getElementById('content');
  for (var i = 0; i < childContent.childNodes.length; i++) {
    if (childContent.childNodes[i].id == id){
      childContent.removeChild(childContent.childNodes[i]);
      if (childContent.childNodes.length == 1){
        childContent.appendChild(divDelete);
      }
    }
  }
  var App_shopItems = document.querySelectorAll(".App_cardBody .App_shopItem");
  for (var i = 0; i < App_shopItems.length; i++) {
    var App_shopItem = App_shopItems[i].querySelector('.App_shopItemId');
    if (App_shopItem.getAttribute('id') == id){
      var App_shopItemButton = document.createElement('div');
      App_shopItemButton.classList.add('App_shopItemButton');
      var pElement = document.createElement('p');
      pElement.textContent = 'ADD TO CART';
      App_shopItemButton.appendChild(pElement);

      App_shopItem.parentElement.querySelector('.App_shopItemBottom .App_inactive').classList.remove('App_inactive');
      App_shopItem.parentElement.querySelector('.App_shopItemButton').replaceChild(pElement,App_shopItem.parentElement.querySelector('.App_shopItemButton').childNodes[0]);
      
    }
  }
  InitApp();
}

