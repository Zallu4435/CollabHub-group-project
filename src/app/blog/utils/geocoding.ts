import { LocationData } from '../components/LocationInput';

export class GeocodingService {
  private geocoder: google.maps.Geocoder | null = null;

  constructor() {
    // Don't initialize geocoder immediately - wait for Google Maps to be loaded
  }

  private ensureGeocoder(): google.maps.Geocoder {
    if (!this.geocoder) {
      if (typeof window !== 'undefined' && window.google && window.google.maps) {
        this.geocoder = new google.maps.Geocoder();
      } else {
        throw new Error('Google Maps API is not loaded. Please ensure the Google Maps script is loaded before using geocoding.');
      }
    }
    return this.geocoder;
  }

  async reverseGeocode(lat: number, lng: number): Promise<LocationData | null> {
    return new Promise((resolve, reject) => {
      try {
        const geocoder = this.ensureGeocoder();
        geocoder.geocode(
          { location: { lat, lng } },
          (results: google.maps.GeocoderResult[] | null, status: google.maps.GeocoderStatus) => {
            if (status === 'OK' && results && results[0]) {
              const result = results[0];
              const location = this.parseGeocodingResult(result);
              resolve(location);
            } else {
              console.error('Geocoding failed:', status);
              reject(new Error(`Geocoding failed: ${status}`));
            }
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  async forwardGeocode(address: string): Promise<LocationData | null> {
    return new Promise((resolve, reject) => {
      try {
        const geocoder = this.ensureGeocoder();
        geocoder.geocode(
          { address },
          (results: google.maps.GeocoderResult[] | null, status: google.maps.GeocoderStatus) => {
            if (status === 'OK' && results && results[0]) {
              const result = results[0];
              const location = this.parseGeocodingResult(result);
              resolve(location);
            } else {
              console.error('Geocoding failed:', status);
              reject(new Error(`Geocoding failed: ${status}`));
            }
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  private parseGeocodingResult(result: google.maps.GeocoderResult): LocationData {
    const components = result.address_components;
    
    let city = '';
    let state = '';
    let country = '';

    components.forEach(component => {
      const types = component.types;
      
      if (types.includes('locality')) {
        city = component.long_name;
      } else if (types.includes('administrative_area_level_1')) {
        state = component.long_name;
      } else if (types.includes('country')) {
        country = component.long_name;
      }
    });

    // Fallback for city if not found
    if (!city) {
      const sublocality = components.find(c => c.types.includes('sublocality'));
      if (sublocality) {
        city = sublocality.long_name;
      }
    }

    // Create display text
    const displayParts = [city, state, country].filter(Boolean);
    const displayText = displayParts.join(', ');

    return {
      city: city || undefined,
      state: state || undefined,
      country: country || undefined,
      coordinates: {
        latitude: result.geometry.location.lat(),
        longitude: result.geometry.location.lng(),
      },
      displayText: displayText || result.formatted_address,
    };
  }
}

// Singleton instance
let geocodingService: GeocodingService | null = null;

export function getGeocodingService(): GeocodingService {
  if (!geocodingService) {
    geocodingService = new GeocodingService();
  }
  return geocodingService;
}
