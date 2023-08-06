<template>
  <div>
    <div class="map" id="map" style="width: 1000px; height: 500px"></div>
    <p>Latitude: {{ position.lat }}</p>
    <p>Longitude: {{ position.lng }}</p>
    <p>Full: {{ currentFullAddress }}</p>
  </div>

  <div>
    <input id="autocomplete" placeholder="Enter a place" type="text" />

    <div>
      <label for="street">Address line</label>
      <input type="text" id="street" v-model="street" />
    </div>

    <div>
      <label for="postal_code">Postal Code</label>
      <input type="text" id="postal_code" v-model="postal_code" />
    </div>

    <div>
      <label for="city">City</label>
      <input type="text" id="city" v-model="city" />
    </div>

    <div>
      <label for="region">State/Region</label>
      <input type="text" id="region" v-model="region" />
    </div>

    <div>
      <label for="country">Country</label>
      <input type="text" id="country" v-model="country" />
    </div>
  </div>

  <button @click="getCurrentLocation">GET MY CURRENT LOCATION</button>
</template>

<script>
import { Loader } from '@googlemaps/js-api-loader'
import axios from 'axios'

export default {
  data() {
    return {
      map: null,
      marker: null,
      position: { lat: 0, lng: 0 },
      currentFullAddress: null,
      geocoder: null,
      infowindow: null,
      autocomplete: null,
      street: '',
      postal_code: '',
      city: '',
      region: '',
      country: ''
    }
  },
  methods: {
    async initMap() {
      try {
        const loader = new Loader({
          apiKey: import.meta.env.VITE_MAPS_KEY,
          version: 'weekly',
          libraries: ['places']
        })

        const { Map } = await loader.importLibrary('maps')
        this.geocoder = new google.maps.Geocoder()
        this.infowindow = new google.maps.InfoWindow()

        this.map = new Map(document.getElementById('map'), {
          center: this.position,
          zoom: 8
        })

        this.marker = new google.maps.Marker({
          position: this.position,
          map: this.map,
          title: 'HERE'
        })

        this.map.addListener('click', (event) => {
          this.position.lat = event.latLng.lat()
          this.position.lng = event.latLng.lng()
          this.marker.setPosition(this.position)
          this.geocodeLatLng()
        })
      } catch (error) {
        console.log('error', error)
      }
    },
    async getCurrentLocation() {
      try {
        const { data } = await axios({
          method: 'POST',
          url: 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAeoyX0qEaC06-PKmXhP7ficDwOZ4diOgQ'
        })

        this.position.lat = data.location.lat
        this.position.lng = data.location.lng
        this.marker.setPosition(this.position)
        this.map.setCenter(this.position)
        this.geocodeLatLng()
      } catch (err) {
        console.log(err)
      }
    },
    // reverse geocode
    async geocodeLatLng() {
      try {
        const response = await this.geocoder.geocode({ location: this.position })
        if (response.results[0]) {
          this.map.setZoom(10)

          this.marker.setPosition(this.position)
          this.infowindow.setContent(response.results[0].formatted_address)
          this.infowindow.open(this.map, this.marker)
          this.currentFullAddress = this.getAddressObject(response.results[0].address_components)
        } else {
          window.alert('No results found')
        }
      } catch (error) {
        window.alert('Geocoder failed due to: ' + error)
      }
    },
    getAddressObject(address_components) {
      // mapper dictionary
      const ShouldBeComponent = {
        home: ['street_number'],
        postal_code: ['postal_code'],
        street: ['street_address', 'route'],
        region: [
          'administrative_area_level_1',
          'administrative_area_level_2',
          'administrative_area_level_3',
          'administrative_area_level_4',
          'administrative_area_level_5'
        ],
        city: [
          'locality',
          'sublocality',
          'sublocality_level_1',
          'sublocality_level_2',
          'sublocality_level_3',
          'sublocality_level_4'
        ],
        country: ['country']
      }

      // map the address_components into address
      const address = {
        home: '',
        postal_code: '',
        street: '',
        region: '',
        city: '',
        country: ''
      }
      address_components.forEach((component) => {
        for (let shouldBe in ShouldBeComponent) {
          // if the type of component matches the type in the should be component, start mapping
          if (ShouldBeComponent[shouldBe].indexOf(component.types[0]) !== -1) {
            address[shouldBe] = component.long_name
          }
        }
      })

      this.street = address.street
      this.postal_code = address.postal_code
      this.region = address.region
      this.city = address.city
      this.country = address.country

      return address
    }
  },
  async mounted() {
    await this.initMap()
    this.getCurrentLocation()
  }
}
</script>
