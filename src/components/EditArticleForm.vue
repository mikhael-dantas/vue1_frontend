<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div
    class="bg-gray-100 p-6 rounded-lg shadow-lg"
    v-if="selectedArticle !== null"
  >
    <form @submit.prevent="updateArticle" class="space-y-4">
      <div>
        <label for="edit-id" class="block text-sm font-medium text-gray-700"
          >ID</label
        >
        <input
          v-model="editedArticle!.id"
          type="text"
          id="edit-id"
          readonly
          class="mt-1 block w-full py-2 px-3 bg-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>
      <div>
        <label for="edit-name" class="block text-sm font-medium text-gray-700"
          >Name</label
        >
        <input
          v-model="editedArticle!.name"
          type="text"
          id="edit-name"
          class="mt-1 block w-full py-2 px-3 bg-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>
      <div>
        <label
          for="edit-description"
          class="block text-sm font-medium text-gray-700"
          >Description</label
        >
        <input
          v-model="editedArticle!.description"
          type="text"
          id="edit-description"
          class="mt-1 block w-full py-2 px-3 bg-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>
      <div>
        <label for="edit-tags" class="block text-sm font-medium text-gray-700"
          >Tags</label
        >
        <div class="relative mt-1">
          <input
            v-model="editTagInput"
            @keydown.space.prevent="addEditTag"
            type="text"
            id="edit-tags"
            class="mt-1 block w-full py-2 px-3 bg-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <div class="flex flex-wrap mt-2">
            <span
              v-for="(tag, index) in editedArticle!.tags"
              :key="index"
              class="bg-purple-500 text-white rounded-full px-3 py-1 mr-1 mb-1"
            >
              {{ tag }}
              <button
                @click.prevent="removeEditTag(index)"
                class="ml-1 text-white hover:text-purple-300 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="h-4 w-4"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11.414 10l3.293-3.293a1 1 0 10-1.414-1.414L10 8.586 6.707 5.293a1 1 0 10-1.414 1.414L8.586 10l-3.293 3.293a1 1 0 101.414 1.414L10 11.414l3.293 3.293a1 1 0 101.414-1.414L                 z"
                  />
                </svg>
              </button>
            </span>
          </div>
        </div>
      </div>
      <button
        type="submit"
        class="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        Update Article
      </button>
      <button
        type="button"
        class="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        @click="deleteArticle"
      >
        Delete Article
      </button>
    </form>
  </div>
</template>

<script lang="ts">
// import statements and interfaces here
import { defineComponent, ref, toRefs } from "vue";

export default defineComponent({
  name: "EditArticleForm",
  props: {
    editedArticle: {
      type: Object as () => {
        id: string;
        name: string;
        description: string;
        tags: string[];
      },
      required: true,
    },
    selectedArticle: {
      type: Number as () => number | null,
      required: false,
      default: null,
    },
  },
  emits: ["addEditTag", "removeEditTag", "updateArticle", "deleteArticle"],
  setup(props, { emit }) {
    const editTagInput = ref("");
    const updateArticle = async () => {
      emit("updateArticle");
    };
    const addEditTag = () => {
      emit("addEditTag", editTagInput.value);
      editTagInput.value = "";
    };
    const removeEditTag = (index: number) => {
      emit("removeEditTag", index);
    };
    const deleteArticle = () => {
      emit("deleteArticle");
    };

    return {
      ...toRefs(props),
      updateArticle,
      addEditTag,
      removeEditTag,
      editTagInput,
      deleteArticle,
    };
  },
});
</script>
