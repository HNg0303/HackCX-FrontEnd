import { apiService } from '@/api/api';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const MOCK_USER_ID = 'user_001';

const AIAgentsScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleChatPress = async () => {
    setIsLoading(true);
    try {
      const recommendationResponse = await apiService.getRecommendation(MOCK_USER_ID);
      const recommendations = recommendationResponse.recommendations || [];
      router.push({ pathname: '/chat', params: { recommendations: JSON.stringify(recommendations) } });
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      // Fallback: navigate to chat without recommendations
      router.push('/chat');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBehaviorAnalysisPress = async () => {
    setIsAnalyzing(true);
    try {
      router.push('/behavior-analysis');
    } catch (error) {
      console.error("Error navigating to behavior analysis:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Our AI Agents</Text>
      <TouchableOpacity style={[styles.card, styles.chatCard]} onPress={handleChatPress} disabled={isLoading}>
        {isLoading ? ( <ActivityIndicator color="#4ADE80" /> ) : ( <Text style={styles.cardTitle}>Chat Agent</Text> ) }
        <Text style={styles.cardDesc}>Talk to our AI-powered chat assistant.</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.card, styles.analysisCard]} 
        onPress={handleBehaviorAnalysisPress}
        disabled={isAnalyzing}
      >
        {isAnalyzing ? (
          <ActivityIndicator color="#a78bfa" />
        ) : (
          <>
            <Text style={styles.cardTitle}>Behavior Analysis</Text>
            <Text style={styles.cardDesc}>View your personalized behavior analysis and insights.</Text>
          </>
        )}
      </TouchableOpacity>
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
  card: {
    width: '100%',
    maxWidth: 1000,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  chatCard: {
    borderLeftWidth: 6,
    borderLeftColor: '#4ADE80',
  },
  analysisCard: {
    borderLeftWidth: 6,
    borderLeftColor: '#a78bfa',
    opacity: 1,
  },
  cardTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#222',
  },
  cardDesc: {
    fontSize: 20,
    color: '#444',
  },
});

export default AIAgentsScreen;
