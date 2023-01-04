import { locationInitials } from "./models/Location";

function setCoords(position: GeolocationPosition): void {
  locationInitials.Latitude = position.coords.latitude;
  locationInitials.Longitude = position.coords.longitude;
}

function setInvalidCoords(position: GeolocationPositionError): void {
  locationInitials.Latitude = 1;
  locationInitials.Longitude = 1;
}

function fetchGeolocation(): void {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setCoords, setInvalidCoords);
  } else {
    locationInitials.Latitude = 1;
    locationInitials.Longitude = 1;
  }
}

export { fetchGeolocation };
