<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card>
            <v-card-title class="headline">Оформление заказа</v-card-title>
            <v-card-text>
              <v-form>
                <v-radio-group v-model="deliveryMethod" row>
                  <v-radio label="Доставка" value="delivery"></v-radio>
                  <v-radio label="Самовывоз" value="pickup"></v-radio>
                </v-radio-group>
                <v-text-field v-if="deliveryMethod === 'delivery'" label="Адрес" v-model="address"></v-text-field>
                <v-alert type="info">Способ оплаты: Только по карте</v-alert>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary">Оформить</v-btn>
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
        deliveryMethod: 'pickup',
        address: ''
      };
    }
  };
  </script>
  
  <style scoped>
  body {
    font-family: Roboto, sans-serif;
  }
  </style>
  