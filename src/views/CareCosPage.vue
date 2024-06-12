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
              label="Уход за лицом"
              class="mb-2 filter-checkbox"
            ></v-checkbox>
            <v-checkbox
              v-model="selectedCategories"
              :value="2"
              label="Уход за телом"
              class="mb-2 filter-checkbox"
            ></v-checkbox>
            <v-checkbox
              v-model="selectedCategories"
              :value="3"
              label="Космецевтика"
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
          id: 31,
          name: 'ERBORIAN CENTELLA CARE ',
          price: '1000',
          description: 'Флюид против несовершенств',
          image: '/care/1.jpg',
          category: 1,
          sku: '12345',
            stock: 10,
        },
        {
          id: 32,
          name: 'MIXIT YOUR SKIN DEEP CLEANSING OIL ',
          price: '1000',
          description: 'Гидрофильное масло',
          image: '/care/2.jpg',
          category: 1,
          sku: '12345',
            stock: 10,
        },
        {
          id: 33,
          name: 'PAYOT №2 BAUME AROMATIQUE APASANT ',
          price: '1000',
          description: 'Успокаивающий крем-бальзам',
          image: '/care/3.jpg',
          category: 1,
          sku: '12345',
            stock: 10,
        },
        {
          id: 34,
          name: 'JO MALONE VELVET ROSE & OUD BODY & HAND WASH ',
          price: '4000',
          description: 'Гель для душа',
          image: '/care/4.jpg',
          category: 2,
          sku: '12345',
            stock: 10,
        },
        {
          id: 35,
          name: 'PAYOT SUPREME CRÈME JEUNESSE MAINS ',
          price: '1000',
          description: 'Крем для рук',
          image: '/care/5.jpg',
          category: 2,
          sku: '12345',
            stock: 10,
        },
        {
          id: 36,
          name: 'GARNIER AMBRE SOLAIRE ИДЕАЛЬНЫЙ ЗАГАР СОЛНЦЕЗАЩИТНОЕ МАСЛО SPF 50 ',
          price: '2000',
          description: 'Солнцезащитное масло',
          image: '/care/6.jpg',
          category: 2,
          sku: '12345',
            stock: 10,
        },
        {
          id: 37,
          name: 'BIODERMA SEBIUM GLOBAL',
          price: '3000',
          description: 'Дерматологический крем',
          image: '/care/7.jfif',
          category: 3,
          sku: '12345',
            stock: 10,
        },
        {
          id: 38,
          name: 'BIODERMA SENSIBIO H2O REVERSED PUMP ',
          price: '4000',
          description: 'Мицеллярная вода',
          image: '/care/8.jfif',
          category: 3,
          sku: '12345',
            stock: 10,
        },
        {
          id: 39,
          name: 'URIAGE EAU THERMALE WATER EYE CONTOUR CREAM ',
          price: '4000',
          description: 'Увлажняющий крем контура глаз',
          image: '/care/9.jfif',
          category: 3,
          sku: '12345',
            stock: 10,
        },
        {
          id: 40,
          name: 'URIAGE HYSEAC PURIFYING TONER ',
          price: '4000',
          description: 'Очищающий тоник',
          image: '/care/10.jfif',
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
  width: 80%; /* Задает ширину карты в процентах от колонки */
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
