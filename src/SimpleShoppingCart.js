/*
  "author": {
    "name": "Maxx",
    "email": "maxx@tut.by",
    "url": "https://github.com/maxxdev"
  }
*/
class SimpleShoppingCart {
  constructor(id) {
    this.id = id || 'simpleShoppingCart'
    this.items = []
    this.promocodes = []
    this.init()
  }

  init() {
    this.load()
    this._updateCart()
  }

  get cart() {
    const cart =
      {
        items: this.items,
        promocodes: this.promocodes
      }
    return cart
  }

  set cart(data) {
    if (data) {
      this.items = data.items || []
      this.promocodes = data.promocodes || []
    }
  }

  save() {
    localStorage.setItem(this.id, JSON.stringify(this.cart))
  }

  load() {
    this.cart = JSON.parse(localStorage.getItem(this.id))
  }

  clear() {
    this.items = []
    this.promocodes = []
    this.save()
  }

  getItems() {
    return this.items || []
  }

  addPromocode(promocode) {
    this.promocodes.push(promocode)
    this._updateCart()
  }

  isItemInCart(item) {
    return !!this.getById(item.id)
  }

  getById(id) {
    const items = this.getItems()
    return items.find(el => el.id === id)
  }

  getIndexById(id) {
    const items = this.getItems()
    return items.findIndex(el => el.id === id)
  }

  removeItem(value) {
    const items = this.getItems()
    let itemIndex = this.getIndexById(value.id)
    if (itemIndex > -1) {
      items.splice(itemIndex, 1)
      this._updateCart()
      return true
    }
    return false
  }

  addItem(item) {
    return this.putItem(item, 1)
  }

  putItem(item, qty = 1) {
    if (!item.hasOwnProperty('id') || !item.hasOwnProperty('price')) {
      throw new Error(`Item doesn't have "id" or "price" attribute`)
    }
    item.price = parseFloat(item.price)
    item.qty = parseInt(item.qty)
    let cartItem = this.getById(item.id)
    if (cartItem) {
      cartItem.price = item.price
      cartItem.qty += qty
    } else {
      this.items.push(item)
    }
    this._updateCart()
    return {...item}
  }

  _updateCart() {
    const items = this.getItems()
    if (!items) {
      this.clear()
      return
    }

    const promocodes = this.promocodes || []
    items.forEach(item => {
      item.priceWithDiscount = item.price
      if (promocodes.length > 0) {
        promocodes.forEach(promocode => {
          item.priceWithDiscount = promocode.rate * item.price / 100
        })
      }
      const calculateCost = function (withDiscount = true) {
        return (withDiscount ? this.priceWithDiscount : this.price)
      }
      const calculateSum = function (withDiscount = true) {
        return this.qty * (withDiscount ? this.priceWithDiscount : this.price)
      }
      item.getCost = calculateCost
      item.getSum = calculateSum
    })
    this.save()
  }

  get totalCost() {
    return this.items.reduce((a, b) => a + (b.qty * b.price), 0)
  }

  get totalQty() {
    return this.items.reduce((a, b) => a + b.qty, 0)
  }
}