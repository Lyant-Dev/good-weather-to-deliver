// update info & status logic
function updateDeliveryStatus(weather, temp, windSpeed) {
  const statusInfo = document.querySelector("#status-info");
  const statusDelivery = document.querySelector("#status-delivery");
  if (weather === "Rain" || weather === "Thunderstorm" || windSpeed >= 11.11) {
    statusInfo.textContent = "🚫 Berbahaya";
    statusDelivery.textContent =
      "Resiko tinggi, tunda pengiriman sampai cuaca membaik!";
  } else if (weather === "Drizzle" || temp >= 35) {
    statusInfo.textContent = "⚠️ Berisiko";
    statusDelivery.textContent =
      "Gunakan perlengkapan ekstra / hati-hati di jalan!";
  } else {
    statusInfo.textContent = "✅ Aman";
    statusDelivery.textContent = "Cuaca mendukung, semoga pengiriman lancar!";
  }
}

//Alur Geolocation & Fetch

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
        const windSpeed = result.data.wind.speed;

      // Render ke DOM
        document.querySelector("#location").textContent = `${location}`;
        document.querySelector("#weather-condition").textContent = `${weather}`;
        document.querySelector("#weather-desc").textContent = `${weatherDesc}`;
        document.querySelector("#temp").textContent = `${temp}`;
        document.querySelector("#temp-feels").textContent =
          `Feels like: ${tempFeels}`;
        document.querySelector("#wind-speed").textContent = `${windSpeed}`;

        document.querySelector(".loading-container").style.display = "none";
        document.querySelector(".data-container").style.display = "flex";
        document.querySelector(".icon-container").style.display = "flex";
        document.querySelector(".status-container").style.display = "flex";

        updateDeliveryStatus(weather, temp, windSpeed);
      });
    },
    (error) => {
      console.error(`Error (${error.code}): ${error.message}`);
    },
  );
} else {
  console.log("Geolocation is not supported by this browser.");
}

