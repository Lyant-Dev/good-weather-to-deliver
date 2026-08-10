// check if the browser supports Geolocation

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      fetch(`./netlify/functions/weather?lat=${lat}&lon=${lng}`)
        .then((response) => {
          response.json();
        })
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    (error) => {
      console.error(`Error (${error.code}): ${error.message}`);
    },
  );
} else {
  console.log("Geolocation is not supported by this browser.");
}
