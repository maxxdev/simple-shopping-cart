# Simple Shopping Cart 

SimpleShoppingCart.js is a class to store items collection and has methods for working with them.
Store is localStorage

### How to use
* Include via script <script src="src/SimpleShoppingCart.js"></script>
* cart must be init like that: ``` const cart = new SimpleShoppingCart() ```

The name of localStorage can be changed by passing custom name to constructor like that:
```  new SimpleShoppingCart('myCustomCart') ```

By default class is using "simpleShoppingCart" as name 

### Features

* ``` getItems() ``` - returns list of items including calculated price, total cost 

* ``` getById(id) ``` - returns object by item id 

* ``` addItem(item) ``` - add 1 item to cart

* ``` putItem(item, qty) ``` - add quantity items to cart

* ``` isItemInCart(item) ``` - returns true if item is in cart

* ``` removeItem(id) ``` - removes item from cart by item id 

* ``` totalCost() ``` - returns total cost of cart

* ``` totalQty() ``` - returns total quantity of cart

* ``` clear() ``` - clears cart

### Example
/examles folder contains example how to use SimpleShoppingCart with JQuery
