function Cart(localStorageKey)
{
    const cart = {
      cartItems : undefined,

    loadFromStorage()//shortcut method for loadFromStorage :function()
    {
        this.cartItems =JSON.parse(localStorage.getItem(localStorageKey));

        if(!this.cartItems)
        {
        this.cartItems = [
            {
                productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity:2,
                deliveryOptionId:'1'
            },
            {
                productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity:1,
                deliveryOptionId:'2'
            }];
        }
    },

    saveToStorage(){
        localStorage.setItem('localStorageKey',JSON.stringify(this.cartItems));
    },

    addTocart(productId)
    {
    let matchingitem;
    this.cartItems.forEach((cartItem) =>
        {
        if(productId === cartItem.productId)
        {
            matchingitem = cartItem;
        }
        });

        if(matchingitem)
        {
        matchingitem.quantity+=1;
        }
        else{
        this.cartItems.push(
            {
            productId:productId,
            quantity:1,
            deliveryOptionId:'1'
            })
        }
    this.saveToStorage();
    },

    removeFromCart(productId)
    {
    const newCart = [];
    this.cartItems.forEach((cartItem)=>{
        if(cartItem.productId !== productId)
        {
        newCart.push(cartItem);
        }

    });
    this.cartItems = newCart;
    this.saveToStorage();
    },

    updateDeliveryOption(productId, deliveryOptionId)
    {
    let matchingitem;
    this.cartItems.forEach((cartItem) =>
        {
        if(productId === cartItem.productId)
        {
            matchingitem = cartItem;
        }
        });

        matchingitem.deliveryOptionId = deliveryOptionId;

        this.saveToStorage();
    }

};
return cart;
}

const cart = Cart('cart-oop');
const BusinessCart = Cart('cart-Business');

cart.loadFromStorage();

BusinessCart.loadFromStorage();

console.log(cart);
console.log(BusinessCart);