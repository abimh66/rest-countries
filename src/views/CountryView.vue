<script setup>
import Loading from '../components/Loading.vue';
import { useRoute, useRouter } from 'vue-router';
import { ref, onBeforeMount, onUnmounted } from 'vue';
import axios from 'axios';

const route = useRoute();
const router = useRouter();

const isLoading = ref(true);
const country = ref([]);
const countryCurrencies = ref('');
const countryLang = ref('');
const countryBorder = ref(null);

function fetchDataBorders(borders) {
  axios
    .get(`https://restcountries.com/v3.1/alpha?codes=${borders}`)
    .then((res) => {
      countryBorder.value = res.data.map((c) => c.name.common);
      // console.log(countryBorder.value);
    });
}

function fetchData(countryName) {
  axios
    .get(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then((res) => {
      country.value = res.data[0];

      countryCurrencies.value = Object.values(
        Object.values(res.data[0].currencies)
      )[0];
      countryLang.value = Object.values(Object.values(res.data[0].languages));

      res.data[0].borders
        ? fetchDataBorders(res.data[0].borders.join(','))
        : (countryBorder.value = []);
    })
    .catch((err) => console.log(err.toJSON()))
    .finally(() => {
      isLoading.value = false;
      // console.log('finally');
      // console.log(country.value);
      // console.log(countryBorder);
      // console.log(isLoading.value);
    });
}

function handleClickBorder(border) {
  router.push(`/country/${border.toLowerCase()}`);

  // state to default value
  isLoading.value = true;
  country.value = [];
  countryCurrencies.value = '';
  countryLang.value = '';
  countryBorder.value = null;

  fetchData(border);
}

onBeforeMount(() => fetchData(route.params.name));
</script>

<template>
  <div
    v-if="!isLoading && countryBorder !== null"
    class="p-10 bg-light-gray flex-1 dark:bg-v-dark-blue flex flex-col gap-16"
  >
    <div>
      <div
        class="py-2 px-6 flex w-fit gap-2 cursor-pointer hover:shadow-lg bg-white shadow-md rounded-sm dark:bg-dark-blue"
        @click="router.push('/')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 text-v-dark-blue dark:text-light-gray"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
          />
        </svg>
        <span>Back</span>
      </div>
    </div>
    <div class="flex flex-col gap-10 sm:flex-row sm:w-full sm:items-center">
      <img
        :src="country.flags.svg ? country.flags.svg : ''"
        :alt="country.flags.alt ? country.flags.alt : country.name.common"
        class="sm:w-2/5"
      />
      <div class="flex flex-col gap-6">
        <h2 class="font-bold text-[22px]">
          {{ country.name.common ? country.name.common : '' }}
        </h2>
        <div class="flex flex-col gap-8 sm:flex-row sm:gap-36">
          <div>
            <p>
              <span class="font-bold">Native Name:</span>
              {{ country.name.official ? country.name.official : '' }}
            </p>
            <p>
              <span class="font-bold">Population:</span>
              {{
                country.population
                  ? new Intl.NumberFormat().format(country.population)
                  : '-'
              }}
            </p>
            <p>
              <span class="font-bold">Region:</span>
              {{ country.region ? country.region : '-' }}
            </p>
            <p>
              <span class="font-bold">Sub Region:</span>
              {{ country.subregion || '-' }}
            </p>
            <p>
              <span class="font-bold">Capital:</span>
              {{ country.capital ? country.capital[0] : '-' }}
            </p>
          </div>
          <div>
            <p>
              <span class="font-bold">Top Level Domain:</span>
              {{ country.tld ? country.tld[0] : '-' }}
            </p>
            <p>
              <span class="font-bold">Currencies:</span>
              {{ countryCurrencies.name || '-' }}
            </p>
            <p>
              <span class="font-bold">Languages:</span>
              {{ countryLang.join(', ') }}
            </p>
          </div>
        </div>
        <div class="sm:mt-10 flex flex-col sm:flex-row sm:items-start sm:gap-5">
          <p class="font-bold whitespace-nowrap">Border Countries:</p>
          <div class="flex gap-2 flex-wrap">
            <span
              v-if="countryBorder.length"
              v-for="border in countryBorder"
              class="py-1 px-3 shadow-md cursor-pointer"
              @click="handleClickBorder(border)"
              >{{ border }}</span
            >
            <span v-else>-</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Loading v-else />
</template>
