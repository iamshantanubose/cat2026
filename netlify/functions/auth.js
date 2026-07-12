const { makeToken, checkCredentials } = require("./lib/auth-shared");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ error: "Bad request body" }) };
  }

  const { username, password } = body;
  if (!username || !password || !checkCredentials(username, password)) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Invalid username or password" }),
    };
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: makeToken(username), username }),
  };
};
