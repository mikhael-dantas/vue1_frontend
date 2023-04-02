<template>
  <div class="w-full flex flex-col">
    <header
      class="bg-blue-500 text-white p-4 flex items-center justify-between"
    >
      <button
        @click="collapsed = !collapsed"
        class="bg-white text-blue-500 p-2 rounded-md font-semibold"
      >
        Menu
      </button>
      <h1 class="text-xl font-semibold">A Escolha Certa</h1>
    </header>
    <div
      v-if="!collapsed"
      @click="collapsed = true"
      class="fixed inset-0 bg-gray-800 opacity-50"
    ></div>
    <div
      :class="{
        hidden: collapsed,
        'flex flex-col bg-white w-64 p-4 fixed left-0 top-16 bottom-0 rounded-md shadow-lg z-10':
          !collapsed,
      }"
    >
      <router-link
        @click="collapsed = true"
        to="/"
        class="bg-blue-100 text-blue-500 hover:bg-blue-200 hover:text-blue-700 mb-2 px-4 py-2 rounded-md"
      >
        Home
      </router-link>
      <router-link
        @click="collapsed = true"
        to="/hello-world-2"
        class="bg-blue-100 text-blue-500 hover:bg-blue-200 hover:text-blue-700 mb-2 px-4 py-2 rounded-md"
      >
        Hello World 2
      </router-link>
      <router-link
        @click="collapsed = true"
        to="/hello-world-3"
        class="bg-blue-100 text-blue-500 hover:bg-blue-200 hover:text-blue-700 mb-2 px-4 py-2 rounded-md"
      >
        Hello World 3
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "SideBar",
  setup() {
    const collapsed = ref(true);
    return { collapsed };
  },
});
</script>

<style scoped>
header {
  height: 64px;
}
</style>
