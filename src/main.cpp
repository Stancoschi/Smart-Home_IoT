#include <ESP8266WiFi.h>
#include <DHT.h>
#include <DHT_U.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>
#include <PubSubClient.h>

/************************* Pin Definition *********************************/

// DHT11 for reading temperature and humidity value

#define DHTPIN D3
#define DHTTYPE DHT11 // DHT 11
#define LED_Verde D8
DHT dht(DHTPIN, DHTTYPE);
String temp;
String hum;

// Your WiFi credentials.
const char *ssid = "HUAWEI-2rPn";
const char *password = "B9dfmugT";
const char *mqtt_server = "192.168.100.4"; // this is our broker

WiFiClient espClient;
PubSubClient client(espClient);

unsigned long lastMsg = 0;
#define MSG_BUFFER_SIZE (50)
char msg[MSG_BUFFER_SIZE];
int value = 0;
int sensorValue = 0;

void setup_wifi()
{ // setting up wifi connection

  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);        // select "wifi station" mode (client mode)
  WiFi.begin(ssid, password); // initiate connection

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

// This functions is executed when some device publishes a message to a topic that your ESP8266 is subscribed to
// Change the function below to add logic to your program, so when a device publishes a message to a topic that
// your ESP8266 is subscribed you can actually do something
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
    if (strcmp(topic ,"esp8266/LED")==0)
    {
      Serial.print("Switching LED  ");
      if (messageTemp == "on")
      {

        Serial.print("on");
        digitalWrite(LED_Verde, HIGH);
        Serial.print(LED_Verde);
      }
      else if (messageTemp == "off")
      {

        Serial.print("off");
        digitalWrite(LED_Verde, LOW);
      }
      else
      {
        // Do nothing
      }
    }
  }
  Serial.println();

  // Switch on the LED if an 1 was received as first character
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
      // Once connected, publish an announcement...
      client.subscribe("esp8266/LED");
    }
    else
    {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void setup()
{

  // Debug console
  pinMode(LED_Verde, OUTPUT);
  digitalWrite(LED_Verde, 1);
  Serial.begin(115200);
  dht.begin();
  setup_wifi();                        // call function
  client.setServer(mqtt_server, 1883); // connect to MQTT
  client.setCallback(callback);        // Listen to incoming messages and trigger callback
}

void loop()

{
  if (!client.connected())
  { // retry until conncted
    reconnect();
  }
  client.loop(); // MQTT loop, we keep listening
  value = dht.readTemperature();

  char str[8];
  itoa(value, str, 10); // convert int to char array
  client.publish("esp8266/temp", str);
  delay(0.5); // loop 2second by 2second, you can change it, but don't flood our free broker
}
