<template>
  <div>
    <!-- Логотип -->
    <div class="logo-container">
      <router-link to="/">
        <img :src="logo" alt="Logo" class="logo">
      </router-link>
    </div>

    <!-- Шапка -->
    <v-app-bar class="header-bar" app elevation="0">
      <v-container class="header-container">
        <div class="icon-container">
          <div class="cart-icon-wrapper">
            <v-btn icon @click.stop="toggleCartMenu">
              <v-icon>mdi-cart</v-icon>
            </v-btn>
            <span v-if="cartItemsCount > 0" class="cart-count">{{ cartItemsCount }}</span>
          </div>
          <router-link v-if="user" to="/user-profile">
            <v-btn icon>
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </router-link>
          <router-link v-else to="/login">
            <v-btn icon>
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </router-link>
        </div>
      </v-container>
    </v-app-bar>

    <!-- Боковое меню -->
    <v-navigation-drawer location="right" v-model="drawer" temporary width="530" style="height: 100%; top: 0px; z-index: 1020;">
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
                  <v-btn style="height: 27px; width: 27px; margin-right: 10px" icon @click="decreaseQuantity(item)">
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                  <span class="quantity">{{ item.quantity }}</span>
                  <v-btn style="height: 27px; width: 27px; margin-left: 10px" icon @click="increaseQuantity(item)">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                  <div class="price">{{ calculateItemTotal(item) }} ₽</div>
                </v-list-item-action>
              </div>
            </v-list-item>
          </v-list>
          <div class="text-right">
            <div>Количество товаров: {{ cartItemsCount }}</div>
            <div>Итоговая Сумма: {{ cartTotal }} ₽</div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="placeOrder">Оформить заказ</v-btn>
        </v-card-actions>
      </v-card>
    </v-navigation-drawer>

    <!-- Горизонтальная навигационная панель -->
    <v-app-bar class="category-bar" app elevation="0">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" class="nav-button">
            <router-link to="/hair">
              <v-btn class="nav-btn" text>Средства для ухода за волосами</v-btn>
            </router-link>
            <router-link to="/parf">
              <v-btn class="nav-btn" text>Парфюмерия</v-btn>
            </router-link>
            <router-link to="/carecos">
              <v-btn class="nav-btn" text>Уходовая косметика</v-btn>
            </router-link>
            <router-link to="/deccos">
              <v-btn class="nav-btn" text>Декоративная косметика</v-btn>
            </router-link>
            <router-link to="/otzv">
              <v-btn class="nav-btn" text>Отзывы</v-btn>
            </router-link>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { auth } from '../../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';

export default {
  name: 'HeaderComp',
  data() {
    return {
      logo: require('@/assets/logo1.png'),
      drawer: false,
      showPopup: false,
      popupProduct: null,
      user: null
    };
  },
  computed: {
    ...mapGetters(['cartItems', 'cartTotal', 'calculateItemTotal']), // Подключаем calculateItemTotal
    cartItemsCount() {
      return this.cartItems.reduce((total, item) => total + item.quantity, 0);
    }
  },
  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });
  },
  methods: {
    ...mapActions(['addToCart', 'removeFromCart', 'placeOrder', 'increaseQuantity', 'decreaseQuantity']),
    toggleCartMenu() {
      this.drawer = !this.drawer;
    }
  }
};
</script>


<style scoped>
.logo-container {
  text-align: center;
  padding: 20px 0;
  position: fixed;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1020;
}

.header-bar {
  height: 110px;
  background-color: #837bc4;
  opacity: 0.9;
}

.icon-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 40px;
}

.cart-icon-wrapper {
  position: relative;
}

.cart-count {
  position: absolute;
  top: 0px;
  right: -1px;
  background-color: #eb9abb;
  color: white;
  border-radius: 55%;
  padding: 0px 6px;
  font-size: 11px;
}

.logo {
  height: 100px;
}

.category-bar {
  margin-top: 46px;
  background-color: #837bc4;
  opacity: 0.9;
}

.nav-button {
  display: flex;
  justify-content: center;
  margin-right: 21px;
}

.nav-btn {
  font-size: 15.05px;
  margin: 0 9px;
  background-color: aliceblue;
}

.v-navigation-drawer {
  z-index: 1000;
  width: 1000px;
}

/* Стили для элементов корзины */
.cart-item {
  border: 2px solid #837bc4;
  display: flex;
  align-items: center;
  border-radius: 20px;
  margin-bottom: 10px;
  margin-left: 10px;
  height: 255px;
}

.cart-item-avatar {
  flex-shrink: 0;
}

.cart-item-content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.cart-item-actions {
  top: 10px;
  position: relative;
  margin-bottom: 20px;
}

.price {
  margin-left: 300px;
  font-size: 16px;
}

.item-title {
  white-space: normal; /* Перенос текста */
  word-wrap: break-word; /* Перенос длинных слов */
  overflow-wrap: break-word; /* Альтернативный способ переноса длинных слов */
  hyphens: auto; /* Добавление переносов в слова */
  max-width: 400px; /* Ограничение ширины для демонстрации переносов */
}
</style>
