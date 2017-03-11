import settings from '../settings.json';


async function getDistancesToParkings(parkingData, currentLat, currentLon) {
  const origin = `${currentLat},${currentLon}`;
  const destinations = parkingData.reduce((dest, parking) => `${dest}${parking.lat},${parking.lon}|`, '');
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin}&destinations=${destinations}&key=${settings.googleApiKey}`;

  return fetch(url) // eslint-disable-line no-undef
    .then(response => response.json())
    .then(responseJson => responseJson.rows[0].elements);
}

/**
 * Return an array of parkings, sorted from the shortest to longest total duration,
 * with an added `distanceInfo` attribute.
 *
 * `distanceInfo` example:
 * {
 *  distance: { text: '136 km', value: 135899 },
 *  duration: { text: '1 hour 22 mins , value: 144290 },
 *  status: 'OK',
 * }
 */
export async function sortByProximity(parkingData, currentLat, currentLon, destination) {
  const distances = await getDistancesToParkings(parkingData, currentLat, currentLon);
  return parkingData.map((parking, idx) => ({
    ...parking,
    distanceInfo: distances[idx],
  }))
  .sort((p1, p2) => (p1.distanceInfo.duration.value < p2.distanceInfo.duration.value ? -1 : 1));
}

export default {
  sortByProximity,
};
