import Config from 'react-native-config';

const radius = 5000; //radius in meters

export const fetchData = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=hospital&key=${Config.GOOGLE_API_KEY}`,
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    return data.results;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
