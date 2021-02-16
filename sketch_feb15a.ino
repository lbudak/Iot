#include <ESP8266WiFi.h>
#include <WiFiClient.h> 

/* Set these to your desired credentials. */
const char *ssid = "Omae wa mou shindeiru";  
const char *password = "81G_pp_P0w3R";

//Web/Server address to read/write from 
const char *host = "192.168.43.18";  

void setup() {
  delay(1000);
  Serial.begin(115200);
  delay(1000);
  
  WiFi.mode(WIFI_STA);        //This line hides the viewing of ESP as wifi hotspot
  WiFi.begin(ssid, password);     //Connect to your WiFi router

  Serial.print("Connecting");
  // Wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  //If connection successful show IP address in serial monitor
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());  //IP address assigned to your ESP
}

void loop() {

  String postData;
  int moist = 69;
  int intenz = 255;
  float tempC = 69.42;
  postData = String("moist=") + String(moist);
  postData += String("&tempC=") + String(tempC, 2);
  postData += String("&intenz=") + String(intenz);

  WiFiClient client;
  while(!client.connect(host, 80)){
    Serial.println("Cannot reach server");
    delay(3000);
  }  
  client.println("POST /data_POST.php HTTP/1.1");
  client.println("Host: 192.168.43.18");
  client.println("Content-Type: application/x-www-form-urlencoded");
  client.print("Content-Length: ");
  client.println(postData.length());
  client.println();
  client.print(postData);

  if (client.connected()) {
    client.stop();
  }
  


  
  delay(10000);  
}
