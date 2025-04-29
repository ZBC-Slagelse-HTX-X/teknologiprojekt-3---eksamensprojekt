import { StyleSheet, View, Text, TouchableOpacity, Switch, Image } from 'react-native';
import { useColorScheme } from 'react-native';
import { Colors } from '../../constants/Colors';
import { FontAwesome5 } from '@expo/vector-icons';
import { useState } from 'react';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationSharingEnabled, setLocationSharingEnabled] = useState(true);

  // Example user data - this would typically come from a database or user input
  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+45 12 34 56 78',
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Profil</Text>
      
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Personlig Information</Text>
        <View style={styles.infoRow}>
          <FontAwesome5 name="user" size={20} color={colors.text} />
          <Text style={[styles.infoText, { color: colors.text }]}>{userData.name}</Text>
        </View>
        <View style={styles.infoRow}>
          <FontAwesome5 name="envelope" size={20} color={colors.text} />
          <Text style={[styles.infoText, { color: colors.text }]}>{userData.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <FontAwesome5 name="phone" size={20} color={colors.text} />
          <Text style={[styles.infoText, { color: colors.text }]}>{userData.phone}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Indstillinger</Text>
        <View style={styles.settingRow}>
          <Text style={[styles.settingText, { color: colors.text }]}>Notifikationer</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#767577', true: colors.tint }}
          />
        </View>
        <View style={styles.settingRow}>
          <Text style={[styles.settingText, { color: colors.text }]}>Del Lokation</Text>
          <Switch
            value={locationSharingEnabled}
            onValueChange={setLocationSharingEnabled}
            trackColor={{ false: '#767577', true: colors.tint }}
          />
        </View>
      </View>

      <TouchableOpacity
        style={[styles.editButton, { backgroundColor: colors.tint }]}
        onPress={() => {
          // TODO: Implement edit profile functionality
          console.log('Edit profile');
        }}
      >
        <FontAwesome5 name="edit" size={20} color="white" />
        <Text style={styles.editButtonText}>Rediger Profil</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Image 
          source={require('../../assets/images/crisis_connect.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={[styles.copyright, { color: colors.text }]}>© CrisisConnect 2025</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    paddingTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  infoText: {
    fontSize: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  settingText: {
    fontSize: 16,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    gap: 10,
  },
  editButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingVertical: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  copyright: {
    fontSize: 14,
    opacity: 0.7,
  },
}); 