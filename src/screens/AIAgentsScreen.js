import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const AIAgentsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Our AI Agents</Text>
      <TouchableOpacity style={[styles.card, styles.chatCard]} onPress={() => router.push('/chat')}>
        <Text style={styles.cardTitle}>Chat Agent</Text>
        <Text style={styles.cardDesc}>Talk to our AI-powered chat assistant.</Text>
      </TouchableOpacity>
      <View style={[styles.card, styles.disabledCard]}>
        <Text style={styles.cardTitle}>Second Agent (Coming Soon)</Text>
        <Text style={styles.cardDesc}>More AI features coming soon.</Text>
      </View>
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
  disabledCard: {
    opacity: 0.5,
    borderLeftWidth: 6,
    borderLeftColor: '#a78bfa',
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
