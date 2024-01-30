#include <M5Core2.h>
#include <HTTPClient.h>
#include <WiFi.h>
#include <ArduinoJson.h>

const char *ssid = "ababa";
const char *password = "ababababa";
const char *url = "https://iput-bb.vercel.app/api/sensor";

const uint16_t x = 18;
const uint16_t y = 24;

const uint16_t pin = 35;
const uint16_t detectLength = 100;

uint16_t sensorValue;

bool toggle;

HTTPClient http;

void setup()
{

  // display setup

  M5.begin();
  M5.Lcd.setTextSize(3);

  M5.Lcd.setCursor(0, 0);
  M5.Lcd.printf("macAddress:");
  M5.Lcd.setCursor(0, y * 3);
  M5.Lcd.printf("WiFi:");
  M5.Lcd.setCursor(0, y * 4);
  M5.Lcd.printf("isOpen:");
  M5.Lcd.setCursor(0, y * 5);
  M5.Lcd.printf("status:");

  // WiFi Setup

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED)
    delay(500);

  M5.Lcd.setCursor(0, y);
  M5.Lcd.printf((char *)WiFi.macAddress().c_str());

  M5.Lcd.setCursor(0, y * 3);
  M5.Lcd.printf("WIFI: Connected");

  // Sensor Setup

  pinMode(pin, ANALOG);
}

void loop()
{
  M5.update();

  sensorValue = 5000.0 * analogRead(pin) / 1024;

  if (sensorValue < detectLength && toggle)
  {
    M5.Lcd.setCursor(0, y * 4);
    M5.Lcd.printf("isOpen: No ");

    String body = "{ \"macAddress\": \"" + WiFi.macAddress() + "\", \"isOpen\": false }";

    http.begin(url);
    http.addHeader("Content-type", "application/json");
    int status = http.POST(body);
    http.end();

    M5.Lcd.setCursor(0, y * 5);

    if (status == 200)
    {
      M5.Lcd.printf("status: ok   ");
    }
    else
    {
      M5.Lcd.printf("status: error");
    }

    toggle = false;
  }

  if (sensorValue > detectLength && !toggle)
  {
    M5.Lcd.setCursor(0, y * 4);
    M5.Lcd.printf("isOpen: Yes");

    String body = "{ \"macAddress\": \"" + WiFi.macAddress() + "\", \"isOpen\": true }";

    http.begin(url);
    http.addHeader("Content-type", "application/json");
    int status = http.POST(body);
    http.end();

    M5.Lcd.setCursor(0, y * 5);

    if (status == 200)
    {
      M5.Lcd.printf("status: ok   ");
    }
    else
    {
      M5.Lcd.printf("status: error");
    }

    toggle = true;
  }
}
