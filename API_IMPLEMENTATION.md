# API Implementation for WeCare Application

## Overview
The WeCare application has been updated to use proper API services instead of hardcoded data. The implementation includes error handling, loading states, and fallback to dummy data when the API is unavailable.

## Files Created/Modified

### New Files:
1. **`src/app/services/coach.service.ts`** - Main service for coach-related API calls
2. **`src/app/services/api.interfaces.ts`** - TypeScript interfaces for API responses
3. **`src/environments/environment.ts`** - Development environment configuration
4. **`src/environments/environment.prod.ts`** - Production environment configuration
5. **`API_IMPLEMENTATION.md`** - This documentation file

### Modified Files:
1. **`src/app/app.config.ts`** - Added HttpClientModule for HTTP requests
2. **`src/app/user-home/user-home.component.ts`** - Updated to use the new service
3. **`src/app/user-home/user-home.component.html`** - Added loading and error states

## API Endpoints

The application expects the following API endpoints:

### Coaches API
- **GET** `/coaches` - Get all coaches
- **GET** `/coaches/{id}` - Get coach by ID
- **GET** `/coaches?specialty={specialty}` - Get coaches by specialty

### Expected Response Format

The API can return data in two formats:

#### Format 1: Wrapped Response
```json
{
  "success": true,
  "data": [
    {
      "id": "CI-0001",
      "name": "Rose",
      "phone": "+44 1234567890",
      "specialty": "Confidence Issues",
      "gender": "female"
    }
  ],
  "message": "Coaches retrieved successfully"
}
```

#### Format 2: Direct Array Response
```json
[
  {
    "id": "CI-0001",
    "name": "Rose",
    "phone": "+44 1234567890",
    "specialty": "Confidence Issues",
    "gender": "female"
  }
]
```

## Configuration

### Environment Files

#### Development (`src/environments/environment.ts`)
```typescript
export const environment = {
  production: false,
  apiUrl: 'https://api.wecare.com', // Replace with your development API URL
  coachesEndpoint: '/coaches',
  appointmentsEndpoint: '/appointments',
  usersEndpoint: '/users',
  feedbackEndpoint: '/feedback'
};
```

#### Production (`src/environments/environment.prod.ts`)
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.wecare.com', // Replace with your production API URL
  coachesEndpoint: '/coaches',
  appointmentsEndpoint: '/appointments',
  usersEndpoint: '/users',
  feedbackEndpoint: '/feedback'
};
```

## How to Replace Dummy URLs

### Step 1: Update Environment Files
Replace the `apiUrl` in both environment files with your actual API base URL:

```typescript
// Example for local development
apiUrl: 'http://localhost:3000/api'

// Example for production
apiUrl: 'https://your-api-domain.com/api'
```

### Step 2: Ensure Your API Returns Correct Format
Make sure your API returns data in one of the expected formats shown above.

### Step 3: Test the Implementation
1. Start the Angular application: `ng serve`
2. Navigate to the user home page
3. Check the browser console for API calls and responses
4. If the API fails, the application will fallback to dummy data

## Features Implemented

### ✅ API Service
- HTTP client integration
- Error handling with fallback to dummy data
- TypeScript interfaces for type safety
- Environment-based configuration

### ✅ User Experience
- Loading spinner while fetching data
- Error messages with retry functionality
- Graceful fallback when API is unavailable
- Console logging for debugging

### ✅ Code Organization
- Separated concerns (service, interfaces, environment)
- Reusable service methods
- Proper error handling
- Type safety with TypeScript interfaces

## Testing the API

### Current Behavior
1. **API Available**: Shows real data from your API
2. **API Unavailable**: Falls back to dummy data with error message
3. **Network Error**: Shows error message with retry button

### Console Logs
The application logs all API responses and errors to the browser console for debugging:
- `API Response:` - Successful API calls
- `Error fetching coaches:` - API errors
- `Coaches loaded successfully:` - Component state updates

## Next Steps

1. **Replace API URLs**: Update the environment files with your actual API endpoints
2. **Test API Integration**: Ensure your API returns data in the expected format
3. **Add Authentication**: Implement proper authentication if required
4. **Add More Services**: Create similar services for appointments, users, and feedback
5. **Error Handling**: Customize error messages based on your requirements

## Troubleshooting

### Common Issues:
1. **CORS Errors**: Ensure your API allows requests from your Angular app domain
2. **404 Errors**: Verify the API endpoints are correct
3. **Type Errors**: Check that your API response matches the expected interfaces
4. **Network Errors**: Ensure your API server is running and accessible

### Debug Steps:
1. Check browser console for error messages
2. Verify API endpoints in environment files
3. Test API endpoints directly (e.g., using Postman)
4. Check network tab in browser dev tools for failed requests 