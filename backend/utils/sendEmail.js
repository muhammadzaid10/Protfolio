import nodemailer from 'nodemailer'

let cached = null

function getTransporter() {
  if (cached) return cached
  
  // 🔥 `.trim()` lagaya hai taaki .env se aane wale hidden spaces/spaces khatam ho sakein
  const SMTP_HOST = process.env.SMTP_HOST?.trim()
  const SMTP_PORT = process.env.SMTP_PORT?.trim()
  const SMTP_SECURE = process.env.SMTP_SECURE?.trim()
  const SMTP_USER = process.env.SMTP_USER?.trim()
  const SMTP_PASS = process.env.SMTP_PASS?.trim()

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.warn('⚠️ SMTP variables missing in process.env')
    return null
  }

  cached = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 465,
    secure: String(SMTP_SECURE) === 'true', // true for 465
    auth: { 
      user: SMTP_USER, 
      pass: SMTP_PASS 
    },
    // 💡 Timeout barha diya taaki connection drop na ho
    connectionTimeout: 10000, 
  })
  return cached
}

export async function sendContactEmail({ name, email, message }) {
  const transporter = getTransporter()
  if (!transporter) {
    console.warn('⚠️ SMTP not configured — skipping email send.')
    return { skipped: true }
  }

  const to = process.env.MAIL_TO?.trim() || process.env.SMTP_USER?.trim()
  const fromName = process.env.MAIL_FROM_NAME?.trim() || 'Portfolio Contact'

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; background: #05060d; color: #ececf5; padding: 32px; border-radius: 16px;">
      <h2 style="background: linear-gradient(135deg, #00e5ff, #b829ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0 0 8px;">New Portfolio Message</h2>
      <p style="color: #8a8aa8; font-size: 13px; margin: 0 0 24px;">You have a new message from your portfolio site.</p>
      <table cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 12px 0; border-bottom: 1px solid #1a1a2a;"><strong style="color: #00e5ff;">From:</strong> ${escapeHtml(name)}</td></tr>
        <tr><td style="padding: 12px 0; border-bottom: 1px solid #1a1a2a;"><strong style="color: #00e5ff;">Email:</strong> <a style="color: #b829ff;" href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding: 16px 0;"><strong style="color: #00e5ff;">Message:</strong></td></tr>
        <tr><td style="background: #0e0f1d; padding: 16px; border-radius: 8px; white-space: pre-wrap; line-height: 1.5;">${escapeHtml(message)}</td></tr>
      </table>
      <p style="color: #5a5a78; font-size: 11px; margin-top: 24px; text-align: center;">Sent from your portfolio API · ${new Date().toLocaleString()}</p>
    </div>
  `

  // 🔥 Pure process ko try/catch mein dala taaki error pakra ja sake
  try {
    const info = await transporter.sendMail({
      from: `"${fromName}" <${process.env.SMTP_USER?.trim()}>`,
      to,
      replyTo: email,
      subject: `New Portfolio Message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html,
    })

    console.log("✅ Email sent successfully! ID:", info.messageId)
    return { sent: true, messageId: info.messageId }

  } catch (error) {
    // 🛑 Agar Gmail reject karega toh yahan terminal par pura sach samne aa jayega
    console.error("❌ Nodemailer actual failure:", error)
    return { sent: false, error: error.message }
  }
}

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}