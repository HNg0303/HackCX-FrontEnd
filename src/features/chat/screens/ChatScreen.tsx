import { apiService } from '@/api/api';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChatMessage, RagResponse } from '../types';

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: '1',
    text: 'Xin chào! Tôi là Trợ lý ảo của ngân hàng, tôi có thể giúp gì cho bạn hôm nay?',
    sender: 'bot',
    timestamp: new Date(),
  },
];

// Parse text with **bold** effect for bot messages
function parseTextWithBold(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const boldText = part.slice(2, -2);
      return (
        <Text key={idx} style={{ fontWeight: 'bold', color: '#000' }}>
          {boldText}
        </Text>
      );
    }
    return <Text key={idx}>{part}</Text>;
  });
}

// Parse text into array of {text, bold} for typewriter effect
function parseTextParts(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return { text: part.slice(2, -2), bold: true };
    }
    return { text: part, bold: false };
  });
}

export const ChatScreen: React.FC = () => {
  const params = useLocalSearchParams();
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES); // Initialize messages with initial messages
  const [inputText, setInputText] = useState(''); // Initialize inputText with an empty string
  const [inputPlaceholder, setInputPlaceholder] = useState('Nhập câu hỏi tại đây');
  const [isTyping, setIsTyping] = useState(false); // Initialize isTyping with false
  const [showRecommendations, setShowRecommendations] = useState(true); // Initialize showRecommendations with true
  const [recommendations, setRecommendations] = useState<string[]>([]); // Initialize recommendations with an empty array
  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [pendingTransaction, setPendingTransaction] = useState<{ amount?: number; description?: string; account_id?: string; account_name?: string } | null>(null);
  const [typingMessage, setTypingMessage] = useState<{ text: string; bold: boolean }[] | string>('');
  const [isBotTyping, setIsBotTyping] = useState(false);

  // TODO: Replace with actual user ID from authentication
  const MOCK_USER_ID = 'user_001';

  useEffect(() => {
    // Parse recommendations from router params
    if (params.recommendations) {
      try {
        const parsedRecommendations = JSON.parse(params.recommendations as string);
        if (Array.isArray(parsedRecommendations)) {
          setRecommendations(parsedRecommendations);
        }
      } catch (error) {
        console.error('Error parsing recommendations:', error);
        // Fallback to empty recommendations
        setRecommendations([]);
      }
    }
  }, [params.recommendations]);

  useEffect(() => {
    if (showRecommendations) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [showRecommendations]);

  const handleTransactionConfirm = () => {
    setShowTransactionModal(false);
    if (pendingTransaction) {
      router.push({
        pathname: '/verification',
        params: {
          amount: pendingTransaction.amount?.toString(),
          description: pendingTransaction.description,
          account_id: pendingTransaction.account_id,
          account_name: pendingTransaction.account_name,
        }
      });
    }
  };

  const handleTransactionCancel = () => {
    setShowTransactionModal(false);
    setPendingTransaction(null);
    router.replace('/chat');
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setInputPlaceholder('Nhập câu hỏi tại đây');
    setIsTyping(true);

    try {
      const api_response: RagResponse = await apiService.getRagResponse({
        user_input: inputText,
        user_id: MOCK_USER_ID,
      });

      if (api_response.success) {
        // Add bot response to messages with typewriter and bold effect
        setIsBotTyping(true);
        const text = api_response.response;
        const parts = parseTextParts(text);
        let partIdx = 0;
        let charIdx = 0;
        let current = '';
        let displayParts: { text: string; bold: boolean }[] = [];
        setTypingMessage([] as { text: string; bold: boolean }[]);
        function typeNextChar() {
          if (partIdx >= parts.length) {
            // Kết thúc, đưa message hoàn chỉnh vào messages
            const botResponse: ChatMessage = {
              id: (Date.now() + 1).toString(),
              text,
              sender: 'bot',
              timestamp: new Date(),
            };
            setMessages(prev => [...prev, botResponse]);
            setTypingMessage([] as { text: string; bold: boolean }[]);
            setIsBotTyping(false);
            if (api_response.jump_to_other_pages) {
              setPendingTransaction({
                amount: api_response.payment_metadata?.amount,
                account_id: api_response.payment_metadata?.target_acc_id,
                account_name: api_response.payment_metadata?.account_name,
                description: 'Thanh toán cho dịch vụ ngân hàng',
              });
              setShowTransactionModal(true);
            }
            return;
          }
          const part = parts[partIdx];
          if (charIdx < part.text.length) {
            current += part.text[charIdx];
            setTypingMessage([
              ...displayParts,
              { text: current, bold: part.bold },
            ]);
            charIdx++;
            setTimeout(typeNextChar, 1);
          } else {
            displayParts.push({ text: current, bold: part.bold });
            partIdx++;
            charIdx = 0;
            current = '';
            setTimeout(typeNextChar, 1);
          }
        }
        typeNextChar();
      } else {
        // Not success
        const errorMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: 'Xin lỗi, tôi không thể xử lý yêu cầu của bạn. Vui lòng thử lại.',
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Error getting bot response:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: 'Xin lỗi, đã xảy ra lỗi khi xử lý yêu cầu của bạn. Vui lòng thử lại sau.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleRecommendationClick = async (question: string) => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowRecommendations(false);
      //setInputText(question);

      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        text: question,
        sender: 'user',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, userMessage]); // Add user message to the messages array
      setIsTyping(true);

      // Use the same RAG response handling as handleSend
      apiService.getRagResponse({
        user_input: question,
        user_id: MOCK_USER_ID,
      })
        .then(response => {
          if (response.success) {
            setIsBotTyping(true);
            const text = response.response;
            const parts = parseTextParts(text);
            let partIdx = 0;
            let charIdx = 0;
            let current = '';
            let displayParts: { text: string; bold: boolean }[] = [];
            setTypingMessage([] as { text: string; bold: boolean }[]);
            function typeNextChar() {
              if (partIdx >= parts.length) {
                // Kết thúc, đưa message hoàn chỉnh vào messages
                const botResponse: ChatMessage = {
                  id: (Date.now() + 1).toString(),
                  text,
                  sender: 'bot',
                  timestamp: new Date(),
                };
                setMessages(prev => [...prev, { ...botResponse, text }]);
                setTypingMessage([] as { text: string; bold: boolean }[]);
                setIsBotTyping(false);
                return;
              }
              const part = parts[partIdx];
              if (charIdx < part.text.length) {
                current += part.text[charIdx];
                setTypingMessage([
                  ...displayParts,
                  { text: current, bold: part.bold },
                ]);
                charIdx++;
                setTimeout(typeNextChar, 2);
              } else {
                displayParts.push({ text: current, bold: part.bold });
                partIdx++;
                charIdx = 0;
                current = '';
                setTimeout(typeNextChar, 2);
              }
            }
            typeNextChar();
          } else {
            throw new Error('Không thể lấy phản hồi từ máy chủ');
          }
        })
        .catch(error => {
          console.error('Error getting bot response:', error);
          const errorMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            text: 'Xin lỗi, đã xảy ra lỗi khi xử lý yêu cầu của bạn. Vui lòng thử lại sau.',
            sender: 'bot',
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, errorMessage]);
        })
        .finally(() => {
          setIsTyping(false);
        });
    });
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    // The title and back button component
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trợ lý ngân hàng</Text>
        <View style={styles.placeholder} />
      </View>


      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
      >
        {/* The chat messages component */}
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageWrapper,
              message.sender === 'user' ? styles.userWrapper : styles.botWrapper,
            ]}
          >
            <View style={message.sender === 'user' ? [styles.avatar, styles.avatarRight] : [styles.avatar, styles.avatarLeft]}>
              {message.sender === 'bot' ? (
                <Ionicons name="chatbubble-ellipses" size={24} color="#e53935" />
              ) : (
                <Ionicons name="person" size={24} color="#666" />
              )}
            </View>
            <View
              style={[
                styles.messageBubble,
                message.sender === 'user' ? styles.userBubble : styles.botBubble,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  message.sender === 'user' ? styles.userText : styles.botText,
                ]}
              >
                {message.sender === 'bot'
                  ? parseTextWithBold(message.text)
                  : message.text}
              </Text>
              <Text style={styles.timestamp}>
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </View>
          </View>
        ))}
        {isBotTyping && (
          <View style={[styles.messageWrapper, styles.botWrapper]}>
            <View style={styles.avatarLeft}>
              <Ionicons name="chatbubble-ellipses" size={24} color="#e53935" />
            </View>
            <View style={[styles.messageBubble, styles.botBubble]}>
              <Text style={[styles.messageText, styles.botText]}>
                {Array.isArray(typingMessage)
                  ? typingMessage.map((part, idx) => (
                    <Text
                      key={idx}
                      style={part.bold ? { fontWeight: 'bold', color: '#000' } : {}}
                    >
                      {part.text}
                    </Text>
                  ))
                  : typingMessage}
              </Text>
            </View>
          </View>
        )}
        {isTyping && (
          <View style={styles.typingIndicator}>
            <ActivityIndicator size="small" color="#e53935" />
            <Text style={styles.typingText}>Trợ lý đang trả lời...</Text>
          </View>
        )}
      </ScrollView>

      {showRecommendations && recommendations.length > 0 && (
        <Animated.View
          style={[
            styles.recommendationsOverlay,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <View style={styles.recommendationsContainer}>
            <View style={styles.recommendationsHeader}>
              <Text style={styles.recommendationsTitle}>Gợi ý câu hỏi</Text>
              <TouchableOpacity
                onPress={() => setShowRecommendations(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            {recommendations.map((question, index) => (
              <Pressable
                key={index}
                style={({ pressed }) => [
                  styles.recommendationButton,
                  pressed && styles.recommendationButtonPressed,
                ]}
                onPress={() => handleRecommendationClick(question)}
              >
                <View style={styles.recommendationContent}>
                  <Ionicons
                    name={index === 0 ? "wallet-outline" : index === 1 ? "trending-up-outline" : "game-controller-outline"}
                    size={20}
                    color="#e53935"
                    style={styles.recommendationIcon}
                  />
                  <Text style={styles.recommendationText}>{question}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#e53935" />
              </Pressable>
            ))}
          </View>
        </Animated.View>
      )}

      {/* The input container component */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder={inputPlaceholder}
          multiline={false}
          maxLength={1000}
          placeholderTextColor="#999"
          returnKeyType="send"
          blurOnSubmit={true}
          onSubmitEditing={handleSend}
        />
        <TouchableOpacity
          style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={!inputText.trim()}
        >
          <Ionicons
            name="send"
            size={24}
            color={inputText.trim() ? '#e53935' : '#999'}
          />
        </TouchableOpacity>
      </KeyboardAvoidingView>

      {/* Transaction Confirmation Modal */}
      <Modal
        visible={showTransactionModal}
        transparent
        animationType="fade"
        onRequestClose={handleTransactionCancel}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Xác nhận giao dịch</Text>
              <TouchableOpacity onPress={handleTransactionCancel} style={styles.modalCloseButton}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <View style={styles.transactionDetails}>
              <Text style={styles.transactionLabel}>Số tiền:</Text>
              <Text style={styles.transactionValue}>
                {pendingTransaction?.amount?.toLocaleString('vi-VN')} VND
              </Text>
              <Text style={styles.transactionLabel}>Số tài khoản nhận:</Text>
              <Text style={styles.transactionValue}>{pendingTransaction?.account_id}</Text>
              <Text style={styles.transactionLabel}>Tên tài khoản nhận:</Text>
              <Text style={styles.transactionValue}>{pendingTransaction?.account_name}</Text>
              <Text style={styles.transactionLabel}>Nội dung:</Text>
              <Text style={styles.transactionValue}>{pendingTransaction?.description}</Text>
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={handleTransactionCancel}
              >
                <Text style={styles.cancelButtonText}>Hủy</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleTransactionConfirm}
              >
                <Text style={styles.confirmButtonText}>Tiếp tục thanh toán</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 40,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
  },
  messageWrapper: {
    flexDirection: 'row',
    marginBottom: 16,
    maxWidth: '85%',
    alignItems: 'flex-end',
  },
  userWrapper: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
  },
  botWrapper: {
    alignSelf: 'flex-start',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  avatarLeft: {
    marginRight: 8,
  },
  avatarRight: {
    marginLeft: 8,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
    maxWidth: '100%',
  },
  userBubble: {
    backgroundColor: '#e53935',
    borderBottomRightRadius: 4,
  },
  botBubble: {
    backgroundColor: '#F5F5F5',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: '#FFFFFF',
  },
  botText: {
    color: '#333333',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  typingText: {
    marginLeft: 8,
    color: '#666',
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
    alignItems: 'flex-end',
    backgroundColor: '#F5F5F5',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
    height: 40,
    maxHeight: 40,
    marginRight: 8,
    fontSize: 16,
    color: '#222',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  recommendationsOverlay: {
    position: 'absolute',
    bottom: 80,
    left: 16,
    right: 16,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  recommendationsContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  recommendationsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  recommendationsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  recommendationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  recommendationButtonPressed: {
    backgroundColor: '#E8F2FF',
    transform: [{ scale: 0.98 }],
  },
  recommendationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  recommendationIcon: {
    marginRight: 12,
  },
  recommendationText: {
    color: '#e53935',
    fontSize: 15,
    fontWeight: '500',
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  modalCloseButton: {
    padding: 4,
  },
  transactionDetails: {
    marginBottom: 24,
  },
  transactionLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  transactionValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    marginBottom: 16,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
  },
  confirmButton: {
    backgroundColor: '#e53935',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
}); 