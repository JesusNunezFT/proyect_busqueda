<script setup>
import { defineProps, ref } from 'vue';
import Button from 'primevue/button';
import AutoComplete from 'primevue/autocomplete';
import Calendar from 'primevue/calendar';
import axios from 'axios';

defineProps({
  msg: {
    type: String,
    required: true
  }
});

const selectedCountry = ref('');
const selectedCity = ref('');
const selectedDates = ref(null);
const filteredCountries = ref([]);
const filteredCities = ref([]);

const url = 'https://www.kiwi.com/query';

const params = {
  term: 'PRG',
  locale: 'en-US',
  location_types: 'airport',
  limit: 10
};

const headers = {
  'apiKey': 'HyvzylbFKHv5wHeLyPJXSe7uZegSr08J', // Reemplaza 'xxxxxxxx' con tu apiKey real
  'Accept': 'application/json',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

axios.get(url, {
  params: params,
  headers: headers
})
.then(response => {
  // Manejar la respuesta aquí
  console.log(response.data);
})
.catch(error => {
  // Manejar errores aquí
  console.error('Error al hacer la solicitud:', error);
});

const searchCountries = async () => {
  try {
    const response = await axios.get(`https://api.tequila.kiwi.com/locations/query?term=${selectedCountry.value}&locale=en-US&location_types=country&limit=10&active_only=true`);
    filteredCountries.value = response.data.locations.map(location => location.name);
  } catch (error) {
    console.error('Error fetching countries:', error);
  }
};

const searchCities = async () => {
  try {
    const response = await axios.get(`https://api.tequila.kiwi.com/locations/query?term=${selectedCity.value}&locale=en-US&location_types=city&limit=10&active_only=true`);
    filteredCities.value = response.data.locations.map(location => location.name);
  } catch (error) {
    console.error('Error fetching cities:', error);
  }
};

// // Calcula la fecha mínima y máxima permitida basada en las fechas disponibles
// const minDate = availableDates.length > 0 ? availableDates[0] : null;
// const maxDate = availableDates.length > 0 ? availableDates[availableDates.length - 1] : null;

// // Calcula las fechas deshabilitadas basadas en las fechas disponibles y las fechas seleccionadas
// const disabledDates = (date) => {
//   const formattedDate = date.toISOString().split('T')[0]; // Formatea la fecha a 'YYYY-MM-DD'
//   return !availableDates.includes(formattedDate) || formattedDate < minDate || formattedDate > maxDate;
// };


// const submitForm = () => {
//   // Lógica para enviar el formulario con los datos seleccionados
// };


</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>

    <div class="bigbox">     
      <div class="child1">
        <AutoComplete v-model="selectedCountry" :suggestions="filteredCountries" @complete="searchCountries" placeholder="Country" />
        <AutoComplete v-model="selectedCity" :suggestions="filteredCities" @complete="searchCities" placeholder="City" />
      </div>
      <div class="child2">
        <Button label="Date" severity="success" raised />
        <Calendar v-model="selectedDates" selectionMode="range" :minDate="minDate" :maxDate="maxDate" :disabledDates="disabledDates" :manualInput="false" placeholder="Dates" />
      </div>
      <div class="child3">
        <Button label="Submit" severity="success" raised @click="submitForm" />
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
