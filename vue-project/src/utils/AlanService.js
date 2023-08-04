import { useCartStore } from '../stores/cart';
import { useProductStore } from '../stores/product'
import alanBtn from '@alan-ai/alan-sdk-web';

const openShoppingCart = async function () {
    const cartStore = useCartStore();
    cartStore.openShoppingCart();
};

const closeShoppingCart = async function () {
    const cartStore = useCartStore();
    cartStore.closeShoppingCart();
};

const addToCart = async function (payload) {
    const { quantity, name } = payload;
    console.log(quantity, name)
    const productStore = useProductStore();
    const cartStore = useCartStore();

    productStore.searchInput = name;
    console.log(productStore.searchInput);
    await productStore.getFilteredProducts();

    // Check if any products match the search and fetch the first product
    const matchedProduct = productStore.products[0];
    if (matchedProduct) {
        const productId = matchedProduct.id;
        await cartStore.addProductToCart({ id: productId, quantity });
    } else {
        console.log("No product found");
    }
};

const initAlanBtn = function () {
    alanBtn({
        key: import.meta.env.VITE_ALAN_KEY,
        onCommand: (commandData) => {
            if (commandData.command === 'openCart') {
                openShoppingCart();
            } else if (commandData.command === "closeCart") {
                closeShoppingCart();
            } else if (commandData.command === "addToCart") {
                addToCart(commandData.payload)
            }
        }
    });
};

export { initAlanBtn };
