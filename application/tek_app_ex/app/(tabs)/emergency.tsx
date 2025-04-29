import { StyleSheet, View, TouchableOpacity, Text, Linking } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function EmergencyScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const emergencyNumbers = [
    { name: 'Politiet', number: '1-1-2', icon: 'shield-alt', dev_number: '+4552301676' },
    { name: 'Ambulance', number: '1-1-2', icon: 'ambulance', dev_number: '+4552301676' },
    { name: 'Brandvæsenet', number: '1-1-2', icon: 'fire', dev_number: '+4552301676' },
  ];

  const handleEmergencyCall = (dev_number: string) => {
    // TODO: Implement emergency call functionality
    Linking.openURL(`tel:${dev_number}`);
    console.log(`Calling ${dev_number}`);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Nødtjenester</Text>
      <View style={styles.buttonsContainer}>
        {emergencyNumbers.map((service) => (
          <TouchableOpacity
            key={service.name}
            style={[styles.button, { backgroundColor: colors.tint }]}
            onPress={() => handleEmergencyCall(service.dev_number)}
          >
            <FontAwesome5 name={service.icon} size={24} color="white" />
            <Text style={styles.buttonText}>{service.name}</Text>
            <Text style={styles.numberText}>{service.number}</Text>
          </TouchableOpacity>
        ))}
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
  buttonsContainer: {
    gap: 15,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    gap: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  numberText: {
    color: 'white',
    fontSize: 18,
  },
}); 