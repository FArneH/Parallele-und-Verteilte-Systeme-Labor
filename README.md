# Parallele-und-Verteilte-Systeme-Labor

Dieses Repository enthält die Implementierung für das Labor Parallele und Verteilte Systeme. Es beinhaltet das Backend (Express.js) und die Datenbankkonfiguration (mit PostgreSQL).

## Backend - Express.js
Das Backend ist als RESTful API aufgebaut und bietet folgende Endpunkte:

- **GET /api/items** – Gibt alle Artikel (shopping_items) aus der Datenbank zurück.
- **POST /api/items** – Fügt ein neues Item in die Datenbank hinzu.
- **PUT /api/items/:name** – Aktualisiert die Menge eines vorhandenen Artikels.
- **DELETE /api/items/:name** – Löscht ein Item aus der Datenbank.

**Befehl zum Starten des Backends:**
node server.js

## DB - PostgressSQL
Die Datenbank ist eine PostgreSQL-Datenbank, die über das pg-Modul in Node.js angesprochen wird. Die Daten werden in einer Tabelle namens shopping_items gespeichert, die die folgenden Spalten enthält:

id: Eindeutige Identifikation des Items (Primärschlüssel).
name: Der Name des Items (z. B. "Apfel").
amount: Die Anzahl des Items (z. B. 3).
SQL zum Erstellen der Tabelle:
### SQL zum Erstellen der Tabelle:
```sql
CREATE TABLE IF NOT EXISTS shopping_items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    amount INTEGER NOT NULL
);

Initialisierung der Datenbank: Beim Starten des Backends wird die Datenbank automatisch mit der notwendigen Tabelle initialisiert, falls sie noch nicht existiert. Die Tabelle wird mit den Spalten id, name und amount erstellt.

## Docker-Konfiguration
shoppingdb: Der PostgreSQL-Datenbank-Container.
backend: Der Express.js Backend-Container, der mit der Datenbank kommuniziert.
frontend: Der Container für das Frontend.

### Befehle
Build Docker-Container neu: docker-compose build
Docker-Container starten: docker-compose up


