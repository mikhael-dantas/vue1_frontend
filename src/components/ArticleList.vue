<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <ul>
      <li
        v-for="(article, index) in articles"
        :key="index"
        @click="selectArticle(index)"
        class="py-2 px-4 bg-gray-100 rounded-md mb-2 cursor-pointer hover:bg-gray-200"
      >
        <h3 class="text-2xl font-bold text-gray-800 mb-1">
          {{ article.name }}
        </h3>
        <p class="text-lg text-gray-600 leading-7 mb-3">
          {{ article.description }}
        </p>
        <div class="flex flex-wrap">
          <template :key="index" v-for="(tag, index) in article.tags">
            <div
              class="py-1 px-2 mr-2 mb-2 rounded-md bg-purple-100 text-purple-600 text-sm"
            >
              {{ tag }}
            </div>
          </template>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
// import statements and interfaces here
import { defineComponent, toRefs } from "vue";
import { Article } from "@/views/HomeView.vue";

export default defineComponent({
  name: "ArticleList",
  props: {
    articles: Array as () => Article[],
    selectedArticle: Number,
  },
  emits: ["selectArticle"],
  setup(props, { emit }) {
    function selectArticle(index: number) {
      emit("selectArticle", index);
    }

    return {
      ...toRefs(props),
      selectArticle,
    };
  },
});
</script>
