<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <form @submit.prevent="createArticle" class="space-y-6">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700 mb-1"
          >Name</label
        >
        <input
          v-model="newArticle!.name"
          type="text"
          id="name"
          class="block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
        />
      </div>
      <div>
        <label
          for="description"
          class="block text-sm font-medium text-gray-700 mb-1"
          >Description</label
        >
        <textarea
          v-model="newArticle!.description"
          id="description"
          rows="3"
          class="block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
        ></textarea>
      </div>
      <div class="flex items-center py-5">
        <label for="tags" class="block text-sm font-medium text-gray-700 mr-2"
          >Tags</label
        >
        <div class="relative flex-grow">
          <input
            v-model="tagInput"
            @keydown.space.prevent="addTag"
            type="text"
            id="tags"
            class="block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
          />
          <div class="absolute right-0 top-full z-10 w-full">
            <div class="flex flex-wrap mt-2">
              <span
                v-for="(tag, index) in newArticle!.tags"
                :key="index"
                class="bg-purple-500 text-white rounded-full px-3 py-1 mr-1 mb-1 text-sm flex items-center"
              >
                {{ tag }}
                <button
                  @click.prevent="removeTag(index)"
                  class="ml-1 text-sm font-medium text-white hover:text-gray-200 focus:outline-none focus:shadow-outline-purple"
                >
                  ×
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
      <button
        type="submit"
        class="w-full py-2 px-4 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:shadow-outline-purple"
      >
        Create Article
      </button>
    </form>
  </div>
</template>

<script lang="ts">
// import statements and interfaces here
import { defineComponent, ref, toRefs } from "vue";

export interface Article {
  id: string;
  name: string;
  description: string;
  tags: string[];
}

export default defineComponent({
  name: "CreateArticleForm",
  props: {
    newArticle: Object,
    // tagInput: String,
  },
  emits: ["addTag", "removeTag", "submit"],
  setup(props, { emit }) {
    const tagInput = ref("");
    // methods and functions here
    const addTag = () => {
      emit("addTag", tagInput.value);
      tagInput.value = "";
    };
    const removeTag = (index: number) => {
      emit("removeTag", index);
    };
    const createArticle = async () => {
      emit("submit");
    };
    return {
      ...toRefs(props),
      addTag,
      removeTag,
      createArticle,
      tagInput,
    };
  },
});
</script>
