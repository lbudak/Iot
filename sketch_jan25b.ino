#include "DHT.h"
#define DHTTYPE DHT11 
#define DHTPIN 2
DHT dht(DHTPIN, DHTTYPE);

int Pin_foto = 16;
int Pin_moist = 0;
int Pin_led = 5;
int readD1;
int zalij;
 
void setup() {
    Serial.begin(115200);
    pinMode(Pin_foto, OUTPUT);
    pinMode(Pin_moist, OUTPUT);
    pinMode(Pin_led, OUTPUT);
    analogWrite(Pin_led, 128);
    dht.begin();
  
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

void loop() {
    readD1 = analogRead1(); // Read Analog value of foto
    delay(2000);
    
    float t = dht.readTemperature();
    Serial.print("Temperatura: ");
    Serial.print(t);
    Serial.println();
    
    Serial.print("sensor 1 = ");
    Serial.print(readD1);
    Serial.println();

    int percentF = 255*readD1/508;
    Serial.println(percentF);
    if(t < 21) 
    {
      percentF += 60;
      analogWrite(Pin_led, percentF);
      Serial.println(percentF);
    }
    else if(t > 29)
    {
      percentF -= 60;
      analogWrite(Pin_led, percentF);
      Serial.println(percentF);
    }
    
    readD1 = analogRead2(); // Read Analog value of moist

    int percentV = readD1/5.7;
    Serial.print("sensor 2 = ");
    Serial.print(percentV);
    Serial.print("% vlaznosti\n");
    //provjera za vl i buzzer; biljezenje statusa
    
    
    
    //delay za kraj
     
}
