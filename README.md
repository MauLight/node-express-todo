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
