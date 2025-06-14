import { apiService } from '@/api/api';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';

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
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Behavior Analysis</Text>
      {imageData ? (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: imageData }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      ) : (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#4ADE80" />
          <Text style={styles.loadingText}>Loading analysis...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E2D4FA',
    padding: 24,
    alignItems: 'center',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 32,
    color: '#222',
  },
  imageContainer: {
    width: '100%',
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    alignItems: 'center',
  },
  image: {
    width: '90%',
    height: '90%',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 18,
    color: '#444',
  },
  errorText: {
    fontSize: 18,
    color: '#ef4444',
    textAlign: 'center',
  },
});

export default BehaviorAnalysisScreen; 