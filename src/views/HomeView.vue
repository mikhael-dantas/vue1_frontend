<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-4">
    <div class="">
      <div class="h-[100%] w-full flex justify-center items-center">
        <img
          src="https://cf.workana.com/logos/c81d7b293b7428dbf6b29d52daf0abbc/rs/Designsemnome2_192_192.png"
          alt="Image 1"
          class="rounded-full h-40 w-40 object-cover object-center max-h-full max-w-full border-2 border-gray-300 shadow-sm"
        />
        <i class="fas fa-icon text-gray-500 mx-4 text-2xl">↓↑</i>
        <img
          src="https://media.licdn.com/dms/image/D4E03AQGLay86biXNgQ/profile-displayphoto-shrink_200_200/0/1673301987295?e=1686182400&v=beta&t=wyb_9uXGtQD7hema2rtYRSAcgMhE-oNzo8mWJIw3iMk"
          alt="Image 2"
          class="rounded-full h-40 w-40 object-cover object-center max-h-full max-w-full border-2 border-gray-300 shadow-sm"
        />
      </div>
    </div>
    <CreateArticleForm
      :new-article="newArticle"
      @addTag="addTag"
      @removeTag="removeTag"
      @submit="createArticle"
    />
    <ArticleList
      :articles="articles"
      :selected-article="selectedArticle"
      @selectArticle="selectArticle"
    />
    <EditArticleForm
      :edited-article="editedArticle"
      :selected-article="selectedArticle"
      @addEditTag="addEditTag"
      @removeEditTag="removeEditTag"
      @updateArticle="updateArticle"
      @deleteArticle="deleteArticle"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";
import CreateArticleForm from "../components/CreateArticleForm.vue";
import ArticleList from "../components/ArticleList.vue";
import EditArticleForm from "../components/EditArticleForm.vue";

export interface Article {
  id: string;
  name: string;
  description: string;
  tags: string[];
}

export default defineComponent({
  name: "HomeView",
  components: {
    CreateArticleForm,
    ArticleList,
    EditArticleForm,
  },
  setup() {
    const articles = ref<Article[]>([]);
    const selectedArticle = ref<number | undefined>(undefined);

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

    function addTag(tagInput: string) {
      if (tagInput.trim() !== "") {
        newArticle.value.tags.push(tagInput.trim());
      }
    }

    function removeTag(index: number) {
      newArticle.value.tags.splice(index, 1);
    }

    function addEditTag(editTagInput: string) {
      if (editTagInput.trim() !== "") {
        editedArticle.value.tags.push(editTagInput.trim());
        editTagInput = "";
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
        await axios.post<Article>(
          "http://localhost:3001/articles",
          newArticle.value
        );
        newArticle.value = { name: "", description: "", tags: [] };
        await fetchArticles();
      } catch (error) {
        console.error(error);
      }
    }

    function selectArticle(index: number) {
      selectedArticle.value = index;
      editedArticle.value = {
        ...articles.value[index],
      };
      console.log(editedArticle.value);
      console.log(articles.value[index]);
    }

    async function updateArticle() {
      try {
        const id = articles.value[selectedArticle.value!].id;
        const response = await axios.put<Article>(
          `http://localhost:3001/articles/${id}`,
          editedArticle.value
        );
        articles.value[selectedArticle.value!] = response.data;
        selectedArticle.value = undefined;
        const response2 = await axios.get<Article[]>(
          "http://localhost:3001/articles"
        );
        articles.value = response2.data;
      } catch (error) {
        console.error(error);
      }
    }

    async function deleteArticle() {
      try {
        const id = articles.value[selectedArticle.value!].id;
        await axios.delete<Article>(`http://localhost:3001/articles/${id}`);
        articles.value.splice(selectedArticle.value!, 1);
        selectedArticle.value = undefined;
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
      deleteArticle,
      addTag,
      removeTag,
      addEditTag,
      removeEditTag,
    };
  },
});
</script>
