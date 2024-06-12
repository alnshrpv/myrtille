<template>
  <v-container class="container" fluid>
    <v-row>
      <v-col class="filter-col" cols="12" md="3">
        <v-card class="filter-card">
          <v-card-text>
            <v-text-field
              prepend-inner-icon="mdi-magnify"
              v-model="search"
              label="Поиск товара"
              class="mb-4 search-field"
              variant="solo"
            ></v-text-field>
            <v-card-title>Категория товара</v-card-title>
            <v-checkbox
              v-model="selectedCategories"
              :value="1"
              label="Для глаз"
              class="mb-2 filter-checkbox"
            ></v-checkbox>
            <v-checkbox
              v-model="selectedCategories"
              :value="2"
              label="Для губ"
              class="mb-2 filter-checkbox"
            ></v-checkbox>
            <v-checkbox
              v-model="selectedCategories"
              :value="3"
              label="Для ногтей"
              class="mb-2 filter-checkbox"
            ></v-checkbox>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="9">
        <v-row class="product-row">
          <v-col
            v-for="(product, index) in filteredProducts"
            :key="index"
            class="product-col"
            cols="12" sm="6" md="4"
          >
            <v-card class="card" @click="goToProductDetail(product.id)">
              <v-img :src="product.image" style="height: 300px;"></v-img>
              <v-card-title>{{ product.name }}</v-card-title>
              <v-card-subtitle class="price">{{ product.price }} ₽</v-card-subtitle>
              <v-card-text class="op">{{ product.description }}</v-card-text>
              <v-card-actions class="card-actions">
                <v-btn class="button" @click="addProductToCart(product)">Добавить в корзину</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-snackbar v-model="showPopup" color="white" timeout="3000">
      <v-img :src="popupProduct?.image" style="height: 84px; width: 50px;"></v-img>
      <span class="span">Добавлено в корзину: <br> "{{ popupProduct?.name }}"</span>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      search: '',
      selectedCategories: [],
      showPopup: false,
      popupProduct: null,
      products: [
      {
          id: 11,
          name: 'CLINIQUE LASH POWER MASCARA',
          price: '1000',
          description: 'Влагостойкая тушь для ресниц',
          image: '/dec/1.jpg',
          category: 1,
          sku: '12345',
            stock: 10,
        },
        {
          id: 12,
          name: 'TOM FORD EYE COLOR QUAD CRÈME ',
          price: '1000',
          description: 'Кремовые тени для век',
          image: '/dec/2.jpg',
          category: 1,
          sku: '12345',
            stock: 10,
        },
        {
          id: 13,
          name: 'BEAUTY BOMB BELLATRIS EYESHADOW PALETTE ',
          price: '1000',
          description: 'Палетка теней',
          image: '/dec/3.jpg',
          category: 1,
          sku: '12345',
            stock: 10,
        },
        {
          id: 14,
          name: 'MAC LUSTREGLASS SHEER-SHINE LIPSTICK ',
          price: '4000',
          description: 'Легкая губная помада',
          image: '/dec/4.jpg',
          category: 2,
          sku: '12345',
            stock: 10,
        },
        {
          id: 15,
          name: 'CLARINS WATER LIP STAIN ',
          price: '1000',
          description: 'Пигмент для губ',
          image: '/dec/5.jfif',
          category: 2,
          sku: '12345',
            stock: 10,
        },
        {
          id: 16,
          name: 'ESTEE LAUDER PURE COLOR EXPLICIT SLICK SHINE LIPSTICK ',
          price: '2000',
          description: 'Губная помада',
          image: '/dec/6.jpg',
          category: 2,
          sku: '12345',
            stock: 10,
        },
        {
          id: 17,
          name: 'LEI КЛИППЕР МАНИКЮРНЫЙ СРЕДНИЙ ЧЕРНЫЙ ',
          price: '3000',
          description: 'Клиппер для ногтей',
          image: '/dec/7.jpg',
          category: 3,
          sku: '12345',
            stock: 10,
        },
        {
          id: 18,
          name: 'EVA MOSAIC TOP AND BASE ОСНОВА ПОД ЛАК "СИЛА АЛМАЗА" ',
          price: '4000',
          description: 'Основа под лак',
          image: '/dec/8.jpg',
          category: 3,
          sku: '12345',
            stock: 10,
        },
        {
          id: 19,
          name: 'STELLARY NAIL STUDIO NAIL POLISH',
          price: '4000',
          description: 'Лак для ногтей',
          image: '/dec/9.jpg',
          category: 3,
          sku: '12345',
            stock: 10,
        },
        {
          id: 20,
          name: 'SOLOMEYA CUTICLE AWAY GEL ',
          price: '4000',
          description: 'Гель для удаления кутикулы',
          image: '/dec/10.jfif',
          category: 3,
          sku: '12345',
            stock: 10,
        },
      ]
    };
  },
  computed: {
    filteredProducts() {
      let filtered = this.products;

      if (this.search) {
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(this.search.toLowerCase())
        );
      }

      if (this.selectedCategories.length) {
        filtered = filtered.filter(product =>
          this.selectedCategories.includes(product.category)
        );
      }

      return filtered;
    }
  },
  methods: {
    ...mapActions(['addToCart']),
    addProductToCart(product) {
      this.addToCart(product);
      this.showPopupMessage(product);
    },
    goToProductDetail(id) {
      this.$router.push({ name: 'ProductDetail', params: { id } });
    },
    showPopupMessage(product) {
      this.popupProduct = product;
      this.showPopup = true;
      setTimeout(() => {
        this.showPopup = false;
      }, 3000);
    }
  }
};
</script>



<style scoped>

.op {
  text-align: center;
}

.container {
  display: flex;
}

body {
  font-family: Montserrat;
}

.product-row {
  margin-left: 0; 
}

.product-col {
  padding: 35px; 
}

.card {
  height: 500px;
  width: 80%; 
  border-radius: 20px;
}

.card-actions {
  display: flex;
  justify-content: center; 
  padding-bottom: 16px; 
}

.button {
  background-color: #fac3af;
}

.filter-col {
  margin-right: 0;
}

.filter-card {
  background-color: white;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 24px; 
  height: 360px;
  margin-left: 100px;
}

.search-field {
  width: 100%;
  height: 50px;
  border-radius: 20px;
}

.filter-checkbox {
  display: block;
  height: 50px;
  border-radius: 5px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.3);
}

.price {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-top: 10px; 
}
</style>
