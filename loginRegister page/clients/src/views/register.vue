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
        // Log the formData to verify it's correct before sending the request
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
      this.register(); // Directly call the register method
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
  background-color: #e0e0e0;
  width: 300px;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
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

input[type="text"] {
  width: auto;
  padding: 10px;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid #4d3d3d;
  background-color: #4d3d3d;
  color: white;
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-bottom: 15px;
}

.checkbox-group label {
  font-size: 12px;
  color: #4d3d3d;
  display: flex;
  align-items: center;
}

.checkbox-group input[type="checkbox"] {
  margin-right: 8px;
  accent-color: #4d3d3d;
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
