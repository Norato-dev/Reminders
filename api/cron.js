import webpush from "web-push";
import { createClient } from "@supabase/supabase-js";

webpush.setVapidDetails(
  process.env.VAPID_EMAIL,
  process.env.VITE_VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  // Verify the call comes from Vercel Cron (or authorized source)
  if (
    process.env.CRON_SECRET &&
    req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const now = Date.now();
  const WINDOW_MS = 60_000; // 1-minute window

  // Fetch all pending reminders
  const { data: reminders, error: remErr } = await supabase
    .from("reminders")
    .select("*")
    .eq("done", false)
    .eq("triggered", false);

  if (remErr) return res.status(500).json({ error: remErr.message });

  const due = (reminders ?? []).filter((r) => {
    const ts = r.reminder_at ?? new Date(`${r.date}T${r.time}`).getTime();
    return Math.abs(now - ts) < WINDOW_MS;
  });

  if (due.length === 0) return res.json({ sent: 0 });

  // Fetch all push subscriptions
  const { data: subs, error: subErr } = await supabase
    .from("push_subscriptions")
    .select("*");

  if (subErr) return res.status(500).json({ error: subErr.message });
  if (!subs?.length) return res.json({ sent: 0, note: "no subscriptions" });

  let sent = 0;

  for (const reminder of due) {
    const payload = JSON.stringify({
      title: `⏰ ${reminder.title}`,
      body: reminder.description || "¡Es hora de tu recordatorio!",
    });

    for (const sub of subs) {
      try {
        await webpush.sendNotification(
          { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
          payload
        );
        sent++;
      } catch (err) {
        // Remove expired subscriptions (410 Gone)
        if (err.statusCode === 410) {
          await supabase
            .from("push_subscriptions")
            .delete()
            .eq("endpoint", sub.endpoint);
        }
      }
    }

    // Mark reminder as triggered so it doesn't fire again
    await supabase
      .from("reminders")
      .update({ triggered: true })
      .eq("id", reminder.id);
  }

  return res.json({ sent, triggered: due.length });
}
