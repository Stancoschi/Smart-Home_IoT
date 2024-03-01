#include <ESP8266WiFi.h>
#include <DHT.h>
#include <DHT_U.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>
#include <PubSubClient.h>
#include <LDRSensor.h>
#include <WiFiManager.h>
#include <Servo.h>

// DHT11 for reading tempe rature and humidity value
#define fan D1
#define fan1 D2
#define DHTPIN D3     // pin D3-Dht11 conectat
#define DHTTYPE DHT11 // DHT 11
#define LED_Verde D8  // pin D8-Releu Conectat
#define Ventilator D7 // pin D7-
Servo servo;  //Pin D1  - Servo motor
DHT dht(DHTPIN, DHTTYPE);
LDRSensor ldrSensor(A0);
int DHT11_Temperature_inCelsius = 0;
int DHT11_Humidity_inProcent = 0;
const char *ssid = "HUAWEI-2rPn";          // WiFi ssid ,password and MQTT server ip_adress.   HUAWEI-2rPn
const char *password = "B9dfmugT";         // B9dfmugT
const char *mqtt_server = "192.168.100.4"; // localhost

WiFiClient espClient;
PubSubClient client(espClient);

unsigned long lastMsg = 0;
#define MSG_BUFFER_SIZE (50)
char msg[MSG_BUFFER_SIZE];



void checkTemperatureAndHumidity() {
  if (DHT11_Temperature_inCelsius > 25) {
    digitalWrite(Ventilator, HIGH); // Turn on the ventilator
  } else {
    digitalWrite(Ventilator, LOW); // Turn off the ventilator
  }
  
  if (DHT11_Humidity_inProcent > 60) {
    digitalWrite(Ventilator, HIGH); // Turn on the ventilator
  } else {
    digitalWrite(Ventilator, LOW); // Turn off the ventilator
  }
}


void checkLightLevel() {
  float voltage = ldrSensor.readVoltage();
  if (voltage < 2.0) { // Assuming voltage < 2.0V indicates darkness
    digitalWrite(LED_Verde, HIGH); // Turn on the LED
    servo.write(180);
  } else {
    digitalWrite(LED_Verde, LOW); // Turn off the LED
    servo.write(0);
  }
}

void sendAlert(const char* message) {
  client.publish("esp8266/alert", message);
}

void checkAndSendAlerts() {
  if (DHT11_Temperature_inCelsius > 30) {
    sendAlert("Temperature is too high!");
  } else if (DHT11_Temperature_inCelsius < 10) {
    sendAlert("Temperature is too low!");
  }
  else{
    digitalWrite(fan, HIGH);
    sendAlert("Temperature is normal!");
  }

  if (DHT11_Humidity_inProcent > 70) {
    sendAlert("Humidity is too high!");
  }
}


void setup_wifi()
{
  delay(10);
  // We state to wich WiFi network we want to access.
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);        //"WiFi station"(client mode)
  WiFi.begin(ssid, password); // connecting by provided ssid and password

  while (WiFi.status() != WL_CONNECTED)
  { // wait for connection (retry)
    delay(500);
    Serial.print(".");
  }
  Serial.println(""); // when connected
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

// This functions is executed when a device publishes a message to a topic that the ESP8266 is subscribed to
void callback(char *topic, byte *payload, unsigned int length)
{ // callback funtion (trigger)

  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  String messageTemp;

  for (int i = 0; i < length; i++)
  { // print received character array in one line
    Serial.print((char)payload[i]);
    messageTemp += (char)payload[i];
    if (strcmp(topic, "esp8266/light") == 0)
    {
      Serial.print("Switching LED  ");
      if (messageTemp == "ON")
      {

        Serial.print("ON");
        digitalWrite(LED_Verde, HIGH);

        Serial.print(LED_Verde);
      }
      else if (messageTemp == "OFF")
      {

        Serial.print("off");

        digitalWrite(LED_Verde, LOW);
      }
      else
      {
        // Do nothing for the moment
      }
    }
  }
}

void reconnect()
{ // connecting to MQTT broker
  // Loop until we're reconnected
  while (!client.connected())
  {
    Serial.print("Attempting MQTT connection...");
    // Create a random client ID
    String clientId = "ESP8266Client-";
    clientId += String(random(0xffff), HEX);
    // Attempt to connect
    if (client.connect(clientId.c_str()))
    {
      Serial.println("connected");
      // Once connected, subscribe to the wanted publishers.
      client.subscribe("esp8266/light");
    }
    else
    {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(200);
    }
  }
}

void setup()
{
  Serial.begin(115200);
  dht.begin();
  setup_wifi();                        // call function
  client.setServer(mqtt_server, 1883); // connect to MQTT
  client.setCallback(callback);        // Listen to incoming messages and trigger callback
  pinMode(LED_Verde, OUTPUT);
  pinMode(fan, OUTPUT);
  pinMode(fan1, OUTPUT);
  servo.attach(D0);
  servo.write(0);
}



void loop()

{
  if (!client.connected())
  { // retry until conncted
    reconnect();
  }
  client.loop(); // MQTT loop, we keep listening

  DHT11_Temperature_inCelsius = dht.readTemperature();
  DHT11_Humidity_inProcent = dht.readHumidity();

  char str[8];
  itoa(DHT11_Temperature_inCelsius, str, 10); // convert int to char array
  client.publish("esp8266/temp", str);

  itoa(DHT11_Humidity_inProcent, str, 10); // convert int to char array
  client.publish("esp8266/DHT11_Humidity", str);

  float voltage = ldrSensor.readVoltage();
  Serial.println(voltage);

  itoa(voltage, str, 10);
  client.publish("esp8266/LDR_value", str);
  checkLightLevel();
  checkAndSendAlerts();
  digitalWrite(fan1, HIGH);
  delay(500); // loop 0.5second by 0.5second, mai mult flodam brokerul mqtt
digitalWrite(fan1, LOW);
}


