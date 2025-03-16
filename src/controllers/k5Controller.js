import connection from "../config/connectDB.js";
import GameRepresentationIds from "../constants/game_representation_id.js";
import { generatePeriod } from "../helpers/games.js";

const K5DPage = async (req, res) => {
  return res.render("bet/5d/5d.ejs");
};

const K5DPage3 = async (req, res) => {
  return res.render("bet/wingo/win3.ejs");
};

const K5DPage5 = async (req, res) => {
  return res.render("bet/wingo/win5.ejs");
};

const K5DPage10 = async (req, res) => {
  return res.render("bet/wingo/win10.ejs");
};

const isNumber = (params) => {
  let pattern = /^[0-9]*\d$/;
  return pattern.test(params);
};

function formateT(params) {
  let result = params < 10 ? "0" + params : params;
  return result;
}

function timerJoin(params = "", addHours = 0) {
  let date = "";
  if (params) {
    date = new Date(Number(params));
  } else {
    date = new Date();
  }

  date.setHours(date.getHours() + addHours);

  let years = formateT(date.getFullYear());
  let months = formateT(date.getMonth() + 1);
  let days = formateT(date.getDate());

  let hours = date.getHours() % 12;
  hours = hours === 0 ? 12 : hours;
  let ampm = date.getHours() < 12 ? "AM" : "PM";

  let minutes = formateT(date.getMinutes());
  let seconds = formateT(date.getSeconds());

  return (
    years +
    "-" +
    months +
    "-" +
    days +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds +
    " " +
    ampm
  );
}

const rosesPlus = async (auth, money) => {
  const [level] = await connection.query("SELECT * FROM level ");
  let level0 = level[0];

  const [user] = await connection.query(
    "SELECT `phone`, `code`, `invite` FROM users WHERE token = ? AND veri = 1  LIMIT 1 ",
    [auth],
  );
  let userInfo = user[0];
  const [f1] = await connection.query(
    "SELECT `phone`, `code`, `invite`, `rank` FROM users WHERE code = ? AND veri = 1  LIMIT 1 ",
    [userInfo.invite],
  );
  if (money >= 10000) {
    if (f1.length > 0) {
      let infoF1 = f1[0];
      let rosesF1 = (money / 100) * level0.f1;
      await connection.query(
        "UPDATE users SET money = money + ?, roses_f1 = roses_f1 + ?, roses_f = roses_f + ?, roses_today = roses_today + ? WHERE phone = ? ",
        [rosesF1, rosesF1, rosesF1, rosesF1, infoF1.phone],
      );
      const [f2] = await connection.query(
        "SELECT `phone`, `code`, `invite`, `rank` FROM users WHERE code = ? AND veri = 1  LIMIT 1 ",
        [infoF1.invite],
      );
      if (f2.length > 0) {
        let infoF2 = f2[0];
        let rosesF2 = (money / 100) * level0.f2;
        await connection.query(
          "UPDATE users SET money = money + ?, roses_f = roses_f + ?, roses_today = roses_today + ? WHERE phone = ? ",
          [rosesF2, rosesF2, rosesF2, infoF2.phone],
        );
        const [f3] = await connection.query(
          "SELECT `phone`, `code`, `invite`, `rank` FROM users WHERE code = ? AND veri = 1  LIMIT 1 ",
          [infoF2.invite],
        );
        if (f3.length > 0) {
          let infoF3 = f3[0];
          let rosesF3 = (money / 100) * level0.f3;
          await connection.query(
            "UPDATE users SET money = money + ?, roses_f = roses_f + ?, roses_today = roses_today + ? WHERE phone = ? ",
            [rosesF3, rosesF3, rosesF3, infoF3.phone],
          );
          const [f4] = await connection.query(
            "SELECT `phone`, `code`, `invite`, `rank` FROM users WHERE code = ? AND veri = 1  LIMIT 1 ",
            [infoF3.invite],
          );
          if (f4.length > 0) {
            let infoF4 = f4[0];
            let rosesF4 = (money / 100) * level0.f4;
            await connection.query(
              "UPDATE users SET money = money + ?, roses_f = roses_f + ?, roses_today = roses_today + ? WHERE phone = ? ",
              [rosesF4, rosesF4, rosesF4, infoF4.phone],
            );
          }
        }
      }
    }
  }
};

const validateBet = async (join, list_join, x, money, game) => {
  let checkJoin = isNumber(list_join);
  let checkX = isNumber(x);
  const checks = ["a", "b", "c", "d", "e", "total"].includes(join);
  const checkGame = ["1", "3", "5", "10"].includes(String(game));
  const checkMoney = ["1", "10", "100", "1000"].includes(money);

  if (
    !checks ||
    list_join.length > 10 ||
    !checkX ||
    !checkMoney ||
    !checkGame
  ) {
    return false;
  }

  if (checkJoin) {
    let arr = list_join.split("");
    let length = arr.length;
    for (let i = 0; i < length; i++) {
      const joinNum = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
      ].includes(arr[i]);
      if (!joinNum) {
        return false;
      }
    }
  } else {
    let arr = list_join.split("");
    let length = arr.length;
    for (let i = 0; i < length; i++) {
      const joinStr = ["c", "l", "b", "s"].includes(arr[i]);
      if (!joinStr) {
        return false;
      }
    }
  }

  return true;
};
// to create bet this function is used.   http://localhost:3000/api/webapi/action/5d/join
const betK5D = async (req, res) => {
  try {
    let { join, list_join, x, money, game } = req.body;
    let auth = req.cookies.auth;

    let validate = await validateBet(join, list_join, x, money, game);

    if (!validate) {
      return res.status(200).json({
        message: "Invalid bet",
        status: false,
      });
    }

    const [k5DNow] = await connection.query(
      `SELECT period FROM 5d WHERE status = 0 AND game = ${game} ORDER BY id DESC LIMIT 1 `,
    );
    const [user] = await connection.query(
      "SELECT `phone`, `code`, `invite`, `level`, `money` FROM users WHERE token = ? AND veri = 1  LIMIT 1 ",
      [auth],
    );
    if (k5DNow.length < 1 || user.length < 1) {
      return res.status(200).json({
        message: "Error!",
        status: false,
      });
    }
    let userInfo = user[0];
    let period = k5DNow[0];

    // validate if user already have bet or big or small and betting again
    // const [makeBets] = await connection.query(
    //   `SELECT bet FROM result_5d WHERE status = 0 AND phone = '${userInfo.phone}'`,
    // );
    // const betTypeList = makeBets.map((it) => it.bet);
    // if (betTypeList.length > 0 && !betTypeList.includes(list_join)) {
    //   return res.status(200).json({
    //     message: `Error! You are not allowed to make different bet.`,
    //     status: false,
    //   });
    // }
    //our code start form here
    const big_small_array = ["b", "s"];
    const odd_even_array = ["l", "c"];
    const number_array = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];


    let date = new Date();
    let years = formateT(date.getFullYear());
    let months = formateT(date.getMonth() + 1);
    let days = formateT(date.getDate());
    let id_product =
      years + months + days + Math.floor(Math.random() * 1000000000000000);

    let total = money * x * String(list_join).split("").length;
    let fee = total * 0.02;
    let price = total - fee;

    let check = userInfo.money - total;


    if (check >= 0) {
      let timeNow = Date.now();

      const sql = `INSERT INTO result_5d SET id_product = ?,phone = ?,code = ?,invite = ?,stage = ?,level = ?,money = ?,price = ?,amount = ?,fee = ?,game = ?,join_bet = ?,bet = ?,status = ?,time = ?`;
      await connection.execute(sql, [
        id_product,
        userInfo.phone,
        userInfo.code,
        userInfo.invite,
        period.period,
        userInfo.level,
        total,
        price,
        x,
        fee,
        game,
        join,
        list_join,
        0,
        timeNow,
      ]);
      await connection.execute(
        "UPDATE `users` SET `money` = `money` - ? WHERE `token` = ? ",
        [total, auth],
      );
      const [users] = await connection.query(
        "SELECT `money`, `level` FROM users WHERE token = ? AND veri = 1  LIMIT 1 ",
        [auth],
      );
      await rosesPlus(auth, money * x);
      const [level] = await connection.query("SELECT * FROM level ");
      let level0 = level[0];
      const sql2 = `INSERT INTO roses SET phone = ?,code = ?,invite = ?,f1 = ?,f2 = ?,f3 = ?,f4 = ?,time = ?`;
      let total_m = total;
      let f1 = (total_m / 100) * level0.f1;
      let f2 = (total_m / 100) * level0.f2;
      let f3 = (total_m / 100) * level0.f3;
      let f4 = (total_m / 100) * level0.f4;
      await connection.execute(sql2, [
        userInfo.phone,
        userInfo.code,
        userInfo.invite,
        f1,
        f2,
        f3,
        f4,
        timeNow,
      ]);
      return res.status(200).json({
        message: "Successful bet",
        status: true,
        // data: result,
        change: users[0].level,
        money: users[0].money,
      });
    } else {
      return res.status(200).json({
        message: "The amount is not enough",
        status: false,
      });
    }
  } catch (error) {
    if (error) console.log(error);
  }
};

const listOrderOld = async (req, res) => {
  let { gameJoin, pageno, pageto } = req.body;
  let auth = req.cookies.auth;

  let checkGame = ["1", "3", "5", "10"].includes(String(gameJoin));
  if (!checkGame || pageno < 0 || pageto < 0) {
    return res.status(200).json({
      code: 0,
      msg: "No more data",
      data: {
        gameslist: [],
      },
      status: false,
    });
  }
  const [user] = await connection.query(
    "SELECT `phone`, `code`, `invite`, `level`, `money` FROM users WHERE token = ? AND veri = 1  LIMIT 1 ",
    [auth],
  );

  let game = Number(gameJoin);

  const [k5d] = await connection.query(
    `SELECT * FROM 5d WHERE status != 0 AND game = '${game}' ORDER BY id DESC LIMIT ${pageno}, ${pageto} `,
  );
  const [k5dAll] = await connection.query(
    `SELECT * FROM 5d WHERE status != 0 AND game = '${game}' `,
  );
  const [period] = await connection.query(
    `SELECT period FROM 5d WHERE status = 0 AND game = '${game}' ORDER BY id DESC LIMIT 1 `,
  );

  /**
   *  need to find the all records from the result_5d table with respect to game and status = 1 des limit 1
   */
  const [records] = await connection.query(
    `SELECT * FROM result_5d WHERE status = 1 AND game = '${game}' ORDER BY id DESC LIMIT 1`
  );

   // Ensure we have at least one record before accessing records[0].stage
   let record;
  if (records.length > 0) {
    const stage = records[0].stage; // Extracting stage from the first record
    // Find the data from the 5D table with the condition status != 0, game, and period = stage
     [record] = await connection.query(
      `SELECT * FROM 5d WHERE status != ? AND game = ? AND period = ?`,
      [0, game, stage]
    );
  }

  if (k5d.length == 0) {
    return res.status(200).json({
      code: 0,
      msg: "No more data",
      data: {
        gameslist: [],
      },
      page: 1,
      status: false,
    });
  }
  if (!pageno || !pageto || !user[0] || !k5d[0] || !period[0]) {
    return res.status(200).json({
      message: "Error!",
      status: false,
    });
  }
  let page = Math.ceil(k5dAll.length / 10);
  return res.status(200).json({
    code: 0,
    msg: "Get success",
    data: {
      gameslist: k5d,
    },
    period: period[0].period,
    page: page,
    status: true,
  });
};

const GetMyEmerdList = async (req, res) => {
  let { gameJoin, pageno, pageto } = req.body;
  let auth = req.cookies.auth;

  let checkGame = ["1", "3", "5", "10"].includes(String(gameJoin));
  if (!checkGame || pageno < 0 || pageto < 0) {
    return res.status(200).json({
      code: 0,
      msg: "No more data",
      data: {
        gameslist: [],
      },
      status: false,
    });
  }

  let game = Number(gameJoin);
// get the period for one instance of the game
const [k5DNow] = await connection.query(
  "SELECT `period`, `result` FROM `5d` WHERE `status` = ? AND `game` = ? ORDER BY `id` DESC LIMIT 1",
  [0, game] 
);

 

  const [user] = await connection.query(
    "SELECT `phone`, `code`, `invite`, `level`, `money` FROM users WHERE token = ? AND veri = 1 LIMIT 1 ",
    [auth],
  );
  const [result_5d] = await connection.query(
    `SELECT * FROM result_5d WHERE phone = ? AND game = '${game}' ORDER BY id DESC LIMIT ${Number(pageno) + "," + Number(pageto)}`,
    [user[0].phone],
  );

 
  const [result_5dAll] = await connection.query(
    `SELECT * FROM result_5d WHERE phone = ? AND game = '${game}' ORDER BY id DESC `,
    [user[0].phone],
  );

  if (!result_5d[0]) {
    return res.status(200).json({
      code: 0,
      msg: "No more data",
      data: {
        gameslist: [],
      },
      page: 1,
      status: false,
    });
  }
  if (!pageno || !pageto || !user[0] || !result_5d[0]) {
    return res.status(200).json({
      message: "Error!",
      status: true,
    });
  }
  let page = Math.ceil(result_5dAll.length / 10);

  let datas = result_5d.map((data) => {
    let { id, phone, code, invite, level, game, ...others } = data;
    return others;
  });

  return res.status(200).json({
    code: 0,
    msg: "Get Success",
    data: {
      gameslist: datas,
    },
    page: page,
    status: true,
  });
};

// function makeGameResult(length) {
//   var result = "";
//   var characters = "0123456789";
//   var charactersLength = characters.length;
//   for (var i = 0; i < length; i++) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//   }
//   return result;
// }

const add5D = async (game) => {
  try {
    let join = "";
    if (game == 1) join = "k5d";
    if (game == 3) join = "k5d3";
    if (game == 5) join = "k5d5";
    if (game == 10) join = "k5d10";

    let [k5D] = await connection.query(
      `SELECT period FROM 5d WHERE status = 0 AND game = ${game} ORDER BY id DESC LIMIT 1 `,
    );
    const isPendingGame = k5D.length > 0;

    if (isPendingGame) {
      // let result2 = makeGameResult(5);

      let result2 = await generateGameResult(game);

      const [setting] = await connection.query("SELECT * FROM `admin_ac` ");
      let period = k5D[0].period;

      let nextResult = "";
      if (game == 1) nextResult = setting[0].k5d;
      if (game == 3) nextResult = setting[0].k5d3;
      if (game == 5) nextResult = setting[0].k5d5;
      if (game == 10) nextResult = setting[0].k5d10;

      let newArr = "";
      if (nextResult == "-1") {
        // game algorithm generate result
        await connection.execute(
          `UPDATE 5d SET result = ?,status = ? WHERE period = ? AND game = "${game}"`,
          [result2, 1, period],
        );
        newArr = "-1";
      } else {
        // admin set result
        let result = "";
        let arr = nextResult.split("|");
        let check = arr.length;
        if (check == 1) {
          newArr = "-1";
        } else {
          for (let i = 1; i < arr.length; i++) {
            newArr += arr[i] + "|";
          }
          newArr = newArr.slice(0, -1);
        }
        result = arr[0];
        await connection.execute(
          `UPDATE 5d SET result = ?,status = ? WHERE period = ? AND game = ${game}`,
          [result, 1, period],
        );
      }
      if (game == 1) join = "k5d";
      if (game == 3) join = "k5d3";
      if (game == 5) join = "k5d5";
      if (game == 10) join = "k5d10";

      await connection.execute(`UPDATE admin_ac SET ${join} = ?`, [newArr]);
    }

    let timeNow = Date.now();
    let gameRepresentationId = GameRepresentationIds.G5D[game];
    let NewGamePeriod = generatePeriod(gameRepresentationId);

    await connection.execute(`
         INSERT INTO 5d
         SET period = ${NewGamePeriod}, result = 0, game = '${game}', status = 0, time = ${timeNow}
      `);
  } catch (error) {
    if (error) {
      console.log(error);
    }
  }
};

function calculateBetTotals(data) {
  const result = {};

  data.forEach((item) => {
    const bet = item.bet;
    const money = item.money;

    // If the bet key already exists, add to its value; otherwise, initialize it
    if (result[bet]) {
      result[bet] += money;
    } else {
      result[bet] = money;
    }
  });

  return result;
}


async function funHanding(game) {
  try {
    const [k5d] = await connection.query(
      `SELECT * FROM 5d WHERE status = 0 AND game = ${game} ORDER BY id DESC LIMIT 2 `,
    );
    let k5dInfo = k5d[1];




    const joins = ["a", "b", "c", "d", "e", "total"];

for (const join of joins) {
  // taking all the status === 0 records
  const [big_small_bet] = await connection.execute(
    `SELECT * FROM result_5d WHERE status = ? AND game = ? AND join_bet = ? AND bet IN (?, ?)`,
    [0, game, join, 'b', 's']
  );
  const [odd_even_bet] = await connection.execute(
    `SELECT * FROM result_5d WHERE status = ? AND game = ? AND join_bet = ? AND bet IN (?, ?)`,
    [0, game, join, 'l', 'c']
  );
  const [number_bet] = await connection.execute(
    `SELECT * FROM result_5d WHERE status = ? AND game = ? AND join_bet = ? AND bet IN (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [0, game, join, '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  );

  const final_big_small_object = calculateBetTotals(big_small_bet);
  const final_odd_even_object = calculateBetTotals(odd_even_bet);
  const final_number_object = calculateBetTotals(number_bet);

  // -------------------------- for each join -------------------
  // for big small update
  const loose_bet_big_small = Object.keys(final_big_small_object)?.length === 1 ? Object.keys(final_big_small_object)[0]  :  (Number(final_big_small_object.b)) > (Number(final_big_small_object.s)) ? 'b' : 's';

  await connection.execute(
    `UPDATE result_5d SET status = 2 WHERE status = ? AND game = ? AND join_bet = ? AND bet = ?`,
    [0, game, join, loose_bet_big_small]
  );

  // for odd even update
  const loose_bet_odd_even =  Object.keys(final_odd_even_object)?.length === 1 ? Object.keys(final_odd_even_object)[0]  : (Number(final_odd_even_object.c) ) > (Number(final_odd_even_object.l)) ? 'c' : 'l';

  await connection.execute(
    `UPDATE result_5d SET status = 2 WHERE status = ? AND game = ? AND join_bet = ? AND bet = ?`,
    [0, game, join, loose_bet_odd_even]
  );

  // Ensure all numbers (0-9) exist in final_number_object
  const original_final_object = { ...final_number_object };
  for (let i = 0; i <= 9; i++) {
    const key = i.toString();
    if (!final_number_object.hasOwnProperty(key)) {
      final_number_object[key] = 0; // Initialize missing keys with 0
    }
  }

  let check_zero_exist = false;

  for (const bet in final_number_object) {
    if (final_number_object[bet] === 0) {
      check_zero_exist = true;
    }
  }
  if (check_zero_exist) {
    for (const key of Object.keys(original_final_object)) {
      await connection.execute(
        `UPDATE result_5d SET status = 2 WHERE status = ? AND game = ? AND join_bet = ? AND bet = ?`,
        [0, game, join, key]
      );
    }
  } else {
    const lowestKey = Object.keys(final_number_object).reduce((lowest, key) =>
      final_number_object[key] < final_number_object[lowest] ? key : lowest
    );

    try {
      // Iterate through all keys in the object
      for (const key of Object.keys(final_number_object)) {
        const status = key === lowestKey ? 1 : 2; // Set status to 1 for the lowest key, 2 for the rest

        const query = `
          UPDATE result_5d
          SET status = ?
          WHERE status = ? AND game = ? AND join_bet = ? AND bet = ?
        `;
        const values = [status, 0, game, join, key];

        await connection.execute(query, values);
        console.log(`Key ${key} updated with status ${status}`);
      }
    } catch (error) {
      console.error("Error updating database:", error.message);
    }
  }
}
  


//      //our code start form here
//      const big_small_array = ["b", "s"];
//      const odd_even_array = ["l", "c"];
//      const number_array = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];


//      // taking all the status === 0 records
//      const [big_small_bet] = await connection.execute(
//       `SELECT * FROM result_5d WHERE status = ? AND game = ? AND join_bet = ? AND bet IN (?, ?)`,
//       [0, game, 'a', 'b', 's']
//     );
//      const [odd_even_bet] = await connection.execute(
//       `SELECT * FROM result_5d WHERE status = ? AND game = ? AND join_bet = ? AND bet IN (?, ?)`,
//       [0, game, 'a', "l", "c"]
//     );
//      const [number_bet] = await connection.execute(
//       `SELECT * FROM result_5d WHERE status = ? AND game = ? AND join_bet = ? AND bet IN (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//       [0, game, 'a', "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
//     );


//      const final_big_small_object = calculateBetTotals(big_small_bet)
//      const final_odd_even_object = calculateBetTotals(odd_even_bet)
//      const final_number_object = calculateBetTotals(number_bet)


     

// // -------------------------- for a game join -------------------
//   //for big small update
//      const loose_bet_big_small = Number(final_big_small_object.b) > Number(final_big_small_object.s) ? 'b' : 's';
//      console.log("loose_bet_big_small", loose_bet_big_small);
     
//      await connection.execute(
//        `UPDATE result_5d SET status = 2 WHERE status = ? AND game = ? AND join_bet = ? AND bet = ?`,
//        [0, game, 'a', loose_bet_big_small]
//      );

//      //for odd even update
//      const loose_bet_odd_even = Number(final_odd_even_object.c) > Number(final_odd_even_object.l) ? 'c' : 'l';
//      console.log("loose_bet_odd_even", loose_bet_odd_even);
     
//      await connection.execute(
//        `UPDATE result_5d SET status = 2 WHERE status = ? AND game = ? AND join_bet = ? AND bet = ?`,
//        [0, game, 'a', loose_bet_odd_even]
//      );

//     // Ensure all numbers (0-9) exist in final_number_object

//     const original_final_object = final_number_object;
// for (let i = 0; i <= 9; i++) {
//   const key = i.toString();
//   if (!final_number_object.hasOwnProperty(key)) {
//     final_number_object[key] = 0; // Initialize missing keys with 0
//   }
// }
// console.log("final_number_object", final_number_object)

// let check_zero_exist = false

// for (const bet in final_number_object) {
//   if(final_number_object[bet]=== 0){
//     check_zero_exist = true
//   }
// }
// if (check_zero_exist) {
//   for (const key of Object.keys(original_final_object)) {
//     await connection.execute(
//       `UPDATE result_5d SET status = 2 WHERE status = ? AND game = ? AND join_bet = ? AND bet = ?`,
//       [0, game, 'a', key]
//     );
//   }
// }else {

//    const lowestKey = Object.keys(final_number_object).reduce((lowest, key) => 
//     final_number_object[key] < final_number_object[lowest] ? key : lowest
//   );

//   console.log("Lowest key (winner):", lowestKey);

//   try {
//     // Iterate through all keys in the object
//     for (const key of Object.keys(final_number_object)) {
//       const status = key === lowestKey ? 1 : 2; // Set status to 1 for the lowest key, 2 for the rest

//       const query = `
//         UPDATE result_5d
//         SET status = ?
//         WHERE status = ? AND game = ? AND join_bet = ? AND bet = ?
//       `;
//       const values = [status, 0, game, 'a', key];

//       await connection.execute(query, values);
//       console.log(`Key ${key} updated with status ${status}`);
//     }
//   } catch (error) {
//     console.error("Error updating database:", error.message);
//   }
// }


   
  } catch (err) {
    console.log(err);
  }
}

const handling5D = async (typeid) => {
  let game = Number(typeid);

  await funHanding(game);

  const [order] = await connection.execute(
    `SELECT id, phone, bet, price, money, fee, amount FROM result_5d WHERE status = 0 AND game = ${game} `,
  );

  for (let i = 0; i < order.length; i++) {
    let orders = order[i];
    let id = orders.id;
    let phone = orders.phone;
    let nhan_duoc = 0;
    let check = isNumber(orders.bet);
    if (check) {
      let arr = orders.bet.split("");
      let total = orders.money;
      let fee = total * 0.02;
      let price = total - fee;
      nhan_duoc += price * 9;
    } else {
      nhan_duoc += orders.price * 2;
    }

    await connection.execute(
      "UPDATE `result_5d` SET `get` = ?, `status` = 1 WHERE `id` = ? ",
      [nhan_duoc, id],
    );
    const sql = "UPDATE `users` SET `money` = `money` + ? WHERE `phone` = ? ";
    await connection.execute(sql, [nhan_duoc, phone]);
  }
};
async function calculateTotalPayout(result, game, bets) {
  let payout = 0;
  let resultArray = result.split("");

  // Iterate over each bet
  for (let bet of bets) {
    const { join_bet, amount, bet_type } = bet;

    // Determine the outcome for the current bet
    let outcome = false;
    switch (join_bet) {
      case "a":
        outcome = resultArray[0] === bet_type;
        break;
      case "b":
        outcome = resultArray[1] === bet_type;
        break;
      case "c":
        outcome = resultArray[2] === bet_type;
        break;
      case "d":
        outcome = resultArray[3] === bet_type;
        break;
      case "e":
        outcome = resultArray[4] === bet_type;
        break;
      case "total":
        const total = resultArray.reduce(
          (acc, num) => acc + parseInt(num, 10),
          0,
        );
        if (bet_type === "b") {
          outcome = total <= 22;
        } else if (bet_type === "s") {
          outcome = total > 22;
        } else if (bet_type === "l") {
          outcome = total % 2 === 0;
        } else if (bet_type === "c") {
          outcome = total % 2 !== 0;
        }
        break;
      default:
        break;
    }

    // Add the payout amount if the bet is a winner
    if (outcome) {
      payout += amount * 2; // Example payout logic
    }
  }

  return payout;
}

async function makeGameResult(length, game, bets) {
  let possibleResults = [];
  let characters = "0123456789";
  let charactersLength = characters.length;

  // Generate all possible results for the game
  for (let i = 0; i < Math.pow(charactersLength, length); i++) {
    let result = "";
    let num = i;

    for (let j = 0; j < length; j++) {
      result = characters[num % charactersLength] + result;
      num = Math.floor(num / charactersLength);
    }

    // Check if the result generates a 0 payout
    let totalPayout = calculateTotalPayout(result, game, bets);
    possibleResults.push({ result, payout: totalPayout });

    // console.log("totalPayout", totalPayout)

    if (totalPayout === 0) {
      return result; // Return immediately if 0 payout is found
    }
  }

  // Sort results by payout and return the one with the minimum payout
  possibleResults.sort((a, b) => a.payout - b.payout);
  return possibleResults[0].result;
}

async function generateGameResult(game) {
  try {
    const [bets] = await connection.query(
      `SELECT join_bet, bet as bet_type, amount FROM result_5d WHERE status = 0 AND game = ?`,
      [game],
    );

    if (bets.length === 0) {
      const generateRandomString = (length) => {
        const characters = "0123456789";
        const charactersLength = characters.length;
        let result = "";
        for (let i = 0; i < length; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength),
          );
        }
        return result;
      };

      return generateRandomString(5);
    }

    let result = await makeGameResult(5, game, bets);
    return result;
  } catch (error) {
    console.error("Error generating game result:", error.message);
    throw new Error("Failed to generate game result.");
  }
}

const k5Controller = {
  K5DPage,
  K5DPage3,
  K5DPage5,
  K5DPage10,
  betK5D,
  listOrderOld,
  GetMyEmerdList,
  add5D,
  handling5D,
};

export default k5Controller;
