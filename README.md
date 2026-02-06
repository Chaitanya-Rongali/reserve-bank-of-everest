# Reserve Bank of Everest
This banking application is used for customer can create accounts in the bank and manage balance securely.And chance to send money from one account to another accounts and save transcation history safely.

##  Table of Contents:
- [How to Get Started](#how-to-get-started)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Author](#author)

##  How to Get Started:

### Steps:

1. Clone this project to your computer:
   ```
   git clone https://github.com/Chaitanya-Rongali/reserve-bank-of-everest.git
   ```
2. Open the folder:
   ```
   cd reserve-bank-of-everest
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Configuration

   1.Set up PostgreSQL,You can download using this https://www.postgresql.org/download/macosx/

   2.Create a database using this command `CREATE DATABASE YOUR_DATABASE_NAME`

   3.Set up env file:Create .env file in the root directory and add your database credentials 

    ####  Sample Credentials
    ```
    DB_USER=YOUR_USER_NAME
    DB_PASSWORD=YOUR_PASSWORD
    DB_NAME=YOUR_DATABASE_NAME
    DB_HOST=localhost
    PORT=YOUR_APPLICATION_PORT_NUMBER
    ```
5. Run migrations:Use the Sequilize cli to create the database tables:
   ```
   sequelize db:migrate

   ```

4. Start the server:
   ```
   npm run dev
   ```
   
##  Features:





##  Tech Stack:
**Node.Js:**
- https://nodejs.org/en

**TypeScript:**
-  https://www.typescriptlang.org/download/

**Express**
- https://expressjs.com/

**Sequelize ORM**
- https://sequelize.org/docs/v6/getting-started/




##  Author:

This feature is maintained by [Chaitanya Rongali](https://github.com/Chaitanya-Rongali)
