# Conterra Home Assignment

Ich habe alle Aufgaben bearbeitet.

Zusätzlich habe ich noch ein Dockerfile erstellt, mit dem man das ganze auch laufen lassen kann.

## Projekt Setup

### Docker

Build Docker image (wenn man mit dem Terminal im root-Verzeichnis des Projektes ist):

```sh
docker build -t <tag_name> .
```

Docker Container starten:

```sh
docker run -d --restart=always -p 8080:8080 --name jonas-amazing-app <tag_name>
```

### Ohne Docker

Ich habe Node v20.11.1 und npm v.10.2.4 verwendet

First things first:

```sh
npm install
```

Dann entweder im DEV Modus starten:

```sh
npm run dev
```

oder die App bauen (und Unit-Tests ausführen):

```sh
npm run build
```

und serve mit Http-Server

```sh
npx http-server dist
```