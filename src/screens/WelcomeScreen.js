import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const illustration = require('../../assets/images/chatbot.gif');

const WelcomeScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/ai-agents'); // Navigate to AI Agents screen
    }, 8000);
    return () => clearTimeout(timer);
  }, [navigation]);

  const handleSkip = () => {
    router.replace('/ai-agents'); // Navigate to AI Agents screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.illustrationWrapper}>
        <Image source={illustration} style={styles.illustration} resizeMode="contain" />
      </View>
      <Text style={styles.title}>Xin chào, tôi là Trợ Lý AI của bạn!</Text>
      <Text style={styles.subtitle}>
        Chào mừng bạn đến với ứng dụng Trợ Lý AI thông minh!{"\n"}
        Tôi sẽ đồng hành cùng bạn, hỗ trợ và tư vấn để bạn có trải nghiệm tốt nhất. Hãy bắt đầu hành trình khám phá những tính năng nổi bật cùng tôi nhé!
      </Text>
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipButtonText}>Bỏ qua</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  illustrationWrapper: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 32,
  },
  illustration: {
    width: 220,
    height: 220,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#444',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  skipButton: {
    backgroundColor: '#e53935',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  skipButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen; 