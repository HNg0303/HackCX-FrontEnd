import { apiService } from '@/api/api';
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Image, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const financialServices = [
   { icon: <Ionicons name="swap-horizontal-outline" size={28} color="#1976d2" />, label: 'Chuyển tiền' },
   { icon: <Ionicons name="card-outline" size={28} color="#1976d2" />, label: 'Dịch vụ thẻ' },
   { icon: <FontAwesome5 name="piggy-bank" size={24} color="#1976d2" />, label: 'Tiết kiệm' },
   { icon: <Ionicons name="cart-outline" size={28} color="#1976d2" />, label: 'Mua sắm' },
   { icon: <MaterialIcons name="health-and-safety" size={28} color="#1976d2" />, label: 'Bảo hiểm' },
   { icon: <Ionicons name="trending-up-outline" size={28} color="#1976d2" />, label: 'Đầu tư' },
   { icon: <MaterialIcons name="attach-money" size={28} color="#1976d2" />, label: 'Ngoại tệ' },
   { icon: <Ionicons name="ellipsis-horizontal-circle-outline" size={28} color="#1976d2" />, label: 'Khác' },
];

export const DashboardScreen: React.FC = () => {
   const waveAnim = useRef(new Animated.Value(0)).current;
   const [showQuestion, setShowQuestion] = useState(false);
   const questionOpacity = useRef(new Animated.Value(0)).current;

   useEffect(() => {
      Animated.loop(
         Animated.sequence([
            Animated.timing(waveAnim, { toValue: 1, duration: 400, easing: Easing.linear, useNativeDriver: true }),
            Animated.timing(waveAnim, { toValue: -1, duration: 400, easing: Easing.linear, useNativeDriver: true }),
            Animated.timing(waveAnim, { toValue: 0, duration: 400, easing: Easing.linear, useNativeDriver: true }),
         ])
      ).start();
   }, [waveAnim]);

   useEffect(() => {
      const interval = setInterval(() => {
         setShowQuestion(true);
         Animated.timing(questionOpacity, { toValue: 1, duration: 200, useNativeDriver: true }).start(() => {
            setTimeout(() => {
               Animated.timing(questionOpacity, { toValue: 0, duration: 200, useNativeDriver: true }).start(() => setShowQuestion(false));
            }, 1000);
         });
      }, 2000);
      return () => clearInterval(interval);
   }, []);

   const handleNavigateToChat = async () => {
      try {
         const response = await apiService.getRecommendation('user_001');
         if (response.success) {
            router.push({
               pathname: '/chat',
               params: { recommendations: JSON.stringify(response.recommendations) }
            });
         } else {
            router.push('/chat');
         }
      } catch (error) {
         console.error('Error fetching recommendations:', error);
         router.push('/chat');
      }
   };

   return (
      <SafeAreaView style={styles.container} edges={['top']}>
         <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.headerRow}>
               <Image source={require('../../../../assets/avatar.jpg')} style={styles.avatar} />
               <Text style={styles.userName}>Tran Thi Huyen Tranng</Text>
               <Ionicons name="chevron-forward" size={20} color="#222" style={{ marginLeft: 4, marginRight: 8 }} />
               <View style={{ flex: 1 }} />
               <View style={styles.bellWrap}>
                  <Ionicons name="notifications-outline" size={22} color="#222" />
               </View>
            </View>

            {/* Search bar */}
            <View style={styles.searchBar}>
               <Ionicons name="search-outline" size={20} color="#888" style={{ marginRight: 8 }} />
               <Text style={styles.searchPlaceholder}>Tìm kiếm</Text>
            </View>

            {/* Card with account info */}
            <View style={styles.accountCardWrap}>
               <View style={styles.accountCardBlack}>
                  <Text style={styles.bankName}>TECHCOMBANK</Text>
                  <View style={styles.accountRow}>
                     <View>
                        <Text style={styles.accountLabel}>Tài khoản thanh toán</Text>
                        <Text style={styles.accountNumber}>0123456789</Text>
                     </View>
                     <View style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.expLabel}>Exp.</Text>
                        <Text style={styles.expValue}>09/24</Text>
                     </View>
                  </View>
                  <View style={styles.toggleRow}>
                     <View style={styles.toggleOn} />
                     <View style={styles.toggleOff} />
                  </View>
               </View>
               <View style={styles.accountCardWhite}>
                  <View style={{ flex: 1 }}>
                     <Text style={styles.balanceLabel}>Số dư tài khoản</Text>
                     <Text style={styles.balanceValue}>10,000,000<Text style={styles.vnd}>vnd</Text></Text>
                  </View>
                  <View style={{ flex: 1 }}>
                     <Text style={styles.balanceLabel}>Số nợ</Text>
                     <Text style={styles.balanceValue}>0<Text style={styles.vnd}>vnd</Text></Text>
                  </View>
               </View>
            </View>

            {/* Help topics section */}
            <View style={styles.sectionCard}>
               <Text style={styles.sectionTitle}>Dịch vụ tài chính</Text>
               <View style={styles.gridWrap}>
                  {financialServices.map((service, idx) => (
                     <Pressable key={idx} style={styles.gridItem}>
                        {service.icon}
                        <Text style={styles.gridLabel}>{service.label}</Text>
                     </Pressable>
                  ))}
               </View>
            </View>

            {/* Recent transactions */}
            <View style={styles.transactionCard}>
               <Text style={styles.transactionTitle}>Giao dịch gần nhất</Text>
               {/* 1 */}
               <View style={styles.transactionRow}>
                  <Ionicons name="airplane-outline" size={28} color="#1976d2" style={{ marginRight: 10 }} />
                  <View style={{ flex: 1 }}>
                     <Text style={styles.transactionName}>Thanh toán vé máy bay ra Hà Nội</Text>
                     <Text style={styles.transactionDate}>12/06/2024</Text>
                  </View>
                  <Text style={styles.transactionAmount}>-4.000.000 VND</Text>
               </View>
               {/* 2 */}
               <View style={styles.transactionRow}>
                  <Ionicons name="card-outline" size={28} color="#1976d2" style={{ marginRight: 10 }} />
                  <View style={{ flex: 1 }}>
                     <Text style={styles.transactionName}>Thanh toán thẻ tín dụng</Text>
                     <Text style={styles.transactionDate}>10/06/2024</Text>
                  </View>
                  <Text style={styles.transactionAmount}>-2.000.000 VND</Text>
               </View>
               {/* 3 */}
               <View style={styles.transactionRow}>
                  <MaterialIcons name="attach-money" size={28} color="#1976d2" style={{ marginRight: 10 }} />
                  <View style={{ flex: 1 }}>
                     <Text style={styles.transactionName}>Mua USD tại Techcombank</Text>
                     <Text style={styles.transactionDate}>05/06/2024</Text>
                  </View>
                  <Text style={styles.transactionAmount}>-5.000.000 VND</Text>
               </View>
            </View>
         </ScrollView>

         {/* Bottom navigation bar */}
         <View style={styles.bottomNav}>
            <Pressable style={styles.navItem}>
               <Ionicons name="home-outline" size={24} color="#222" />
               <Text style={styles.navLabel}>Trang chủ</Text>
            </Pressable>
            <Pressable style={styles.navItem}>
               <Ionicons name="heart-outline" size={24} color="#222" />
               <Text style={styles.navLabel}>Yêu thích</Text>
            </Pressable>
            <Pressable style={[styles.navItem, styles.navCenter]} onPress={handleNavigateToChat}>
               <Animated.View
                  style={{
                     alignItems: 'center',
                     justifyContent: 'center',
                     transform: [
                        {
                           rotate: waveAnim.interpolate({
                              inputRange: [-1, 0, 1],
                              outputRange: ['-18deg', '0deg', '18deg'],
                           }),
                        },
                     ],
                  }}
               >
                  <MaterialIcons name="support-agent" size={44} color="#fff" />
               </Animated.View>
            </Pressable>
            <Pressable style={styles.navItem}>
               <Ionicons name="qr-code-outline" size={24} color="#222" />
               <Text style={styles.navLabel}>Quét mã QR</Text>
            </Pressable>
            <Pressable style={styles.navItem}>
               <Ionicons name="settings-outline" size={24} color="#222" />
               <Text style={styles.navLabel}>Cài đặt</Text>
            </Pressable>
         </View>
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#f8f8f8',
   },
   scrollContent: {
      paddingBottom: 100,
   },
   headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 18,
      paddingTop: 18,
      marginBottom: 10,
   },
   avatar: {
      width: 38,
      height: 38,
      borderRadius: 19,
      marginRight: 10,
      marginTop: 8,
   },
   userName: {
      fontWeight: 'bold',
      fontSize: 20,
      color: '#222',
   },
   accountCardWrap: {
      marginHorizontal: 18,
      marginBottom: 32,
   },
   accountCardBlack: {
      backgroundColor: '#111',
      borderTopLeftRadius: 18,
      borderTopRightRadius: 18,
      borderBottomLeftRadius: 18,
      borderBottomRightRadius: 18,
      padding: 18,
      marginBottom: -10,
      zIndex: 2,
   },
   bankName: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 15,
      marginBottom: 8,
   },
   accountRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
   },
   accountLabel: {
      color: '#fff',
      fontSize: 12,
      marginBottom: 2,
   },
   accountNumber: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 18,
   },
   expLabel: {
      color: '#fff',
      fontSize: 12,
      textAlign: 'right',
   },
   expValue: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
      textAlign: 'right',
   },
   toggleRow: {
      flexDirection: 'row',
      marginTop: 10,
   },
   toggleOn: {
      width: 32,
      height: 16,
      borderRadius: 8,
      backgroundColor: '#ffe082',
      marginRight: 8,
   },
   toggleOff: {
      width: 32,
      height: 16,
      borderRadius: 8,
      backgroundColor: '#888',
   },
   accountCardWhite: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      borderBottomLeftRadius: 18,
      borderBottomRightRadius: 18,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      zIndex: 1,
   },
   balanceLabel: {
      color: '#888',
      fontSize: 13,
      marginBottom: 2,
   },
   balanceValue: {
      color: '#222',
      fontWeight: 'bold',
      fontSize: 18,
   },
   vnd: {
      color: '#888',
      fontSize: 13,
      fontWeight: 'normal',
   },
   sectionCard: {
      backgroundColor: '#222',
      borderRadius: 16,
      marginHorizontal: 18,
      marginBottom: 32,
      padding: 16,
   },
   sectionTitle: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
      marginBottom: 12,
   },
   gridWrap: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
   },
   gridItem: {
      width: '23%',
      alignItems: 'center',
      marginBottom: 18,
   },
   gridLabel: {
      color: '#fff',
      fontSize: 13,
      marginTop: 6,
      textAlign: 'center',
   },
   transactionCard: {
      backgroundColor: '#fff',
      borderRadius: 16,
      marginHorizontal: 18,
      marginBottom: 32,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
   },
   transactionTitle: {
      color: '#222',
      fontWeight: 'bold',
      fontSize: 16,
      marginBottom: 10,
   },
   transactionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
   },
   transactionName: {
      color: '#222',
      fontWeight: 'bold',
      fontSize: 15,
   },
   transactionDate: {
      color: '#888',
      fontSize: 13,
   },
   transactionAmount: {
      color: '#e53935',
      fontWeight: 'bold',
      fontSize: 16,
   },
   helpButtonFixed: {
      position: 'absolute',
      right: 18,
      bottom: 92,
      backgroundColor: '#fff',
      borderRadius: 22,
      borderWidth: 2,
      borderColor: '#e53935',
      paddingVertical: 12,
      paddingHorizontal: 28,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      zIndex: 20,
   },
   helpButtonText: {
      color: '#e53935',
      fontWeight: 'bold',
      fontSize: 16,
      letterSpacing: 0.2,
   },
   bottomNav: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#fff',
      paddingHorizontal: 8,
      paddingTop: 8,
      paddingBottom: Platform.OS === 'ios' ? 24 : 12,
      borderTopLeftRadius: 18,
      borderTopRightRadius: 18,
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      elevation: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
   },
   navItem: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
   },
   navLabel: {
      color: '#222',
      fontSize: 11,
      marginTop: 2,
   },
   navCenter: {
      backgroundColor: '#e53935',
      width: 88,
      height: 88,
      borderRadius: 44,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: -44,
      borderWidth: 4,
      borderColor: '#fff',
      elevation: 6,
   },
   searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 18,
      marginHorizontal: 18,
      marginBottom: 16,
      paddingHorizontal: 14,
      paddingVertical: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.06,
      shadowRadius: 2,
      elevation: 1,
   },
   searchPlaceholder: {
      color: '#888',
      fontSize: 15,
   },
   bellWrap: {
      marginLeft: 'auto',
      marginRight: 0,
      alignItems: 'flex-end',
      justifyContent: 'center',
   },
   questionPop: {
      position: 'absolute',
      top: -10,
      right: -10,
      backgroundColor: '#fff',
      borderRadius: 16,
      paddingVertical: 6,
      paddingHorizontal: 14,
      zIndex: 30,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.10,
      shadowRadius: 3,
      elevation: 3,
      minWidth: 80,
      alignItems: 'center',
      justifyContent: 'center',
   },
   questionText: {
      color: '#222',
      fontSize: 12,
      textAlign: 'center',
      fontWeight: '400',
   },
   assistantLabel: {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      textAlign: 'center',
      color: '#222',
      fontSize: 11,
      fontWeight: 'normal',
      marginTop: 2,
   },
});

export default DashboardScreen; 