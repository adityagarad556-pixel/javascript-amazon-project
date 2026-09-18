import { renderOrderSummary } from "./checkout/ordersummary.js";
import { renderpaymentSummary } from "./checkout/paymentSummary.js";
// import '../data/cart-class.js';
// import '../data/backend-practice.js';
import { loadProducts } from "../data/products.js";

loadProducts(()=>{
    renderOrderSummary();
    renderpaymentSummary();
});
