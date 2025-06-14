import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const TransactionScreen: React.FC = () => {
  const params = useLocalSearchParams();
  const [isProcessing, setIsProcessing] = useState(false);
  const [otp, setOtp] = useState('');

  // Get transaction details from params
  const amount = params.amount ? Number(params.amount) : 1000000; // Mặc định 1 triệu VND nếu không có
  const description = params.description as string || 'Thanh toán dịch vụ ngân hàng';

  const handleConfirmPayment = async () => {
    if (!otp || otp.length !== 6) {
      Alert.alert('OTP không hợp lệ', 'Vui lòng nhập mã OTP gồm 6 chữ số');
      return;
    }

    setIsProcessing(true);

    // Giả lập xử lý thanh toán
    setTimeout(() => {
      setIsProcessing(false);
      Alert.alert(
        'Thanh toán thành công',
        'Giao dịch của bạn đã được thực hiện thành công.',
        [
          {
            text: 'Đồng ý',
            onPress: () => router.replace('/dashboard'),
          },
        ]
      );
    }, 2000);
  };

  const handleCancel = () => {
    Alert.alert(
      'Huỷ giao dịch',
      'Bạn có chắc chắn muốn huỷ giao dịch này không?',
      [
        {
          text: 'Không',
          style: 'cancel',
        },
        {
          text: 'Có',
          onPress: () => router.back(),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thanh toán</Text>
        <View style={styles.placeholder} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <ScrollView style={styles.scrollView}>
          <View style={styles.amountContainer}>
            <Text style={styles.amountLabel}>Số tiền</Text>
            <Text style={styles.amountValue}>
              {amount.toLocaleString('vi-VN')} VND
            </Text>
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Nội dung</Text>
              <Text style={styles.detailValue}>{description}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Mã giao dịch</Text>
              <Text style={styles.detailValue}>
                {Math.random().toString(36).substring(2, 15).toUpperCase()}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Ngày</Text>
              <Text style={styles.detailValue}>
                {new Date().toLocaleDateString('vi-VN')}
              </Text>
            </View>
          </View>

          <View style={styles.otpContainer}>
            <Text style={styles.otpLabel}>Nhập mã OTP để xác nhận thanh toán</Text>
            <TextInput
              style={styles.otpInput}
              value={otp}
              onChangeText={setOtp}
              placeholder="Nhập mã OTP gồm 6 chữ số"
              keyboardType="number-pad"
              maxLength={6}
              secureTextEntry
            />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={handleCancel}
            disabled={isProcessing}
          >
            <Text style={styles.cancelButtonText}>Huỷ</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.confirmButton, isProcessing && styles.disabledButton]}
            onPress={handleConfirmPayment}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.confirmButtonText}>Xác nhận thanh toán</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  content: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  amountContainer: {
    padding: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  amountLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  amountValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
  },
  detailsContainer: {
    padding: 24,
  },
  detailRow: {
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  otpContainer: {
    padding: 24,
  },
  otpLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    padding: 16,
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 8,
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
    gap: 12,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
  },
  confirmButton: {
    backgroundColor: '#007AFF',
  },
  disabledButton: {
    opacity: 0.7,
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