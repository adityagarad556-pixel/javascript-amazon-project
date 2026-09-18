export const orders = JSON.parse(localStorage.getItem('orders')) || [];//saved the orders in orders array from cart

export function addOrders(order)
{
    orders.unshift(order);//unshift() used to add the elements in front of array
    saveToStorage();
}

function saveToStorage()
{
    localStorage.setItem('orders',JSON.stringify(orders));
}