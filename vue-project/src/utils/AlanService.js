import { useCartStore } from '../stores/cart';
import { useProductStore } from '../stores/product'
import alanBtn from '@alan-ai/alan-sdk-web';

let alanInstance;

const openShoppingCart = async function () {
    const cartStore = useCartStore();
    cartStore.openShoppingCart();
    alanInstance.playText("Opening Cart")
};

const closeShoppingCart = async function () {
    const cartStore = useCartStore();
    cartStore.closeShoppingCart();
    alanInstance.playText("Closing Cart")
};

const addToCart = async function (payload) {
    const { quantity, name } = payload;
    const productStore = useProductStore();
    const cartStore = useCartStore();

    productStore.searchInput = name;
    await productStore.getFilteredProducts();

    const matchedProduct = productStore.products[0];
    if (matchedProduct) {
        const productId = matchedProduct.id;
        await cartStore.addProductToCart({ id: productId, quantity });
    } else {
        alanInstance.playText("No products are found with that name")
    }
};

const clearCart = async function () {
    const cartStore = useCartStore();
    cartStore.deleteUserCart();
    alanInstance.playText("Cart cleared")
}

const removeCartProduct = async function (payload) {
    const { name } = payload;
    const cartStore = useCartStore();
    const productInCart = cartStore.productsInCart;
    const product = productInCart.find((el) => el.Product.title.toLowerCase() === name.toLowerCase());

    if (!product) {
        alanInstance.playText(`No product named ${name} is found on your cart`);
        return;
    }

    cartStore.deleteCartItem(product.Product.id);
}

const checkout = function () {
    const cartStore = useCartStore();
    if (!cartStore.productsInCart.length) {
        alanInstance.playText("Cart is still empty!")
        return;
    }

    cartStore.checkout();
}

const getAlanInstance = function () {
    alanInstance = alanBtn({
        key: import.meta.env.VITE_ALAN_KEY,
        onCommand: (commandData) => {
            if (commandData.command === 'openCart') {
                openShoppingCart();
            } else if (commandData.command === "closeCart") {
                closeShoppingCart();
            } else if (commandData.command === "addToCart") {
                addToCart(commandData.payload)
            } else if (commandData.command === "clearCart") {
                clearCart();
            } else if (commandData.command === 'removeFromCart') {
                removeCartProduct(commandData.payload);
            } else if (commandData.command === "checkout") {
                checkout();
            }
        }
    });

    return alanInstance;
};

export { getAlanInstance };
