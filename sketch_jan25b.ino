#include "DHT.h"
#define DHTTYPE DHT11 
#define DHTPIN 2
DHT dht(DHTPIN, DHTTYPE);

int Pin_foto = 16;
int Pin_moist = 0;
int Pin_led = 5;
int readA0;
int Pin_buzzer = 4;

const char *ssid = "Omae wa mou shindeiru";  
const char *password = "81G_pp_P0w3R";
const char *host = "192.168.43.18"; 
 
void setup() {
    Serial.begin(115200);
    pinMode(Pin_buzzer, OUTPUT);
    pinMode(Pin_foto, OUTPUT);
    pinMode(Pin_moist, OUTPUT);
    pinMode(Pin_led, OUTPUT);
    analogWrite(Pin_led, 128);
    dht.begin();
    
    WiFi.mode(WIFI_STA);            
    WiFi.begin(ssid, password);     //Connect to your WiFi 

   Serial.print("Connecting");
   // Wait for connection
   while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
   }
  
   Serial.println("");
   Serial.print("Connected to ");
   Serial.println(ssid);
   Serial.print("IP address assigned to ESP: ");
   Serial.println(WiFi.localIP());  
  
}
 
int analogRead1() {
    digitalWrite(Pin_foto, HIGH); // Turn  On
    digitalWrite(Pin_moist, LOW); // Turn  Off
    return analogRead(A0);
}
int analogRead2() {
    digitalWrite(Pin_moist, HIGH); // Turn  On
    digitalWrite(Pin_foto, LOW); // Turn  Off
    return analogRead(A0);
}

void buzzing(){
  tone(Pin_buzzer, 3100); 
  delay(1750);        
  noTone(Pin_buzzer);     
  delay(1000);  
}

void PostData(int moist, int intenz, float tempC){
  String postData = String("moist=") + String(moist) + String("&tempC=") + String(tempC, 2) + String("&intenz=") + String(intenz);

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
}

void loop() {
    readA0 = analogRead1(); // Read Analog value of foto
    delay(2000);
    
    float t = dht.readTemperature();
    Serial.print("Temperatura: ");
    Serial.print(t);
    Serial.println();
    
    Serial.print("sensor 1 = ");
    Serial.print(readA0);
    Serial.println();

    int valueFoto = 255 * readA0 / 508;
    Serial.println(valueFoto);
    if(t < 21) 
    {
      valueFoto += 60;
      analogWrite(Pin_led, valueFoto);
      Serial.println(valueFoto);
    }
    else if(t > 29)
    {
      valueFoto -= 60;
      analogWrite(Pin_led, valueFoto);
      Serial.println(valueFoto);
    }
    
    readA0 = analogRead2(); // Read Analog value of moist

    int percentMoist = readA0 / 5.7;
    Serial.print("sensor 2 = ");
    Serial.print(percentMoist);
    Serial.print("% vlaznosti\n");
    
    //provjera za vl i buzzer
    if(percentMoist <= 10){
      buzzing();
      Serial.println("ZALIJ");
    } 
    
    //post
    PostData(percentMoist, valueFoto, t);
    
    //delay za kraj
    delay(900000UL)
}
