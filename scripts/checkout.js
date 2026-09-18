import { renderOrderSummary } from "./checkout/ordersummary.js";
import { renderpaymentSummary } from "./checkout/paymentSummary.js";
// import '../data/cart-class.js';
// import '../data/backend-practice.js';
import { loadProducts } from "../data/products.js";
import {loadCart} from '../data/cart.js';

// new Promise((resolve)=>{
//    loadProducts(()=>
//     {
//         resolve();
//     });
// }).then(()=>
//     {
//     renderOrderSummary();
//     renderpaymentSummary();
// });

//Promise() used to run the code imemediately
//resolve: is a function which control when to go to next step

Promise.all([
    new Promise((resolve)=>{
        loadProducts(()=>{
            resolve('value1');
        });
    }),
    new Promise((resolve)=>{
        loadCart(()=>{
            resolve('value2');
        });
    })

]).then((values)=>{
    console.log(values)
    renderOrderSummary();
    renderpaymentSummary();
});


// new Promise((resolve)=>{
//     loadProducts(()=>{
//         resolve('value1');
//     });

// }).then((value)=>{
//     console.log(value);

//     return new Promise((resolve)=>{
//         loadCart(()=>{
//             resolve();
//         });
//     });

// }).then(()=>{
//     renderOrderSummary();
//     renderpaymentSummary();
// });

// loadProducts(()=>{
//  loadCart(()=>{
//         renderOrderSummary();
//         renderpaymentSummary();
//     });
   
// });
