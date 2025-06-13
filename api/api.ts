import axios from 'axios';

// Base URL for the API
const API_BASE_URL = 'https://2621-14-248-90-121.ngrok-free.app'; // Change this to your actual backend URL

// Types
export interface UserSchema {
   user_id: string;
   name?: string;
   age?: number;
   income?: number;
   occupation?: string;
   risk_tolerance?: string;
   investment_goals?: string[];
   financial_knowledge?: string;
   [key: string]: any; // For additional fields
}

export interface UpdateFrequencyRequest {
   user_id: string;
   product: 'deposit' | 'credit_loan' | 'stock_investment';
}

export interface InputPromptRequest {
   user_input: string;
   user_id: string;
}

export interface UserIDRequest {
   user_id: string;
}

export interface PaymentMetadata {
   amount: number;
   account_id: string;
   account_name: string;
 }

export interface RagResponse {
   success: boolean;
   response: string;
   jump_to_other_pages: boolean;
   jumping_page: string;
   payment_metadata: PaymentMetadata;
 }

// API Service class
class ApiService {
   private static instance: ApiService;
   private axiosInstance;

   private constructor() {
      this.axiosInstance = axios.create({
         baseURL: API_BASE_URL,
         headers: {
            'Content-Type': 'application/json',
         },
      });
   }

   public static getInstance(): ApiService {
      if (!ApiService.instance) {
         ApiService.instance = new ApiService();
      }
      return ApiService.instance;
   }

   // User Management APIs
   async createUser(userData: UserSchema) {
      try {
         const response = await this.axiosInstance.post('/api/agent/create_user', userData);
         return response.data;
      } catch (error) {
         console.error('Error creating user:', error);
         throw error;
      }
   }

   async updateUserInfo(userData: UserSchema) {
      try {
         const response = await this.axiosInstance.post('/api/agent/update_user_info', userData);
         return response.data;
      } catch (error) {
         console.error('Error updating user info:', error);
         throw error;
      }
   }

   async getUserInfo(userId: string) {
      try {
         const response = await this.axiosInstance.post('/api/agent/get_user_info', { user_id: userId });
         return response.data;
      } catch (error) {
         console.error('Error getting user info:', error);
         throw error;
      }
   }

   // Product Interaction APIs
   async updateFrequency(data: UpdateFrequencyRequest) {
      try {
         const response = await this.axiosInstance.post('/api/agent/update_frequency', data);
         return response.data;
      } catch (error) {
         console.error('Error updating frequency:', error);
         throw error;
      }
   }

   // Recommendation and Chat APIs
   async getRecommendation(userId: string) {
      try {
         const response = await this.axiosInstance.post('/api/agent/get_recommendation', { user_id: userId });
         return response.data;
      } catch (error) {
         console.error('Error getting recommendations:', error);
         throw error;
      }
   }

   async getRagResponse(input: InputPromptRequest): Promise<RagResponse> {
      try {
         const response = await this.axiosInstance.post('/api/agent/agent_response', input);
         return response.data;
      } catch (error) {
         console.error('Error getting RAG response:', error);
         throw error;
      }
   }
}

// Export a singleton instance
export const apiService = ApiService.getInstance(); 