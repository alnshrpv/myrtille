<template>
    <v-container>
      <v-row class="product-row" justify="center">
        <v-col
          v-for="(product, index) in products"
          :key="index"
          cols="12" sm="6" md="4" lg="3"
          class="product-col"
        >
          <v-card class="card">
            <v-img :src="product.image"></v-img>
            <v-card-title>{{ product.name }}</v-card-title>
            <v-card-subtitle>{{ product.price }}</v-card-subtitle>
            <v-card-text>{{ product.description }}</v-card-text>
            <v-card-actions>
              <v-btn color="primary">Купить</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        products: [
          {
            name: 'Товар 1',
            price: '1000 руб',
            description: 'Описание товара 1',
            image: 'https://via.placeholder.com/200'
          },
          {
            name: 'Товар 2',
            price: '2000 руб',
            description: 'Описание товара 2',
            image: 'https://via.placeholder.com/200'
          },
          {
            name: 'Товар 3',
            price: '3000 руб',
            description: 'Описание товара 3',
            image: 'https://via.placeholder.com/200'
          },
          {
            name: 'Товар 4',
            price: '4000 руб',
            description: 'Описание товара 4',
            image: 'https://via.placeholder.com/200'
          },
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  body {
    font-family: Roboto, sans-serif;
  }
  
  .product-row {
    margin: 0 -50px; /* Отрицательный отступ компенсирует отступы колонок */
  }
  
  .product-col {
    padding: 30px; /* Добавляет отступы вокруг каждой колонки */
  }
  
  .card {
    height: 420px;
    width: 230px;
  }
  </style>
  