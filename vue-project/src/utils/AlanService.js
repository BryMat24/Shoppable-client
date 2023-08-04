import { useCartStore } from '@/stores/cart';
import alanBtn from '@alan-ai/alan-sdk-web';

const openShoppingCart = function () {
    const cartStore = useCartStore(); // Create an instance within the function
    cartStore.openShoppingCart(); // Call the action on the store instance
};

const closeShoppingCart = function () {
    const cartStore = useCartStore(); // Create an instance within the function
    cartStore.closeShoppingCart();
};

const addToCart = function () {
    console.log("test");
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
                addToCart();
            }
        }
    });
};

export { initAlanBtn };
