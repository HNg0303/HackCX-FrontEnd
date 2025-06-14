export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface ChatState {
  messages: ChatMessage[];
  isOpen: boolean;
  isTyping: boolean;
}


export interface PaymentMetadata {
  amount: number;
  target_acc_id: string;
  account_name: string;
}

export interface RagResponse {
  success: boolean;
  response: string;
  jump_to_other_pages: boolean;
  jumping_page: string;
  payment_metadata: PaymentMetadata;
}

