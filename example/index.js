/*showCart(cart)
const itemCart = {id: 3, name: 'tomatos', qty: 6, price: 1}
console.log('Is this item in cart? ', cart.isItemInCart(itemCart))*/
jQuery(document).ready(function () {
  "use strict";

  const cart = new SimpleShoppingCart()

  // Display list of items' cart
  const displayCartItems = function (items) {
    const selector = '.cart>table>tbody'
    $(selector).html('');
    if (items.length < 1) return
    items.forEach((element) => {
      $(`<tr>
          <td>${element.name}</td>
          <td>${element.getCost()}$</td>          
          <td>${element.qty}</td>
          <td>${element.getSum()}$</td>
          <td><button data-id="${element.id}" class="remove">X</button></td>
         </tr>
       `).appendTo(selector)
    })
  }

  // Display list of items which can be added to cart
  const displayShopItems = function (items) {
    $('.shop').html('')
    if (items.length < 1) return
    items.forEach((element) => {
      const isInCart = cart.isItemInCart(element)
      $(`<div class="inner ${isInCart ? 'inCart' : ''}">
          ${element.name}
          <button data-id="${element.id}" class="add">Add</button>   
        </div>`).appendTo('.shop');
    })
  }

  const displayCartQty = function (value) {
    $('.cartSummary__qty').html(value)
  }
  const displayCartCost = function (value) {
    $('.cartSummary__cost').html(value)
  }

  //item must have 2 required attributes: id and price
  const shopItems = [
    {id: 1, name: 'Potato', qty: 1, price: 2},
    {id: 2, name: 'Chocolate', qty: 6, price: 3},
    {id: 3, name: 'Milk', qty: 6}, //getting error on add to cart - item doesn't have price
    {id: 3, name: 'Tomato', qty: 6, price: 1},

  ]

  $('.shop').on('click', '.add', function () {
    const id = $(this).data('id')
    const item = shopItems.find(el => el.id === id)
    try {
      if (item) {
        cart.addItem(item)
        updateCart()
      }
    } catch (e) {
      alert(e)
    }
  })
  $('.clear').click(function () {
    cart.clear()
    updateCart()
  })

  $('.cart').on('click', '.remove', function () {
    const id = $(this).data('id')
    const item = shopItems.find(el => el.id === id)
    if (item) {
      cart.removeItem(item)
      updateCart()
    }
  })

  // custom functions to display updated data in cart
  const updateCart = function () {
    displayCartQty(cart.totalQty)
    displayCartCost(cart.totalCost)
    displayCartItems(cart.getItems())
    displayShopItems(shopItems)
  }

  updateCart(cart)
});