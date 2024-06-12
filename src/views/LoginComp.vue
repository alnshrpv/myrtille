<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title>
            <span class="headline">{{ loginForm ? 'Вход' : 'Регистрация' }}</span>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field v-if="!loginForm" label="Имя" v-model="name"></v-text-field>
              <v-text-field v-if="!loginForm" label="Фамилия" v-model="surname"></v-text-field>
              <v-text-field v-if="!loginForm" label="Номер телефона" v-model="phone"></v-text-field>
              <v-text-field v-if="!loginForm" label="Город" v-model="city"></v-text-field>

              <v-text-field label="Почта" v-model="emailPhone"></v-text-field>
              <v-text-field label="Придумайте пароль" v-model="password" type="password"></v-text-field>
              <v-file-input v-if="!loginForm" label="Добавить фотографию" v-model="photo"></v-file-input>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="submitForm">{{ loginForm ? 'Войти' : 'Зарегистрироваться' }}</v-btn>
            <v-btn text @click="toggleForm">{{ loginForm ? 'Регистрация' : 'Вход' }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { auth } from '../../firebase-config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';

export default {
  data() {
    return {
      loginForm: true,
      name: '',
      surname: '',
      phone: '',
      city: '',
      photo: null,
      emailPhone: '',
      password: ''
    };
  },
  methods: {
    toggleForm() {
      this.loginForm = !this.loginForm;
    },
    async submitForm() {
      if (this.loginForm) {
        // Логика входа
        try {
          const userCredential = await signInWithEmailAndPassword(auth, this.emailPhone, this.password);
          const user = userCredential.user;

          // Сохранить данные в LocalStorage
          const storedUser = {
            name: this.name,
            surname: this.surname,
            email: user.email,
            phone: this.phone,
            city: this.city,
            photo: this.photo
          };
          localStorage.setItem('user', JSON.stringify(storedUser));

          console.log('Вход выполнен:', user);
          this.$router.push('/user-profile'); // Перенаправляем на страницу пользователя
        } catch (error) {
          console.error('Ошибка входа:', error.message);
          alert('Ошибка входа: ' + error.message);
        }
      } else {
        // Логика регистрации
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, this.emailPhone, this.password);
          const user = userCredential.user;

          // Сохранить данные в LocalStorage
          const storedUser = {
            name: this.name,
            surname: this.surname,
            email: user.email,
            phone: this.phone,
            city: this.city,
            photo: this.photo
          };
          localStorage.setItem('user', JSON.stringify(storedUser));

          // Отправить данные на сервер
          await axios.post('http://localhost:3000/save-user', storedUser);

          console.log('Регистрация выполнена:', user);
          this.$router.push('/user-profile'); // Перенаправляем на страницу пользователя
        } catch (error) {
          console.error('Ошибка регистрации:', error.message);
          alert('Ошибка регистрации: ' + error.message);
        }
      }
    }
  }
};
</script>

<style scoped>
body {
  font-family: Roboto, sans-serif;
}
</style>
