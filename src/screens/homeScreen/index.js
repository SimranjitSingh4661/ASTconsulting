import React, {useEffect, useState, useRef, useCallback, Fragment} from 'react';
import {
  View,
  Alert,
  Linking,
  AppState,
  Image,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Button} from '../../components/atoms';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {fetchData} from '../../api';
import {getUserCurrentLocation, getPermission} from '../../utils';
import {COLORS, STRINGS} from '../../constants';
import Toast from 'react-native-toast-message';
import styles from './styles';
import LoadingScreen from '../loadingScreen';
import ErrorScreen from '../ErrorScreen';
import {HospitalCard} from '../../components/molecules';

const HomeScreen = () => {
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const lastState = useRef('background');
  const [isGranted, setIsGranted] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [markers, setMarkers] = useState([]);
  const [origin, setOrigin] = useState({});
  const [error, setError] = useState('');
  const [hospital, setHospital] = useState({});
  const mapRef = useRef(null);

  useEffect(() => {
    //Event listener to get user location
    const subscription = AppState.addEventListener('change', current => {
      if (lastState.current === 'background' && current === 'active') {
        if (isGranted === false) {
          setLoading(false);
        }
      }
      lastState.current = current;
    });

    // Initial get location call
    fetchLocationDetails();

    return () => {
      subscription.remove();
    };
  }, [isGranted]);

  //Asking user again if he block or deny the loc permission
  useEffect(() => {
    if (!loading && !isGranted) {
      setLoading(true);
      setIsGranted(null);
      getPermission().then(response => {
        if (!response.status) {
          if (response.isBlocked) {
            Alert.alert({
              title: STRINGS.ERROR.TITLE,
              message: STRINGS.ERROR.MESSAGE,
              onSuccess: () => {
                Linking.openSettings().then(_ => {
                  setIsGranted(response.status);
                });
              },
            });
          } else {
            Alert.alert({
              title: STRINGS.ERROR.TITLE,
              message: STRINGS.ERROR.MESSAGE,
              onSuccess: () => {
                setIsGranted(response.status);
                setLoading(false);
              },
            });
          }
        } else {
          setIsGranted(true);
          setLoading(true);
        }
      });
    }
  }, [isGranted, loading]);

  const fetchLocationDetails = useCallback(async () => {
    try {
      if (!isGranted) return;
      const locationRes = await getUserCurrentLocation();
      const latitude = locationRes.latitude;
      const longitude = locationRes.longitude;
      setOrigin({
        latitude,
        longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      });
      const results = await fetchData(latitude, longitude);
      setMarkers(results);
      setTimeout(() => {
        setInitializing(false);
      }, 500);
    } catch (err) {
      setError(err || STRINGS.ERROR.SOMETHING_WENT_WRONG);
      Toast.show({
        type: 'error',
        text1: err || STRINGS.ERROR.SOMETHING_WENT_WRONG,
      });
      setInitializing(false);
    }
  }, [isGranted]);

  const onLogoutPress = () => {
    auth()
      .signOut()
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'User logged out',
        });
      })
      .catch(err => {
        Toast.show({
          type: 'error',
          text1: err || STRINGS.ERROR.SOMETHING_WENT_WRONG,
        });
      });
  };

  const onMarkerSelect = data => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setHospital(data);
  };

  const onHospitalClosePress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setHospital({});
  };

  if (initializing) {
    return <LoadingScreen fetchData />;
  }

  if (error) {
    return <ErrorScreen onPress={fetchLocationDetails} />;
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        region={origin}
        style={styles.map}
        provider={PROVIDER_GOOGLE}>
        {/* origin location Marker */}
        <Marker coordinate={origin}>
          <Image
            source={require('../../asstes/Images/navigator.png')}
            style={{width: 40, height: 40}}
          />
        </Marker>
        {markers?.map((mark, index) => {
          if (
            !mark?.geometry?.location?.lat ||
            !mark?.geometry?.location?.lng
          ) {
            return null;
          }

          return (
            <Fragment key={mark?.place_id}>
              <Marker
                pinColor={'blue'}
                onPress={() => onMarkerSelect(mark)}
                coordinate={{
                  latitude: mark?.geometry?.location?.lat,
                  longitude: mark?.geometry?.location?.lng,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.0121,
                }}
              />
            </Fragment>
          );
        })}
      </MapView>
      <View style={styles.buttonContainer}>
        <View
          style={{
            flex: 1,
          }}></View>
        <Button onPress={onLogoutPress} isDisabled text={'Logout'} />
      </View>
      {!!hospital.name && (
        <HospitalCard
          name={hospital.name}
          rating={hospital?.rating}
          address={hospital?.vicinity}
          status={hospital?.business_status}
          onHospitalClosePress={onHospitalClosePress}
        />
      )}
    </View>
  );
};

export default HomeScreen;
