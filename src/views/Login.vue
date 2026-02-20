<template>
  <main class="auth-page">
    <div class="auth-card">
      <h1>เข้าสู่ระบบ</h1>

      <input
        type="text"
        v-model="username"
        placeholder="Username"
      />

      <input
        type="password"
        v-model="password"
        placeholder="Password"
      />

      <button @click="login" :disabled="loading">
        {{ loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ" }}
      </button>

      <p class="error" v-if="errorMsg">
        {{ errorMsg }}
      </p>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { collection, query, where, getDocs } from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { db, auth } from "../firebase";

const username = ref("");
const password = ref("");
const errorMsg = ref("");
const loading = ref(false);
const router = useRouter();

const login = async () => {
  loading.value = true;
  errorMsg.value = "";

  try {
    await setPersistence(auth, browserSessionPersistence);

    const q = query(
      collection(db, "users"),
      where("username", "==", username.value)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      errorMsg.value = "ไม่พบ username นี้";
      loading.value = false;
      return;
    }

    const userData = querySnapshot.docs[0].data();
    const email = userData.email;

    await signInWithEmailAndPassword(auth, email, password.value);

    router.push("/");

  } catch (error) {
    console.log(error);

    if (error.code === "auth/wrong-password") {
      errorMsg.value = "รหัสผ่านไม่ถูกต้อง";
    } else {
      errorMsg.value = "เกิดข้อผิดพลาด กรุณาลองใหม่";
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.auth-page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff6f3;
}

.auth-card {
  width: 350px;
  padding: 2rem;
  border-radius: 20px;
  background: white;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

h1 {
  text-align: center;
}

input {
  padding: 0.8rem;
  border-radius: 10px;
  border: 1px solid #ddd;
  font-size: 14px;
}

button {
  padding: 0.8rem;
  border-radius: 10px;
  border: none;
  background: linear-gradient(135deg, #ff9a8b, #ff6a88);
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  opacity: 0.9;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error {
  color: red;
  font-size: 14px;
  text-align: center;
}
</style>