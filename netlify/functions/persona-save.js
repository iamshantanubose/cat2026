const { verifyToken } = require("./lib/auth-shared");
const { personaStore } = require("./lib/blob-store");

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

  const { token, topic, record } = body;
  const username = verifyToken(token);
  if (!username) {
    return { statusCode: 401, body: JSON.stringify({ error: "Unauthorized" }) };
  }
  if (!topic || !record) {
    return { statusCode: 400, body: JSON.stringify({ error: "Missing topic or record" }) };
  }

  const store = personaStore();
  const key = `${username}/${topic}`;
  const existing = (await store.get(key, { type: "json" })) || [];
  existing.push(record);
  await store.setJSON(key, existing);

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(existing),
  };
};
