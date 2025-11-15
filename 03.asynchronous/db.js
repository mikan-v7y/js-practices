export function runSqlAsync(db, sql, params) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this);
      }
    });
  });
}

export function runStatementAsync(statement, params) {
  return new Promise((resolve, reject) => {
    statement.run(params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this);
      }
    });
  });
}

export function eachSqlAsync(db, sql, params, rowCallBack) {
  return new Promise((resolve, reject) => {
    db.each(
      sql,
      params,
      (err, row) => {
        if (err) {
          reject(err);
        } else {
          rowCallBack(row);
        }
      },
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      },
    );
  });
}

export function closeDb(db) {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
