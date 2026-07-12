// Hardcoded credentials — fine for a single-candidate personal tool.
// Not a real auth system: swap for env vars + hashed passwords before
// this is ever multi-user or holds anything sensitive.
const USERS = {
  shantanu: "cat2026", // admin
  ruchi: "cat2026",    // candidate
};

const SECRET = "cat2026-lean-agent-team";

function makeToken(username) {
  return Buffer.from(`${username}:${SECRET}`).toString("base64");
}

function verifyToken(token) {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf8");
    const [username, secret] = decoded.split(":");
    if (secret === SECRET && Object.prototype.hasOwnProperty.call(USERS, username)) {
      return username;
    }
  } catch (e) {
    // fall through
  }
  return null;
}

function checkCredentials(username, password) {
  return Object.prototype.hasOwnProperty.call(USERS, username) && USERS[username] === password;
}

module.exports = { makeToken, verifyToken, checkCredentials };
