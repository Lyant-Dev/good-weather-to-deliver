// netlify/functions/weather.js

exports.handler = async function (event, context) {
  // Get lat and lng from query string (?lat=...&lng=...)
  const { lat, lng } = event.queryStringParameters || {};
  if (lat == null || lng == null || lat.trim() === "" || lng.trim() === "") {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing lat or lng query parameters" }),
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Success",
      latitude: lat,
      longitude: lng,
    }),
  };
};
