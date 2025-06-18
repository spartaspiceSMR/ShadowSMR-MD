const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNEtFUjE4WGcra1VZSmJ3VCtqeFVhMXdwaTZzWEhaU0tGMVNlblVBb2luND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS1dmR1hhdzdSblRJMjRzZDkwdkhkNW0zMnVLR2xoa3ptT3R0S0JWcGJpWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVTnNQK0NSSkxUbWttZTZVWXkybkxUWkFrdHJVcGEwdTBaSXJwSG55TWs4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJod1I1SStPYlgxVC82eEk1bWZCM0VPaUpXelpjSHhwQzBma0R5WlNwcHhFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNCMDlyR3N4eDFaUmI1bUNGYjcyTnZIb2I1empha1NKMUhmb0orT2xhbVE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhoRDNmRGo0a01RemlvMDBsRlh1VlpDeEUrMkxlZDk3MlF6YWllTDR1akk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEZJdVBOQVZScjJESUkzMHE2NlBWNFc2dEtwNUNQVjlyenU4bUdDZG1WWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0xhM2hhb20yUy8yRVp6WnFtQTBhb3BMdXNoRkpWVWVZNW13ZEp2Z1ZGST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlpRFBvNnlpazNhRDBPMExibkJBRm5xTDJHelliYTR4WmFGUVNDcXlrNnVMOUpFOGhjVEV4SzNCRXBXcHo2cUVLd24vcVNJcGxDVkVCQTJJUG5kU0RBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTc1LCJhZHZTZWNyZXRLZXkiOiJ1QzU3dDlqN1ZVZG5TVFNUSzBDaWtQMFhNWjE3QUhWYmMydWs5YnlxLzhvPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NTc2ODYzMDEwNkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJENDY3Mjg2NDk4NkUzRTFCRTVDODQxNjMxQURCRTc5MiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ3Njc5NTI0fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTU3Njg2MzAxMDZAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMEFFRjFFQTBGQTBBRDdBNTk1RjZDMzlDMTFCQTRGRUIifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0NzY3OTUzN30seyJrZXkiOnsicmVtb3RlSmlkIjoiMjU1NzY4NjMwMTA2QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjQ5M0E0QkE3NjMyREU3RkYzNjBCRjA1QTMwM0RGQzFGIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDc2Nzk1NjZ9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IkI2SEVEUDNNIiwibWUiOnsiaWQiOiIyNTU3Njg2MzAxMDY6MzJAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiIxNjcwNzA0MTk0MDI5NTM6MzJAbGlkIiwibmFtZSI6Ik1yLkRlbmljIPCfh7nwn4e/In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNPbUd3TGtHRUkzeXJjRUdHQU1nQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJ3b0ljUmRaOVVQV3EzeTk1TCtrUGlWd3lESmFJU2ZzRkczRGZTdHFmRUZFPSIsImFjY291bnRTaWduYXR1cmUiOiJMYmw0MUdBYkJmWXRFamw2RjdkL3Bld3J3R0QyVHFnTTJKUDNVU2hpRXBIOUt5dnlRVFRzQmFaTTZEOWVjY1VMR2hlSmU5bkcwR3RrQ2dRd2VDUitBUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiYTVnRjlXQVdnWDJDOWJHcTJaRFNOd3Y2eThyYjg4Zy9nN2k3TU55eDg2VUpaWHRxdFJQMkE4V2JRWGkrR3FwamhoeHQ3M2FrdDBZLzZnS2g0QUtPQ1E9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTU3Njg2MzAxMDY6MzJAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCY0tDSEVYV2ZWRDFxdDh2ZVMvcEQ0bGNNZ3lXaUVuN0JSdHczMHJhbnhCUiJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FnSURRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ3Njc5NTE2LCJsYXN0UHJvcEhhc2giOiIzZ1BVSmsiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQURZTyJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "T-R-O-U-B-L-E-TECH",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " T-R-O-U-B-L-E ke",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'T-R-O-U-B-L-E-TECH',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/hvi870.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '1' ,
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

