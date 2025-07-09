import axios from 'axios';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 120000, // increased timeout
  headers: {
    'Content-Type': 'application/json',
  },
});


// Request interceptor for logging (optional)
apiClient.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for logging and error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

/**
 * Upload car image and get detected parts
 * @param {FormData} formData - FormData containing image, name, model, year
 * @returns {Promise<Object>} Response data with detected parts
 */
export const uploadCarImage = async (formData) => {
  try {
    // Validate FormData contains required fields
    if (!formData.has('image')) {
      throw new Error('Image file is required');
    }
    if (!formData.has('name') || !formData.has('model') || !formData.has('year')) {
      throw new Error('Car name, model, and year are required');
    }

    const response = await apiClient.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('🔥 Upload Error:', error);
    
    // Handle different types of errors
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      throw new Error(data?.message || `Upload failed with status ${status}`);
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('No response from server. Please check your connection.');
    } else {
      // Something else happened
      throw new Error(error.message || 'Upload failed');
    }
  }
};

/**
 * Get cost estimate for detected parts
 * @param {Object} data - Object containing carName, carModel, carYear, detectedParts
 * @param {string} data.carName - Name of the car
 * @param {string} data.carModel - Model of the car
 * @param {string} data.carYear - Year of the car
 * @param {string[]} data.detectedParts - Array of detected part names
 * @returns {Promise<Object>} Response data with cost breakdown and PDF report link
 */
export const estimateCost = async (data) => {
  try {
    // Validate required fields
    const { carName, carModel, carYear, detectedParts } = data;
    
    if (!carName || !carModel || !carYear) {
      throw new Error('Car name, model, and year are required');
    }
    
    if (!detectedParts || !Array.isArray(detectedParts) || detectedParts.length === 0) {
      throw new Error('Detected parts array is required and cannot be empty');
    }

    const response = await apiClient.post('/api/estimate', {
      carName,
      carModel,
      carYear,
      detectedParts,
    });

    return response.data;
  } catch (error) {
    console.error('🔥 Estimate Error:', error);
    
    // Handle different types of errors
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      throw new Error(data?.message || `Cost estimation failed with status ${status}`);
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('No response from server. Please check your connection.');
    } else {
      // Something else happened
      throw new Error(error.message || 'Cost estimation failed');
    }
  }
};

// Helper function to create FormData for car image upload
export const createCarImageFormData = (imageFile, carInfo) => {
  const formData = new FormData();
  
  formData.append('image', imageFile);
  formData.append('name', carInfo.name);
  formData.append('model', carInfo.model);
  formData.append('year', carInfo.year);
  
  return formData;
};

// Export the configured axios instance for direct use if needed
export { apiClient };

export default {
  uploadCarImage,
  estimateCost,
  createCarImageFormData,
};
