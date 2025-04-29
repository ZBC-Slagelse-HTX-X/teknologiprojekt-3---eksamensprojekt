import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useColorScheme } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function MedicalScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // Example medical information - this would typically come from a database or user input
  const medicalInfo = {
    bloodType: 'A+',
    allergies: ['Penicillin', 'Jordnødder'],
    medications: ['Insulin', 'Blodtryksmedicin'],
    conditions: ['Diabetes', 'Forhøjet blodtryk'],
    emergencyContact: {
      name: 'John Doe',
      relationship: 'Ægtefælle', 
      phone: '+45 12 34 56 78',
    },
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Medicinsk Information</Text>
      
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Blodtype</Text>
        <Text style={[styles.sectionContent, { color: colors.text }]}>{medicalInfo.bloodType}</Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Allergier</Text>
        {medicalInfo.allergies.map((allergy, index) => (
          <Text key={index} style={[styles.sectionContent, { color: colors.text }]}>• {allergy}</Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Medicin</Text>
        {medicalInfo.medications.map((medication, index) => (
          <Text key={index} style={[styles.sectionContent, { color: colors.text }]}>• {medication}</Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Sygdomme</Text>
        {medicalInfo.conditions.map((condition, index) => (
          <Text key={index} style={[styles.sectionContent, { color: colors.text }]}>• {condition}</Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Nødkontakt</Text>
        <Text style={[styles.sectionContent, { color: colors.text }]}>Navn: {medicalInfo.emergencyContact.name}</Text>
        <Text style={[styles.sectionContent, { color: colors.text }]}>Relation: {medicalInfo.emergencyContact.relationship}</Text>
        <Text style={[styles.sectionContent, { color: colors.text }]}>Telefon: {medicalInfo.emergencyContact.phone}</Text>
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
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 16,
    marginBottom: 5,
  },
}); 