import { apiService } from '@/api/api';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const MOCK_USER_ID = 'user_001';

const BehaviorAnalysisScreen = () => {
  const [imageData1, setImageData1] = useState(null);
  const [imageData2, setImageData2] = useState(null);
  const [error, setError] = useState(null);
  const params = useLocalSearchParams();

  useEffect(() => {
    apiService.drawAgent({ user_id: MOCK_USER_ID })
      .then(response => {
        // console.log("Thái ngu vcl", response);
        if (response.success) {
          setImageData1(response.image_1);
          setImageData2(response.image_2);
          // console.log(response.image_1);
          // console.log(response.image_2);
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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButtonInline} onPress={() => router.push('/dashboard')}>
          <Ionicons name="arrow-back" size={28} color="#222" />
        </TouchableOpacity>
        <Text style={styles.header}>Phân Tích Hành Vi Của Bạn</Text>
      </View>
      {imageData1 && (
        <Text style={styles.chartTitleTop}>Mức độ quan tâm các sản phẩm ngân hàng (%)</Text>
      )}
      {imageData1 ? (
        <Image
          source={{ uri: imageData1 }}
          style={styles.image}
          resizeMode="contain"
        />
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#e53935" />
          <Text style={styles.loadingText}>Đang tải phân tích...</Text>
        </View>
      )}
      {imageData2 && (
        <>
          <Text style={styles.chartTitleTop}>Phân bổ đầu tư của khách hàng (Tổng: 40.000.000)</Text>
          <Image
            source={{ uri: imageData2 }}
            style={styles.image}
            resizeMode="contain"
          />
        </>
      )}
      {params.userId && (
        <Text style={styles.accountInfo}>Số tài khoản của bạn: {params.userId}</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  accountInfo: {
    fontSize: 16,
    color: '#e53935',
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
});

export default BehaviorAnalysisScreen; 