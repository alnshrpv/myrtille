<template>
  <v-app>
    <!-- Импортированный компонент Header -->
    <HeaderComp />

    <!-- Основной контент -->
    <v-main class="main-container">
      <img :src="bgImg" alt="Background" class="bgImg">
      <router-view></router-view>
    </v-main>

    <!-- Импортированный компонент Footer -->
    <FooterComp />
  </v-app>
</template>

<script>
import HeaderComp from './components/HeaderComp.vue';
import FooterComp from './components/FooterComp.vue';

export default {
  name: 'App',
  components: {
    HeaderComp,
    FooterComp,
  },
  data() {
    return {
      bgImg: require('@/assets/bg.jpg')
    };
  }
};
</script>

<style>
body {
  font-family: Roboto, sans-serif;
  margin: 0;
  padding: 0;
  overflow: hidden; /* Скрыть прокрутку */
}

/* Скрыть вертикальную прокрутку */
body::-webkit-scrollbar {
  width: 0px;  /* Устанавливает ширину прокрутки на 0 */
  background: transparent; /* Делает фон прокрутки прозрачным */
}

/* Скрыть горизонтальную прокрутку */
body::-webkit-scrollbar {
  height: 0px;  /* Устанавливает высоту прокрутки на 0 */
  background: transparent; /* Делает фон прокрутки прозрачным */
}

.main-container {
  margin-top: 50px;
  position: relative;
  min-height: calc(100vh - 120px); /* Обеспечиваем, чтобы основной контейнер занимал всю доступную высоту */
}
.bgImg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  object-fit: cover;
}
</style>
