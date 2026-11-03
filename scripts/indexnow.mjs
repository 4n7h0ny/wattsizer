/**
 * Tells IndexNow search engines (Bing, Yandex, Seznam, Naver; Bing shares with
 * DuckDuckGo/Yahoo) to recrawl every URL in the live sitemap.
 *
 * Run after a deploy that adds or changes pages:  npm run indexnow
 * The key file public/<KEY>.txt must be live on the site for this to be accepted.
 */
const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://getwattsizer.com";
const KEY = "2f4cd3b2d9f6d354d97e712ee4958e49";

const sitemap = await (await fetch(`${SITE}/sitemap.xml`)).text();
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (urlList.length === 0) throw new Error(`No URLs found in ${SITE}/sitemap.xml`);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(SITE).host,
    key: KEY,
    keyLocation: `${SITE}/${KEY}.txt`,
    urlList,
  }),
});

// 200 = accepted, 202 = accepted and key still being validated
console.log(`IndexNow: submitted ${urlList.length} URLs -> HTTP ${res.status}`);
if (res.status >= 400) {
  console.log(await res.text());
  process.exit(1);
}
