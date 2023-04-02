<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-4">
    <div class="bg-red-500 h-[20rem]">
      <div class="h-[100%] w-full flex justify-center items-center">
        <img
          src="https://cf.workana.com/logos/c81d7b293b7428dbf6b29d52daf0abbc/rs/Designsemnome2_192_192.png"
          alt="Image 1"
          class="rounded-full h-40 w-40 object-cover object-center max-h-full max-w-full border-2 border-gray-300 shadow-sm"
        />
        <i class="fas fa-icon text-gray-500 mx-4 text-2xl">X</i>
        <img
          src="https://i.ytimg.com/vi/DXUAyRRkI6k/mqdefault.jpg"
          alt="Image 2"
          class="rounded-full h-40 w-40 object-cover object-center max-h-full max-w-full border-2 border-gray-300 shadow-sm"
        />
      </div>
    </div>
    <div class="bg-blue-500 p-4">
      <form @submit.prevent="createArticle" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700"
            >Name</label
          >
          <input
            v-model="newArticle.name"
            type="text"
            id="name"
            class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label
            for="description"
            class="block text-sm font-medium text-gray-700"
            >Description</label
          >
          <input
            v-model="newArticle.description"
            type="text"
            id="description"
            class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label for="tags" class="block text-sm font-medium text-gray-700"
            >Tags</label
          >
          <div class="relative mt-1">
            <input
              v-model="tagInput"
              @keydown.space.prevent="addTag"
              type="text"
              id="tags"
              class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <div class="flex flex-wrap mt-2">
              <span
                v-for="(tag, index) in newArticle.tags"
                :key="index"
                class="bg-blue-500 text-white rounded-full px-3 py-1 mr-1 mb-1"
              >
                {{ tag }}
                <button
                  @click.prevent="removeTag(index)"
                  class="ml-1 text-white"
                >
                  ×
                </button>
              </span>
            </div>
          </div>
        </div>
        <button
          type="submit"
          class="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Create Article
        </button>
      </form>
    </div>
    <div class="bg-green-500 p-4">
      <ul>
        <li
          v-for="(article, index) in articles"
          :key="index"
          @click="selectArticle(index)"
          class="py-2 px-4 bg-white rounded-md mb-2 cursor-pointer hover:bg-gray-200"
        >
          <h3 class="font-bold">{{ article.name }}</h3>
          <p>{{ article.description }}</p>
          <p>{{ article.tags }}</p>
        </li>
      </ul>
    </div>
    <div class="bg-yellow-500 p-4" v-if="selectedArticle !== null">
      <form @submit.prevent="updateArticle" class="space-y-4">
        <div>
          <label for="edit-id" class="block text-sm font-medium text-gray-700"
            >ID</label
          >
          <input
            v-model="editedArticle.id"
            type="text"
            id="edit-id"
            readonly
            class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>
        <div>
          <label for="edit-name" class="block text-sm font-medium text-gray-700"
            >Name</label
          >
          <input
            v-model="editedArticle.name"
            type="text"
            id="edit-name"
            class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>
        <div>
          <label
            for="edit-description"
            class="block text-sm font-medium text-gray-700"
            >Description</label
          >
          <input
            v-model="editedArticle.description"
            type="text"
            id="edit-description"
            class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
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
              class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            />
            <div class="flex flex-wrap mt-2">
              <span
                v-for="(tag, index) in editedArticle.tags"
                :key="index"
                class="bg-yellow-500 text-white rounded-full px-3 py-1 mr-1 mb-1"
              >
                {{ tag }}
                <button
                  @click.prevent="removeEditTag(index)"
                  class="ml-1 text-white"
                >
                  ×
                </button>
              </span>
            </div>
          </div>
        </div>
        <button
          type="submit"
          class="w-full py-2 px-4 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
        >
          Update Article
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";

interface Article {
  id: string;
  name: string;
  description: string;
  tags: string[];
}

export default defineComponent({
  name: "HomeView",
  components: {},
  setup() {
    const articles = ref<Article[]>([]);
    const selectedArticle = ref<number | null>(null);

    const newArticle = ref<{
      name: string;
      description: string;
      tags: string[];
    }>({
      name: "",
      description: "",
      tags: [],
    });

    const editedArticle = ref<{
      id: string;
      name: string;
      description: string;
      tags: string[];
    }>({
      id: "",
      name: "",
      description: "",
      tags: [],
    });

    const tagInput = ref("");
    const editTagInput = ref("");

    function addTag() {
      if (tagInput.value.trim() !== "") {
        newArticle.value.tags.push(tagInput.value.trim());
        tagInput.value = "";
      }
    }

    function removeTag(index: number) {
      newArticle.value.tags.splice(index, 1);
    }

    function addEditTag() {
      if (editTagInput.value.trim() !== "") {
        editedArticle.value.tags.push(editTagInput.value.trim());
        editTagInput.value = "";
      }
    }

    function removeEditTag(index: number) {
      editedArticle.value.tags.splice(index, 1);
    }

    async function fetchArticles() {
      const response = await axios.get<Article[]>(
        "http://localhost:3001/articles"
      );
      articles.value = response.data;
    }

    fetchArticles();

    async function createArticle() {
      try {
        const response = await axios.post<Article>(
          "http://localhost:3001/articles",
          newArticle.value
        );
        articles.value.push(response.data);
        newArticle.value = { name: "", description: "", tags: [] };
      } catch (error) {
        console.error(error);
      }
    }

    function selectArticle(index: number) {
      selectedArticle.value = index;
      editedArticle.value = {
        ...articles.value[index],
      };
    }

    async function updateArticle() {
      try {
        const id = articles.value[selectedArticle.value!].id;
        const response = await axios.put<Article>(
          `http://localhost:3001/articles/${id}`,
          editedArticle.value
        );
        articles.value[selectedArticle.value!] = response.data;
        selectedArticle.value = null;
        const response2 = await axios.get<Article[]>(
          "http://localhost:3001/articles"
        );
        articles.value = response2.data;
      } catch (error) {
        console.error(error);
      }
    }

    return {
      articles,
      selectedArticle,
      newArticle,
      editedArticle,
      createArticle,
      selectArticle,
      updateArticle,
      tagInput,
      editTagInput,
      addTag,
      removeTag,
      addEditTag,
      removeEditTag,
    };
  },
});
</script>
