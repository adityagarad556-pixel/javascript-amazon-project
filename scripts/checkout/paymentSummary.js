import { getproduct } from '../../data/products.js';
import {cart} from'../../data/cart.js';
import { getdeliveryOption } from '../../data/deliveryOptions.js';
import {formatcurrancy} from '../utils/money.js';
export function renderpaymentSummary()
{
    let productPricecents = 0;

    let shippingPriceCents = 0;

   cart.forEach((cartItem)=> {
    const product = getproduct(cartItem.productId);
    productPricecents += product.priceCents*cartItem.quantity;

   const deliveryOption =  getdeliveryOption(cartItem.deliveryOptionId);
  
  shippingPriceCents  +=  deliveryOption.priceCents;
   });
  let totalExcTax = productPricecents + shippingPriceCents ;

  const TaxCents = totalExcTax * 0.1;
  const totalcents = totalExcTax + TaxCents;

  const paymentSummaryHTML = `
   <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${formatcurrancy(productPricecents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatcurrancy(shippingPriceCents)}
            </div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">
            $${formatcurrancy(totalExcTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">
            $${formatcurrancy(TaxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">
            $${formatcurrancy(totalcents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
  `;

  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
}
