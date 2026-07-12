const { verifyToken } = require("./lib/auth-shared");
const { personaStore } = require("./lib/blob-store");

exports.handler = async (event) => {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  const token = event.queryStringParameters && event.queryStringParameters.token;
  const username = verifyToken(token);
  if (!username) {
    return { statusCode: 401, body: JSON.stringify({ error: "Unauthorized" }) };
  }

  const topic = event.queryStringParameters && event.queryStringParameters.topic;
  const store = personaStore();

  if (topic) {
    const data = (await store.get(`${username}/${topic}`, { type: "json" })) || [];
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
  }

  // No topic specified: return every topic's records for this user.
  const { blobs } = await store.list({ prefix: `${username}/` });
  const result = {};
  for (const b of blobs) {
    const topicKey = b.key.slice(username.length + 1);
    result[topicKey] = (await store.get(b.key, { type: "json" })) || [];
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(result),
  };
};
