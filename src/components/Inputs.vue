<script setup>
import { ref, defineEmits } from 'vue';

const curRegion = ref(null);
const searchInput = ref('');
const emit = defineEmits(['chooseRegion', 'searchCountry']);

function onChange() {
  // console.log(curRegion.value);
  emit('chooseRegion', curRegion.value);
}
function onKeyEnter(e) {
  if (e.key === 'Enter') {
    emit('searchCountry', searchInput.value);
  }
}
</script>

<template>
  <div
    class="flex flex-col gap-10 py-8 px-6 sm:flex-row sm:justify-between sm:px-10"
  >
    <div
      class="flex gap-8 bg-white dark:bg-dark-blue shadow-md py-4 px-8 rounded-md text-[14px] items-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>

      <input
        type="text"
        class="h-full w-full bg-transparent focus:outline-none sm:w-80"
        placeholder="Search for a country..."
        v-model.trim="searchInput"
        @keypress="onKeyEnter"
      />
    </div>
    <div>
      <select
        class="py-3 px-8 bg-white dark:bg-dark-blue rounded-md text-[14px] shadow-md focus:outline-none"
        @change="onChange"
        v-model="curRegion"
      >
        <option disabled selected value="null">filter by region</option>
        <option value="Africa">Africa</option>
        <option value="America">America</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
  </div>
</template>
