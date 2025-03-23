import connection from "../config/connectDB.js";

let timeNow = Date.now();

const CreateWingo = async (req, res) => {
  // Reset DataBase Wingo
  await connection.execute("DELETE FROM wingo");

  let arr = ["wingo10", "wingo5", "wingo3", "wingo"];

  for (let i = 0; i < arr.length; i++) {
    const sql =
      "INSERT INTO wingo SET period = ?, game = ?, amount = 6, status = 1, time = ?";
    await connection.execute(sql, ["2022070110000", arr[i], timeNow]);
    const sql_1 =
      "INSERT INTO wingo SET period = ?, game = ?, amount = 0, status = 0, time = ?";
    await connection.execute(sql_1, ["2022070110001", arr[i], timeNow]);
  }
  console.log("Create Success Database Wingo.");
};
const Create5D = async (req, res) => {
  // Reset DataBase 5D
  await connection.execute("DELETE FROM 5d");

  let arr = [10, 5, 3, 1];

  for (let i = 0; i < arr.length; i++) {
    const sql =
      "INSERT INTO 5d SET period = ?, result = ?, game = ?, status = 1, time = ?";
    await connection.execute(sql, ["2022070110000", "23521", arr[i], timeNow]);
    const sql_1 =
      "INSERT INTO 5d SET period = ?, result = ?, game = ?, status = 0, time = ?";
    await connection.execute(sql_1, ["2022070110001", "0", arr[i], timeNow]);
  }
  console.log("Create Success Database 5D.");
};

const CreateK3 = async (req, res) => {
  // Reset DataBase K3
  await connection.execute("DELETE FROM k3");

  let arr = [10, 5, 3, 1];

  for (let i = 0; i < arr.length; i++) {
    const sql =
      "INSERT INTO k3 SET period = ?, result = ?, game = ?, status = 1, time = ?";
    await connection.execute(sql, ["2022070110000", "235", arr[i], timeNow]);
    const sql_1 =
      "INSERT INTO k3 SET period = ?, result = ?, game = ?, status = 0, time = ?";
    await connection.execute(sql_1, ["2022070110001", "0", arr[i], timeNow]);
  }
  console.log("Create Success Database k3.");
  console.log("Please press ctrl + C and enter npm start to run the server.");
};

const Level = async (req, res) => {
  // Reset DataBase Level
  await connection.execute("DELETE FROM level");

  await connection.execute(
    "INSERT INTO level SET id = 7, level = 6, f1 = 1, f2 = 0.3, f3 = 0.09, f4 = 0.027",
  );
  await connection.execute(
    "INSERT INTO level SET id = 6, level = 5, f1 = 0.9, f2 = 0.27, f3 = 0.081, f4 = 0.0243",
  );
  await connection.execute(
    "INSERT INTO level SET id = 5, level = 4, f1 = 0.85, f2 = 0.255, f3 = 0.0765, f4 = 0.023",
  );
  await connection.execute(
    "INSERT INTO level SET id = 4, level = 3, f1 = 0.8, f2 = 0.24, f3 = 0.072, f4 = 0.0216",
  );
  await connection.execute(
    "INSERT INTO level SET id = 3, level = 2, f1 = 0.75, f2 = 0.225, f3 = 0.0675, f4 = 0.0203",
  );
  await connection.execute(
    "INSERT INTO level SET id = 2, level = 1, f1 = 0.7, f2 = 0.21, f3 = 0.063, f4 = 0.0189",
  );
  await connection.execute(
    "INSERT INTO level SET id = 1, level = 0, f1 = 0.6, f2 = 0.18, f3 = 0.054, f4 = 0.0162",
  );
};

const NapRut = async (req, res) => {
  // Reset DataBase Level
  await connection.execute("DELETE FROM bank_recharge");
  await connection.execute(
    "INSERT INTO `bank_recharge` (`id`, `name_bank`, `name_user`, `stk`, `type`, `time`) VALUES (NULL, 'MB BANK', 'NGUYEN NHAT LONG', '0800103725300', 'bank', '1655689155500')",
  );
  await connection.execute(
    "INSERT INTO `bank_recharge` (`id`, `name_bank`, `name_user`, `stk`, `type`, `time`) VALUES (NULL, 'MOMO', 'NGUYEN NHAT LONG', '387633464', 'momo', '1655689155500')",
  );
};

const Admin = async (req, res) => {
  // Reset DataBase Level
  await connection.execute("DELETE FROM admin_ac");
  await connection.execute(
    "INSERT INTO `admin_ac` (`id`, `wingo1`, `wingo3`, `wingo5`, `wingo10`, `k5d`, `k5d3`, `k5d5`, `k5d10`, `win_rate`, `telegram`, `cskh`, `app`) VALUES (NULL, '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '80', 'https://t.me/dreamsister', 'https://t.me/ChenQiaoYing', '#')",
  );
};

const userWithdraw = async (req, res) => {
  try {
    console.log("calllllllllllllllllllll")
    
   // Reset Help Table
    await connection.execute("DELETE FROM help_table");

    // Insert Sample Data
    await connection.execute(
      `INSERT INTO user_withdraw 
      (id,phone, nagad,upi,bkash,bankCard status , usdt_address , usdt_alias, usdt_network) 
      VALUES 
      (NULL,"8687687678","3453454535","35342663546","76723822342",""6767282199, "active", "73483264646","jsjdsd", "dgfdgf")`,
    );

    res.status(200).json({ message: "User Withdraw Table Reset and Sample Data Inserted" });
  } catch (error) {
    console.error("Error resetting User Withdraw Table:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const userNotification = async (req, res) => {
  try {
    console.log("calllllllllllllllllllll")
    
   // Reset Help Table
    await connection.execute("DELETE FROM help_table");

    // Insert Sample Data
    await connection.execute(
      `INSERT INTO user_withdraw 
      (id, phone, login_time, logout_time, date) 
      VALUES 
      (NULL,"8687687678","18:54:18","16:26:35","2024-06-01")`,
    );

    res.status(200).json({ message: "User notification table data Inserted" });
  } catch (error) {
    console.error("Error resetting User notification  Table:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

CreateWingo();
Create5D();
CreateK3();
userWithdraw();
userNotification();