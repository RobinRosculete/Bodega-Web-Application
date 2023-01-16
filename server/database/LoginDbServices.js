let instance = null;
const connection = require("../database/database_connection");

class LoginDbServices {
  static getLoginDbInstance() {
    return instance ? instance : new LoginDbServices();
  }

  //Fiunction purpose to store a new user in the database
  async createNewCFOAccount(registerCFOInsertData) {
    try {
      //Queery statement to insert CFO profile information into Database
      const response = await new Promise((resolve, reject) => {
        const sqlInsert = `INSERT INTO BodegaDB.Login (login_email, login_password)   VALUES (?, ?);
                           SELECT LAST_INSERT_ID() into @tempid_login;
                           INSERT INTO BodegaDB.CFO_Shop (Login_id) VALUES (@tempid_login);`;

        connection.query(sqlInsert, registerCFOInsertData, (err, resuslts) => {
          if (err) reject(new Error(err.message));
          resolve(resuslts);
        });
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  //Fiunction purpose to store a new user in the database
  async createNewCustomerAccount(LoginInsertData) {
    try {
      //Queery statement to insert CFO profile information into Database
      const response = await new Promise((resolve, reject) => {
        const sqlInsert = `INSERT INTO BodegaDB.Login (login_email, login_password)   VALUES (?, ?);
        SELECT LAST_INSERT_ID() into @tempid_login;
        INSERT INTO BodegaDB.Customer (Login_id) VALUES (@tempid_login);`;

        connection.query(sqlInsert, LoginInsertData, (err, resuslts) => {
          if (err) reject(new Error(err.message));
          resolve(resuslts);
        });
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = LoginDbServices;
