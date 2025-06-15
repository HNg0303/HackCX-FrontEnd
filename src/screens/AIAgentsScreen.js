import { apiService } from '@/api/api';
import { Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { ActivityIndicator, Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const MOCK_USER_ID = 'user_001';

const PopupDemo = ({ title, desc, isVisible, style, video }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(fadeAnim, { toValue: isVisible ? 1 : 0, duration: 300, useNativeDriver: true }).start();
  }, [isVisible]);
  if (!isVisible) return null;
  return (
    <Animated.View style={[styles.popup, { opacity: fadeAnim }, style]}>
      <Text style={styles.popupTitle}>{title}</Text>
      {video ? (
        <Video
          source={video}
          rate={1.0}
          volume={1.0}
          isMuted={true}
          resizeMode="contain"
          shouldPlay
          isLooping
          style={{
            width: '100%',
            aspectRatio: 16 / 9,
            borderRadius: 8,
            alignSelf: 'center',
            backgroundColor: '#eee',
          }}
        />
      ) : (
        <Text style={styles.popupDesc}>{desc}</Text>
      )}
    </Animated.View>
  );
};

const AIAgentsScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hovered, setHovered] = useState('');
  const [expanded, setExpanded] = useState(false);
  const hoverTimer = useRef();

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

  const handleMouseEnter = (key) => {
    setHovered(key);
    hoverTimer.current = setTimeout(() => { setExpanded(true); }, 500);
  };

  const handleMouseLeave = () => {
    setHovered('');
    setExpanded(false);
    clearTimeout(hoverTimer.current);
  };

  const handleBack = () => {
    router.push('/dashboard');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButtonInline} onPress={handleBack}>
          <Ionicons name="arrow-back" size={28} color="#222" />
        </TouchableOpacity>
        <View style={styles.headerCenterWrapper}>
          <Text style={styles.header}>Các Trợ Lý AI-Agents</Text>
        </View>
      </View>
      <TouchableOpacity
        style={[
          styles.card,
          styles.chatCard,
          hovered === 'chat' && styles.cardHover,
          expanded && hovered === 'chat' && { backgroundColor: '#e0e0e0' },
        ]}
        onPress={handleChatPress}
        disabled={isLoading}
        onMouseEnter={() => handleMouseEnter('chat')}
        onMouseLeave={handleMouseLeave}
      >
        {isLoading ? (
          <ActivityIndicator color="#e53935" />
        ) : (
          <Text style={styles.cardTitle}>Trợ Lý Hỗ Trợ Tư Vấn</Text>
        )}
        <Text style={styles.cardDesc}>Trò chuyện với trợ lý ảo được xây dựng bởi Conversation Agent (mục đích đối thoại) và Recommendation Agent (mục đích khuyến nghị).</Text>
        <PopupDemo
          title="Demo Trợ Lý Chat"
          isVisible={hovered === 'chat' && expanded}
          style={{ position: 'absolute', top: '100%', left: 0, width: '100%', marginTop: 1, zIndex: 100 }}
          video={require('../../assets/test.mp4')}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.card,
          styles.analysisCard,
          hovered === 'analysis' && styles.cardHover,
          expanded && hovered === 'chat' && { marginTop: 320 },
          expanded && hovered === 'analysis' && { backgroundColor: '#e0e0e0' },
        ]}
        onPress={handleBehaviorAnalysisPress}
        disabled={isAnalyzing}
        onMouseEnter={() => handleMouseEnter('analysis')}
        onMouseLeave={handleMouseLeave}
      >
        {isAnalyzing ? (
          <ActivityIndicator color="#e53935" />
        ) : (
          <>
            <Text style={styles.cardTitle}>Phân Tích Hành Vi Người Dùng</Text>
            <Text style={styles.cardDesc}>Xem phân tích dữ liệu hành vi của bạn bởi Behavior Analysis Agent (mục đích phân tích hành vi).</Text>
          </>
        )}
        <PopupDemo
          title="Demo Phân Tích Hành Vi"
          isVisible={false}
        />
      </TouchableOpacity>
      {/* Card hứa hẹn tính năng mới */}
      <TouchableOpacity
        style={[
          styles.card,
          { backgroundColor: '#e0e0e0', opacity: 0.7 },
        ]}
        disabled={true}
      >
        <Text style={styles.cardTitle}>Tính Năng Sắp Ra Mắt</Text>
        <Text style={styles.cardDesc}>Hãy chờ đón những cập nhật mới và các tính năng thông minh hơn trong tương lai gần!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 24,
  },
  backButtonInline: {
    marginRight: 12,
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  headerCenterWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    borderLeftColor: '#e53935',
  },
  analysisCard: {
    borderLeftWidth: 6,
    borderLeftColor: '#e53935',
    opacity: 1,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#222',
  },
  cardDesc: {
    fontSize: 14,
    color: '#444',
  },
  cardHover: {
    backgroundColor: '#F0F8FF',
    borderColor: '#e53935',
  },
  popup: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#e53935',
    zIndex: 100,
  },
  popupTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
    color: '#e53935',
  },
  popupDesc: {
    fontSize: 14,
    color: '#333',
  },
});

export default AIAgentsScreen;
