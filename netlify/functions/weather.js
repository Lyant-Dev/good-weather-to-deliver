// netlify/functions/weather.js

exports.handler = async function (event, context) {
  // Grab API key from the environment variables
  const apiKey = process.env.WEATHER_API_KEY;

  // fail early if server/hosting environment is missing the key
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Server configuration error: Missing API Key",
      }),
    };
  }

  // Get lat and lng from query string (?lat=...&lng=...)
  const { lat, lng } = event.queryStringParameters || {};
  if (lat == null || lng == null || lat.trim() === "" || lng.trim() === "") {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing lat or lng query parameters" }),
    };
  }

  try {
    // CHALLENGE STEP A: Construct your dynamic URL string using template literals (backticks ``)
    // Inject your lat, lng, and apiKey variables into the string.
    const url = `https://openweathermap.org${lat}&lon=${lng}&units=metric&appid=${API_key}
`;

    // CHALLENGE STEP B: Use 'await fetch()' to hit that URL
    const response = await fetch(url);

    // CHALLENGE STEP C: Turn the raw stream response into a readable JavaScript Object
    // Hint: Response bodies are streams. We use 'await response.json()' to parse it.
    const weatherData = await response.json();

    // CHALLENGE STEP D: Return a successful 200 response containing the weatherData object
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Success",
        data: weatherData, // Pass the parsed data here
      }),
    };
  } catch (error) {
    // If the internet drops or the weather API is down, this block catches the failure cleanly
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed fetching weather data",
        details: error.message,
      }),
    };
  }
};
