/* Read RFID Tag with RC522 RFID Reader
    Made by Omkar N
*/
//this is a comment
#include <SPI.h>
#include <MFRC522.h>
#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecureBearSSL.h>

String tag;
constexpr uint8_t SS_PIN = D4;
constexpr uint8_t RST_PIN = D3;

MFRC522::MIFARE_Key key;
MFRC522 rfid(SS_PIN, RST_PIN);

ESP8266WiFiMulti WiFiMulti;

void setup() {
  Serial.begin(9600);

  SPI.begin();                                    // Init SPI bus
  rfid.PCD_Init();                                // Init MFRC522

  WiFi.mode(WIFI_STA);                            // Init WIFI
  WiFiMulti.addAP("ssid", "password");

  delay(10000);

  if ((WiFiMulti.run() != WL_CONNECTED)) {
    Serial.println("WIFI connection succeded ");
  } else {
    Serial.println("WIFI connection failed ");
  }
}

void loop() {
  std::unique_ptr<BearSSL::WiFiClientSecure>client(new BearSSL::WiFiClientSecure);
  client->setInsecure();
  HTTPClient https;

  if (rfid.PICC_IsNewCardPresent()) {
    if (rfid.PICC_ReadCardSerial()) {
      for (byte i = 0; i < 4; i++) {
        tag += rfid.uid.uidByte[i];
      }

      if (https.begin(*client, "https://gestore.up.railway.app/verifyRFID?RFID=" + tag)) {
        https.GET();

        Serial.println(https.getString());

        https.end();
      } else {
        Serial.println("Failed to connect to Server \n");
      }

      tag = "";
      rfid.PICC_HaltA();
      rfid.PCD_StopCrypto1();
    }
  } else {
    return;
  }
}
