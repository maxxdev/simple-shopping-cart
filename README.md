# Simple Shopping Cart 

## SimpleShoppingCart.js
Simple shopping cart is a class to store items collection and has methods for working with them.
Store is localStorage

### How to use
* Include via script <script src="src/SimpleShoppingCart.js"></script>
* cart must be init like that: ```js const cart = new SimpleShoppingCart() ```

The name of localStorage can be changed by passing custom name to constructor like that: ```js  new SimpleShoppingCart('myCustomCart') ```
By default class is using "simpleShoppingCart" as name 

### Features

*```js getItems() ``` - returns list of items including calculated price, total cost 
*```js getById(id) ``` - returns object by item id 
*```js addItem(item) ``` - add 1 item to cart
*```js putItem(item, qty) ``` - add quantity items to cart
*```js isItemInCart(item) ``` - returns true if item is in cart
*```js removeItem(id) ``` - removes item from cart by item id 
*```js totalCost() ``` - returns total cost of cart
*```js totalQty() ``` - returns total quantity of cart
*```js clear() ``` - clears cart

### Example
/examles folder contains example how to use SimpleShoppingCart with JQuery