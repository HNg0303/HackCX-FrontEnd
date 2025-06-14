import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const illustration = require('../../assets/images/botwelcome.png'); // Replace with your actual image

const WelcomeScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/ai-agents'); // Navigate to AI Agents screen
    }, 3500);
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
      <Text style={styles.title}>Hello, I am your Assistant!</Text>
      <Text style={styles.subtitle}>
        Welcome to our Ai assistant app!{"\n"}
        We're excited to have you on board. Here are a few steps to help you get started
      </Text>
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipButtonText}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E2D4FA',
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
    backgroundColor: '#111',
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