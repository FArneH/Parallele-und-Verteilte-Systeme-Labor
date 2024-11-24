# Verwende ein offizielles Node.js-Image als Basis
FROM node:18

# Arbeitsverzeichnis erstellen und wechseln
WORKDIR /app

# Package-Dateien kopieren und Abhängigkeiten installieren
COPY package*.json ./
RUN npm install

# Den Rest des Codes kopieren
COPY . .

# Port für den Express-Server (z. B. 3000)
EXPOSE 3000

# Startbefehl für den Express-Server
CMD ["node", "server.js"]
