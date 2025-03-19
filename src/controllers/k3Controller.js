import connection from "../config/connectDB.js";
import GameRepresentationIds from "../constants/game_representation_id.js";
import { generatePeriod } from "../helpers/games.js";

const K3Page = async (req, res) => {
  return res.render("bet/k3/k3.ejs");
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
  const checkMoney = ["1000", "10000", "100000", "1000000"].includes(money);

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

// const    betK3ForTwoSome = async (req, res) => {
//   console.log("cal....",req.body)
//   try {
//     let { listJoin, game, gameJoin, xvalue, money } = req.body;
//     let auth = req.cookies.auth;
   

//     // let validate = await validateBet(join, list_join, x, money, game);

//     // if (!validate) {
//     //     return res.status(200).json({
//     //         message: 'Đặt cược không hợp lệ',
//     //         status: false
//     //     });
//     // }

//     const [k3Now] = await connection.query(
//       `SELECT period FROM k3 WHERE status = 0 AND game = ${game} ORDER BY id DESC LIMIT 1 `,
//     );
  
//     const [user] = await connection.query(
//       "SELECT `phone`, `code`, `invite`, `level`, `money` FROM users WHERE token = ? AND veri = 1  LIMIT 1 ",
//       [auth],
//     );
//     console.log("cal  2222...........", k3Now, user)
//     if (k3Now.length < 1 || user.length < 1) {
//       return res.status(200).json({
//         message: "Error!",
//         status: false,
//       });
//     }

//     console.log("cal  1...........")
//     let userInfo = user[0];
//     let period = k3Now[0];

//     let date = new Date();
//     let years = formateT(date.getFullYear());
//     let months = formateT(date.getMonth() + 1);
//     let days = formateT(date.getDate());
//     let id_product =
//       years + months + days + Math.floor(Math.random() * 1000000000000000);

//     let total = 0;
//     if (gameJoin == 1) {
//       total = money * xvalue * String(listJoin).split(",").length;
//     } 
//     let fee = total * 0.02;
//     let price = total - fee;

//     let typeGame = "";
//     if (gameJoin == 1) typeGame = "total";
//     console.log("cal  2...........")
//     let check = userInfo.money - total;
//     if (check >= 0) {
//       let timeNow = Date.now();
//       const sql = `INSERT INTO result_k3 SET id_product = ?,phone = ?,code = ?,invite = ?,stage = ?,level = ?,money = ?,price = ?,amount = ?,fee = ?,game = ?,join_bet = ?, typeGame = ?,bet = ?,status = ?,time = ?`;
//       await connection.execute(sql, [
//         id_product,
//         userInfo.phone,
//         userInfo.code,
//         userInfo.invite,
//         period.period,
//         userInfo.level,
//         total,
//         price,
//         xvalue,
//         fee,
//         game,
//         gameJoin,
//         typeGame,
//         listJoin,
//         0,
//         timeNow,
//       ]);

//       console.log("cal  last...........")
//       await connection.execute(
//         "UPDATE `users` SET `money` = `money` - ? WHERE `token` = ? ",
//         [total, auth],
//       );
//       const [users] = await connection.query(
//         "SELECT `money`, `level` FROM users WHERE token = ? AND veri = 1  LIMIT 1 ",
//         [auth],
//       );
//       await rosesPlus(auth, total);
//       const [level] = await connection.query("SELECT * FROM level ");
//       let level0 = level[0];
//       const sql2 = `INSERT INTO roses SET phone = ?,code = ?,invite = ?,f1 = ?,f2 = ?,f3 = ?,f4 = ?,time = ?`;
//       let total_m = total;
//       let f1 = (total_m / 100) * level0.f1;
//       let f2 = (total_m / 100) * level0.f2;
//       let f3 = (total_m / 100) * level0.f3;
//       let f4 = (total_m / 100) * level0.f4;
//       await connection.execute(sql2, [
//         userInfo.phone,
//         userInfo.code,
//         userInfo.invite,
//         f1,
//         f2,
//         f3,
//         f4,
//         timeNow,
//       ]);
//       return res.status(200).json({
//         message: "Successful bet",
//         status: true,
//         // data: result,
//         change: users[0].level,
//         money: users[0].money,
//       });
//     } else {
//       return res.status(200).json({
//         message: "The amount is not enough",
//         status: false,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };


const betK3ForTwoSome = async (req, res) => {
  console.log("cal....", req.body);
  try {
    let { listJoin, game, gameJoin, xvalue, money } = req.body;
    let auth = req.cookies.auth;

    const [k3Now] = await connection.query(
      `SELECT period FROM k3 WHERE status = 0 AND game = ${game} ORDER BY id DESC LIMIT 1 `
    );
    
    const [user] = await connection.query(
      "SELECT `phone`, `code`, `invite`, `level`, `money` FROM users WHERE token = ? AND veri = 1 LIMIT 1 ",
      [auth]
    );
    
    if (k3Now.length < 1 || user.length < 1) {
      return res.status(200).json({
        message: "Error!",
        status: false,
      });
    }

    let userInfo = user[0];
    let period = k3Now[0].period;
    let date = new Date();
    let timeNow = Date.now();
    let total = 0;
    let bets = String(listJoin).split(",");
    let typeGame = "total";

    let individualBets = [];

    for (let bet of bets) {
      let betAmount = money * xvalue;
      let fee = betAmount * 0.02;
      let price = betAmount - fee;
      total += betAmount;
      let id_product =
        date.getFullYear() + (date.getMonth() + 1) + date.getDate() + Math.floor(Math.random() * 1000000000000000);

      individualBets.push([
        id_product,
        userInfo.phone,
        userInfo.code,
        userInfo.invite,
        period,
        userInfo.level,
        betAmount,
        price,
        xvalue,
        fee,
        game,
        gameJoin,
        typeGame,
        bet,
        0,
        timeNow,
      ]);
    }

    let check = userInfo.money - total;
    if (check >= 0) {
      const sql = `INSERT INTO result_k3 
        (id_product, phone, code, invite, stage, level, money, price, amount, fee, game, join_bet, typeGame, bet, status, time) 
        VALUES ?`;
      await connection.query(sql, [individualBets]);
      
      await connection.execute("UPDATE `users` SET `money` = `money` - ? WHERE `token` = ?", [total, auth]);
      
      const [users] = await connection.query("SELECT `money`, `level` FROM users WHERE token = ? AND veri = 1 LIMIT 1", [auth]);
      
      await rosesPlus(auth, total);
      
      const [level] = await connection.query("SELECT * FROM level ");
      let level0 = level[0];
      
      const sql2 = `INSERT INTO roses SET phone = ?, code = ?, invite = ?, f1 = ?, f2 = ?, f3 = ?, f4 = ?, time = ?`;
      let f1 = (total / 100) * level0.f1;
      let f2 = (total / 100) * level0.f2;
      let f3 = (total / 100) * level0.f3;
      let f4 = (total / 100) * level0.f4;
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
    console.log(error);
    return res.status(500).json({ message: "Server error", status: false });
  }
};


const  betK3ForOther= async (req, res) => {
  try {
    console.log("cal....22222222222222222222222222222222222222");

    let { listJoin, game, gameJoin, xvalue, money } = req.body;
    let auth = req.cookies.auth;

    const [k3Now] = await connection.query(
      `SELECT period FROM k3 WHERE status = 0 AND game = ${game} ORDER BY id DESC LIMIT 1 `
    );

    const [user] = await connection.query(
      "SELECT `phone`, `code`, `invite`, `level`, `money` FROM users WHERE token = ? AND veri = 1  LIMIT 1 ",
      [auth]
    );

    if (k3Now.length < 1 || user.length < 1) {
      return res.status(200).json({
        message: "Error!",
        status: false,
      });
    }

    let userInfo = user[0];
    let period = k3Now[0];

    let date = new Date();
    let years = formateT(date.getFullYear());
    let months = formateT(date.getMonth() + 1);
    let days = formateT(date.getDate());

    let numbers = listJoin.split("@")[0].split(","); // Extract numbers before "@"
    let remainingPart = listJoin.split("@")[1]; // Extract remaining part after "@"

    let totalBetAmount = 0;
    let betResults = [];

    for (let num of numbers) {
      let id_product =
        years + months + days + Math.floor(Math.random() * 1000000000000000);

      let singleListJoin = `${num}@${remainingPart}`;
      let total = money * xvalue;

      let fee = total * 0.02;
      let price = total - fee;

      let typeGame = "";
      if (gameJoin == 1) typeGame = "total";
      if (gameJoin == 2) typeGame = "two-same";
      if (gameJoin == 3) typeGame = "three-same";
      if (gameJoin == 4) typeGame = "unlike";

      let check = userInfo.money - (totalBetAmount + total);
      if (check >= 0) {
        let timeNow = Date.now();
        const sql = `INSERT INTO result_k3 SET id_product = ?,phone = ?,code = ?,invite = ?,stage = ?,level = ?,money = ?,price = ?,amount = ?,fee = ?,game = ?,join_bet = ?, typeGame = ?,bet = ?,status = ?,time = ?`;
        await connection.execute(sql, [
          id_product,
          userInfo.phone,
          userInfo.code,
          userInfo.invite,
          period.period,
          userInfo.level,
          total,
          price,
          xvalue,
          fee,
          game,
          gameJoin,
          typeGame,
          singleListJoin,
          0,
          timeNow,
        ]);

        await connection.execute(
          "UPDATE `users` SET `money` = `money` - ? WHERE `token` = ? ",
          [total, auth]
        );

        totalBetAmount += total;

        betResults.push({
          id_product,
          amount: total,
          price,
          typeGame,
          bet: singleListJoin,
        });
      } else {
        return res.status(200).json({
          message: "The amount is not enough",
          status: false,
        });
      }
    }

    const [users] = await connection.query(
      "SELECT `money`, `level` FROM users WHERE token = ? AND veri = 1  LIMIT 1 ",
      [auth]
    );

    return res.status(200).json({
      message: "Successful bet",
      status: true,
      bets: betResults,
      change: users[0].level,
      money: users[0].money,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      status: false,
    });
  }
};

// const betK3ForDifferent = async (req, res) => {
//   console.log("cal....",req.body)
//   try {
//     let { listJoin, game, gameJoin, xvalue, money } = req.body;
//     let auth = req.cookies.auth;


//     const [k3Now] = await connection.query(
//       `SELECT period FROM k3 WHERE status = 0 AND game = ${game} ORDER BY id DESC LIMIT 1 `,
//     );
  
//     const [user] = await connection.query(
//       "SELECT `phone`, `code`, `invite`, `level`, `money` FROM users WHERE token = ? AND veri = 1  LIMIT 1 ",
//       [auth],
//     );
//     console.log("cal  2222...........", k3Now, user)
//     if (k3Now.length < 1 || user.length < 1) {
//       return res.status(200).json({
//         message: "Error!",
//         status: false,
//       });
//     }

//     console.log("cal  1...........")
//     let userInfo = user[0];
//     let period = k3Now[0];

//     let date = new Date();
//     let years = formateT(date.getFullYear());
//     let months = formateT(date.getMonth() + 1);
//     let days = formateT(date.getDate());
//     let id_product =
//       years + months + days + Math.floor(Math.random() * 1000000000000000);

//       console.log("gameJoin", gameJoin)

//     let total = 0;
//    if (gameJoin == 4) {
//       let threeNumberUnlike = listJoin.split("@")[0]; // Chọn 3 số duy nhất
//       let twoLienTiep = listJoin.split("@")[1]; // Chọn 3 số liên tiếp
//       let twoNumberUnlike = listJoin.split("@")[2]; // Chọn 3 số duy nhất

//       console.log("threeNumberUnlike", threeNumberUnlike, twoNumberUnlike)
//       console.log("twoLienTiep", twoLienTiep)
//       console.log("twoNumberUnlike", twoNumberUnlike)

//       let threeUn = 0;
//       if (threeNumberUnlike.length > 0) {
//         let arr = threeNumberUnlike.split(",").length;
//         if (arr <= 4) {
//           threeUn += xvalue * (money * arr);
//         }
//         if (arr == 5) {
//           threeUn += xvalue * (money * arr) * 2;
//         }
//         if (arr == 6) {
//           threeUn += xvalue * (money * 5) * 4;
//         }
//       }
//       let twoUn = 0;
//       if (twoNumberUnlike.length > 0) {
//         let arr = twoNumberUnlike.split(",").length;
//         if (arr <= 3) {
//           twoUn += xvalue * (money * arr);
//         }
//         if (arr == 4) {
//           twoUn += xvalue * (money * arr) * 1.5;
//         }
//         if (arr == 5) {
//           twoUn += xvalue * (money * arr) * 2;
//         }
//         if (arr == 6) {
//           twoUn += xvalue * (money * arr * 2.5);
//         }
//       }
//       let UnlienTiep = 0;
//       if (twoLienTiep == "u") {
//         UnlienTiep += xvalue * money;
//       }
//       total = threeUn + twoUn + UnlienTiep;
//     }
//     let fee = total * 0.02;
//     let price = total - fee;

//     let typeGame = "";

//     if (gameJoin == 4) typeGame = "unlike";
  
//     let check = userInfo.money - total;
//     if (check >= 0) {
//       let timeNow = Date.now();
//       const sql = `INSERT INTO result_k3 SET id_product = ?,phone = ?,code = ?,invite = ?,stage = ?,level = ?,money = ?,price = ?,amount = ?,fee = ?,game = ?,join_bet = ?, typeGame = ?,bet = ?,status = ?,time = ?`;
//       await connection.execute(sql, [
//         id_product,
//         userInfo.phone,
//         userInfo.code,
//         userInfo.invite,
//         period.period,
//         userInfo.level,
//         total,
//         price,
//         xvalue,
//         fee,
//         game,
//         gameJoin,
//         typeGame,
//         listJoin,
//         0,
//         timeNow,
//       ]);

//       console.log("cal  last...........")
//       await connection.execute(
//         "UPDATE `users` SET `money` = `money` - ? WHERE `token` = ? ",
//         [total, auth],
//       );
//       const [users] = await connection.query(
//         "SELECT `money`, `level` FROM users WHERE token = ? AND veri = 1  LIMIT 1 ",
//         [auth],
//       );
//       await rosesPlus(auth, total);
//       const [level] = await connection.query("SELECT * FROM level ");
//       let level0 = level[0];
//       const sql2 = `INSERT INTO roses SET phone = ?,code = ?,invite = ?,f1 = ?,f2 = ?,f3 = ?,f4 = ?,time = ?`;
//       let total_m = total;
//       let f1 = (total_m / 100) * level0.f1;
//       let f2 = (total_m / 100) * level0.f2;
//       let f3 = (total_m / 100) * level0.f3;
//       let f4 = (total_m / 100) * level0.f4;
//       await connection.execute(sql2, [
//         userInfo.phone,
//         userInfo.code,
//         userInfo.invite,
//         f1,
//         f2,
//         f3,
//         f4,
//         timeNow,
//       ]);
//       return res.status(200).json({
//         message: "Successful bet",
//         status: true,
//         // data: result,
//         change: users[0].level,
//         money: users[0].money,
//       });
//     } else {
//       return res.status(200).json({
//         message: "The amount is not enough",
//         status: false,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

const betK3ForDifferent = async (req, res) => {
  console.log("cal....", req.body);
  try {
    let { listJoin, game, gameJoin, xvalue, money } = req.body;
    let auth = req.cookies.auth;

    const [k3Now] = await connection.query(
      `SELECT period FROM k3 WHERE status = 0 AND game = ${game} ORDER BY id DESC LIMIT 1`
    );

    const [user] = await connection.query(
      "SELECT `phone`, `code`, `invite`, `level`, `money` FROM users WHERE token = ? AND veri = 1 LIMIT 1",
      [auth]
    );

    if (k3Now.length < 1 || user.length < 1) {
      return res.status(200).json({
        message: "Error!",
        status: false,
      });
    }

    let userInfo = user[0];
    let period = k3Now[0];

    let date = new Date();
    let years = formateT(date.getFullYear());
    let months = formateT(date.getMonth() + 1);
    let days = formateT(date.getDate());
    let id_product =
      years + months + days + Math.floor(Math.random() * 1000000000000000);

    let bets = [];

    // Handle @y@ cases
    if (listJoin.endsWith("@y@")) {
      let numbers = listJoin.replace("@y@", "").split(",");
      for (let i = 0; i < numbers.length; i += 3) {
        if (numbers[i + 2]) {
          bets.push(`${numbers[i]},${numbers[i + 1]},${numbers[i + 2]}@y@`);
        }
      }
    } else if (listJoin.startsWith("@y@")) {
      let numbers = listJoin.replace("@y@", "").split(",");
      for (let i = 0; i < numbers.length; i += 2) {
        if (numbers[i + 1]) {
          bets.push(`@y@${numbers[i]},${numbers[i + 1]}`);
        }
      }
    } else if (listJoin === "@u@") {
      bets.push("@u@");
    } else {
      bets.push(listJoin);
    }
    let total = 0;
    
    // Process each bet separately
    for (let bet of bets) {
      let threeNumberUnlike = bet.split("@")[0];
      let twoLienTiep = bet.split("@")[1];
      let twoNumberUnlike = bet.split("@")[2];

      let threeUn = 0;
      if (threeNumberUnlike.length > 0) {
        let arr = threeNumberUnlike.split(",").length;
        if (arr <= 4) threeUn += xvalue * (money * arr);
        if (arr == 5) threeUn += xvalue * (money * arr) * 2;
        if (arr == 6) threeUn += xvalue * (money * 5) * 4;
      }

      let twoUn = 0;
      if (twoNumberUnlike.length > 0) {
        let arr = twoNumberUnlike.split(",").length;
        if (arr <= 3) twoUn += xvalue * (money * arr);
        if (arr == 4) twoUn += xvalue * (money * arr) * 1.5;
        if (arr == 5) twoUn += xvalue * (money * arr) * 2;
        if (arr == 6) twoUn += xvalue * (money * arr * 2.5);
      }

      let UnlienTiep = 0;
      if (twoLienTiep == "u") {
        UnlienTiep += xvalue * money;
      }

      total += threeUn + twoUn + UnlienTiep;

      let fee = total * 0.02;
      let price = total - fee;

      let check = userInfo.money - total;
      if (check >= 0) {
        let timeNow = Date.now();
        await connection.execute(
          `INSERT INTO result_k3 SET id_product = ?, phone = ?, code = ?, invite = ?, stage = ?, level = ?, money = ?, price = ?, amount = ?, fee = ?, game = ?, join_bet = ?, typeGame = ?, bet = ?, status = ?, time = ?`,
          [
            id_product,
            userInfo.phone,
            userInfo.code,
            userInfo.invite,
            period.period,
            userInfo.level,
            total,
            price,
            xvalue,
            fee,
            game,
            gameJoin,
            "unlike",
            bet,
            0,
            timeNow,
          ]
        );

        await connection.execute(
          "UPDATE `users` SET `money` = `money` - ? WHERE `token` = ?",
          [total, auth]
        );

        const [users] = await connection.query(
          "SELECT `money`, `level` FROM users WHERE token = ? AND veri = 1 LIMIT 1",
          [auth]
        );

        await rosesPlus(auth, total);

        const [level] = await connection.query("SELECT * FROM level ");
        let level0 = level[0];

        await connection.execute(
          `INSERT INTO roses SET phone = ?, code = ?, invite = ?, f1 = ?, f2 = ?, f3 = ?, f4 = ?, time = ?`,
          [
            userInfo.phone,
            userInfo.code,
            userInfo.invite,
            (total / 100) * level0.f1,
            (total / 100) * level0.f2,
            (total / 100) * level0.f3,
            (total / 100) * level0.f4,
            timeNow,
          ]
        );

        return res.status(200).json({
          message: "Successful bet",
          status: true,
          change: users[0].level,
          money: users[0].money,
        });
      } else {
        return res.status(200).json({
          message: "The amount is not enough",
          status: false,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};



const betK3 = async (req, res)=>{

  const {gameJoin} = req.body;

  console.log("gameJoin............", gameJoin)

  if(Number(gameJoin) === 1){
    console.log("cal.........................111111111111111")
    betK3ForTwoSome(req, res)
  } else if(Number(gameJoin) === 4){
    console.log("cal.......................333333333333333")
    betK3ForDifferent(req, res)

  }  else{
    console.log("cal.........................22222222222222")
    betK3ForOther(req, res)
  }

}
const addK3 = async (game) => {
  try {
    let join = "";
    if (game == 1) join = "k3d";
    if (game == 3) join = "k3d3";
    if (game == 5) join = "k3d5";
    if (game == 10) join = "k3d10";

    let [k3] = await connection.query(
      `SELECT period FROM k3 WHERE status = 0 AND game = ${game} ORDER BY id DESC LIMIT 1 `,
    );
    const isPendingGame = k3.length > 0;

    if (isPendingGame) {
      // let result2 = makeGameResult(3);
      let result2 = await generateGameResult(game);

      const [setting] = await connection.query("SELECT * FROM `admin_ac` ");
      let period = k3[0].period;

      let nextResult = "";
      if (game == 1) nextResult = setting[0].k3d;
      if (game == 3) nextResult = setting[0].k3d3;
      if (game == 5) nextResult = setting[0].k3d5;
      if (game == 10) nextResult = setting[0].k3d10;

      let newArr = "";

      if (nextResult == "-1") {
        // game algorithm generate result
        await connection.execute(
          `UPDATE k3 SET status = ? WHERE period = ? AND game = "${game}"`,
          [1, period],
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
          `UPDATE k3 SET result = ?,status = ? WHERE period = ? AND game = ${game}`,
          [result, 1, period],
        );
      }

      if (game == 1) join = "k3d";
      if (game == 3) join = "k3d3";
      if (game == 5) join = "k3d5";
      if (game == 10) join = "k3d10";

      await connection.execute(`UPDATE admin_ac SET ${join} = ?`, [newArr]);
    }

    let timeNow = Date.now();
    let gameRepresentationId = GameRepresentationIds.G5D[game];
    let NewGamePeriod = generatePeriod(gameRepresentationId);

    await connection.execute(`
         INSERT INTO k3
         SET period = ${NewGamePeriod}, result = 0, game = '${game}', status = 0, time = ${timeNow}
      `);
  } catch (error) {
    console.log(error);
    if (error) {
    }
  }
};

function getRandomElementExcluding(array, targets) {
  const filteredArray = array.filter((item) => !targets.includes(item));
  if (filteredArray.length === 0) {
    throw new Error("No valid elements to choose from.");
  }
  const randomIndex = Math.floor(Math.random() * filteredArray.length);
  return filteredArray[randomIndex];
}

function getRandomCharacter(char1, char2) {
  const characters = [char1, char2];
  return characters[Math.floor(Math.random() * characters.length)];
}

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

// Function to win the small for each game
async function funHanding(game) {
  console.log("cal.............111111111111")
  const [k3] = await connection.query(
    `SELECT * FROM k3 WHERE status = 1 AND game = ${game} ORDER BY id DESC LIMIT 2`,
  );

  let k3Info = k3[0];
  let totalResult, twoSameResult, threeSameResult, unlikeResult;
  console.log("Hellllllllllllllll");

  /**
   * todo: need to put our logic for k3 games
   */

  // taking all the status === 0 records
  const [big_small_bet] = await connection.execute(
    `SELECT * FROM result_k3 WHERE status = ? AND game = ? AND join_bet = ? AND typeGame = ? AND bet IN (?, ?)`,
    [0, game, "1", "total", "b", "s"],
  );
  const [odd_even_bet] = await connection.execute(
    `SELECT * FROM result_k3 WHERE status = ? AND game = ? AND join_bet = ? AND typeGame = ? AND bet IN (?, ?)`,
    [0, game, "1", "total", "l", "c"],
  );
  const [number_bet] = await connection.execute(
    `SELECT * FROM result_k3 WHERE status = ? AND game = ? AND join_bet = ? AND bet IN (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      0,
      game,
      "1",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
    ],
  );
  const betTypes = {
    bigSmall: ["b", "s"],
    oddEven: ["l", "c"],
    numbers: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
  };

  const price_win = {
    3: 207.36,
    4: 69.12,
    5: 34.56,
    6: 20.74,
    7: 13.83,
    8: 9.88,
    9: 8.3,
    10: 7.68,
    11: 7.68,
    12: 8.3,
    13: 9.88,
    14: 13.83,
    15: 20.74,
    16: 34.56,
    17: 69.12,
    18: 207.36,
  }

 
  const final_big_small_object = calculateBetTotals(big_small_bet);

  const final_odd_even_object = calculateBetTotals(odd_even_bet);


  const final_number_object = calculateBetTotals(number_bet);


  let win_between_big_or_small;

  // -------------------------- for each join -------------------
  // for big small update

  const loose_bet_big_small =
    Object.keys(final_big_small_object)?.length === 1
      ? Object.keys(final_big_small_object)[0]
      : Number(final_big_small_object.b) > Number(final_big_small_object.s)
        ? "b"
        : "s";



  const filteredWinnerBigSmall = Object.keys(final_big_small_object)?.length !== 0 ? betTypes.bigSmall.filter(
    (it) => it != loose_bet_big_small,
  ) : [`${getRandomCharacter('b', 's')}`];

  const winnerBigSmall =
    filteredWinnerBigSmall[
    Math.floor(Math.random() * filteredWinnerBigSmall.length)
    ];

  await connection.execute(
    `UPDATE result_k3 SET status = 2 WHERE status = ? AND game = ? AND join_bet = ? AND typeGame = ? AND bet = ?`,
    [0, game, "1", "total", loose_bet_big_small],
  );

  // for odd even update
  const loose_bet_odd_even =
    Object.keys(final_odd_even_object)?.length === 1
      ? Object.keys(final_odd_even_object)[0]
      : Number(final_odd_even_object.c) > Number(final_odd_even_object.l)
        ? "c"
        : "l";
 

  let filteredWinnerOddEven = Object.keys(final_odd_even_object)?.length !== 0 ? betTypes.oddEven.filter(
    (it) => it != loose_bet_odd_even,
  ) : [`${getRandomCharacter('c', 'l')}`];

  let winnerOddEven =
    filteredWinnerOddEven[
    Math.floor(Math.random() * filteredWinnerOddEven.length)
    ];

  await connection.execute(
    `UPDATE result_k3 SET status = 2 WHERE status = ? AND game = ? AND join_bet = ?  AND typeGame = ? AND bet = ?`,
    [0, game, "1", "total", loose_bet_odd_even],
  );

  /**
   * todo from sajal work for number part
   */
  // start number part from here

  let original_final_object = {};

  original_final_object = { ...final_number_object };
  for (let i = 3; i <= 18; i++) {
    const key = i.toString();
    if (!final_number_object.hasOwnProperty(key)) {
      final_number_object[key] = 0; 
    }
  }
  console.log("original_final_object", original_final_object)
  // console.log("final_number_object",  final_number_object)
  // console.log("original_final_object", original_final_object)

  let check_zero_exist = false;
  let winNumber;

  let numbersWithEmptyBets = Object.keys(final_number_object).filter(
    (k) => final_number_object[k] === 0,
  );
  // if (numbersWithEmptyBets.length !== 0) {
  //   winNumber =
  //     numbersWithEmptyBets[
  //     Math.floor(Math.random() * numbersWithEmptyBets.length)
  //     ];
  // } else {
  //   //for all beting present
  //   winNumber = Object.keys(final_number_object).reduce((lowest, key) =>
  //     final_number_object[key] < final_number_object[lowest] ? key : lowest,
  //   );
  // }

  if (numbersWithEmptyBets.length !== 0) {
    // if atleast one is empty
    winNumber = numbersWithEmptyBets[Math.floor(Math.random() * numbersWithEmptyBets.length)];
} else {
  // Find the minimum value in final_number_object
  const minValue = Math.min(...Object.values(final_number_object));

  // Collect all keys that have the minimum value in final_number_object
  const tiedKeys = Object.keys(final_number_object).filter(key => final_number_object[key] === minValue);

  // If there's only one key with the minimum value, use it
  if (tiedKeys.length === 1) {
      winNumber = tiedKeys[0];
  } else {
      // If there are ties, resolve them using price_win
      // Find the minimum value in price_win among the tied keys
      const minPriceWinValue = Math.min(...tiedKeys.map(key => price_win[key]));

      // Collect all tied keys that have the minimum value in price_win
      const finalTiedKeys = tiedKeys.filter(key => price_win[key] === minPriceWinValue);

      // Randomly pick one of the final tied keys
      winNumber = finalTiedKeys[Math.floor(Math.random() * finalTiedKeys.length)];
  }
}

  console.log("winNumber.............", winNumber)



  // for (const bet in final_number_object) {
  //   if (final_number_object[bet] === 0) {
  //     check_zero_exist = true;
  //     winNumber = bet;
  //   }

  // }

  // if (check_zero_exist) {

  let loseBetNumbers = betTypes.numbers.filter((it) => it != winNumber);
  // status = ? AND game = ? AND join_bet = ? AND typeGame = ?
  // winNumber = loseBetNumbers[Math.floor(Math.random() * loseBetNumbers.length)];
  await connection.execute(
    `UPDATE result_k3 
   SET status = 2 
   WHERE status = ? AND game = ? AND join_bet = ? AND typeGame = ? AND bet IN (${loseBetNumbers.map(() => "?").join(",")})`,
    ["0", game, "1", "total", ...loseBetNumbers.map((it) => it.toString())],
  );

  function getThreeNumbers(target) {
    let numbers = [1, 1, 1];

    let remaining = target - 3;

    while (remaining > 0) {
      let index = Math.floor(Math.random() * 3);
      if (numbers[index] < 6) {
        numbers[index]++;
        remaining--;
      }
    }

    return `${numbers[0]}${numbers[1]}${numbers[2]}`;
  }

  const result = `${winnerBigSmall},${winnerOddEven},${getThreeNumbers(winNumber)}`;


  // checking if the length of the final number object is = 16
  // then take the win object and update the price feild
  /**
   * 
   */
 
  

  // if(Object.keys(original_final_object)?.length === 16){
  //   console.log("call...")

  //   const final_price = final_number_object[winNumber] * price_win[winNumber]
  
  //   console.log("final_price", final_price)
  
  // console.log("k3Info.period", k3Info.period)
  // await connection.execute(
  //   `UPDATE result_k3 
  //    SET \`get\` = ? 
  //    WHERE status = ? 
  //    AND game = ? 
  //    AND join_bet = ?  
  //    AND typeGame = ? 
  //    AND stage = ?`,
  //   [final_price, '1', game, "1", "total", k3Info.period] // Corrected syntax
  // );
  
  
  // }


  //   if(win_bet.length != 0){
  //     const win_bet_result = win_bet[0] || {};
  //     console.log("win_bet_result---",win_bet_result)
  //     const wining_bet = win_bet_result.bet;

  //     // update the feild price
  //     const updated_price = win_bet_result?.money * price_win[wining_bet];

  //     await connection.execute(
  //       `UPDATE result_k3 SET price = ? WHERE status = ? AND game = ? AND join_bet = ?  AND typeGame = ? AND stage = ?` 
  //       [updated_price, '1', game, "1", "total", period],
  //     );
  //   }


  // setting the result
  await connection.execute(
    `UPDATE result_k3 SET result = ? WHERE game = ? AND typeGame = ?`,
    [result, game, "total"],
  );

  await connection.execute(`UPDATE k3 SET result = ? WHERE id = ?`, [
    result,
    k3Info.id,
  ]);

  console.log("k3Info---", k3Info)
}

// Function to generate number of 3 digit between 1 to 6 like 345,214,532
function generateCustomThreeDigit() {
  let digits = [];
  for (let i = 0; i < 3; i++) {
      digits.push(Math.floor(1 + Math.random() * 6)); // Generates a number between 1 and 6
  }
  return digits.join(""); // Convert array to a string
}

/**
 * Fn for handeling 2same result
 * @param {*} game 
 */
async function funHandingTwoSame(game, join_bet, betType) {
  const [k3] = await connection.query(
    `SELECT * FROM k3 WHERE status = 1 AND game = ${game} ORDER BY id DESC LIMIT 2`
  );

  let k3Info = k3[0];
  console.log("k3Info ---", k3Info);

  let betList, typeDescription;

  if (betType === "first") {
    betList = ['11@', '22@', '33@', '44@', '55@', '66@'];
    typeDescription = "First Game";
  } else if (betType === "second") {
    betList = ['11#@', '22#@', '33#@', '44#@', '55#@', '66#@', '1#@', '2#@', '3#@', '4#@', '5#@', '6#@'];
    typeDescription = "Second Game";
  } else {
    console.log("Invalid betType provided.");
    return;
  }

  console.log(`Fetching bets for ${typeDescription}...`);

  const [betResults] = await connection.execute(
    `SELECT * FROM result_k3 WHERE status = ? AND game = ? AND join_bet = ? AND bet IN (${betList.map(() => '?').join(', ')})`,
    [0, game, join_bet, ...betList]
  );

  console.log("betResults ----", betResults);

  const finalBetObject = calculateBetTotals(betResults);
  console.log(`${typeDescription} - Calculated bet totals:`, finalBetObject);

  const missingKeys = betList.filter(num => !finalBetObject.hasOwnProperty(num));
  console.log("missingKeys ---", missingKeys);

  let updatedResult = k3Info.result;
  let isSecondGame = betType === "second";

  if (missingKeys.length > 0) {
    const win = missingKeys[Math.floor(Math.random() * missingKeys.length)];
    const winNumber = win.replace(/[@#]/g, ''); // Extract numeric part properly

    // Append the new number while preserving format
    updatedResult = updatedResult.endsWith(",") 
      ? updatedResult + winNumber + "," 
      : updatedResult + `|${winNumber},`;

    for (const key of betList) {
      await connection.execute(
        `UPDATE result_k3 SET status = 2 WHERE status = ? AND game = ? AND join_bet = ? AND typeGame = ? AND bet = ?`,
        [0, game, join_bet, 'two-same', key]
      );
    }

  } else {
    let minKey = null;
    let minValue = Infinity;

    for (const key of betList) {
      if (finalBetObject[key] < minValue) {
        minValue = finalBetObject[key];
        minKey = key;
      }
    }

    console.log(`Winning bet in ${typeDescription}: ${minKey}, updating statuses...`);

    for (const key of betList) {
      const status = key === minKey ? 0 : 2;
      await connection.execute(
        `UPDATE result_k3 SET status = ? WHERE status = ? AND game = ? AND join_bet = ? AND typeGame = ? AND bet = ?`,
        [status, 0, game, join_bet, 'two-same', key]
      );
    }

    const winNumber = minKey.replace(/[@#]/g, '');

    // Append the new number while preserving format
    updatedResult = updatedResult.endsWith(",") 
      ? updatedResult + winNumber + "," 
      : updatedResult + `|${winNumber},`;
  }

  // **STEP 3**: Append a Random 3-Digit Number if this is the "second" game
  if (isSecondGame) {
    let randomThreeDigit = generateCustomThreeDigit();  // calling the fn to get the 3 digit randam number 

    // Ensure it gets added only once
    if (!updatedResult.match(/\|\d{3}$/)) {
      updatedResult += `${randomThreeDigit}`;
    }
  }
  console.log("updatedResult-----", updatedResult)
  // **UPDATE DATABASE**
  await connection.execute(
    `UPDATE k3 SET result = ? WHERE period = ? AND game = ?`,
    [updatedResult, k3Info.period, game]
  );

  console.log(`${typeDescription} execution completed.`);
}



/**
 * Function for 3 same game
 * @param {*} game 
 */
async function funHandingThreeSame(game, join_bet, game_type) {
  const [k3] = await connection.query(
    `SELECT * FROM k3 WHERE status = 1 AND game = ${game} ORDER BY id DESC LIMIT 2`
  );

  let k3Info = k3[0];
  console.log("k3Info33333---", k3Info);

  if('first' === game_type){
      // Fetching bets with status = 0
      const [three_same_number_bet] = await connection.execute(
        `SELECT * FROM result_k3 WHERE status = ? AND game = ? AND join_bet = ? AND typeGame = ? AND bet IN (?, ?, ?, ?, ?, ?)`,
        [0, game, join_bet, 'three-same', "111@", "222@", "333@", "444@", "555@", "666@"]
      );
      // Convert result into { '111@': amount, '222@': amount, ... }
      const finalBetObject = calculateBetTotals(three_same_number_bet);
      const three_same_numbers = ["111@", "222@", "333@", "444@", "555@", "666@"];
    // Check if all keys exist
    const missingKeys = three_same_numbers.filter(num => !finalBetObject.hasOwnProperty(num));
    let updatedResult = k3Info.result;

    if (missingKeys.length > 0) {
      const win = missingKeys[Math.floor(Math.random() * missingKeys.length)];
      const winNumber = win.replace(/[@#]/g, ''); // Extract numeric part properly
    
        // Append the winNumber correctly to maintain format
        if (updatedResult.endsWith(",")) {
            updatedResult += winNumber + ",";
        } else {
            updatedResult += `|${winNumber},`;
        }
        // Update status = 2 for missing bets in the database
        for (const key of three_same_numbers) {
            await connection.execute(
                `UPDATE result_k3 SET status = ? WHERE status = ? AND game = ? AND join_bet = ? AND typeGame = ? AND bet = ?`,
                [2, 0, game, join_bet, 'three-same', key]
            );
        }
        // **Update the k3 table with the new result**
        await connection.execute(
            `UPDATE k3 SET result = ? WHERE period = ? AND game = ?`,
            [updatedResult, k3Info.period, game]
        );
    
        console.log("updatedResult(33333333)-----", updatedResult);
        return; // Exit early to prevent further execution
    }
    else {
            // Find the key with the lowest amount
            let minKey = null;
            let minValue = Infinity;
            for (const key of three_same_numbers) {
              const value = finalBetObject[key] || 0; // Ensure a default value of 0
              if (value < minValue) {
                minValue = value;
                minKey = key;
              }
            }
            if (!minKey) return; // Failsafe
            const winNumber = minKey.replace(/[@#]/g, ''); // Extract numeric part properly
             // Append the winNumber correctly to maintain format
             if (updatedResult.endsWith(",")) {
              updatedResult += minKey + ",";
              } else {
                  updatedResult += `|${minKey},`;
              }
            // Update all keys, setting status = 1 for minKey and status = 2 for others
            for (const key of three_same_numbers) {
              await connection.execute(
                `UPDATE result_k3 SET status = ? WHERE status = ? AND game = ? AND join_bet = ? AND typeGame = ? AND bet = ?`,
                [key === minKey ? 0 : 2, 0, game, join_bet, 'three-same', key]
              );
            }
              // **Update the k3 table with the new result**
              await connection.execute(
                `UPDATE k3 SET result = ? WHERE period = ? AND game = ?`,
                [updatedResult, k3Info.period, game]
            );
      }
  }else if('second' === game_type) {
    // Fetch all bets where status = 0
    const [bets] = await connection.execute(
      `SELECT bet, amount FROM result_k3 WHERE status = ? AND game = ? AND join_bet = ? AND typeGame = ? AND bet = ?`,
      [0, game, join_bet, 'three-same', '@3']
    );
  
    let resultText;
  
    if (bets.length === 0) {
      // No bets to process, generate a random result
      resultText = Math.random() < 0.8 ? 'loss' : 'win';
      console.log(`No bets found. Randomly setting result as: ${resultText}`);
    } else {
      // 80% chance of losing
      const isLoss = Math.random() < 0.8;
      resultText = isLoss ? 'loss' : 'win';
  
      if (isLoss) {
        console.log("isloss", isLoss);
        // Update all bets to status = 2 (loss)
        for (const bet of bets) {
          await connection.execute(
            `UPDATE result_k3 SET status = ? WHERE status = ? AND game = ? AND join_bet = ? AND typeGame = ? AND bet = ?`,
            [2, 0, game, join_bet, 'three-same', bet.bet]
          );
        }
      } else {
        console.log("Win callllllllllllllllllllllll");
        // Find the bet with the least amount
        let minBet = bets[0]; // Assume first bet is the lowest
        for (const bet of bets) {
          if (bet.amount < minBet.amount) {
            minBet = bet;
          }
        }
        // Update bets: minBet gets status = 1, others get status = 2
        for (const bet of bets) {
          const status = bet.bet === minBet.bet ? 0 : 2;
          await connection.execute(
            `UPDATE result_k3 SET status = ? WHERE status = ? AND game = ? AND join_bet = ? AND typeGame = ? AND bet = ?`,
            [status, 0, game, join_bet, 'three-same', bet.bet]
          );
        }
      }
    }
  
    if (k3.length > 0) {
      const currentResult = k3Info.result;
      const period = k3Info.period;
      const generate_random_number = generateCustomThreeDigit();
      const updatedResult = `${currentResult}${resultText},${generate_random_number}`;
  
      // Update the result in k3
      await connection.execute(
        `UPDATE k3 SET result = ? WHERE game = ? AND period = ?`,
        [updatedResult, game,period ]
      );
  
      console.log(`Updated k3 result for period ${period}: ${updatedResult}`);
    }
  }
  

}

/**
 * Function to generate combination for the k3 different game
 * @returns 
 */
function generateCombinations(game_type) {
  const numbers = [1, 2, 3, 4, 5, 6];
  let combinations = [];
  if (game_type === 'first') {
    // Generate all possible 3-digit combinations using numbers 1-6
    for (let i = 0; i < numbers.length; i++) {
      for (let j = 0; j < numbers.length; j++) {
        for (let k = 0; k < numbers.length; k++) {
          combinations.push(`${numbers[i]},${numbers[j]},${numbers[k]}@y@`);
        }
      }
    }
  } else if (game_type === 'third') {
    console.log("cal.......................");
    // Generate all possible 2-digit combinations using numbers 1-6
    for (let i = 0; i < numbers.length; i++) { 
      for (let j = 0; j < numbers.length; j++) {
        combinations.push(`@y@${numbers[i]},${numbers[j]}`);
      }
    }
  }
  return combinations;
}


// Function for different
async function funHandingDifferent(game, join_bet, game_type) {
  const [k3] = await connection.query(
    `SELECT * FROM k3 WHERE status = 1 AND game = ${game} ORDER BY id DESC LIMIT 2`
  );

  let k3Info = k3[0];
  console.log("k3Info44444--", k3Info);
  if ('first' === game_type) {
      // Generate all combinations
      const allCombinations = generateCombinations(game_type);
      console.log("allCombinations...........allCombinations3333333",allCombinations)
      console.log("allCombinations...........allCombinations333333333",allCombinations.length)
      if (allCombinations.length === 0) return; // No combinations, exit early
      // Prepare SQL placeholders
      // Generate placeholders dynamically to match the exact number of elements in allCombinations
      const placeholders = new Array(allCombinations.length).fill('?').join(',');
      const params = [Number(0), game, join_bet, 'unlike', ...allCombinations]; // Flatten the array just in case
      // Fetch relevant bets with a properly formatted query
      const query = `
        SELECT * FROM result_k3 
        WHERE status = ? 
        AND game = ? 
        AND join_bet = ? 
        AND typeGame = ? 
        AND bet IN (${placeholders})
      `;
      // Execute query with the prepared statement
      const [different_number_bet] = await connection.execute(query, params);
      console.log("Fetched bets:", different_number_bet);
      // Convert result into { 'bet_value': amount }
      const finalBetObject = calculateBetTotals(different_number_bet);
      console.log("finalBetObject---",finalBetObject)
      // Check if all keys exist using filter()
      const missingKeys = allCombinations.filter(key => !Object.hasOwn(finalBetObject, key));
      console.log("missingKeys444444444-", missingKeys)
      let updatedResult = k3Info.result;
      if (missingKeys.length > 0) {  
        console.log("missing keyyyyyyyys block")
        const win = missingKeys[Math.floor(Math.random() * missingKeys.length)];
        const winNumber = win.replace(/[^0-9]/g, ''); // Remove everything except digits
    
        // Append the new number while preserving format
        updatedResult = updatedResult.endsWith(",") 
          ? updatedResult + winNumber + "," 
          : updatedResult + `|${winNumber},`;
        
        // Update status = 2 for missing bets
        for (const key of allCombinations) {
            if (finalBetObject.hasOwnProperty(key)) {  // Ensure only keys are updated
                await connection.execute(
                    `UPDATE result_k3 SET status = ? WHERE status = ? AND game = ? AND join_bet = ? AND typeGame = ? AND bet = ?`,
                    [2, 0, game, join_bet, 'unlike', key]
                );
            }
        }
        console.log("updatedResult444444----",updatedResult)
         // **UPDATE DATABASE**
        await connection.execute(
          `UPDATE k3 SET result = ? WHERE period = ? AND game = ?`,
          [updatedResult, k3Info.period, game]
        );
        return; // Exit only after all updates are completed
    }else{
      console.log("least bet numberrr blockkkkkkkkkkkk")
        // Find the key with the lowest amount
      let minKey = null;
      let minValue = Infinity;
      for (const key of allCombinations) {
          const value = finalBetObject[key] || 0; // Default to 0
          if (value < minValue) {
              minValue = value;
              minKey = key;
          }
      }
      if (!minKey) return; // Failsafe check
      const winNumber = minKey.replace(/[^0-9]/g, ''); // Remove everything except digits
    
        // Append the new number while preserving format
        updatedResult = updatedResult.endsWith(",") 
          ? updatedResult + winNumber + "," 
          : updatedResult + `|${winNumber},`;
      // Update all keys, setting status = 0 for minKey and status = 2 for others
      for (const key of allCombinations) {
          await connection.execute(
              `UPDATE result_k3 SET status = ? 
              WHERE status = ? AND game = ? AND join_bet = ? AND typeGame = ? AND bet = ?`,
              [key === minKey ? 0 : 2, 0, game, join_bet, 'unlike', key]
          );
      }
      console.log("updatedResult444444444(11111)---", updatedResult)
      // **UPDATE DATABASE**
      await connection.execute(
        `UPDATE k3 SET result = ? WHERE period = ? AND game = ?`,
        [updatedResult, k3Info.period, game]
      );

    }
  }else if('second' === game_type) {
    // Fetch all bets where status = 0
    const [bets] = await connection.execute(
      `SELECT bet, amount FROM result_k3 WHERE status = ? AND game = ? AND join_bet = ? AND typeGame = ? AND bet = ?`,
      [0, game, join_bet, 'unlike', '@u@']
    );
  
    let resultText;
  
    if (bets.length === 0) {
      // No bets to process, generate a random result
      resultText = Math.random() < 0.8 ? 'loss' : 'win';
      console.log(`No bets found. Randomly setting result as: ${resultText}`);
    } else {
      // 80% chance of losing
      const isLoss = Math.random() < 0.95;
      resultText = isLoss ? 'loss' : 'win';
  
      if (isLoss) {
        console.log("isloss", isLoss);
        // Update all bets to status = 2 (loss)
        for (const bet of bets) {
          await connection.execute(
            `UPDATE result_k3 SET status = ? WHERE status = ? AND game = ? AND join_bet = ? AND typeGame = ? AND bet = ?`,
            [2, 0, game, join_bet, 'unlike', bet.bet]
          );
        }
      } else {
        console.log("Win callllllllllllllllllllllll");
        // Find the bet with the least amount
        let minBet = bets[0]; // Assume first bet is the lowest
        for (const bet of bets) {
          if (bet.amount < minBet.amount) {
            minBet = bet;
          }
        }
        // Update bets: minBet gets status = 1, others get status = 2
        for (const bet of bets) {
          const status = bet.bet === minBet.bet ? 1 : 2;
          await connection.execute(
            `UPDATE result_k3 SET status = ? WHERE status = ? AND game = ? AND join_bet = ? AND typeGame = ? AND bet = ?`,
            [status, 0, game, join_bet, 'three-same', bet.bet]
          );
        }
      }
    }
  
    if (k3.length > 0) {
      const currentResult = k3Info.result;
      const period = k3Info.period;
      const generate_random_number = generateCustomThreeDigit();
      const updatedResult = `${currentResult}${resultText},`;
  
      // Update the result in k3
      await connection.execute(
        `UPDATE k3 SET result = ? WHERE game = ? AND period = ?`,
        [updatedResult, game,period ]
      );
  
      console.log(`Updated k3 result for period ${period}: ${updatedResult}`);
    }
  }
  
  // else if('second' === game_type){
  //   /**
  //    * 1. pick the recors from the database where status = 0 
  //    * 2. most of the time like 80% of the time the game will loose with status = 2 and 20 % of the time the game will win with status = 1
  //    */
  //   // Fetch all bets where status = 0
  //   const [bets] = await connection.execute(
  //     `SELECT bet, amount FROM result_k3 WHERE status = ? AND game = ? AND join_bet = ? AND typeGame = ? AND bet = ?`,
  //     [0, game, join_bet, 'unlike', '@u@']
  //   );
  //   console.log("bets----", bets)
  //   if (bets.length === 0) return; // No bets to process
  //   // 80% chance of losing
  //   const isLoss = Math.random() < 0.8;
  //   if (isLoss) {
  //     // Update all bets to status = 2 (loss)
  //     for (const bet of bets) {
  //       await connection.execute(
  //         `UPDATE result_k3 SET status = ? WHERE status = ? AND game = ? AND join_bet = ? AND typeGame = ? AND bet = ?`,
  //         [2, 0, game, join_bet, 'unlike', bet.bet]
  //       );
  //     }
  //   } else {
  //     // Find the bet with the least amount
  //     let minBet = bets[0]; // Assume first bet is the lowest
  //     for (const bet of bets) {
  //       if (bet.amount < minBet.amount) {
  //         minBet = bet;
  //       }
  //     }
  //     // Update bets: minBet gets status = 1, others get status = 2
  //     for (const bet of bets) {
  //       const status = bet.bet === minBet.bet ? 1 : 2;
  //       await connection.execute(
  //         `UPDATE result_k3 SET status = ? WHERE status = ? AND game = ? AND join_bet = ? AND typeGame = ? AND bet = ?`,
  //         [status, 0, game, join_bet, 'unlike', bet.bet]
  //       );
  //     }
  //   }
  // }
  
  else if('third' === game_type){
      // Generate all combinations
      const allCombinations = generateCombinations(game_type);
      console.log("allCombinations...........allCombinations4444444444",allCombinations)
      console.log("allCombinations...........allCombinations4444444444",allCombinations.length)

      if (allCombinations.length === 0) return; // No combinations, exit early
      // Prepare SQL placeholders
      const placeholders = allCombinations.map(() => '?').join(',');
      const params = [0, game, join_bet, 'unlike', ...allCombinations];
      // Fetch relevant bets
      const query = `
        SELECT * FROM result_k3 
        WHERE status = ? 
        AND game = ? 
        AND join_bet = ? 
        AND typeGame = ? 
        AND bet IN (${placeholders})
      `;
      const [different_number_bet] = await connection.execute(query, params);
      // Convert result into { 'bet_value': amount }
      const finalBetObject = calculateBetTotals(different_number_bet);
      console.log("finalBetObject----444444-------", finalBetObject)
      // Check if all keys exist using every()
      const missingKeys = allCombinations.filter(key => !Object.hasOwn(finalBetObject, key));
      console.log("missingKeys----444444-------", missingKeys)

      let updatedResult = k3Info.result;
      if (missingKeys.length > 0) {
        console.log("calll...........1111111111111")
        const win = missingKeys[Math.floor(Math.random() * missingKeys.length)];
        const winNumber = win.replace(/[^0-9]/g, '');

        // Append the new number while preserving format
        updatedResult = updatedResult.endsWith(",") 
          ? updatedResult + winNumber  
          : updatedResult + `|${winNumber},`;

        // Update status = 2 for missing bets
        for (const key of allCombinations) {
            if (finalBetObject.hasOwnProperty(key)) {  // Ensure only keys are updated
                await connection.execute(
                    `UPDATE result_k3 SET status = ? WHERE status = ? AND game = ? AND join_bet = ? AND typeGame = ? AND bet = ?`,
                    [2, 0, game, join_bet, 'unlike', key]
                );
            }
        }
        // Function to generate a random 3-digit number (each digit between 1-6)
        const getRandomThreeDigitNumber = () => {
          return `${Math.floor(Math.random() * 6) + 1}${Math.floor(Math.random() * 6) + 1}${Math.floor(Math.random() * 6) + 1}`;
        };
        // Append the random 3-digit number at the end of the string
        const finalResult = updatedResult + ',' + getRandomThreeDigitNumber();
        console.log("finalResult---",finalResult);
        // **UPDATE DATABASE**
        await connection.execute(
          `UPDATE k3 SET result = ? WHERE period = ? AND game = ?`,
          [finalResult, k3Info.period, game]
        );
        return; // Exit only after all updates are completed
    }else{
        // Find the key with the lowest amount
        console.log("calll...........22222222222222")

        let minKey = null;
        let minValue = Infinity;
        for (const key of allCombinations) {
            const value = finalBetObject[key] || 0; // Default to 0
            if (value < minValue) {
                minValue = value;
                minKey = key;
            }
        }
        if (!minKey) return; // Failsafe check
        const winNumber = minKey.replace(/[^0-9]/g, '');
        // Append the new number while preserving format
        updatedResult = updatedResult.endsWith(",") 
          ? updatedResult + winNumber 
          : updatedResult + `|${winNumber},`;
        
        // Update all keys, setting status = 0 for minKey and status = 2 for others
        for (const key of allCombinations) {
            await connection.execute(
                `UPDATE result_k3 SET status = ? 
                WHERE status = ? AND game = ? AND join_bet = ? AND typeGame = ? AND bet = ?`,
                [key === minKey ? 0 : 2, 0, game, join_bet, 'unlike', key]
            );
        }
        const getRandomThreeDigitNumber = () => {
          return `${Math.floor(Math.random() * 6) + 1}${Math.floor(Math.random() * 6) + 1}${Math.floor(Math.random() * 6) + 1}`;
        };
        // Append the random 3-digit number at the end of the string
        const finalResult = updatedResult + ',' + getRandomThreeDigitNumber();
        console.log("finalResult===", finalResult);
        // **UPDATE DATABASE**
        await connection.execute(
          `UPDATE k3 SET result = ? WHERE period = ? AND game = ?`,
          [finalResult, k3Info.period, game]
        );
    }
    }
}


async function plusMoney(game) {
  console.log("Hello from plus moneyyyyyyyyyyyyyyyyyyy")
  console.log("game:---------------->", game)

  const [order] = await connection.execute(
    `SELECT id, phone, bet, price, money, fee, amount, result, typeGame FROM result_k3 WHERE status = 0 AND game = ${game} `,
  );

  for (let i = 0; i < order.length; i++) {
    let orders = order[i];
  

    let phone = orders.phone;
    let id = orders.id;
    let nhan_duoc = 0;
    let result = orders.result;
    if (orders.typeGame == "total") {
      let arr = orders.bet.split(",");

      console.log("arr", arr)
      let totalResult = orders.result.split("");

      console.log("totalResult", totalResult)
      let totalResult2 = 0;
      for (let i = 0; i < 3; i++) {
        totalResult2 += Number(totalResult[i]);
      }
      let total = orders.money / arr.length / orders.amount;
      let fee = total * 0.02;
      let price = total - fee;

      let lengWin = arr.filter(function (age) {
        return age == totalResult2;
      });
      console.log("lengWin", lengWin)

      let lengWin2 = arr.filter(function (age) {
        return !isNumber(age);
      });

      // if (totalResult2 % 2 == 0 && lengWin2.includes("c")) {
      //   nhan_duoc += price * 1.92;
      // }

      // if (totalResult2 % 2 != 0 && lengWin2.includes("l")) {
      //   nhan_duoc += price * 1.92;
      // }

      // if (totalResult2 >= 11 && totalResult2 <= 18 && lengWin2.includes("b")) {
      //   nhan_duoc += price * 1.92;
      // }

      // if (totalResult2 >= 3 && totalResult2 <= 11 && lengWin2.includes("s")) {
      //   nhan_duoc += price * 1.92;
      // }

      let get = 0;
      switch (lengWin[0]) {
        case "3":
          get = 207.36;
          break;
        case "3":
          get = 69.12;
          break;
        case "5":
          get = 34.56;
          break;
        case "6":
          get = 20.74;
          break;
        case "7":
          get = 13.83;
          break;
        case "8":
          get = 9.88;
          break;
        case "9":
          get = 8.3;
          break;
        case "10":
          get = 7.68;
          break;
        case "11":
          get = 7.68;
          break;
        case "12":
          get = 8.3;
          break;
        case "13":
          get = 9.88;
          break;
        case "14":
          get = 13.83;
          break;
        case "15":
          get = 20.74;
          break;
        case "16":
          get = 34.56;
          break;
        case "17":
          get = 69.12;
          break;
        case "18":
          get = 207.36;
          break;
      }

      const price_win = {
        3: 207.36,
        4: 69.12,
        5: 34.56,
        6: 20.74,
        7: 13.83,
        8: 9.88,
        9: 8.3,
        10: 7.68,
        11: 7.68,
        12: 8.3,
        13: 9.88,
        14: 13.83,
        15: 20.74,
        16: 34.56,
        17: 69.12,
        18: 207.36,
      }
     console.log("get", get)

      if (isNumber(orders.bet)) {
        let fee = orders.money * 0.02;
        let price = orders.money - fee;
        nhan_duoc += orders.money * price_win[arr[0]];
      } else {
        nhan_duoc += parseFloat(orders.price) * 2;
      }

      await connection.execute(
        "UPDATE `result_k3` SET `get` = ?, `status` = 1 WHERE `id` = ? ",
        [nhan_duoc, id],
      );

      const sql = "UPDATE `users` SET `money` = `money` + ? WHERE `phone` = ? ";
      await connection.execute(sql, [nhan_duoc, phone]);
    }
    nhan_duoc = 0;
    if (orders.typeGame == "two-same") { // done
      let kq = result.split("");
      let kq1 = kq[0] + kq[1];
      let kq2 = kq[1] + kq[2];
      let array = orders.bet.split("@");
      let arr1 = array[0].split(",");
      let arr2 = array[1];
      let arr3 = array[1].split("&");
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] != "") {
          let check1 = arr1[i].includes(kq1);
          let check2 = arr1[i].includes(kq2);
          if (check1 || check2) {
            let lengthArr = 0;
            let count = 0;
            if (arr2.length > 0) {
              let arr = arr2.split("&");
              for (let i = 0; i < arr.length; i++) {
                arr2 = arr[i].split("|");
                count = arr2[1].split(",").length;
              }
              lengthArr = arr.length;
              count = count;
            }
            let total =
              orders.money / orders.amount / (lengthArr + arr1.length);
            nhan_duoc += total * 12.83;
          }
        }
      }
      arr2 = array[1];
      for (let i = 0; i < arr3.length; i++) {
        if (arr3[i] != "") {
          let files = arr3[i].split("|");
          let check1 = files[0].includes(kq1);
          let check2 = files[0].includes(kq2);
          if (check1 || check2) {
            let lengthArr = 0;
            let count = 0;
            if (arr2.length > 0) {
              let arr = arr2.split("&");
              for (let i = 0; i < arr.length; i++) {
                arr2 = arr[i].split("|");
                count = arr2[1].split(",").length;
              }
              lengthArr = arr.length;
              count = count;
            }
            let bale = 0;
            for (let i = 0; i < arr1.length; i++) {
              if (arr1[i] != "") {
                bale = arr1.length;
              }
            }
            let total = orders.money / orders.amount / (lengthArr + bale);
            nhan_duoc += total * 69.12;
          }
        }
      }
      nhan_duoc = orders.money * 2;

      await connection.execute(
        "UPDATE `result_k3` SET `get` = ?, `status` = 1 WHERE `id` = ? ",
        [nhan_duoc, id],
      );
      const sql = "UPDATE `users` SET `money` = `money` + ? WHERE `phone` = ? ";
      await connection.execute(sql, [nhan_duoc, phone]);
    }

    nhan_duoc = 0;
    if (orders.typeGame == "three-same") {
      let kq = result;

      let array = orders.bet.split("@");
      let arr1 = array[0].split(",");
      let arr2 = array[1];

      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] != "") {
          let check1 = arr1[i].includes(kq);
          let bala = 0;
          if (arr2 != "") {
            bala = 1;
          }
          if (check1) {
            let total = orders.money / (arr1.length + bala) / orders.amount;
            nhan_duoc += total * 2 - orders.fee;
          }
        }
      }
      if (arr2 != "") {
        let bala = 0;
        for (let i = 0; i < arr1.length; i++) {
          if (arr1[i] != "") {
            bala = arr1.length;
          }
        }
        let total = orders.money / (1 + bala) / orders.amount;
        console.log("total", total)
        nhan_duoc += (total * 2 - orders.fee) * 2;
      }

      nhan_duoc = orders.money * 2;
      console.log("nhan_duoc_two==========>", nhan_duoc)
      await connection.execute(
        "UPDATE `result_k3` SET `get` = ?, `status` = ? WHERE `id` = ? ",
        [nhan_duoc , 1, id],
      );
      const sql = "UPDATE `users` SET `money` = `money` + ? WHERE `phone` = ? ";
      await connection.execute(sql, [nhan_duoc, phone]);
    }

    nhan_duoc = 0;
    console.log("orders..............................", orders)
    if (orders.typeGame == "unlike") {
      console.log("result", result)
      let kq = result.split("");
      let array = orders.bet.split("@");
      let arr1 = array[0]?.split(",");
      console.log("arr1................", arr1)
      let arr2 = array[1];
      let arr3 = array[2]?.split(",");

      for (let i = 0; i < arr1?.length; i++) {
        if (arr1[i] != "") {
          let check1 = kq.includes(arr1[i]);
          let bala = 0;
          let bala2 = 0;
          for (let i = 0; i < arr3?.length; i++) {
            if (arr3[i].length != "") {
              bala = arr3.length;
            }
          }
          if (arr2 == "u") {
            bala2 = 1;
          }
          if (!check1) {
            let total =
              orders.money / (arr1?.length + bala + bala2) / orders.amount;
            nhan_duoc += total * 34.56 - orders.fee;
            if (arr2 == "u") {
              let total = orders.money / (1 + bala + bala2) / orders.amount;
              nhan_duoc += (total - orders.fee) * 8.64;
            }
          }
        }
      }
      if (arr2 == "u") {
        let bala = 0;
        let bala2 = 0;
        for (let i = 0; i < arr1?.length; i++) {
          if (arr1[i] != "") {
            bala = arr1.length;
          }
        }
        for (let i = 0; i < arr3?.length; i++) {
          if (arr3[i].length != "") {
            bala2 = arr3.length;
          }
        }
        let total = orders.money / (1 + bala + bala2) / orders.amount;
        nhan_duoc += (total - orders.fee) * 8.64;
      }
      for (let i = 0; i < arr3?.length; i++) {
        if (arr1[i] != "") {
          let check1 = kq.includes(arr3[i]);
          let bala = 0;
          for (let i = 0; i < arr1.length; i++) {
            if (arr1[i].length != "") {
              bala = arr1.length;
            }
          }
          if (!check1) {
            let total = orders.money / (arr3?.length + bala) / orders.amount;
            nhan_duoc += total * 6.91 - orders.fee;
          }
        }
      }
      await connection.execute(
        "UPDATE `result_k3` SET `get` = ?, `status` = 1 WHERE `id` = ? ",
        [nhan_duoc, id],
      );
      const sql = "UPDATE `users` SET `money` = `money` + ? WHERE `phone` = ? ";
      await connection.execute(sql, [nhan_duoc, phone]);
    }
  }
}


// This function is calling to get the k3 result update for wining the game
const handlingK3 = async (typeid) => {
  try {
    let game = Number(typeid);
    console.log("game11111111111111", game)


    await funHanding(game);
    await funHandingTwoSame(game, 2 , 'first')
    await funHandingTwoSame(game, 2 , 'second')
    await funHandingThreeSame(game, 3, 'first' )
    await funHandingThreeSame(game, 3, 'second')

    await funHandingDifferent(game, 4, "first")
    await funHandingDifferent(game, 4, "second")
    await funHandingDifferent(game, 4, "third")

    console.log("game222222222222222", game)

    await plusMoney(game);
  } catch (err) {
    console.log(err);
  }
};

const listOrderOld = async (req, res) => {
  let { gameJoin, pageno, pageto } = req.body;
  let auth = req.cookies.auth;

  let checkGame = ["1", "3", "5", "10"].includes(String(gameJoin));
  if (!checkGame || pageno < 0 || pageto < 0) {
    return res.status(200).json({
      code: 0,
      msg: "Không còn dữ liệu",
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

  const [k3] = await connection.query(
    `SELECT * FROM k3 WHERE status != 0 AND game = '${game}' ORDER BY id DESC LIMIT ${pageno}, ${pageto} `,
  );
  const [k3All] = await connection.query(
    `SELECT * FROM k3 WHERE status != 0 AND game = '${game}' `,
  );
  const [period] = await connection.query(
    `SELECT period FROM k3 WHERE status = 0 AND game = '${game}' ORDER BY id DESC LIMIT 1 `,
  );
  if (k3.length == 0) {
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
  if (!pageno || !pageto || !user[0] || !k3[0] || !period[0]) {
    return res.status(200).json({
      message: "Error!",
      status: false,
    });
  }
  let page = Math.ceil(k3All.length / 10);
  return res.status(200).json({
    code: 0,
    msg: "Get success",
    data: {
      gameslist: k3,
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

  const [user] = await connection.query(
    "SELECT `phone`, `code`, `invite`, `level`, `money` FROM users WHERE token = ? AND veri = 1 LIMIT 1 ",
    [auth],
  );
  const [result_5d] = await connection.query(
    `SELECT * FROM result_k3 WHERE phone = ? AND game = '${game}' ORDER BY id DESC LIMIT ${Number(pageno) + "," + Number(pageto)}`,
    [user[0].phone],
  );
  const [result_5dAll] = await connection.query(
    `SELECT * FROM result_k3 WHERE phone = ? AND game = '${game}' ORDER BY id DESC `,
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
    msg: "Get success",
    data: {
      gameslist: datas,
    },
    page: page,
    status: true,
  });
};
async function generateGameResult(game) {
  try {
    // Fetch orders for the current game
    const [orders] = await connection.execute(
      `SELECT typeGame, bet, money, amount FROM result_k3 WHERE status = 0 AND game = ?`,
      [game],
    );

    // Define payout rules
    const payoutRules = {
      total: {
        3: 207.36,
        4: 69.12,
        5: 34.56,
        6: 20.74,
        7: 13.83,
        8: 9.88,
        9: 8.3,
        10: 7.68,
        11: 7.68,
        12: 8.3,
        13: 9.88,
        14: 13.83,
        15: 20.74,
        16: 34.56,
        17: 69.12,
        18: 207.36,
        c: 2,
        l: 2,
        b: 2,
        s: 2,
      },
      two: {
        twoSame: 12.83,
        twoD: 69.12,
      },
      three: {
        threeD: 207.36,
        threeSame: 34.56,
      },
      unlike: {
        unlikeThree: 34.56,
        threeL: 8.64,
        unlikeTwo: 6.91,
      },
    };

    // Call makeGameResult to calculate the result
    const result = await makeGameResult(3, orders, payoutRules);

    return result;
  } catch (error) {
    console.error("Error generating game result:", error);
    throw new Error("Failed to generate game result");
  }
}

// Updated makeGameResult to support async/await
async function makeGameResult(length, orders, payoutRules) {
  const characters = "123456";
  const possibleResults = [];

  // Generate all possible results
  for (let i = 0; i < characters.length; i++) {
    for (let j = 0; j < characters.length; j++) {
      for (let k = 0; k < characters.length; k++) {
        possibleResults.push(
          `${characters[i]}${characters[j]}${characters[k]}`,
        );
      }
    }
  }

  // Helper function to calculate payout for a specific result
  function calculatePayout(result, orders, payoutRules) {
    let totalPayout = 0;

    for (let order of orders) {
      let nhan_duoc = 0;
      const { typeGame, bet, money, amount } = order;
      const pricePerBet = money / amount;
      const fee = pricePerBet * 0.02;
      const price = pricePerBet - fee;

      if (typeGame === "total") {
        let arr = bet.split(",");
        let totalResult = result
          .split("")
          .reduce((sum, num) => sum + Number(num), 0);

        let matches = arr.filter((b) => b == totalResult);

        if (totalResult % 2 === 0 && arr.includes("c")) nhan_duoc += price * 2;
        if (totalResult % 2 !== 0 && arr.includes("l")) nhan_duoc += price * 2;
        if (totalResult >= 11 && totalResult <= 18 && arr.includes("b"))
          nhan_duoc += price * 2;
        if (totalResult >= 3 && totalResult <= 10 && arr.includes("s"))
          nhan_duoc += price * 2;

        if (matches.length > 0) {
          nhan_duoc += price * (payoutRules.total[matches[0]] || 0);
        }
      } else if (typeGame === "two-same") {
        let arr1 = bet.split("@")[0].split(",");
        let kq = result.split("");
        let kq1 = kq[0] + kq[1];
        let kq2 = kq[1] + kq[2];

        for (let b of arr1) {
          if (b.includes(kq1) || b.includes(kq2)) {
            nhan_duoc +=
              (money / amount / arr1.length) * payoutRules.two.twoSame;
          }
        }
      } else if (typeGame === "three-same") {
        let kq = result;
        let arr = bet.split("@")[0].split(",");

        for (let b of arr) {
          if (b.includes(kq)) {
            nhan_duoc +=
              (money / amount / arr.length) * payoutRules.three.threeD;
          }
        }
      } else if (typeGame === "unlike") {
        let arr1 = bet.split("@")[0].split(",");
        let arr2 = bet.split("@")[2]?.split(",") || [];
        let kq = result.split("");

        for (let b of arr1) {
          if (kq.includes(b)) {
            nhan_duoc +=
              (money / amount / arr1.length) * payoutRules.unlike.unlikeThree;
          }
        }

        for (let b of arr2) {
          if (kq.includes(b)) {
            nhan_duoc +=
              (money / amount / arr2.length) * payoutRules.unlike.unlikeTwo;
          }
        }
      }

      totalPayout += nhan_duoc;
    }

    return totalPayout;
  }

  // Evaluate all possible results to find the one with the minimum payout
  let zeroPayoutResults = [];
  let minPayoutResult = { result: "", payout: Infinity };

  for (let result of possibleResults) {
    const payout = calculatePayout(result, orders, payoutRules);

    if (payout === 0) {
      zeroPayoutResults.push(result);
    }

    if (payout < minPayoutResult.payout) {
      minPayoutResult = { result, payout };
    }
  }

  // Return a zero-payout result if possible, else return the minimum-payout result
  if (zeroPayoutResults.length > 0) {
    return zeroPayoutResults[
      Math.floor(Math.random() * zeroPayoutResults.length)
    ];
  }

  return minPayoutResult.result;
}

const k3Controller = {
  K3Page,
  betK3,
  addK3,
  handlingK3,
  listOrderOld,
  GetMyEmerdList,
  funHandingTwoSame,
  plusMoney,
};

export default k3Controller;
