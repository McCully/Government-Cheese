var connectionString = "";
//what thisssss

if(process.env.DATABASE_URL != undefined) {
  connectionString = process.env.DATABASE_URL + 'ssl';
} else {
  connectionString = 'postgres://localhost:5432/users';
}

module.exports = connectionString;
