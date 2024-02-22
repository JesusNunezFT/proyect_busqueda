<script setup>
import { defineProps, ref } from 'vue';
import Button from 'primevue/button';
import AutoComplete from 'primevue/autocomplete';
import Calendar from 'primevue/calendar';
import axios from 'axios';


const selectedCountry = ref('');
const selectedCity = ref('');
const selectedDates = ref(null);
const filteredCountries = ref([]);
const filteredCities = ref([]);


const searchCountries = async () => {
  const userInput = selectedCountry.value.toString()
  const url = `https://api.tequila.kiwi.com/locations/query?term=${userInput}&locale=en-US&location_types=airport&limit=10&active_only=true`

  const options = {
    headers: {
      'apiKey': 'HyvzylbFKHv5wHeLyPJXSe7uZegSr08J',
      'Accept': 'application/json',
    }
  }

  const response = await axios.get(url, options);

  filteredCountries.value = response.data?.locations.map(loc => loc.name) || []
};

</script>

<template>
  <div class="greetings">
    <h1 class="green">find your destination airport !!</h1>

    <div class="bigbox">
      <div class="child1">
        <AutoComplete class="autocomplete1" v-model="selectedCountry" :suggestions="filteredCountries" @complete="searchCountries"
          placeholder="Country" />
        <AutoComplete class="autocomplete1" v-model="selectedCity" :suggestions="filteredCities" @complete="searchCities" placeholder="City" />
      </div>
      <div class="child2">
        <Button class="autocomplete1" label="Date" severity="success" raised />
        <Calendar class="autocomplete1" v-model="selectedDates" selectionMode="range" :minDate="minDate" :maxDate="maxDate"
          :disabledDates="disabledDates" :manualInput="false" placeholder="Dates" />
      </div>
      <div class="child3">
        <Button class="button" label="Submit" severity="success" raised @click="submitForm" />
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.bigbox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5px;
}

.child1 {
  margin: 5px;
}

.autocomplete1 {
  margin: 2px;
}

.child2 {
  margin: 5px;
}

.child3 {
  margin: 5px;
}

.button {
  width: 200px;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {

  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>