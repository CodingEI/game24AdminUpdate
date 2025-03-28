import axios from "axios";
import crypto from "crypto";
import connection from "../config/connectDB.js";
import aesUtil from "../helpers/AESEncrypt.js";

const dc = process.env.JDB_DC;
const key = process.env.JDB_KEY;
const iv = process.env.JDB_IV;
const agentId = process.env.JDB_AGENT_ID;
const API_URL = process.env.JDB_API_URL;

const tagList = [
  {
    id: 1,
    name: "popular",
    displayName: "Popular",
  },
  {
    id: 2,
    name: "casino",
    displayName: "Casino",
  },
  {
    id: 3,
    name: "slots",
    displayName: "Slots",
  },
  {
    id: 4,
    name: "fishing",
    displayName: "Fishing",
  },
  {
    id: 5,
    name: "rummy",
    displayName: "Rummy",
  },
  {
    id: 6,
    name: "original",
    displayName: "Original",
  },
  {
    id: 7,
    name: "popular_quick",
    displayName: "Popular Quick",
  },
];

const gameCategoriesPage = (GameTagId) => async (req, res) => {
  try {
    const response = await axios({
      method: "GET",
      url: "https://webghost.api-jetx.online/api/neo_jdb/game_list",
    });

    const tagName = tagList.find((item) => item.id === GameTagId)?.name;
    const displayName = tagList.find(
      (item) => item.id === GameTagId,
    )?.displayName;

    const gameList = response?.data?.filter((item) =>
      item.tag.includes(tagName),
    );

    const currentPath = req._parsedOriginalUrl.pathname.split("/")[2];

    return res.render("jdb/index.ejs", {
      gameName: displayName,
      gameList: gameList.map((item) => ({
        g_type: item.g_type,
        m_type: item.m_type,
        name: item.name,
        image_src: item.image,
      })),
      headerDisplay:
        currentPath === "popular" || currentPath === "original" ? "hide" : "",
      tabAddressJili: currentPath,
      tabAddressJdb: currentPath,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong!",
    });
  }
};

const gameSlotsPage = (GameTagId) => async (req, res) => {
  try {
    const response = await axios({
      method: "GET",
      url: "https://webghost.api-jetx.online/api/neo_jdb/game_list",
    });

    const tagName = tagList.find((item) => item.id === GameTagId)?.name;
    // const displayName = tagList.find(item => item.id === GameTagId)?.displayName;

    const gameList = response?.data?.filter((item) =>
      item.tag.includes(tagName),
    );

    // const currentPath = req._parsedOriginalUrl.pathname.split("/")[2];

    return res.render("jdb/slots.ejs", {
      gameList: gameList.map((item) => ({
        g_type: item.g_type,
        m_type: item.m_type,
        name: item.name,
        image_src: item.image,
      })),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong!",
    });
  }
};

const gameQuickPopularList = async (req, res) => {
  try {
    const response = await axios({
      method: "GET",
      url: "https://webghost.api-jetx.online/api/neo_jdb/game_list",
    });

    const tagName = tagList.find((item) => item.id === 7)?.name;

    const gameList = response?.data?.filter((item) =>
      item.tag.includes(tagName),
    );

    return res.status(200).send({
      gameList: gameList.map((item) => ({
        g_type: item.g_type,
        m_type: item.m_type,
        name: item.name,
        image_src: item.image,
      })),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong!",
    });
  }
};


//Helper function to encrypt data
const encryptData = (data, key, iv) => {
    const cipher = crypto.createCipheriv('aes-128-cbc', Buffer.from(key), Buffer.from(iv));
    let encrypted = cipher.update(data, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

const generateGameLink = async (req, res) => {
  try {
    const token = req.cookies.auth; // Check if token exists
    if (!token) {
      return res.status(401).json({
        message: "Login is required to access this API",
        isAuthorized: false,
      });
    }

    const gType = req.query.g_type;
    const mType = req.query.m_type;

    // Check if gType and mType are provided
    if (!gType || !mType) {
      return res.status(400).json({
        message: "gType and mType are required!",
        isAuthorized: true,
      });
    }

    // Query the database for the user
    const [rows] = await connection.execute(
      "SELECT token, status, phone FROM users WHERE token = ? AND veri = 1",
      [token]
    );

    // Check if user exists
    if (rows.length === 0) {
      return res.status(401).json({
        message: "Invalid token or user not verified",
        isAuthorized: false,
      });
    }

    const mobile = rows[0].phone; // Get the user's phone number

    // Call external API to get the game link
    const response = await axios.post("http://webghost.api-jetx.online/postjdb", {
      Mobile: mobile,
      gType: gType,
      mType: mType,
      ReferrerUrl: process.env.JDB_GAME_BASE_URL,
    });

    if (!response.data.generatedUrl) {
      return res.status(500).json({
        message: "Failed to generate game link",
        isAuthorized: true,
      });
    }

    console.log("Generated URL:", response.data.generatedUrl);

    // Redirect to the generated URL
    return res.redirect(response.data.generatedUrl);

  } catch (error) {
    console.error("Error generating game link:", error);
    return res.status(500).json({
      message: "An error occurred while generating the game link",
      error: error.message,
    });
  }
};


const mainFunction = async (req, res) => {
  try {
    const x = req.body.x;

    if (!x) {
      return res.status(400).json({
        status: "9999",
        err_text: "x is required for jdb!",
      });
    }

    const response = aesUtil.AesDecrypt(x, key, iv);
    const data = JSON.parse(response);

    const user = await getUserDataByAuthPhoneNumber(data?.uid);

    console.log(data);

    switch (data?.action) {
      case 6:
        return getBalance({ data, user, res });
      case 8:
        return betNSettle({ data, user, res });
      case 4:
        return cancelBetNSettle({ data, user, res });
      case 9:
        return bet({ data, user, res });
      case 10:
        return settle({ data, user, res });
      case 11:
        return cancelBet({ data, user, res });
      case 12:
        return activityReward({ data, user, res });
      case 13:
        return withdraw({ data, user, res });
      case 14:
        return deposit({ data, user, res });
      case 15:
        return cancelWithdraw({ data, user, res });
      case 16:
        return freeSpinReward({ data, user, res });
      default:
        return res.status(200).json({
          status: "9999",
          err_text: "Invalid action!",
        });
    }
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      status: "9999",
      err_text: "Something went wrong! Internal server error!",
    });
  }
};

const getBalance = async ({ data, user, res }) => {
  return res.status(200).json({
    status: "0000",
    balance: user.money,
    err_text: "",
  });
};

const betNSettle = async ({ data, user, res }) => {
  const gType = data.gType;
  const bet = Number(data.bet);
  const win = Number(data.win);
  const denom = data.denom;

  const userMoney = Number(user.money);

  let passBet = null;

  if ([0, 7, 9, 12].includes(parseInt(gType))) {
    passBet = userMoney >= bet;
  } else {
    passBet = false;
  }

  if (passBet) {
    const finalAmount = Number(userMoney + bet + win).toFixed(2);
    await connection.query(
      "UPDATE users SET money = ?, total_money = ? WHERE `phone` = ?",
      [finalAmount, finalAmount, user.phone],
    );

    return res.status(200).json({
      status: "0000",
      balance: finalAmount,
      err_text: "",
    });
  } else {
    return res.status(200).json({
      status: "6006",
      balance: userMoney,
      err_text: "Insufficient balance!",
    });
  }
};

const cancelBetNSettle = async ({ data, user, res }) => {
  return res.status(200).json({
    status: "0000",
    balance: user.money,
    err_text: "",
  });
};

const bet = async ({ data, user, res }) => {
  const amount = Number(data.amount);
  const userMoney = Number(user.money);

  if (userMoney >= amount) {
    const finalAmount = Number(userMoney - amount).toFixed(2);
    await connection.query(
      "UPDATE users SET money = money - ?, total_money =  total_money - ? WHERE `phone` = ?",
      [amount, amount, user.phone],
    );

    const cUser = await getUserDataByAuthPhoneNumber(user.phone);

    return res.status(200).json({
      status: "0000",
      balance: cUser.money,
      err_text: "",
    });
  } else {
    return res.status(200).json({
      status: "6006",
      balance: userMoney,
      err_text: "Insufficient balance!",
    });
  }
};

const settle = async ({ data, user, res }) => {
  const amount = Number(data.amount);
  const userMoney = Number(user.money);

  const finalAmount = Number(userMoney + amount).toFixed(2);
  await connection.query(
    "UPDATE users SET money = money + ?, total_money = total_money + ? WHERE `phone` = ?",
    [amount, amount, user.phone],
  );

  return res.status(200).json({
    status: "0000",
    balance: finalAmount,
    err_text: "",
  });
};

const cancelBet = async ({ data, user, res }) => {
  const amount = Number(data.amount);
  const userMoney = Number(user.money);

  const finalAmount = Number(userMoney + amount).toFixed(2);
  await connection.query(
    "UPDATE users SET money = money + ?, total_money = total_money + ? WHERE `phone` = ?",
    [amount, amount, user.phone],
  );

  return res.status(200).json({
    status: "0000",
    balance: finalAmount,
    err_text: "",
  });
};

const activityReward = async ({ data, user, res }) => {
  // TODO: database to insert notification for user
  const amount = Number(data.amount);
  const userMoney = Number(user.money);

  const finalAmount = Number(userMoney + amount).toFixed(2);

  await connection.query(
    "UPDATE users SET money = money + ?, total_money = total_money + ? WHERE `phone` = ?",
    [amount, amount, user.phone],
  );

  return res.status(200).json({
    status: "0000",
    balance: finalAmount,
    err_text: "",
  });
};

const withdraw = async ({ data, user, res }) => {
  const amount = Number(data.amount);
  const userMoney = Number(user.money);

  if (userMoney >= amount) {
    const finalAmount = Number(userMoney - amount).toFixed(2);
    await connection.query(
      "UPDATE users SET money = ?, total_money = ? WHERE `phone` = ?",
      [finalAmount, finalAmount, user.phone],
    );

    return res.status(200).json({
      status: "0000",
      err_text: "",
    });
  } else {
    return res.status(200).json({
      status: "6006",
      err_text: "Insufficient balance!",
    });
  }
};

const deposit = async ({ data, user, res }) => {
  const amount = Number(data.amount);
  const userMoney = Number(user.money);

  const finalAmount = Number(userMoney + amount).toFixed(2);
  await connection.query(
    "UPDATE users SET money = ?, total_money = ? WHERE `phone` = ?",
    [finalAmount, finalAmount, user.phone],
  );

  return res.status(200).json({
    status: "0000",
    balance: finalAmount,
    err_text: "",
  });
};

const cancelWithdraw = async ({ data, user, res }) => {
  const amount = Number(data.amount);
  const userMoney = Number(user.money);

  const finalAmount = Number(userMoney + amount).toFixed(2);
  await connection.query(
    "UPDATE users SET money = ?, total_money = ? WHERE `phone` = ?",
    [finalAmount, finalAmount, user.phone],
  );

  return res.status(200).json({
    status: "0000",
    balance: finalAmount,
    err_text: "",
  });
};

const freeSpinReward = async ({ data, user, res }) => {
  const amount = Number(data.amount);
  const userMoney = Number(user.money);

  const finalAmount = Number(userMoney + amount).toFixed(2);
  await connection.query(
    "UPDATE users SET money = ?, total_money = ? WHERE `phone` = ?",
    [finalAmount, finalAmount, user.phone],
  );

  return res.status(200).json({
    status: "0000",
    balance: finalAmount,
    err_text: "",
  });
};

const jdbController = {
  generateGameLink,
  mainFunction,
  gameCategoriesPage,
  gameQuickPopularList,
  gameSlotsPage,
};

const getUserDataByAuthPhoneNumber = async (phoneNumber) => {
  let [users] = await connection.query(
    "SELECT `phone`, `money`, `name_user` FROM users WHERE `phone` = ? ",
    [phoneNumber],
  );
  const user = users?.[0];

  if (user === undefined || user === null) {
    throw Error("Unable to get user data!");
  }

  return {
    phone: user.phone,
    money: Number(user.money),
    username: user.name_user,
  };
};

export default jdbController;
