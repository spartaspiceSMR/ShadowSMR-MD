const { zokou } = require("../framework/zokou");
const { getAllSudoNumbers, isSudoTableNotEmpty } = require("../bdd/sudo");
const conf = require("../set");

// OWNER COMMAND
zokou({ nomCom: "owner", categorie: "General", reaction: "❣️" }, async (dest, zk, commandeOptions) => {
  const { ms, mybotpic } = commandeOptions;
  const thsudo = await isSudoTableNotEmpty();

  if (thsudo) {
    let msg = `╭━━❰ 👑 *BOT OWNERS* ❱━━╮\n`;
    msg += `┃\n┃ 👤 *Main Owner:* @${conf.NUMERO_OWNER}\n`;

    let sudos = await getAllSudoNumbers();
    if (sudos.length > 1) {
      msg += `┃\n┃ 🧩 *Other Sudo Users:*\n`;
      for (const sudo of sudos) {
        if (sudo) {
          const sudonumero = sudo.replace(/[^0-9]/g, "");
          msg += `┃   ┗ 💼 @${sudonumero}\n`;
        }
      }
    }

    msg += `┃\n╰━━━━━━━━━━━━━━━━━━━━╯`;

    const ownerjid = conf.NUMERO_OWNER.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    const mentionedJid = sudos.concat([ownerjid]);

    await zk.sendMessage(dest, {
      image: { url: mybotpic() },
      caption: msg,
      mentions: mentionedJid
    }, { quoted: ms });

  } else {
    const vcard = 
      `BEGIN:VCARD\nVERSION:3.0\nFN:${conf.OWNER_NAME}\nORG:undefined;\nTEL;type=CELL;type=VOICE;waid=${conf.NUMERO_OWNER}:+${conf.NUMERO_OWNER}\nEND:VCARD`;
    
    await zk.sendMessage(dest, {
      contacts: {
        displayName: conf.OWNER_NAME,
        contacts: [{ vcard }],
      },
    }, { quoted: ms });
  }
});

// DEV COMMAND
zokou({ nomCom: "dev", categorie: "General", reaction: "💘" }, async (dest, zk, commandeOptions) => {
  const { ms, mybotpic, repondre } = commandeOptions;

  const devs = [
    { nom: "POPKID", numero: "254111385747" },
    { nom: "᚛POPKID᚜", numero: "254732297194" },
    { nom: "POP", numero: "254111385747" },
  ];

  let message = `┏━❰ 💬 *POP SUPPORT CENTER* ❱━┓\n┃\n┃ 🔧 *Need Help? Contact a Dev:*\n`;
  for (const dev of devs) {
    message += `┃ ┗ 📞 *${dev.nom}* → https://wa.me/${dev.numero}\n`;
  }
  message += `┃\n┗━━━━━━━━━━━━━━━━━━━━━━┛`;

  const lien = mybotpic();

  try {
    if (/\.(mp4|gif)$/i.test(lien)) {
      await zk.sendMessage(dest, { video: { url: lien }, caption: message }, { quoted: ms });
    } else if (/\.(jpeg|png|jpg)$/i.test(lien)) {
      await zk.sendMessage(dest, { image: { url: lien }, caption: message }, { quoted: ms });
    } else {
      await repondre(lien);
      await repondre("❌ Invalid image/video link provided.");
    }
  } catch (e) {
    console.log("🥵 Menu error: " + e);
    await repondre("🥵 Error displaying dev menu.");
  }
});

// SUPPORT COMMAND
zokou({ nomCom: "support", categorie: "General", reaction: "📢" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, auteurMessage } = commandeOptions;

  const text = `╭─❰ 🌐 *POP SUPPORT LINKS* ❱─╮
│
│ 📺 *YouTube Channel:* 
│ ❒ https://www.youtube.com/@popkid254
│
│ 💬 *Official WhatsApp Channel:* 
│ ❒ https://whatsapp.com/channel/0029VadQrNI8KMqo79BiHr3l
│
│ 👥 *Support Group:* 
│ ❒ https://whatsapp.com/channel/0029VadQrNI8KMqo79BiHr3l
│
╰─ Created with ❤️ by Mr POPKID`;

  await repondre(text);
  await zk.sendMessage(auteurMessage, { text: "🌟 Thank you for choosing POPKID! Make sure you follow the support links above." }, { quoted: ms });
});
