class CartItem {
    constructor(quantity, productPrice, productTitle, image, sum) {
        this.quantity = quantity;
        this.price = productPrice;
        this.title = productTitle;
        this.imageUrl = image;
        this.sum = sum;
    }
}

export default CartItem;