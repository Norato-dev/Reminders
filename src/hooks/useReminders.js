import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";
import { generateId } from "../utils/storage";

async function getUserId() {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) return session.user.id;
  // Should not happen (supabase.js signs in on load), but wait briefly if needed
  const { data } = await supabase.auth.signInAnonymously();
  return data?.user?.id ?? null;
}

export function useReminders() {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const userId = await getUserId();
      if (!userId) return;
      const { data } = await supabase
        .from("reminders")
        .select("*")
        .eq("user_id", userId);
      if (data) setReminders(data);
      setLoading(false);
    };
    load();
  }, []);

  const addReminder = useCallback(async (form) => {
    const userId = await getUserId();
    if (!userId) return;
    const reminder = {
      id: generateId(),
      ...form,
      user_id: userId,
      done: false,
      triggered: false,
      created_at: Date.now(),
      reminder_at: new Date(`${form.date}T${form.time}`).getTime(),
    };
    const { data } = await supabase.from("reminders").insert(reminder).select().single();
    if (data) setReminders((p) => [data, ...p]);
  }, []);

  const updateReminder = useCallback(async (id, form) => {
    const { data } = await supabase
      .from("reminders")
      .update({ ...form, triggered: false, reminder_at: new Date(`${form.date}T${form.time}`).getTime() })
      .eq("id", id)
      .select()
      .single();
    if (data) setReminders((p) => p.map((r) => (r.id === id ? data : r)));
  }, []);

  const deleteReminder = useCallback(async (id) => {
    await supabase.from("reminders").delete().eq("id", id);
    setReminders((p) => p.filter((r) => r.id !== id));
  }, []);

  const toggleDone = useCallback(async (id) => {
    setReminders((p) => {
      const reminder = p.find((r) => r.id === id);
      if (!reminder) return p;
      const newDone = !reminder.done;
      supabase.from("reminders").update({ done: newDone }).eq("id", id);
      return p.map((r) => (r.id === id ? { ...r, done: newDone } : r));
    });
  }, []);

  const triggerReminder = useCallback(async (id) => {
    setReminders((p) => p.map((r) => (r.id === id ? { ...r, triggered: true } : r)));
    await supabase.from("reminders").update({ triggered: true }).eq("id", id);
  }, []);

  const markTriggered = triggerReminder;

  return {
    reminders,
    loading,
    addReminder,
    updateReminder,
    deleteReminder,
    toggleDone,
    triggerReminder,
    markTriggered,
  };
}

