<template>
  <v-container class="cart-container">
    <v-row justify="center">
      <v-col cols="12" sm="8">
        <v-card>
          <v-card-title class="headline">Корзина</v-card-title>
          <v-card-text>
            <v-list style="border-radius: 15px; width: 100%;">
              <v-list-item v-for="(item, index) in cartItems" :key="index" class="cart-item">
                <v-list-item-avatar class="cart-item-avatar">
                  <img :src="item.image" alt="Product Image" style="height: 125px;">
                </v-list-item-avatar>
                <div class="cart-item-details">
                  <v-list-item-content class="cart-item-content">
                    <v-list-item-title class="item-title">{{ item.name }}</v-list-item-title>
                    <v-list-item-subtitle class="item-subtitle">{{ item.description }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action class="cart-item-actions">
                    <v-btn style="height: 37px; width: 37px;" icon @click="decreaseQuantity(item)">
                      <v-icon>mdi-minus</v-icon>
                    </v-btn>
                    <span class="quantity">{{ item.quantity }}</span>
                    <v-btn style="height: 37px; width: 37px;" icon @click="increaseQuantity(item)">
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                    <div class="price">{{ calculateItemTotal(item) }} руб</div>
                  </v-list-item-action>
                </div>
              </v-list-item>
            </v-list>
            <div class="text-right">
              <div>Сумма: {{ cartTotal }} руб</div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary">Оформить заказ</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['cartItems', 'cartTotal'])
  },
  methods: {
    ...mapActions(['addToCart', 'removeFromCart']),
    increaseQuantity(item) {
      this.addToCart(item);
    },
    decreaseQuantity(item) {
      this.removeFromCart(item);
    },
    calculateItemTotal(item) {
      return item.price * item.quantity;
    }
  }
};
</script>

<style scoped>
body {
  font-family: Roboto, sans-serif;
}

.cart-item {
  border: 2px solid #837bc4;
  display: flex;
  align-items: center;
  border-radius: 20px;
  margin-bottom: 10px;
  padding: 10px;
}

.cart-item-avatar {
  flex-shrink: 0;
  margin-right: 10px;
}

.cart-item-avatar img {
  height: 100%;
  width: auto;
  border-radius: 20px;
}

.cart-item-details {
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: space-between;
  margin-left: 108px;
    top: -94px;
    position: relative;
    margin-bottom: -50px;
}

.cart-item-content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.cart-item-actions {
  display: flex;
  align-items: center;
  margin-left: 32px;
    top: -6px;
    position: relative;
}

.quantity {
  margin: 0 10px;
}

.price {
  margin-left: 10px;
}
</style>
