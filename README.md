**Node Express To-do List**

1. Make sure you have postgres installed; open terminal and run the command **postgres --version**
2. If postgres is not installed, install by running **brew install postgresql** and then **brew services start postgresql**

3. Start postgres with the command **psql postgres**
4. Create the required role with the command **CREATE ROLE todo_user WITH LOGIN PASSWORD 'password';**
5. Run **ALTER ROLE todo_user CREATEDB**
6. Exit with **\q**

7. Connect back to service with command **psql -d postgres -U todo_user**
8. Create the required database with command **CREATE DATABASE todo_db;**
9. Run **\c todo_db**

10. Open a terminal in the project folder.
11. Run **npm i**
12. Create a new **.env** file in the project's root using the **.env.example** file as template.
13. Run **npm run dev**

**Lista de Tareas con Node Express**

1. Asegúrate de tener postgres instalado; abre la terminal y ejecuta el comando **postgres --version**
2. Si postgres no está instalado, instálalo ejecutando **brew install postgresql** y luego **brew services start postgresql**

3. Inicia postgres con el comando **psql postgres**
4. Crea el rol requerido con el comando **CREATE ROLE todo_user WITH LOGIN PASSWORD 'password';**
5. Ejecuta **ALTER ROLE todo_user CREATEDB**
6. Sal con **\q**

7. Conéctate de nuevo al servicio con el comando **psql -d postgres -U todo_user**
8. Crea la base de datos requerida con el comando **CREATE DATABASE todo_db;**
9. Ejecuta **\c todo_db**

10. Abre una terminal en la carpeta del proyecto.
11. Ejecuta **npm i**
12. Crea un nuevo archivo **.env** en la raíz del proyecto usando el archivo **.env.example** como plantilla.
13. Ejecuta **npm run dev**
