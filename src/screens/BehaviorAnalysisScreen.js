import { apiService } from '@/api/api';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const MOCK_USER_ID = 'user_001';

const BehaviorAnalysisScreen = () => {
  const [imageData, setImageData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiService.drawAgent({ user_id: MOCK_USER_ID })
      .then(response => {
        if (response.success) {
          setImageData(response.image);
        } else {
          setError(response.message || 'Failed to generate analysis');
        }
      })
      .catch(err => {
        console.error('Error:', err);
        setError('Failed to load analysis');
      });
  }, []);

  if (error) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.push('/dashboard')}>
          <Ionicons name="arrow-back" size={28} color="#222" />
        </TouchableOpacity>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButtonInline} onPress={() => router.push('/dashboard')}>
          <Ionicons name="arrow-back" size={28} color="#222" />
        </TouchableOpacity>
        <Text style={styles.header}>Phân Tích Hành Vi Của Bạn</Text>
      </View>
      {imageData && (
        <Text style={styles.chartTitleTop}>Mức độ quan tâm các sản phẩm ngân hàng (%)</Text>
      )}
      {imageData ? (
        <Image
          source={{ uri: imageData }}
          style={styles.image}
          resizeMode="contain"
        />
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#e53935" />
          <Text style={styles.loadingText}>Đang tải phân tích...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 32,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 32,
    left: 12,
    zIndex: 10,
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
    marginTop: 12,
    justifyContent: 'flex-start',
  },
  backButtonInline: {
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'left',
    flex: 1,
    marginLeft: 8,
  },
  image: {
    width: '95%',
    aspectRatio: 1,
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 18,
    color: '#444',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#ef4444',
    textAlign: 'center',
    marginTop: 60,
  },
  chartTitleTop: {
    marginTop: 30,
    marginBottom: 8,
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default BehaviorAnalysisScreen; 