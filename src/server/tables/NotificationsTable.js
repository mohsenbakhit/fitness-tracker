// const { withOracleDB } = require("./../utils/envUtil");

// const dropTable = async () => {
//   return await withOracleDB(async (connection) => {
//     try{
//       await connection.execute(`DROP SEQUENCE rid_sequence`);
//     } catch (e) {}
//     try {
//       await connection.execute(`DROP TRIGGER notifications_insert_trigger`);
//     } catch (e) {}
//     try {
//       await connection.execute(`DROP TABLE Notifications`);
//     } catch (e) {}
    
//     return true;
//   }).catch(() => {
//     return false;
//   });
// };

// const intializeTable = async () => {
//   return await withOracleDB(async (connection) => {
//     await dropTable();

//     const result = await connection.execute(`
//         CREATE TABLE Notifications(
//             rid INTEGER,
//             userid INTEGER,
//             msg VARCHAR(150),
//             PRIMARY KEY (rid, userid),
//             FOREIGN KEY (userid) REFERENCES FUser(userid) ON DELETE CASCADE
//         )
//     `);

//     const sequence = await connection.execute(`
//         CREATE SEQUENCE rid_sequence
//             START WITH 1
//             INCREMENT BY 1
//     `);

//     const trigger = await connection.execute(`
//         CREATE OR REPLACE TRIGGER notifications_insert_trigger
//         BEFORE INSERT
//         ON Notifications
//         REFERENCING NEW AS NEW
//         FOR EACH ROW
//         BEGIN
//         SELECT rid_sequence.nextval INTO :NEW.rid FROM dual;
//         END;
//     `);
//     return true;
//   }).catch(() => {
//     return false;
//   });
// };

// const loadDummyData = async () => {
//   try {
//     await insert(1, "Celebrate victories. Every step is a step toward health!");
//     await insert(2, "Sunshine boosts mood. Get outside for fresh air.");
//     await insert(3, "Listen to your body. Rest when feeling fatigued.");
//     await insert(4, "Laugh often! Laughter has health benefits.");
//     await insert(5, "Prioritize self-care. Take time to recharge daily.");
//     await insert(6, "Build support. Workout buddies keep you accountable.");
//     await insert(7, "Stay consistent. Small habits lead to big results.");
//     await insert(8, "Hydrate with herbal teas for added flavor and benefits.");
//     await insert(9, "Quality sleep fuels recovery. Aim for 7-9 hours nightly.");
//     await insert(10, "Posture matters. Sit up straight, stand tall, support your spine.");
//     await insert(11, "New goals, new challenges. Push your limits, see progress.");
//     await insert(12, "Outdoor workouts boost mood. Find joy in movement.");
//     await insert(13, "Cardio and strength for diversity. Keep workouts effective.");
//     await insert(14, "Stay hydrated with infused water. Delicious and healthy.");
//     return true;
//   } catch (e) {
//     console.log(e);
//     return false;
//   }
// };

// async function insert(userid, msg) {
//   const id = Date.now();
//   return await withOracleDB(async (connection) => {
//     const result = await connection.execute(
//       `INSERT INTO Notifications (userid, msg) VALUES (:userid, :msg)`,
//       [userid, msg],
//       { autoCommit: true }
//     );

//     return result.rowsAffected && result.rowsAffected > 0;
//   }).catch(() => {
//     return false;
//   });
// }

// async function fetch() {
//   return await withOracleDB(async (connection) => {
//     const result = await connection.execute("SELECT * FROM Notifications");
//     return result.rows;
//   }).catch(() => {
//     return [];
//   });
// }

// async function fetchKeys() {
//   return await withOracleDB(async (connection) => {
//     const result = await connection.execute("SELECT (rid) FROM Notifications");
//     return result.rows;
//   }).catch(() => {
//     return [];
//   });
// }

// module.exports = {
//   intializeTable,
//   loadDummyData,
//   fetch,
//   fetchKeys,
//   dropTable,
// };

const { withOracleDB } = require("./../utils/envUtil");

const dropTable = async () => {
  return await withOracleDB(async (connection) => {
    try{
      await connection.execute(`DROP SEQUENCE rid_sequence`);
    } catch (e) {}
    try {
      await connection.execute(`DROP TRIGGER notifications_insert_trigger`);
    } catch (e) {}
    try {
      await connection.execute(`DROP TABLE Notifications`);
    } catch (e) {}
    
    return true;
  }).catch(() => {
    return false;
  });
};

const intializeTable = async () => {
  return await withOracleDB(async (connection) => {
    await dropTable();

    const result = await connection.execute(`
        CREATE TABLE Notifications(
            rid INTEGER,
            userid INTEGER,
            msg VARCHAR(150),
            PRIMARY KEY (rid, userid),
            FOREIGN KEY (userid) REFERENCES FUser(userid) ON DELETE CASCADE
        )
    `);

    const sequence = await connection.execute(`
        CREATE SEQUENCE rid_sequence
            START WITH 1
            INCREMENT BY 1
    `);

    const trigger = await connection.execute(`
        CREATE OR REPLACE TRIGGER notifications_insert_trigger
        BEFORE INSERT
        ON Notifications
        REFERENCING NEW AS NEW
        FOR EACH ROW
        BEGIN
        SELECT rid_sequence.nextval INTO :NEW.rid FROM dual;
        END;
    `);
    return true;
  }).catch(() => {
    return false;
  });
};

const loadDummyData = async () => {
  try {
    await insert(1, "Celebrate victories. Every step is a step toward health!");
    await insert(2, "Sunshine boosts mood. Get outside for fresh air.");
    await insert(3, "Listen to your body. Rest when feeling fatigued.");
    await insert(4, "Laugh often! Laughter has health benefits.");
    await insert(5, "Prioritize self-care. Take time to recharge daily.");
    await insert(6, "Build support. Workout buddies keep you accountable.");
    await insert(7, "Stay consistent. Small habits lead to big results.");
    await insert(8, "Hydrate with herbal teas for added flavor and benefits.");
    await insert(9, "Quality sleep fuels recovery. Aim for 7-9 hours nightly.");
    await insert(10, "Posture matters. Sit up straight, stand tall, support your spine.");
    await insert(11, "New goals, new challenges. Push your limits, see progress.");
    await insert(12, "Outdoor workouts boost mood. Find joy in movement.");
    await insert(13, "Cardio and strength for diversity. Keep workouts effective.");
    await insert(14, "Stay hydrated with infused water. Delicious and healthy.");
    await loadDummyDataForUser(1);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

const loadDummyDataForUser = async (userid) => {
  const getRandomMessage = () => {
    const messages = [
      "Celebrate victories. Every step is a step toward health!",
      "Sunshine boosts mood. Get outside for fresh air.",
      "Listen to your body. Rest when feeling fatigued.",
      "Laugh often! Laughter has health benefits.",
      "Prioritize self-care. Take time to recharge daily.",
      "Build support. Workout buddies keep you accountable.",
      "Stay consistent. Small habits lead to big results.",
      "Hydrate with herbal teas for added flavor and benefits.",
      "Quality sleep fuels recovery. Aim for 7-9 hours nightly.",
      "Posture matters. Sit up straight, stand tall, support your spine.",
      "New goals, new challenges. Push your limits, see progress.",
      "Outdoor workouts boost mood. Find joy in movement.",
      "Cardio and strength for diversity. Keep workouts effective.",
      "Stay hydrated with infused water. Delicious and healthy."
    ];

    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  };

  try {
    let messagesInserted = 0;

    // Insert random messages until the minimum count is reached
    while (messagesInserted < 5) {
      await insert(userid, getRandomMessage());
      messagesInserted++;
    }

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};


async function insert(userid, msg) {
  const id = Date.now();
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `INSERT INTO Notifications (userid, msg) VALUES (:userid, :msg)`,
      [userid, msg],
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
  }).catch(() => {
    return false;
  });
}

async function fetch() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute("SELECT * FROM Notifications");
    return result.rows;
  }).catch(() => {
    return [];
  });
}

async function fetchUserNotifications(id) {
  return await withOracleDB(async (connection) => {
      const result = await connection.execute("SELECT * FROM Notifications WHERE userid = :1", [id]);
      return result.rows;
  });
}


async function fetchKeys() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute("SELECT (rid) FROM Notifications");
    return result.rows;
  }).catch(() => {
    return [];
  });
}

async function deleteNotification(rid) {
  return await withOracleDB(async (connection) => {
    await connection.execute(
      `DELETE FROM Notifications WHERE rid=:rid`,
      [rid],
      { autoCommit: true }
    );
    return true;
  }).catch(() => {
    return false;
  });
}

module.exports = {
  intializeTable,
  loadDummyData,
  loadDummyDataForUser,
  fetch,
  fetchUserNotifications,
  fetchKeys,
  dropTable,
  deleteNotification
};
