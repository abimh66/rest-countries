<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const { country } = defineProps(['country']);
const router = useRouter();
</script>

<template>
  <div
    class="card flex flex-col w-80 sm:w-72 cursor-pointer hover:shadow-2xl bg-white dark:bg-dark-blue shadow-md rounded-md"
    @click="router.push(`/country/${country.name.common.toLowerCase()}`)"
  >
    <img
      :src="country.flags.png"
      :alt="`${country.name.common} flag`"
      class="rounded-t-md w-[320px] h-[200px]"
    />
    <div class="flex flex-col gap-5 py-5 px-8">
      <h4 class="font-bold text-[20px]">{{ country.name.common }}</h4>
      <ul>
        <li class="flex gap-2">
          <span class="font-bold">Population:</span
          ><span>{{ new Intl.NumberFormat().format(country.population) }}</span>
        </li>
        <li class="flex gap-2">
          <span class="font-bold">Region:</span
          ><span>{{ country.region }}</span>
        </li>
        <li class="flex gap-2">
          <span class="font-bold">Capital:</span
          ><span>{{ country.capital ? country.capital[0] : '-' }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<!-- <template>
  <div
    class="card flex flex-col w-80 cursor-pointer bg-white dark:bg-dark-blue shadow-md rounded-md"
    @click="router.push(`/country/${country.name.common.toLowerCase()}`)"
  >
    <img
      :src="country.flags.png"
      :alt="`${country.name.common} flag`"
      class="rounded-t-md h-56"
    />
    <div class="flex flex-col gap-5 py-5 pl-8">
      <h4 class="font-bold text-[20px]">{{ country.name.common }}</h4>
      <ul>
        <li class="flex gap-2">
          <span class="font-bold">Population:</span
          ><span>{{ new Intl.NumberFormat().format(country.population) }}</span>
        </li>
        <li class="flex gap-2">
          <span class="font-bold">Region:</span
          ><span>{{ country.region ? country.region : 'error' }}</span>
        </li>
        <li class="flex gap-2">
          <span class="font-bold">Capital:</span
          ><span>{{ country.capital[0] ? country.capital[0] : 'error' }}</span>
        </li>
      </ul>
    </div>
  </div>
</template> -->
