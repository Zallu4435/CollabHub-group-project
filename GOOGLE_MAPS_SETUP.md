# Google Maps Integration Setup

This project now includes real Google Maps integration for location selection. Follow these steps to set it up:

## 1. Get a Google Maps API Key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - **Maps JavaScript API**
   - **Geocoding API**
   - **Places API** (optional, for enhanced location search)

## 2. Create API Key

1. Go to "Credentials" in the Google Cloud Console
2. Click "Create Credentials" → "API Key"
3. Copy your API key
4. (Optional) Restrict the API key to your domain for security

## 3. Set Environment Variable

Create a `.env.local` file in your project root and add:

```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your actual Google Maps API key.

## 4. Features Included

### 🗺️ **Interactive Map**
- Real Google Maps with full controls
- Click anywhere on the map to select a location
- Draggable markers for precise positioning
- Street view, satellite, and terrain views

### 📍 **Geocoding**
- **Reverse Geocoding**: Convert coordinates to readable addresses
- **Forward Geocoding**: Convert addresses to coordinates
- Automatic address parsing (city, state, country)
- Fallback handling for failed geocoding requests

### 🎯 **Location Selection Methods**
1. **Manual Input**: Type an address (automatically geocoded)
2. **Auto-Detect**: Use browser geolocation + reverse geocoding
3. **Map Selection**: Click or drag on the interactive map

### 🔧 **Technical Features**
- TypeScript support with proper Google Maps types
- Error handling and loading states
- Responsive design
- API key validation
- Graceful fallbacks

## 5. Usage

The location picker is automatically integrated into:
- Blog post creation form
- Blog post editing modal
- Location input component

Users can now:
- Click the "Map" button to open the interactive map
- Click anywhere on the map to select a location
- Drag the marker for precise positioning
- See real-time address information
- Use auto-detect for current location

## 6. API Costs

Google Maps API has usage-based pricing:
- **Maps JavaScript API**: $7 per 1,000 loads
- **Geocoding API**: $5 per 1,000 requests
- **Places API**: $17 per 1,000 requests

For development, Google provides $200 in free credits monthly.

## 7. Security Notes

- Never commit your API key to version control
- Use environment variables for API keys
- Consider restricting your API key to specific domains
- Monitor your API usage in the Google Cloud Console

## 8. Troubleshooting

### Map Not Loading
- Check if your API key is correctly set in `.env.local`
- Verify that the Maps JavaScript API is enabled
- Check browser console for error messages

### Geocoding Not Working
- Ensure the Geocoding API is enabled
- Check your API key permissions
- Verify you haven't exceeded quota limits

### TypeScript Errors
- Make sure `@types/google.maps` is installed
- Check that your Google Maps types are up to date

## 9. Development vs Production

### Development
- Use a development API key with minimal restrictions
- Enable all necessary APIs for testing

### Production
- Use a production API key with domain restrictions
- Monitor usage and set up billing alerts
- Consider implementing rate limiting

## 10. Alternative Setup (Without API Key)

If you don't want to set up Google Maps API, the component will show a helpful message asking for the API key. The rest of the blog functionality will work normally without the map feature.
