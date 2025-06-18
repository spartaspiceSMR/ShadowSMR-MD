const { zokou } = require(__dirname + "/../framework/zokou");

zokou(
  {
    nomCom: "repo",
    categorie: "General",
    reaction: "📦",
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre } = commandeOptions;

    try {
      const repoLink = "https://github.com/spartaspiceSMR/T-R-O-U-B-L-E-XMD";
      const imageUrl = "https://files.catbox.moe/x0ohbm.jpg"; // ✅ WORKING fallback image

      const caption = `
╭═〔 🧠 *T-R-O-U-B-L-E-XMD REPOSITORY* 〕═╮

📁 *Bot Name:* T-R-O-U-B-L-E-XMD
🌐 *GitHub:* ${repoLink}  
🛠️ *Developer:* @254742215053
⚙️ *Framework:* Baileys  
✨ *Fast, Clean & Reliable*

╰═▃▃▃▃▃▃▃▃▃▃▃▃▃═╯
`;

      const sender = ms.key.participant || ms.key.remoteJid;

      await zk.sendMessage(
        dest,
        {
          image: { url: imageUrl },
          caption,
          contextInfo: {
            mentionedJid: [sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: "120363290715861418@newsletter",
              newsletterName: "†💖R🍥Ö💦Ú🔱ß🍷L🥺ÈXtech",
              serverMessageId: 152,
            },
          },
        },
        { quoted: ms }
      );
    } catch (e) {
      console.error("Error in repo command:", e);
      repondre(`❌ Failed to load repo:\n${e.message}`);
    }
  }
);
