import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Linking, Image } from 'react-native';
import { useColorScheme } from 'react-native';
import { Colors } from '../../constants/Colors';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Location from 'expo-location';

export default function LocationScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Adgang til lokationen blev nægtet');
          setIsLoading(false);
          return;
        }

        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        setLocation(location);
      } catch (error) {
        setErrorMsg('Error getting location: ' + error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const shareLocation = async () => {
    if (location) {
      const { latitude, longitude } = location.coords;
      const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
      
      try {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
          await Linking.openURL(url);
        } else {
          setErrorMsg('Cannot open maps application');
        }
      } catch (error) {
        setErrorMsg('Error sharing location: ' + error);
      }
    }
  };

  const getLocationText = () => {
    if (isLoading) {
      return 'Henter lokation...';
    }
    if (errorMsg) {
      return errorMsg;
    }
    if (location) {
      return `Breddegrad: ${location.coords.latitude.toFixed(6)}\nLængdegrad: ${location.coords.longitude.toFixed(6)}`;
    }
    return 'Lokation ikke tilgængelig';
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Del Lokation</Text>
      
      <View style={[styles.locationContainer, { backgroundColor: colors.tint + '20' }]}>
        <Text style={[styles.locationText, { color: colors.text }]}>
          {getLocationText()}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.shareButton, { backgroundColor: colors.tint }]}
        onPress={shareLocation}
        disabled={!location || isLoading}
      >
        <FontAwesome5 name="share-alt" size={24} color="white" />
        <Text style={styles.shareButtonText}>Del Lokation</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.refreshButton, { backgroundColor: colors.tint + '40' }]}
        onPress={() => {
          setIsLoading(true);
          setErrorMsg(null);
          (async () => {
            try {
              let location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High,
              });
              setLocation(location);
            } catch (error) {
              setErrorMsg('Error getting location: ' + error);
            } finally {
              setIsLoading(false);
            }
          })();
        }}
      >
        <FontAwesome5 name="sync" size={24} color={colors.tint} />
        <Text style={[styles.refreshButtonText, { color: colors.tint }]}>Opdater Lokation</Text>
      </TouchableOpacity>
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
  locationContainer: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
  },
  locationText: {
    fontSize: 16,
    lineHeight: 24,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    gap: 10,
    marginBottom: 15,
  },
  shareButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    gap: 10,
  },
  refreshButtonText: {
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