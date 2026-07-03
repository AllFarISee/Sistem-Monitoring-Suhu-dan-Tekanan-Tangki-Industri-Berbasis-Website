#include <Arduino.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <DHT.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

// ======================
// WIFI
// ======================

const char *ssid = "Wokwi-GUEST";
const char *password = "";

// ======================
// MQTT
// ======================

const char *mqttServer = "broker.emqx.io";
const int mqttPort = 1883;

const char *topic = "industrial/tank/data";

// ======================
// PIN
// ======================

#define DHTPIN 15
#define DHTTYPE DHT22

#define POTPIN 34

#define LED_GREEN 19
#define LED_RED 18
#define BUZZER 5

// ======================
// OLED
// ======================

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64

Adafruit_SSD1306 display(
    SCREEN_WIDTH,
    SCREEN_HEIGHT,
    &Wire,
    -1);

// ======================

DHT dht(DHTPIN, DHTTYPE);

WiFiClient espClient;
PubSubClient mqttClient(espClient);

// ======================

float temperature = 0;
int pressure = 0;

String statusTank = "NORMAL";

// ======================

void connectWifi()
{
  Serial.print("Connecting WiFi");

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }

  Serial.println();
  Serial.println("WiFi Connected");

  Serial.print("IP : ");
  Serial.println(WiFi.localIP());
}

// ======================

void reconnectMQTT()
{
  while (!mqttClient.connected())
  {
    Serial.print("Connecting MQTT...");

    String clientId = "ESP32-";
    clientId += String(random(1000, 9999));

    if (mqttClient.connect(clientId.c_str()))
    {
      Serial.println("CONNECTED");
    }
    else
    {
      Serial.print("FAILED : ");
      Serial.println(mqttClient.state());

      delay(2000);
    }
  }
}

// ======================

void readSensor()
{
  temperature = dht.readTemperature();

  int adc = analogRead(POTPIN);

  pressure = map(adc, 0, 4095, 0, 100);

  if (isnan(temperature))
    temperature = 0;
}

// ======================

void checkStatus()
{
  digitalWrite(LED_GREEN, LOW);
  digitalWrite(LED_RED, LOW);

  // buzzer off
  noTone(BUZZER);

  if (temperature >= 60 || pressure >= 80)
  {
    statusTank = "DANGER";

    digitalWrite(LED_RED, HIGH);

    tone(BUZZER, 1000);
  }
  else if (temperature >= 45 || pressure >= 60)
  {
    statusTank = "WARNING";

    digitalWrite(LED_GREEN, HIGH);
    digitalWrite(LED_RED, HIGH);
  }
  else
  {
    statusTank = "NORMAL";

    digitalWrite(LED_GREEN, HIGH);
  }
}

// ======================

void updateOLED()
{
  display.clearDisplay();

  display.setTextSize(1);
  display.setTextColor(WHITE);

  display.setCursor(0, 0);
  display.println("INDUSTRIAL TANK");

  display.print("Temp : ");
  display.print(temperature);
  display.println(" C");

  display.print("Press: ");
  display.print(pressure);
  display.println("%");

  display.println();

  display.print("Status:");

  display.println(statusTank);

  display.display();
}

// ======================

void publishData()
{
  StaticJsonDocument<200> doc;

  doc["temperature"] = temperature;
  doc["pressure"] = pressure;
  doc["status"] = statusTank;

  char buffer[256];

  serializeJson(doc, buffer);

  mqttClient.publish(topic, buffer);

  Serial.println("---------------------");
  Serial.println("MQTT Publish");
  Serial.println(buffer);
}

// ======================

void setup()
{
  Serial.begin(115200);

  pinMode(LED_GREEN, OUTPUT);
  pinMode(LED_RED, OUTPUT);
  pinMode(BUZZER, OUTPUT);

  dht.begin();

  display.begin(
      SSD1306_SWITCHCAPVCC,
      0x3C);

  display.clearDisplay();
  display.display();

  connectWifi();

  mqttClient.setServer(
      mqttServer,
      mqttPort);
}

// ======================

void loop()
{
  if (WiFi.status() != WL_CONNECTED)
  {
    connectWifi();
  }

  if (!mqttClient.connected())
  {
    reconnectMQTT();
  }

  mqttClient.loop();

  readSensor();

  checkStatus();

  updateOLED();

  publishData();

  delay(2000);
}