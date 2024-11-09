<template>
    <div class="container">
        <h1>Let's test the project together</h1>
        <div class="second-dcontainer">
            <div class="left">
                <h3>Click the button below to register</h3>
                <button @click="$router.push('/register')">Register</button>
            </div>
            <div class="right">
                <h3>Click the button below to login</h3>
                <button @click="$router.push('/login')">Login</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
    name: 'Home'
    };
</script>

<style scoped>
    .container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    border: 2px solid black;
    border-radius: 25px;
    width: 50%;
    height: auto;
    color: #ffffff;
    background-color: #000000;
    }

    .second-dcontainer {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        padding: 20px;
        margin: 20px;
        border: 2px solid black;
        border-radius: 25px;
        background-color: #000000;
    }
    .left, .right {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 10px;
        padding: 20px;
        border: 2px solid black;
        border-radius: 25px;
        color: #ffffff;
        background-color: #590fb3;
    }

    button {
        padding: 8px 12px;
        font-size: 18px;
        cursor: pointer;
        border: 2px solid black;
        border-radius: 15px;
        color: #590fb3;
        background-color: #ffffff;
    }
</style>
