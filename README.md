# Lambdaworks-test
Facundo Naveira

Demo online (vercel): https://lambdaworks-test.vercel.app/

Para correrlo localmente: 
1) Clonar el repositorio y preparar el entorno:
   usar el comando **npm install** para instalar las dependencias necesarias
2) Crear el archivo .env en la raíz del proyecto (este archivo está excluido del repositorio por seguridad) y agregar la siguiente línea:
   **DATABASE_URL="postgresql://test:test@localhost:5432/test?schema=public"**
3) Levantar la base de datos local:
   usar el comando **sudo docker-compose up -d**
4) Sincronizar prisma:
   usar el comando **npx prisma db push**
5) Correr el proyecto:
   usar el comando **npm run dev**
La aplicación web va a estar disponible en **http://localhost:3000**
