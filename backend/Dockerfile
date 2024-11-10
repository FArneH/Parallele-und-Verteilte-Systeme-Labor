# Verwende den offiziellen Node.js-Image als Basis
FROM node:14

# Setze das Arbeitsverzeichnis
WORKDIR /app

# Kopiere package.json und package-lock.json
COPY package*.json ./

# Installiere die Abhängigkeiten
RUN npm install

# Kopiere den Rest der Anwendung
COPY . .

# Exponiere den Port, den der Server verwendet
EXPOSE 3000

# Starte die Anwendung
CMD ["npm", "start"]
