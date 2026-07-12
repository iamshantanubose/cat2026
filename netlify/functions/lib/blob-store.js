const { getStore } = require("@netlify/blobs");

// This site's Blobs context isn't auto-injected at runtime (checked on a
// live deployed function — the expected env var was simply absent, likely
// an account/plan restriction). Falling back to explicit config: needs
// BLOBS_TOKEN set as a site environment variable in the Netlify dashboard
// (Site settings -> Environment variables). Site ID isn't sensitive, kept
// inline.
const SITE_ID = "77a193ed-cddf-423e-bc5e-2b5f62326778";

function personaStore() {
  const token = process.env.BLOBS_TOKEN;
  if (token) {
    return getStore({ name: "persona", siteID: SITE_ID, token });
  }
  // Fall back to automatic config in case this ever starts working —
  // keeps local/other environments from hard-failing if it's fixed later.
  return getStore("persona");
}

module.exports = { personaStore };
