# Verteilte Systeme Projekt: dezentraler Chat

## Motivation
Ein Problem bei gewöhnlichen Messengern ist, dass der zentrale Server über alle Daten und Chats verfügt. Zusätzlich bietet ein zentraler Dienst einen potenziellen single point of failure und einen attraktiven Angriffsvektor. Die Idee, um das Problem zu beseitigen ist ein Messenger, der ohne zentralen Server agiert. 
## Installation
Um den Messenger zu installieren, muss die *.apk Datei aus dem [Github Repository](https://github.com/uHrsch/verteilte-systeme/releases) heruntergeladen und installiert werden. Um die Installation zu starten, muss die *.apk Datei ausgeführt werden.
### Voraussetzungen
 - Android Betriebssystem
 - Entwicklermodus aktiviert

#### Da die Installationsdatei aus keinem Store kommt und damit nicht gescannt wurde, wird eine Warnung angezeigt. Es muss die Installation unbekannter Apps akzeptiert werden.

## Funktionsweise
### Initialisierung und Verbindungsaufbau
Beim ersten Starten der App wird ein RSA Schlüsselpaar erstellt, das im internen Schlüsselspeicher abgelegt wird. Um Kontaktinformationen auszutauschen, kann über ein Icon ein QR-Code angezeigt werden, der den öffentlichen Schlüssel des eigenen Schlüsselpaares und die eigene IP-Adresse enthält, zusätzlich wird ein Socket auf dem Gerät geöffnet. Ein weiters Gerät kann den QR-Code scannen und sich dadurch auf den Socket verbinden. Beim Verbindungsaufbau wird der öffentliche Schlüssel des sich verbindenden Geräts an den Socket geschickt.
### Verschlüsselung
Auf jedem Gerät wird ein Set angelegt, auf dem die verbundenen Sockets mit den zugehörigen öffentlichen Schlüsseln gespeichert wird. Versendete Nachrichten werden mit dem Schlüssel verschlüsselt und direkt an den Empfänger versendet, der die Nachricht mit dem eigenen privaten Schlüssel entschlüsseln kann.
### Chatspeicherung
Die eigenen Nachrichten erhalten den Zeitstempel, an dem sie versendet wurden. Eingehende Nachrichten erhalten auf jedem Gerät einen eigenen Zeitstempel wenn, sie eingehen, um den Einfluss von versetzten Uhrzeiten auf den teilnehmenden Geräten zu umgehen. 
### Gruppenchat
Zusätzlich besteht die Option, zusätzliche Teilnehmende in einen Chat einzuladen und so einen Gruppenchat zu realisieren. Dabei wird ein neuer QR-Code erstellt, der die Kontaktinformationen des Hostsockets mit einem zusätzlichen Groupflag anzeigt. Wenn der QR-Code eingescannt wird und die Verbindung zum Hostsocket hergestellt wird, erkennt dieser das Flag und teilt allen Teilnehmenden mit, dass es sich um einen Gruppenchat handelt. Nur der Hostsocket verfügt über alle IP-Adressen und öffentlichen Schlüssel in seinem Set. Beim Senden wird die Nachricht an alle Einträge im Set gesendet, der Hostsocket leitet Nachrichten, die bei ihm eingehen an alle anderen Teilnehmenden Geräte weiter.
## Unterschiede zu anderen Messengern
 - Kein zentraler Server
 - Kein single point of failure
 - Getrenntes Kommunikationsnetz
 - Aufwändiger Austausch von Kontaktinformationen
