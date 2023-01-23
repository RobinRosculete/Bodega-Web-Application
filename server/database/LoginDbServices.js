let instance = null;
const connection = require("../database/database_connection");

class LoginDbServices {
  static getLoginDbInstance() {
    return instance ? instance : new LoginDbServices();
  }

  //Fiunction purpose to store a new user in the database
  async createNewCFOAccount(LoginInsertData) {
    try {
      //Queery statement to insert CFO profile information into Database
      const response = await new Promise((resolve, reject) => {
        const sqlInsert = `INSERT INTO BodegaDB.Login (login_email, login_password)   VALUES (?, ?);
                           SELECT LAST_INSERT_ID() into @tempid_login;
                           INSERT INTO BodegaDB.CFO_Shop (Login_id) VALUES (@tempid_login);`;

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
      console.log("we hit but..");
      console.log(error);
    }
  }










  //Function to retrieve CFO information based on matching Login ID.
  async selectCFOLogin(LoginSelectData) {
    try {
      //Query statement to retrieve CFO profile information from Database
      const response = await new Promise((resolve, reject) => {
        const sqlSelect = `SELECT login_id FROM BodegaDB.Login WHERE BodegaDB.Login.login_email = ? AND BodegaDB.Login.login_password = ? INTO @tempid_login;
                           SELECT CFO_id, CFO_Shop_Name, CFO_firstname, CFO_midlename, CFO_lastname, CFO_food_tag, CFO_website_link, 
                           address1, address2, state, city, zipcode, phone_number, email_address
                           FROM BodegaDB.CFO_Shop
                           INNER JOIN BodegaDB.Address ON BodegaDB.CFO_Shop.CFO_id = BodegaDB.Address.CFO_Shop_Id 
                           INNER JOIN BodegaDB.Contact ON BodegaDB.CFO_Shop.CFO_id = BodegaDB.Contact.CFO_Shop_id
                           WHERE BodegaDB.CFO_Shop.login_id = @tempid_login;`
        
        connection.query(sqlSelect, LoginSelectData, (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  
  //Function to retrieve Login ID only based on login_email & login_password.
  async selectLoginID(LoginSelectData) {
    try {
      //Query statement to retrieve CFO profile information from Database
      const response = await new Promise((resolve, reject) => {
        const sqlSelect = `SELECT login_id FROM BodegaDB.Login WHERE BodegaDB.Login.login_email = ? AND BodegaDB.Login.login_password = ?;`
        
        connection.query(sqlSelect, LoginSelectData, (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  }


    //Function to retrieve CFO information based on matching Login ID.
    async selectCFOShopByLoginID(LoginSelectID) {
      try {
        //Query statement to retrieve CFO profile information from Database
        const response = await new Promise((resolve, reject) => {
          const sqlSelect = `SELECT CFO_id, CFO_Shop_Name, CFO_firstname, CFO_midlename, CFO_lastname, CFO_food_tag, CFO_website_link, 
                             address1, address2, state, city, zipcode, phone_number, email_address
                             FROM BodegaDB.CFO_Shop
                             INNER JOIN BodegaDB.Address ON BodegaDB.CFO_Shop.CFO_id = BodegaDB.Address.CFO_Shop_Id 
                             INNER JOIN BodegaDB.Contact ON BodegaDB.CFO_Shop.CFO_id = BodegaDB.Contact.CFO_Shop_id
                             WHERE BodegaDB.CFO_Shop.login_id = ?;`
          
          connection.query(sqlSelect, LoginSelectID, (err, results) => {
            if (err) reject(new Error(err.message));
            resolve(results);
          });
        });
  
        return response;
      } catch (error) {
        console.log(error);
      }
    }


}//end of Class LoginDbServices

module.exports = LoginDbServices;
