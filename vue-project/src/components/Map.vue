<template>
  <div id="billing-section">
    <h1 class="billing-detail-header">Billing details</h1>

    <div>
      <div class="map" id="map"></div>
    </div>

    <div class="map-btn-container">
      <button @click="fillCurrentLocation" class="map-btn">GET MY CURRENT LOCATION</button>
      <button @click="fillform" class="map-btn">SET MARKER AS LOCATION</button>
    </div>

    <div class="checkout-form-container">
      <input id="autocomplete" placeholder="Enter a place" type="text" ref="autocomplete" />
      <div>
        <label for="street">Address line</label>
        <input type="text" id="street" ref="street" />
      </div>
      <div>
        <label for="country">Country</label>
        <input type="text" id="country" ref="country" />
      </div>
      <div class="address-group">
        <div>
          <label for="city">City</label>
          <input type="text" id="city" ref="city" />
        </div>
        <div>
          <label for="region">State/Region</label>
          <input type="text" id="region" ref="region" />
        </div>
        <div>
          <label for="postal_code">Postal Code</label>
          <input type="text" id="postal_code" ref="postal_code" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Loader } from '@googlemaps/js-api-loader'
import axios from 'axios'
import { mapActions, mapState } from 'pinia'
import { useOrderStore } from '../stores/order'

export default {
  data() {
    return {
      map: null,
      marker: null,
      position: { lat: 0, lng: 0 },
      currentFullAddress: null,
      geocoder: null,
      infowindow: null,
      autocomplete: null
    }
  },
  computed: {
    ...mapState(useOrderStore, ['street', 'postal_code', 'city', 'country', 'region'])
  },
  methods: {
    ...mapActions(useOrderStore, ['updateLocation']),
    async initMap() {
      try {
        // loads the map
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
        this.map.setCenter(this.position)
        this.geocodeLatLng()
      } catch (err) {
        console.log(err)
      }
    },
    // reverse geocode - to get the infowindow
    async geocodeLatLng() {
      try {
        const response = await this.geocoder.geocode({ location: this.position })
        if (response.results[0]) {
          this.map.setZoom(10)

          this.marker.setPosition(this.position)
          this.infowindow.setContent(response.results[0].formatted_address)
          this.infowindow.open(this.map, this.marker)
          this.getAddressObject(response.results[0].address_components)
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

      this.updateLocation(address)
      return address
    },
    // place api - autocomplete the form
    initAutoComplete() {
      this.autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('autocomplete'),
        {
          fields: ['address_component', 'geometry'],
          bounds: new google.maps.LatLngBounds(this.position)
        }
      )

      this.autocomplete.addListener('place_changed', this.onPlaceChanged, { passive: true })
    },
    async onPlaceChanged() {
      const place = this.autocomplete.getPlace()

      if (!place.geometry) {
        // Invalid place selected
        console.log('place is empty')
        return
      }

      // Update the map position and marker
      this.position.lat = place.geometry.location.lat()
      this.position.lng = place.geometry.location.lng()
      await this.geocodeLatLng()
      this.fillform()
    },
    fillCurrentLocation() {
      this.getCurrentLocation()
      this.fillform()
    },
    fillform() {
      this.$refs.autocomplete.value = ''
      this.$refs.street.value = this.street
      this.$refs.postal_code.value = this.postal_code
      this.$refs.city.value = this.city
      this.$refs.region.value = this.region
      this.$refs.country.value = this.country
    }
  },
  async mounted() {
    await this.initMap()
    this.initAutoComplete()
    this.getCurrentLocation()
  }
}
</script>
