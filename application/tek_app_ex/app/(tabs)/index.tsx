import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useColorScheme } from 'react-native';
import { Colors } from '../../constants/Colors';
import { FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';

type TabRoute = 'emergency' | 'medical' | 'location';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const quickActions: { title: string; icon: string; route: TabRoute; color: string }[] = [
    {
      title: 'Akuthjælp',
      icon: 'exclamation-triangle',
      route: 'emergency',
      color: '#FF3B30',
    },
    {
      title: 'Medicinsk Info',
      icon: 'notes-medical',
      route: 'medical',
      color: '#34C759',
    },
    {
      title: 'Del Lokation',
      icon: 'map-marker-alt',
      route: 'location',
      color: '#007AFF',
    },
  ];

  const handleQuickAction = (route: TabRoute) => {
    switch (route) {
      case 'emergency':
        router.push('/(tabs)/emergency');
        break;
      case 'medical':
        router.push('/(tabs)/medical');
        break;
      case 'location':
        router.push('/(tabs)/location');
        break;
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>CrisisConnect</Text>
      
      <View style={styles.quickActionsContainer}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Hurtig Adgang</Text>
        {quickActions.map((action) => (
          <TouchableOpacity
            key={action.title}
            style={[styles.quickActionButton, { backgroundColor: action.color }]}
            onPress={() => handleQuickAction(action.route)}
          >
            <FontAwesome5 name={action.icon} size={24} color="white" />
            <Text style={styles.quickActionText}>{action.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.emergencyInfoContainer}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Nødtjenester</Text>
        <View style={[styles.infoCard, { backgroundColor: colors.tint + '20' }]}>
          <Text style={[styles.infoTitle, { color: colors.text }]}>Alarmcentralen</Text>
          <Text style={[styles.infoText, { color: colors.text }]}>112</Text>
          <Text style={[styles.infoDescription, { color: colors.text }]}>
            Ring til dette nummer for hurtig hjælp i tilfælde af nød
          </Text>
        </View>
      </View>

      <View style={styles.tipsContainer}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Råd til nødsituationer</Text>
        <View style={[styles.tipCard, { backgroundColor: colors.tint + '20' }]}>
          <FontAwesome5 name="lightbulb" size={20} color={colors.tint} />
          <Text style={[styles.tipText, { color: colors.text }]}>
            Forhold dig rolig og giv klare oplysninger om din lokation og situation til alarmcentralen, fortæl dem kun fakta.
          </Text>
        </View>
        <View style={[styles.tipCard, { backgroundColor: colors.tint + '20' }]}>
          <FontAwesome5 name="lightbulb" size={20} color={colors.tint} />
          <Text style={[styles.tipText, { color: colors.text }]}>
            Hold din medicinske information opdateret under "Medicinsk Info"
          </Text>
        </View>
        <View style={[styles.tipCard, { backgroundColor: colors.tint + '20' }]}>
          <FontAwesome5 name="lightbulb" size={20} color={colors.tint} />
          <Text style={[styles.tipText, { color: colors.text }]}>
            Brug "Del Lokation" til at hjælpe nødtjenesten med at finde dig hurtigt
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    paddingTop: 20,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  quickActionsContainer: {
    marginBottom: 20,
  },
  quickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    gap: 15,
  },
  quickActionText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emergencyInfoContainer: {
    marginBottom: 20,
  },
  infoCard: {
    padding: 15,
    borderRadius: 10,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoDescription: {
    fontSize: 14,
  },
  tipsContainer: {
    marginBottom: 20,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    gap: 10,
  },
  tipText: {
    flex: 1,
    fontSize: 16,
  },
});
