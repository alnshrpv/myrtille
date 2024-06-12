// index.js (Vuex store)
import { createStore } from 'vuex';

export default createStore({
  state: {
    cart: []
  },
  mutations: {
    addToCart(state, product) {
      const existingProduct = state.cart.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart(state, product) {
      const index = state.cart.findIndex(item => item.id === product.id);
      if (index !== -1) {
        if (state.cart[index].quantity > 1) {
          state.cart[index].quantity--;
        } else {
          state.cart.splice(index, 1);
        }
      }
    },
    clearCart(state) {
      state.cart = [];
    }
  },
  actions: {
    addToCart({ commit }, product) {
      commit('addToCart', product);
    },
    removeFromCart({ commit }, product) {
      commit('removeFromCart', product);
    },
    clearCart({ commit }) {
      commit('clearCart');
    }
  },
  getters: {
    cartItems: state => state.cart,
    cartTotal: state => state.cart.reduce((total, item) => total + item.price * item.quantity, 0),
    calculateItemTotal: () => item => item.price * item.quantity
  }
});
