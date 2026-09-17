import {cart, removeFromCart, updateDeliveryOption} from '../../data/cart.js';
import { getproduct } from '../../data/products.js';
import { formatcurrancy } from '../utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions, getdeliveryOption } from '../../data/deliveryOptions.js';
import { renderpaymentSummary } from './paymentSummary.js';

// const today = dayjs();//external liberary function which shows the todays date
// const deliveryDate = today.add(7, 'days');//.add(how much day to add , 'string to add in it') function to add days in todays date.

// deliveryDate.format('dddd,MMMM D');//to convert the date in readable format.
// //dddd: for the day of week
// //MMMM: a month 
// // D : date of the month

export function renderOrderSummary()
{

      let cartSummaryHTML = '';

      cart.forEach((cartItem)=>{
        const productId = cartItem.productId;

       const  matchingProduct = getproduct(productId);

        
        const deliveryOptionId = cartItem.deliveryOptionId;

       const deliveryOption = getdeliveryOption(deliveryOptionId);

        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');

        const dateString = deliveryDate.format('dddd,MMMM D');


        cartSummaryHTML +=  `
          <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
                  <div class="delivery-date">
                    Delivery date: ${dateString}
                  </div>

                  <div class="cart-item-details-grid">
                    <img class="product-image"
                      src="${matchingProduct.image}">

                    <div class="cart-item-details">
                      <div class="product-name">
                        ${matchingProduct.name}
                      </div>
                      <div class="product-price">
                        ${matchingProduct.getPrice()}
                      </div>
                      <div class="product-quantity">
                        <span>
                          Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary">
                          Update
                        </span>
                        <span class="delete-quantity-link link-primary js-delete-link" data-product-id = "${matchingProduct.id}">
                          Delete
                        </span>
                      </div>
                    </div>

                    <div class="delivery-options">
                      <div class="delivery-options-title">
                        Choose a delivery option:
                        ${deliveryOptionHTML(matchingProduct,cartItem)}
                      </div>
                    </div>
                  </div>
                </div>

          `;
      });

      function deliveryOptionHTML(matchingProduct,cartItem)
      {
        let html = '';
        deliveryOptions.forEach((deliveryOption)=>
          {
            const today = dayjs();
            const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');

            const dateString = deliveryDate.format('dddd,MMMM D');

            const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatcurrancy(deliveryOption.priceCents)} - `;

            const isChecked = deliveryOption.id ===cartItem.deliveryOptionId;

            html +=` <div class="delivery-option js-delivery-option"
            data-product-id = "${matchingProduct.id}" data-delivery-option-id = "${deliveryOption.id}">
                <input type="radio"
                ${isChecked ? 'checked': ''}
                  class="delivery-option-input"
                  name="delivery-option-${matchingProduct.id}">
                <div>
                  <div class="delivery-option-date">
                  ${dateString}
                  </div>
                  <div class="delivery-option-price">
                    ${priceString} Shipping
                  </div>
                </div>
              </div>
            `
          }
        );
      return html;
      }

      document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

      document.querySelectorAll('.js-delete-link').forEach((link)=>{
      link.addEventListener('click',()=>{

      const productId = link.dataset.productId;
      removeFromCart(productId);

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );

      container.remove();

      renderpaymentSummary();// here we regenarate the payment summary code , so when we delete the item from cart then payment summary should update.
      });
      });

      document.querySelectorAll('.js-delivery-option').forEach((element)=>{
      element.addEventListener('click',()=>
      {
        const {productId,deliveryOptionId} = element.dataset;
        //used the data attribute here to access the variables productId and deliveryOptionId
        
        updateDeliveryOption(productId,deliveryOptionId);

        renderOrderSummary();//here we regenerate the data to update the order options imediately
        //this concept is recursion , when a function call itself 
        renderpaymentSummary();
      });
      });
}

