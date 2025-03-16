import moment from "moment";
import connection from "../config/connectDB.js";

/**
 * Function to create user withdraw
 */
async function createUserUPIWithdraw(req, res) {
  try {
    console.log("callll4444444444444444444444");
    const payload = req.body;
    console.log("payload---", payload);
    let auth = req.cookies.auth; // Taking the user ID from the token

    // Fetch the user from the database
    const [user] = await connection.query(
      "SELECT * FROM users WHERE token = ? AND veri = 1 LIMIT 1",
      [auth]
    );
    console.log("user-----------", user[0]);

    if (!user || user.length === 0) {
      return res.status(404).json({
        message: "User not found or not verified!",
        status: false,
      });
    }

    // Validate the payload for the Nagad number
    // if (!payload.mobile) {
    //   return res.status(400).json({
    //     message: "Upi number is required!",
    //     status: false,
    //   });
    // }

    // Find if the user already has a withdraw entry
    const [withdraw_found] = await connection.query(
      "SELECT * FROM user_withdraw WHERE phone = ? AND status = ?",
      [user[0].phone, 'active']
    );
console.log("payload", payload.upi)
    if (withdraw_found.length === 0) {
      // User withdraw entry not found, perform insert
      const query = `
        INSERT INTO user_withdraw (phone, upi) 
        VALUES (?, ?)
      `;
      await connection.execute(query, [user[0].phone, payload.upi]);
      console.log("New withdraw entry created.");
    } else {
      // User withdraw entry found, perform update
      const updateQuery = `
        UPDATE user_withdraw 
        SET upi = ?
        WHERE phone = ? AND status = ?
      `;
      await connection.execute(updateQuery, [payload.upi, user[0].phone, 'active']);
      console.log("Existing withdraw entry updated.");
    }

    return res.status(200).json({
      message: "User withdraw request created/updated successfully!",
      status: true,
    });

  } catch (error) {
    console.error("Error creating/updating user withdraw:", error);
    return res.status(500).json({
      message: "Something went wrong!",
      status: false,
    });
  }
}


/**
 * Function to create user withdraw bikash
 */
async function createUserBkashWithdraw(req, res){
  try {
    console.log("callll4444444444444444444444");
    const payload = req.body;
    console.log("payload---", payload);
    let auth = req.cookies.auth; // Taking the user ID from the token

    // Fetch the user from the database
    const [user] = await connection.query(
      "SELECT * FROM users WHERE token = ? AND veri = 1 LIMIT 1",
      [auth]
    );
    console.log("user-----------", user[0]);

    if (!user || user.length === 0) {
      return res.status(404).json({
        message: "User not found or not verified!",
        status: false,
      });
    }

    // Validate the payload for the Nagad number
    if (!payload.mobile) {
      return res.status(400).json({
        message: "Bkash number is required!",
        status: false,
      });
    }

    // Find if the user already has a withdraw entry
    const [withdraw_found] = await connection.query(
      "SELECT * FROM user_withdraw WHERE phone = ? AND status = ?",
      [user[0].phone, 'active']
    );

    if (withdraw_found.length === 0) {
      // User withdraw entry not found, perform insert
      const query = `
        INSERT INTO user_withdraw (phone, bkash) 
        VALUES (?, ?)
      `;
      await connection.execute(query, [user[0].phone, payload.mobile]);
      console.log("New withdraw entry created.");
    } else {
      // User withdraw entry found, perform update
      const updateQuery = `
        UPDATE user_withdraw 
        SET bkash = ?
        WHERE phone = ? AND status = ?
      `;
      await connection.execute(updateQuery, [payload.mobile, user[0].phone, 'active']);
      console.log("Existing withdraw entry updated.");
    }

    return res.status(200).json({
      message: "User withdraw request created/updated successfully!",
      status: true,
    });

  } catch (error) {
    console.error("Error creating/updating user withdraw:", error);
    return res.status(500).json({
      message: "Something went wrong!",
      status: false,
    });
  }
}

/**
 * Function to create bank card
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async function createUserbankCardWithdraw(req, res){
  try {
    console.log("callll4444444444444444444444");
    const payload = req.body;
    console.log("payload---", payload);
    let auth = req.cookies.auth; // Taking the user ID from the token

    // Fetch the user from the database
    const [user] = await connection.query(
      "SELECT * FROM users WHERE token = ? AND veri = 1 LIMIT 1",
      [auth]
    );
    console.log("user-----------", user[0]);

    if (!user || user.length === 0) {
      return res.status(404).json({
        message: "User not found or not verified!",
        status: false,
      });
    }

    // Validate the payload for the Nagad number
    if (!payload.mobile) {
      return res.status(400).json({
        message: "Bank card number is required!",
        status: false,
      });
    }

    // Find if the user already has a withdraw entry
    const [withdraw_found] = await connection.query(
      "SELECT * FROM user_withdraw WHERE phone = ? AND status = ?",
      [user[0].phone, 'active']
    );

    if (withdraw_found.length === 0) {
      // User withdraw entry not found, perform insert
      const query = `
        INSERT INTO user_withdraw (phone, bankCard) 
        VALUES (?, ?)
      `;
      await connection.execute(query, [user[0].phone, payload.mobile]);
      console.log("New withdraw entry created.");
    } else {
      // User withdraw entry found, perform update
      const updateQuery = `
        UPDATE user_withdraw 
        SET bankCard = ?
        WHERE phone = ? AND status = ?
      `;
      await connection.execute(updateQuery, [payload.mobile, user[0].phone, 'active']);
      console.log("Existing withdraw entry updated.");
    }

    return res.status(200).json({
      message: "User withdraw request created/updated successfully!",
      status: true,
    });

  } catch (error) {
    console.error("Error creating/updating user withdraw:", error);
    return res.status(500).json({
      message: "Something went wrong!",
      status: false,
    });
  }
}


/**
 * Function to create or update Nagad withdraw for a user
 */
async function createUserNagadWithdraw(req, res) {
  try {
    console.log("callll4444444444444444444444");
    const payload = req.body;
    console.log("payload---", payload);
    let auth = req.cookies.auth; // Taking the user ID from the token

    // Fetch the user from the database
    const [user] = await connection.query(
      "SELECT * FROM users WHERE token = ? AND veri = 1 LIMIT 1",
      [auth]
    );
    console.log("user-----------", user[0]);

    if (!user || user.length === 0) {
      return res.status(404).json({
        message: "User not found or not verified!",
        status: false,
      });
    }

    // Validate the payload for the Nagad number
    if (!payload.mobile) {
      return res.status(400).json({
        message: "Bank card number is required!",
        status: false,
      });
    }

    // Find if the user already has a withdraw entry
    const [withdraw_found] = await connection.query(
      "SELECT * FROM user_withdraw WHERE phone = ? AND status = ?",
      [user[0].phone, 'active']
    );

    if (withdraw_found.length === 0) {
      // User withdraw entry not found, perform insert
      const query = `
        INSERT INTO user_withdraw (phone, nagad) 
        VALUES (?, ?)
      `;
      await connection.execute(query, [user[0].phone, payload.mobile]);
      console.log("New withdraw entry created.");
    } else {
      // User withdraw entry found, perform update
      const updateQuery = `
        UPDATE user_withdraw 
        SET nagad = ?
        WHERE phone = ? AND status = ?
      `;
      await connection.execute(updateQuery, [payload.mobile, user[0].phone, 'active']);
      console.log("Existing withdraw entry updated.");
    }

    return res.status(200).json({
      message: "User withdraw request created/updated successfully!",
      status: true,
    });

  } catch (error) {
    console.error("Error creating/updating user withdraw:", error);
    return res.status(500).json({
      message: "Something went wrong!",
      status: false,
    });
  }
}


/**
 * Function to create usdt for a user
 */
async function createUserUsdtWithdraw(req, res) {
  try {
    console.log("callll4444444444444444444444");
    const payload = req.body;
    console.log("payload---", payload);
    let auth = req.cookies.auth; // Taking the user ID from the token

    // Fetch the user from the database
    const [user] = await connection.query(
      "SELECT * FROM users WHERE token = ? AND veri = 1 LIMIT 1",
      [auth]
    );
    if (!user || user.length === 0) {
      return res.status(404).json({
        message: "User not found or not verified!",
        status: false,
      });
    }

    // Validate the payload 
    if (!payload.usdtAddress || !payload.addressAlias || !payload.mainNetwork ) {
      return res.status(400).json({
        message: "USDT address and USDT alias both are required",
        status: false,
      });
    }

    // Find if the user already has a withdraw entry
    const [withdraw_found] = await connection.query(
      "SELECT * FROM user_withdraw WHERE phone = ? AND status = ?",
      [user[0].phone, 'active']
    );

    if (withdraw_found.length === 0) {
      // User withdraw entry not found, perform insert
      const query = `
        INSERT INTO user_withdraw (phone, usdt_address , usdt_alias, usdt_network) 
        VALUES (?, ?, ?, ?)
      `;
      await connection.execute(query, [user[0].phone, payload.usdtAddress, payload.addressAlias, payload.mainNetwork ]);
      console.log("New withdraw entry created.");
    } else {
      // User withdraw entry found, perform update
      const updateQuery = `
        UPDATE user_withdraw 
        SET usdt_address = ? , usdt_alias = ?, usdt_network = ?
        WHERE phone = ? AND status = ?
      `;
      await connection.execute(updateQuery, [payload.usdtAddress, payload.addressAlias, payload.mainNetwork ,user[0].phone, 'active']);
      console.log("Existing withdraw entry updated.");
    }

    return res.status(200).json({
      message: "User withdraw request created/updated successfully!",
      status: true,
    });

  } catch (error) {
    console.error("Error creating/updating user withdraw:", error);
    return res.status(500).json({
      message: "Something went wrong!",
      status: false,
    });
  }
}




/**
 * Function to get user's bank card withdraw details
 */
async function getUserbankCardWithdraw(req, res) {
  try {
    let auth = req.cookies.auth; // Taking the user ID from the token

    // Fetch the user from the database
    const [user] = await connection.query(
      "SELECT * FROM users WHERE token = ? AND veri = 1 LIMIT 1",
      [auth]
    );

    // Check if the user is found and verified
    if (!user || user.length === 0) {
      return res.status(404).json({
        message: "User not found or not verified!",
        status: false,
      });
    }

    // Find if the user already has a withdraw entry with active status
    const [withdraw_found] = await connection.query(
      "SELECT * FROM user_withdraw WHERE phone = ? AND status = ?",
      [user[0].phone, "active"]
    );

    // Check if any withdraw entry is found
    if (withdraw_found.length === 0) {
      return res.status(404).json({
        message: "No active withdraw entry found!",
        status: false,
        data: null,
      });
    }

    // Return the found withdraw entry
    return res.status(200).json({
      message: "User bank card withdraw details fetched successfully!",
      status: true,
      data: withdraw_found[0],
    });

  } catch (error) {
    console.error("Error fetching user bank card withdraw:", error);
    return res.status(500).json({
      message: "Something went wrong!",
      status: false,
    });
  }
}


/**
 * Function to get user's bkash withdraw details
 */
async function getUserBkashWithdraw(req, res) {
  try {
    let auth = req.cookies.auth; // Taking the user ID from the token

    // Fetch the user from the database
    const [user] = await connection.query(
      "SELECT * FROM users WHERE token = ? AND veri = 1 LIMIT 1",
      [auth]
    );

    console.log("user", user)

    // Check if the user is found and verified
    if (!user || user.length === 0) {
      return res.status(404).json({
        message: "User not found or not verified!",
        status: false,
      });
    }

    // Find if the user already has a withdraw entry with active status
    const [withdraw_found] = await connection.query(
      "SELECT * FROM user_withdraw WHERE phone = ? AND status = ?",
      [user[0].phone, "active"]
    );

    // Check if any withdraw entry is found
    if (withdraw_found.length === 0) {
      return res.status(200).json({
        message: "Please add bkash mobile number",
        status: false,
        data: null,
      });
    }

    // Return the found withdraw entry
    return res.status(200).json({
      message: "User bkash withdraw details fetched successfully!",
      status: true,
      data: {
        withdraw : withdraw_found[0],
        isFound : withdraw_found[0]?.bkash ? true:false
      },
    });

  } catch (error) {
    console.error("Error fetching user bank card withdraw:", error);
    return res.status(500).json({
      message: "Something went wrong!",
      status: false,
    });
  }
}


/**
 * Function to get user's nagad withdraw details
 */
async function getUserNagadWithdraw(req, res) {
  try {
    let auth = req.cookies.auth; // Taking the user ID from the token

    // Fetch the user from the database
    const [user] = await connection.query(
      "SELECT * FROM users WHERE token = ? AND veri = 1 LIMIT 1",
      [auth]
    );

    // Check if the user is found and verified
    if (!user || user.length === 0) {
      return res.status(404).json({
        message: "User not found or not verified!",
        status: false,
      });
    }

    // Find if the user already has a withdraw entry with active status
    const [withdraw_found] = await connection.query(
      "SELECT * FROM user_withdraw WHERE phone = ? AND status = ?",
      [user[0].phone, "active"]
    );

    // Check if any withdraw entry is found
    if (withdraw_found.length === 0) {
      return res.status(404).json({
        message: "No active withdraw entry found!",
        status: false,
        data: null,
      });
    }

    // Return the found withdraw entry
    return res.status(200).json({
      message: "User nagad withdraw details fetched successfully!",
      status: true,
      data: {
        withdraw : withdraw_found[0],
        isFound : withdraw_found[0].nagad ? true:false
      },
    });

  } catch (error) {
    console.error("Error fetching user bank card withdraw:", error);
    return res.status(500).json({
      message: "Something went wrong!",
      status: false,
    });
  }
}

/**
 * Function to get user's upi withdraw details
 */
async function getUserUpiWithdraw(req, res) {
  try {
    let auth = req.cookies.auth; // Taking the user ID from the token

    // Fetch the user from the database
    const [user] = await connection.query(
      "SELECT * FROM users WHERE token = ? AND veri = 1 LIMIT 1",
      [auth]
    );

    // Check if the user is found and verified
    if (!user || user.length === 0) {
      return res.status(404).json({
        message: "User not found or not verified!",
        status: false,
      });
    }

    // Find if the user already has a withdraw entry with active status
    const [withdraw_found] = await connection.query(
      "SELECT * FROM user_withdraw WHERE phone = ? AND status = ?",
      [user[0].phone, "active"]
    );

    // Check if any withdraw entry is found
    if (withdraw_found.length === 0) {
      return res.status(400).json({
        message: "No active withdraw entry found!",
        status: false,
        data: null,
      });
    }

    // Return the found withdraw entry
    return res.status(200).json({
      message: "User UPI withdraw details fetched successfully!",
      status: true,
      data: {
        withdraw: withdraw_found[0],  // Provide a key for the value
        isFound : withdraw_found[0]?.upi ? true:false
      }
    });

  } catch (error) {
    console.error("Error fetching user bank card withdraw:", error);
    return res.status(500).json({
      message: "Something went wrong!",
      status: false,
    });
  }
}


/**
 * Function to get user's upi withdraw details
 */
async function getUserUsdtWithdraw(req, res) {
  try {
    let auth = req.cookies.auth; // Taking the user ID from the token

    // Fetch the user from the database
    const [user] = await connection.query(
      "SELECT * FROM users WHERE token = ? AND veri = 1 LIMIT 1",
      [auth]
    );

    // Check if the user is found and verified
    if (!user || user.length === 0) {
      return res.status(404).json({
        message: "User not found or not verified!",
        status: false,
      });
    }

    // Find if the user already has a withdraw entry with active status
    const [withdraw_found] = await connection.query(
      "SELECT * FROM user_withdraw WHERE phone = ? AND status = ?",
      [user[0].phone, "active"]
    );

    // Check if any withdraw entry is found
    if (withdraw_found.length === 0) {
      return res.status(400).json({
        message: "No active withdraw entry found!",
        status: false,
        data: null,
      });
    }

    // Return the found withdraw entry
    return res.status(200).json({
      message: "User USDT withdraw details fetched successfully!",
      status: true,
      data: {
        withdraw: withdraw_found[0],  // Provide a key for the value
        isFound : (withdraw_found[0]?.usdt_address && withdraw_found[0]?.usdt_alias && withdraw_found[0]?.usdt_network) ? true : false
      }
    });

  } catch (error) {
    console.error("Error fetching user usdt withdraw:", error);
    return res.status(500).json({
      message: "Something went wrong!",
      status: false,
    });
  }
}



const userWithdrawController = {
createUserUPIWithdraw,
createUserBkashWithdraw,
createUserbankCardWithdraw,
createUserNagadWithdraw,
getUserbankCardWithdraw,
getUserBkashWithdraw,
getUserNagadWithdraw,
getUserUpiWithdraw,
createUserUsdtWithdraw,
getUserUsdtWithdraw
};

export default userWithdrawController;