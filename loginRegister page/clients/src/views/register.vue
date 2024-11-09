<template>
  <div class="register-container">
    <h1>Register</h1>
    <form @submit.prevent="submitForm">
      <div v-for="(field, index) in formFields" :key="index" class="form-group">
        <label :for="field.name">{{ field.label }}</label>
        <input
          v-model="formData[field.name]"
          :type="field.type"
          :name="field.name"
          :placeholder="field.placeholder"
          required
        />
      </div>

      <!-- Checkboxes -->
      <div class="checkbox-group">
        <label>
          <input type="checkbox" v-model="formData.policy" />
          Agree to Policy
        </label>
        <label>
          <input type="checkbox" v-model="formData.condition" />
          Agree to Condition
        </label>
      </div>

      <!-- Submit Button -->
      <button type="submit">Submit</button>
    </form>
    <p>{{ message }}</p>
  </div>
</template>

<script>
import { reactive } from 'vue';
import axios from 'axios';

export default {
  data() {
    return {
      message: ''
    };
  },
  methods: {
    async register() {
      try {
        console.log('Form data being submitted:', this.formData);

        const response = await axios.post('http://localhost:3000/register', {
          username: this.formData.username,
          password: this.formData.password,
        });
        this.message = 'User registered successfully';
        console.log('Response:', response.data);
      } catch (error) {
        this.message = 'Registration failed';
        console.error('Error:', error);
      }
    },
    submitForm() {
      this.register(); 
    },
  },
  setup() {
    const formFields = [
      { name: 'username', label: 'Username', type: 'text', placeholder: 'Enter your username' },
      { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email' },
      { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter your password' },
    ];

    const formData = reactive({
      username: '',
      email: '',
      password: '',
      policy: false,
      condition: false,
    });

    return { formFields, formData };
  },
};
</script>

<style scoped>
.register-container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid #4d3d3d;
  padding: 20px;
  margin: auto;
  border-radius: 10px;
  text-align: center;
  font-family: Arial, sans-serif;
  background-color: #e0e0e0;
}

h1 {
  font-size: 36px;
  color: #333;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  padding: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #230e07;;
  font-size: 24px;
}

input {
  padding: 10px;
  border: 2px solid #231c1c;
  border-radius: 4px;
  font-size: 16px;
  color: #ccc;
  background-color: #4d3d3d;
}

.checkbox-group {
  display: flex;
  flex-direction: column;
}

.checkbox-group label {
  margin-bottom: 10px;
  color: #333;
  font-size: 14px;
  display: flex;
  align-items: center;
  cursor: pointer;
  
}

.checkbox-group input[type="checkbox"] {
  margin-right: 5px;
  cursor: pointer;
  border: 1px solid #000000;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
  background-color: #4d3d3d;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #333;
}
</style>
