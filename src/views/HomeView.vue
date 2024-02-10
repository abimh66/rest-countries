<script setup>
import Inputs from '../components/Inputs.vue';
import Card from '../components/Card.vue';
import Loading from '../components/Loading.vue';
import axios from 'axios';
import { ref, onMounted } from 'vue';

const dataCountries = ref([]);
const isLoading = ref(true);

function fetchData(keyword) {
  isLoading.value = true;
  axios
    .get(`https://restcountries.com/v3.1/${keyword}`)
    .then((res) => {
      dataCountries.value = res.data;
      console.log(res);
    })
    .catch(() => (dataCountries.value = []))
    .finally(() => (isLoading.value = false));
}

function onChooseRegion(region) {
  fetchData(`region/${region}`);
}

function onSearchCountry(searchKeyword) {
  fetchData(`name/${searchKeyword}`);
}

onMounted(() => fetchData('all'));
</script>

<template>
  <div class="bg-light-gray pb-8 flex-1 flex flex-col dark:bg-v-dark-blue">
    <Inputs @chooseRegion="onChooseRegion" @searchCountry="onSearchCountry" />
    <Loading v-if="isLoading" />
    <div
      v-else-if="!dataCountries.length"
      class="flex items-center justify-center flex-1"
    >
      Data not found
    </div>
    <div
      v-else
      class="flex flex-col sm:flex-row sm:flex-wrap gap-10 justify-center items-center sm:items-start"
    >
      <Card v-for="country in dataCountries" :country="country" />
    </div>
  </div>
</template>
