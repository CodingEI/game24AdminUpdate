import connection from "../config/connectDB.js";

const homePage = async (req, res) => {
  const [settings] = await connection.query("SELECT `app` FROM admin_ac");
  let app = settings[0].app;
  return res.render("home/index.ejs", { app });
};

const activityPage = async (req, res) => {
  return res.render("checkIn/activity.ejs");
};

const supportPage = async (req, res) => {
  let auth = req.cookies.auth;

  const [users] = await connection.query(
    "SELECT `level`, `ctv` FROM users WHERE token = ?",
    [auth],
  );

  let telegram = "";
  if (users.length == 0) {
    let [settings] = await connection.query(
      "SELECT `telegram`, `cskh` FROM admin_ac",
    );
    telegram = settings[0].telegram;
  } else {
    if (users[0].level != 0) {
      var [settings] = await connection.query("SELECT * FROM admin_ac");
    } else {
      var [check] = await connection.query(
        "SELECT `telegram` FROM point_list WHERE phone = ?",
        [users[0].ctv],
      );
      if (check.length == 0) {
        var [settings] = await connection.query("SELECT * FROM admin_ac");
      } else {
        var [settings] = await connection.query(
          "SELECT `telegram` FROM point_list WHERE phone = ?",
          [users[0].ctv],
        );
      }
    }
    telegram = settings[0].telegram;
  }

  return res.render("member/support.ejs", { telegram });
};

const attendancePage = async (req, res) => {
  return res.render("checkIn/attendance.ejs");
};
const firstDepositBonusPage = async (req, res) => {
  return res.render("checkIn/firstDepositBonus.ejs");
};
const promotionRebateRatioPage = async (req, res) => {
  return res.render("promotion/rebateRadio.ejs");
};

const rebatePage = async (req, res) => {
  return res.render("checkIn/rebate.ejs");
};

const vipPage = async (req, res) => {
  return res.render("checkIn/vip.ejs");
};

const jackpotPage = async (req, res) => {
  return res.render("checkIn/jackpot.ejs");
};

const dailytaskPage = async (req, res) => {
  return res.render("checkIn/dailytask.ejs");
};

const invibonusPage = async (req, res) => {
  return res.render("checkIn/invibonus.ejs");
};
const invitationRulesPage = async (req, res) => {
  return res.render("checkIn/invitationRules.ejs");
};

const jackpotRulesPage = async (req, res) => {
  return res.render("checkIn/rules.ejs");
};

const aviatorBettingRewardPage = async (req, res) => {
  return res.render("checkIn/aviator_betting_reward.ejs");
};
const socialVideoAwardPagePage = async (req, res) => {
  return res.render("checkIn/social_video_award.ejs");
};

const jackpotWiningStarPage = async (req, res) => {
  return res.render("checkIn/wining_star.ejs");
};

const checkInPage = async (req, res) => {
  return res.render("checkIn/checkIn.ejs");
};

const checkDes = async (req, res) => {
  return res.render("checkIn/checkDes.ejs");
};

const checkRecord = async (req, res) => {
  return res.render("checkIn/checkRecord.ejs");
};

const createTicketPage = async (req, res) => {
  return res.render("member/createTicket.ejs");
};
const viewTicketPage = async (req, res) => {
  const [[ticket]] = await connection.execute(
    "SELECT * FROM tickets WHERE id = ?",
    [req.params.id],
  );
  return res.render("member/viewTicket.ejs", {
    ticket,
  });
};
const userTicketListPage = async (req, res) => {
  return res.render("member/tickets.ejs");
};
const addBank = async (req, res) => {
  return res.render("wallet/addbank.ejs");
};

const selectBank = async (req, res) => {
  return res.render("wallet/selectBank.ejs");
};
const invitationRecord = async (req, res) => {
  return res.render("checkIn/invitationRecord.ejs");
};
const rechargeAwardCollectionRecord = async (req, res) => {
  return res.render("checkIn/rechargeAwardCollectionRecord.ejs");
};
const attendanceRecordPage = async (req, res) => {
  return res.render("checkIn/attendanceRecord.ejs");
};
const attendanceRulesPage = async (req, res) => {
  return res.render("checkIn/attendanceRules.ejs");
};

const changeAvatarPage = async (req, res) => {
  return res.render("member/change_avatar.ejs");
};

// promotion
const promotionPage = async (req, res) => {
  return res.render("promotion/promotion.ejs");
};

const subordinatesPage = async (req, res) => {
  return res.render("promotion/subordinates.ejs");
};

const promotion1Page = async (req, res) => {
  return res.render("promotion/promotion1.ejs");
};

const promotionmyTeamPage = async (req, res) => {
  return res.render("promotion/myTeam.ejs");
};

const promotionDesPage = async (req, res) => {
  return res.render("promotion/promotionDes.ejs");
};

const comhistoryPage = async (req, res) => {
  return res.render("promotion/comhistory.ejs");
};

const tutorialPage = async (req, res) => {
  return res.render("promotion/tutorial.ejs");
};

const bonusRecordPage = async (req, res) => {
  return res.render("promotion/bonusrecord.ejs");
};

// wallet

const transactionhistoryPage = async (req, res) => {
  return res.render("wallet/transactionhistory.ejs");
};
const gameHistoryPage = async (req, res) => {
  return res.render("member/game_history.ejs");
};

const walletPage = async (req, res) => {
  return res.render("wallet/index.ejs");
};

const rechargePage = async (req, res) => {
  const [[user]] = await connection.execute(
    "SELECT currency FROM users WHERE token = ?",
    [req.cookies.auth],
  );

  return res.render("wallet/recharge.ejs", {
    MINIMUM_MONEY_USDT: process.env.MINIMUM_MONEY_USDT,
    MINIMUM_MONEY_INR: process.env.MINIMUM_MONEY_INR,
    MINIMUM_MONEY_BDT: process.env.MINIMUM_MONEY_BDT,
    USDT_INR_EXCHANGE_RATE: process.env.USDT_INR_EXCHANGE_RATE_FOR_DEPOSIT,
    BDT_INR_EXCHANGE_RATE: process.env.BDT_INR_EXCHANGE_RATE_FOR_DEPOSIT,
    currency: user.currency,
  });
};

const rechargerecordPage = async (req, res) => {
  return res.render("wallet/rechargerecord.ejs");
};

const withdrawalPage = async (req, res) => {
  let auth = req.cookies.auth;
  const [[user]] = await connection.query(
    "SELECT * FROM users WHERE `token` = ? ",
    [auth],
  );

  return res.render("wallet/withdrawal.ejs", {
    currency: user.currency,
    MINIMUM_MONEY_USDT: process.env.MINIMUM_WITHDRAWAL_MONEY_USDT,
    MINIMUM_MONEY_INR: process.env.MINIMUM_WITHDRAWAL_MONEY_INR,
    USDT_INR_EXCHANGE_RATE: process.env.USDT_INR_EXCHANGE_RATE_FOR_WITHDRAWAL,
  });
};

const withdrawalrecordPage = async (req, res) => {
  let auth = req.cookies.auth;
  const [[user]] = await connection.query(
    "SELECT * FROM users WHERE `token` = ? ",
    [auth],
  );

  return res.render("wallet/withdrawalrecord.ejs", {
    currency: user.currency,
  });
};
const transfer = async (req, res) => {
  return res.render("wallet/transfer.ejs");
};

// member page
const mianPage = async (req, res) => {
  let auth = req.cookies.auth;
  const [user] = await connection.query(
    "SELECT `level` FROM users WHERE `token` = ? ",
    [auth],
  );
  const [settings] = await connection.query("SELECT `cskh` FROM admin_ac");
  let cskh = settings[0].cskh;
  let level = user[0].level;
  return res.render("member/index.ejs", { level, cskh });
};

const settingsPage = async (req, res) => {
  let auth = req.cookies.auth;
  const [user] = await connection.query(
    "SELECT * FROM users WHERE `token` = ? ",
    [auth],
  );

  return res.render("member/settings.ejs", {
    NICKNAME: user[0].name_user,
    USER_ID: user[0].id_user,
  });
};

const aboutPage = async (req, res) => {
  return res.render("member/about/index.ejs");
};

const guidePage = async (req, res) => {
  return res.render("member/guide.ejs");
};

const feedbackPage = async (req, res) => {
  return res.render("member/feedback.ejs");
};

const notificationPage = async (req, res) => {
  return res.render("member/notification.ejs");
};

const loginNotificationPage = async (req, res) => {
  return res.render("member/login_notification.ejs");
};

const recordsalary = async (req, res) => {
  return res.render("member/about/recordsalary.ejs");
};

const privacyPolicy = async (req, res) => {
  return res.render("member/about/privacyPolicy.ejs");
};

const newtutorial = async (req, res) => {
  return res.render("member/newtutorial.ejs");
};

const forgot = async (req, res) => {
  let auth = req.cookies.auth;
  const [user] = await connection.query(
    "SELECT `time_otp` FROM users WHERE token = ? ",
    [auth],
  );
  let time = user[0].time_otp;
  return res.render("member/forgot.ejs", { time });
};

const redenvelopes = async (req, res) => {
  return res.render("member/redenvelopes.ejs");
};

const riskAgreement = async (req, res) => {
  return res.render("member/about/riskAgreement.ejs");
};

const myProfilePage = async (req, res) => {
  return res.render("member/myProfile.ejs");
};

const getSalaryRecord = async (req, res) => {
  const auth = req.cookies.auth;

  const [rows] = await connection.query(`SELECT * FROM users WHERE token = ?`, [
    auth,
  ]);
  let rowstr = rows[0];
  if (!rows) {
    return res.status(200).json({
      message: "Failed",
      status: false,
    });
  }
  const [getPhone] = await connection.query(
    `SELECT * FROM salary WHERE phone = ? ORDER BY time DESC`,
    [rowstr.phone],
  );

  console.log("asdasdasd : " + [rows.phone]);
  return res.status(200).json({
    message: "Success",
    status: true,
    data: {},
    rows: getPhone,
  });
};




/***
 * Function too fetch all the user login time
 */
async function getUserNotificationDetails(req,res){
  try {
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
      const user_phone = user[0].phone; // Extract the phone number

      // Fetch user notifications
      const [notifications] = await connection.query(
        "SELECT * FROM user_notification WHERE phone = ?",
        [user_phone]
      );
  
      return res.status(200).json({
        message: "User notifications fetched successfully!",
        status: true,
        data: notifications,
      });

  }catch(error) {
    console.error("Error fetching user notifications:", error);
    return res.status(500).json({
      message: "Internal server error!",
      status: false,
      error: error.message,
    });
  }

}





const fishing = async (req, res) => {
  return res.render("api/fishing.ejs");
};

const jslots = async (req, res) => {
  return res.render("api/jslots.ejs");
};
const poker = async (req, res) => {
  return res.render("api/poker.ejs");
};
const slots = async (req, res) => {
  return res.render("api/slots.ejs");
};
const spribe = async (req, res) => {
  return res.render("api/spribe.ejs");
};
const table = async (req, res) => {
  return res.render("api/table.ejs");
};
const rummy = async (req, res) => {
  return res.render("api/rummy.ejs");
};
const sports = async (req, res) => {
  return res.render("api/sports.ejs");
};
const casino = async (req, res) => {
  return res.render("api/casino.ejs");
};

const homeController = {
  gameHistoryPage,
  homePage,
  checkInPage,
  invibonusPage,
  rebatePage,
  jackpotPage,
  vipPage,
  activityPage,
  dailytaskPage,
  promotionPage,
  subordinatesPage,
  promotion1Page,
  walletPage,
  mianPage,
  myProfilePage,
  promotionmyTeamPage,
  promotionDesPage,
  comhistoryPage,
  tutorialPage,
  bonusRecordPage,
  rechargePage,
  rechargerecordPage,
  withdrawalPage,
  withdrawalrecordPage,
  aboutPage,
  privacyPolicy,
  riskAgreement,
  newtutorial,
  redenvelopes,
  forgot,
  checkDes,
  checkRecord,
  createTicketPage,
  viewTicketPage,
  userTicketListPage,
  addBank,
  transfer,
  recordsalary,
  getSalaryRecord,
  transactionhistoryPage,
  jackpotRulesPage,
  jackpotWiningStarPage,
  attendancePage,
  firstDepositBonusPage,
  aviatorBettingRewardPage,
  socialVideoAwardPagePage,
  promotionRebateRatioPage,
  settingsPage,
  guidePage,
  feedbackPage,
  notificationPage,
  loginNotificationPage,
  selectBank,
  invitationRecord,
  rechargeAwardCollectionRecord,
  attendanceRecordPage,
  attendanceRulesPage,
  changeAvatarPage,
  invitationRulesPage,
  supportPage,
  fishing,
  jslots,
  poker,
  slots,
  spribe,
  table,
  rummy,
  sports,
  casino,
  getUserNotificationDetails
};


export default homeController;
