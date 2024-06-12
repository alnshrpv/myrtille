<template>
    <v-footer class="custom-footer">
      <v-row justify="center" no-gutters>
        <v-btn
          v-for="link in links"
          :key="link"
          class="mx-2"
          color="white"
          rounded="xl"
          variant="text"
        >
          {{ link }}
        </v-btn>
        <v-col class="text-center mt-4" cols="12">
          {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </v-col>
      </v-row>
    </v-footer>
  </template>
  
  <script>
  export default {
    data() {
      return {
        links: [
          'Home',
          'About Us',
          'Team',
          'Services',
          'Blog',
          'Contact Us',
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .custom-footer {
 /* Устанавливаем высоту подвала */
    background-color: #b0bec5; /* Цвет фона, чтобы соответствовать bg-grey-lighten-1 */
  }
  </style>
  