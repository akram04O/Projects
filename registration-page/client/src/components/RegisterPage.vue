<template>
    <div class="register">
        <h2>Register</h2>
        <form @submit.prevent="registerUser">
            <div>
                <label for="username">Username</label>
                <input type="text" v-model="username" required />
            </div>
            <div>
                <label for="password">Password</label>
                <input type="password" v-model="password" required />
            </div>
            <button type="submit">Register</button>
            <p v-if="message">{{ message }}</p>
        </form>
    </div>
</template>

<script>
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
        async registerUser() {
            try {
                const response = await axios.post('http://localhost:5000/register', {
                    username: this.username,
                    password: this.password
                });
                this.message = response.data.message;
                this.username = '';
                this.password = '';
            } catch (error) {
                this.message = error.response ? error.response.data.message : 'Error registering';
            }
        }
    }
};
</script>

<style scoped>
.register {
    max-width: 400px;
    margin: 0 auto;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
}
h2 {
    text-align: center;
    color: #333;
}
form {
    display: flex;
    flex-direction: column;
}
label {
    margin-top: 0.5rem;
}
input {
    padding: 0.5rem;
    margin-top: 0.2rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}
button {
    margin-top: 1rem;
    padding: 0.5rem;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
button:hover {
    background-color: #0056b3;
}
p {
    text-align: center;
    color: green;
    margin-top: 1rem;
}
</style>
