// check if the browser supports Geolocation

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      console.log(`Latitude: ${lat}, Longitude: ${lng}`);
    },
    (error) => {
      console.error(`Error (${error.code}): ${error.message}`);
    },
  );
} else {
  console.log("Geolocation is not supported by this browser.");
}
