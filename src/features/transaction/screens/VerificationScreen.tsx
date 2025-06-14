import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const VerificationScreen: React.FC = () => {
  const params = useLocalSearchParams();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const amount = params.amount ? Number(params.amount) : 1000000;
  const description = params.description ?  params.description as string : 'Payment for banking service';
  const account_id = params.account_id  ? params.account_id as string : '1234567890';
  const account_name = params.account_name ? params.account_name as string : 'Tran Thi Huyen Trang';
  const transactionId = Math.random().toString(36).substring(2, 15).toUpperCase();
  const currentDate = new Date().toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const handleComplete = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        router.replace('/chat');
      }, 1000);
    }, 1500);
  };

  const handleCancel = () => {
    router.replace('/chat');
  };

  const renderContent = () => {
    if (isProcessing) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.processingText}>Processing payment...</Text>
        </View>
      );
    }

    if (isSuccess) {
      return (
        <View style={styles.centered}>
          <Ionicons name="checkmark-circle" size={80} color="#4BB543" style={styles.checkIcon} />
          <Text style={styles.successText}>Payment Successful!</Text>
          <View style={styles.successDetails}>
            <Text style={styles.successAmount}>{amount.toLocaleString('vi-VN')} VND</Text>
            <Text style={styles.successId}>Transaction ID: {transactionId}</Text>
          </View>
        </View>
      );
    }

    return (
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.amountSection}>
          <Text style={styles.amountLabel}>Amount</Text>
          <Text style={styles.amountValue}>{amount.toLocaleString('vi-VN')} VND</Text>
        </View>

        <View style={styles.detailsSection}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Transaction ID</Text>
            <Text style={styles.detailValue}>{transactionId}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Account Name</Text>
            <Text style={styles.detailValue}>{account_name}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Account ID</Text>
            <Text style={styles.detailValue}>{account_id}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date & Time</Text>
            <Text style={styles.detailValue}>{currentDate}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Status</Text>
            <View style={styles.statusContainer}>
              <View style={[styles.statusDot, { backgroundColor: '#FFA500' }]} />
              <Text style={[styles.detailValue, styles.statusText]}>Pending</Text>
            </View>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity 
            style={[styles.button, styles.cancelButton]} 
            onPress={handleCancel}
            disabled={isProcessing || isSuccess}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.confirmButton]} 
            onPress={handleComplete}
            disabled={isProcessing || isSuccess}
          >
            <Text style={styles.confirmButtonText}>Complete Payment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={handleCancel} 
          style={styles.backButton} 
          disabled={isProcessing || isSuccess}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Verification</Text>
        <View style={styles.placeholder} />
      </View>
      {renderContent()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
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
    padding: 8 
  },
  headerTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#333' 
  },
  placeholder: { 
    width: 40 
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  amountSection: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    marginBottom: 24,
  },
  amountLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  amountValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  detailsSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
    marginLeft: 16,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    color: '#FFA500',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 'auto',
    paddingBottom: 16,
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  processingText: {
    marginTop: 20,
    fontSize: 18,
    color: '#007AFF',
    fontWeight: '500',
  },
  checkIcon: {
    marginBottom: 16,
  },
  successText: {
    fontSize: 24,
    color: '#4BB543',
    fontWeight: '600',
    marginBottom: 24,
  },
  successDetails: {
    alignItems: 'center',
  },
  successAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  successId: {
    fontSize: 14,
    color: '#666',
  },
}); 