<template>
  <div class="auth-container">
    <div class="auth-box">
      <div class="tabs">
        <div :class="['tab', { active: isLogin }]" @click="isLogin = true">Login</div>
        <div :class="['tab', { active: !isLogin }]" @click="isLogin = false">Register</div>
      </div>
      <div v-if="isLogin" class="form-container">
        <h2>Login</h2>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="username">Username:</label>
            <input v-model="loginCredentials.username" type="text" id="login-username" class="form-control" />
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input v-model="loginCredentials.password" type="password" id="login-password" class="form-control" />
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
        </form>
      </div>
      <div v-else class="form-container">
        <h2>Register</h2>
        <form @submit.prevent="handleRegister">
          <div class="form-group">
            <label for="username">Username:</label>
            <input v-model="registerCredentials.username" type="text" id="register-username" class="form-control" />
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input v-model="registerCredentials.password" type="password" id="register-password" class="form-control" />
          </div>
          <div class="form-group">
            <label for="role">Role:</label>
            <select v-model="registerCredentials.role" id="role" class="form-control">
              <option value="TEACHER">Teacher</option>
              <option value="STUDENT">Student</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary">Register</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      isLogin: true,
      loginCredentials: {
        username: '',
        password: '',
      },
      registerCredentials: {
        username: '',
        password: '',
        role: 'STUDENT',
      },
    };
  },
  methods: {
    ...mapActions(['login', 'register']),
    async handleLogin() {
      try {
        await this.login(this.loginCredentials);
        this.$router.push('/directory');
      } catch (error) {
        console.error('Failed to login:', error);
      }
    },
    async handleRegister() {
      try {
        await this.register(this.registerCredentials);
        this.isLogin = true; // Switch to login tab after successful registration
      } catch (error) {
        console.error('Failed to register:', error);
      }
    },
  },
};
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f0f2f5;
}

.auth-box {
  width: 400px;
  padding: 20px;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.tabs {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.tab {
  cursor: pointer;
  padding: 10px;
  font-weight: bold;
  border-bottom: 2px solid transparent;
}

.tab.active {
  border-bottom: 2px solid #007bff;
  color: #007bff;
}

.form-container {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.btn {
  background: #007bff;
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 16px;
}

.btn:hover {
  background: #0056b3;
}
</style>
