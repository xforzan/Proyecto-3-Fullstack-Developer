const path = require("path");
const { google } = require("googleapis");

const SERVICE_ACCOUNT_FILE = path.join(__dirname, "service-account.json");

const auth = new google.auth.GoogleAuth({
  keyFile: SERVICE_ACCOUNT_FILE,
  scopes: ["https://www.googleapis.com/auth/calendar"],
});

const calendar = google.calendar({ version: "v3", auth });
const calendarId = "207f67e607ff0ac9d2a5bf816416f81eeb74fe9105e745379d9e1d829879f45b@group.calendar.google.com";
const timeZone = "Europe/Madrid";

// Función para testear la conexión
async function checkConnection() {
  try {
    await calendar.events.list({ calendarId, maxResults: 1 });
    console.log("Conectado a Google Calendar ✅");
  } catch (error) {
    console.error("Error al conectar a Google Calendar:", error.message);
  }
}

checkConnection();

module.exports = { calendar, calendarId, timeZone };
