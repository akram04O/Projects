<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="username">USERNAME</label>
        <input
          v-model="formData.username"
          type="text"
          name="username"
          placeholder=""
          required
        />
      </div>
      <div class="form-group">
        <label for="password">PASSWORD</label>
        <input
          v-model="formData.password"
          type="password"
          name="password"
          placeholder=""
          required
        />
      </div>

      <!-- Submit Button -->
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { reactive } from 'vue';
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      message: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:3000/login', {
          username: this.username,
          password: this.password
        });
        this.message = 'Login successful';
      } catch (error) {
        this.message = 'Login failed';
      }
    }
  },
  setup() {
    const formData = reactive({
      username: '',
      password: '',
    });

    const submitForm = () => {
      console.log('Login submitted:', formData);
      // Add login submission logic here
    };

    return { formData, submitForm };
  }
};
</script>

<style scoped>
.login-container {
  background-color: #e0e0e0;
  width: 300px;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  font-family: Arial, sans-serif;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid #4d3d3d;
}

h1 {
  font-size: 36px;
  color: #333;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-size: 18px;
  font-weight: bold;
  color: #2d2525;
  margin-bottom: 5px;
}

input[type="text"],
input[type="password"] {
  width: auto;
  padding: 10px;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid #4d3d3d;
  background-color: #4d3d3d;
  color: white;
}

button {
  width: 100px;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background-color: #4d3d3d;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

button:hover {
  background-color: #3b2e2e;
}
</style>
