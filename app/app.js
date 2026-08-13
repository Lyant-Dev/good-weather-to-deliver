// check if the browser supports Geolocation

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const weatherUrl = `/.netlify/functions/weather?lat=${lat}&lon=${lng}`;
      async function fetchData() {
        try {
          const response = await fetch(weatherUrl);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.statusText}`);
          }
          const data = await response.json();
          return data;
        } catch (error) {
          console.error("Fetch failed:", error);
        }
      }
      fetchData().then((result) => {
        const location = result.data.name;
        const weather = result.data.weather[0].main;
        const weatherDesc = result.data.weather[0].description;
        const temp = result.data.main.temp;
        const tempFeels = result.data.main.feels_like;

        console.log(location);
        console.log(weather);
        console.log(weatherDesc);
        console.log(temp);
        console.log(tempFeels);

        document.querySelector("#location").textContent = `${location}`;
        document.querySelector("#weather-condition").textContent = `${weather}`;
        document.querySelector("#weather-desc").textContent = `${weatherDesc}`;
        document.querySelector("#temp").textContent = `${temp}`;
        document.querySelector("#temp-feels").textContent = `${tempFeels}`;

        document.querySelector(".loading-container").style.display = "none";
        document.querySelector(".data-container").style.display = "flex";
        document.querySelector(".icon-container").style.display = "flex";
      });
    },
    (error) => {
      console.error(`Error (${error.code}): ${error.message}`);
    },
  );
} else {
  console.log("Geolocation is not supported by this browser.");
}
