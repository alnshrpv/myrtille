<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title>
            <span class="headline">Профиль пользователя</span>
          </v-card-title>
          <v-card-text>
            <div v-if="user">
              <img v-if="user.photo" :src="user.photo" alt="User Photo" class="user-photo">
              <p>Добро пожаловать, {{ user.name }} {{ user.surname }}!</p>
              <p>Почта: {{ user.email }}</p>
              <p>Город: {{ user.city }}</p>
            </div>
            <p v-else>Загрузка...</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="logout">Выйти</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { auth } from '../../firebase-config';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default {
  data() {
    return {
      user: null
    };
  },
  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
          this.user = storedUser;
        }
      } else {
        this.$router.push('/login');
      }
    });
  },
  methods: {
    async logout() {
      await signOut(auth);
      localStorage.removeItem('user');
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.user-photo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
</style>
