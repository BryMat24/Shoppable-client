import { useCartStore } from '@/stores/cart';

const openShoppingCart = function () {
    const cartStore = useCartStore();
    cartStore.openShoppingCart(); // Call the action on the store instance
};

export { openShoppingCart };