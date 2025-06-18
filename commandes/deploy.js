const { zokou } = require(__dirname + "/../framework/zokou");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);

zokou({ nomCom: "deploy", categorie: "General" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, nomAuteurMessage, mybotpic } = commandeOptions;
  const { cm } = require(__dirname + "/../framework/zokou");

  let coms = {};
  let mode = (s.MODE.toLowerCase() === "yes") ? "public" : "private";

  for (const com of cm) {
    if (!coms[com.categorie]) coms[com.categorie] = [];
    coms[com.categorie].push(com.nomCom);
  }

  moment.tz.setDefault('Etc/GMT');
  const temps = moment().format('HH:mm:ss');
  const date = moment().format('DD/MM/YYYY');

  const infoMsg = `
╭─「 *🚀 BOT DEPLOYMENT GUIDE* 」─╮
│  Hello *${nomAuteurMessage}*, welcome!
│  Here's how you can deploy your own version of 
│  the *T-R-O-U-B-L-E-XMD WhatsApp Bot* 🧠⚙️
╰────────────────────────────╯

╭─「 *🔑 GET SESSION ID* 」─╮
📌 Visit: https://T-R-O-U-B-L-E-XMD-sessions-generator-uk7z.onrender.com  
➡️ Tap on *Pair Code*

🧭 Enter your number with country code (e.g., *254742215053*)
📩 You’ll receive a login code from *T-R-O-U-B-L-E-XMD*
🛠️ Paste the code in WhatsApp when prompted
📬 After successful login, check your own DM — the *Session ID* will be there!
🔐 Copy it — you'll use it to deploy your bot.

╭─「 *📦 DEPLOYING THE BOT* 」─╮
1️⃣ Go to the *†💖R🍥Ö💦Ú🔱ß🍷L🥺È* repository on GitHub  
   ⭐ Fork and give it a star — it's a must!

2️⃣ Tap the *Heroku Deploy* button on the repo  
3️⃣ Input your:
    🔹 Heroku API Key  
    🔹 Heroku App Name  
    🔹 Session ID from earlier  

4️⃣ Click *Deploy* — it’ll start building!  
⏳ Logs may not show immediately, but be patient!  
🚀 In a few moments, your bot will go live.

╭─「 *👑 GIVE CREDITS* 」─╮
💬 Contact the Dev: https://wa.me/+254742215053
🤝 Say thanks to *†💖R🍥Ö💦Ú🔱ß🍷L🥺È* — creator of this awesome base!

━━━━━━━━━━━━━━━━━━━━━
     💠 *Regards — †💖R🍥Ö💦Ú🔱ß🍷L🥺È😇*
━━━━━━━━━━━━━━━━━━━━━`;

  try {
    const lien = mybotpic();

    if (lien.match(/\.(mp4|gif)$/i)) {
      await zk.sendMessage(dest, {
        video: { url: lien },
        caption: infoMsg,
        footer: "🤖 Powered by *†💖R🍥Ö💦Ú🔱ß🍷L🥺È* • Made with 💙",
        gifPlayback: true
      }, { quoted: ms });

    } else if (lien.match(/\.(jpeg|jpg|png)$/i)) {
      await zk.sendMessage(dest, {
        image: { url: lien },
        caption: infoMsg,
        footer: "🤖 Powered by *†💖R🍥Ö💦Ú🔱ß🍷L🥺È* • Made with 💙"
      }, { quoted: ms });

    } else {
      await repondre(infoMsg);
    }

  } catch (e) {
    console.error("🥵 Menu Error:", e);
    await repondre("🥵 An error occurred while sending the deployment guide.\n\n" + e.message);
  }
});
