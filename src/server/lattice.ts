import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";

export type Channel = "lattice" | "porch" | "field";

export type Signal = {
  id: number;
  userId: string;
  callsign: string;
  body: string;
  channel: Channel;
  createdAt: string;
  witnesses: number;
  mine: boolean;
};

const CHANNELS = new Set<Channel>(["lattice", "porch", "field"]);

function asChannel(v: string): Channel {
  return CHANNELS.has(v as Channel) ? (v as Channel) : "lattice";
}

function cleanCallsign(raw: string) {
  const s = raw.replace(/[^\p{L}\p{N} ._\-]/gu, "").trim().slice(0, 24);
  return s.length >= 2 ? s : "Operative";
}

function cleanBody(raw: string) {
  return raw.replace(/\s+/g, " ").trim().slice(0, 480);
}

export const listSignals = createServerFn({ method: "GET" }).handler(
  async () => {
    const sql = await getSql();
    const rows = await sql<{
      id: number;
      user_id: string;
      callsign: string;
      body: string;
      channel: string;
      created_at: string;
      witnesses: number;
    }>`
      select
        s.id,
        s.user_id,
        s.callsign,
        s.body,
        s.channel,
        s.created_at,
        (select count(*)::int from witnesses w where w.signal_id = s.id) as witnesses
      from signals s
      order by s.created_at desc
      limit 80
    `;
    return rows.map((r) => ({
      id: r.id,
      userId: r.user_id,
      callsign: r.callsign,
      body: r.body,
      channel: asChannel(r.channel),
      createdAt: r.created_at,
      witnesses: r.witnesses,
      mine: false,
    }));
  },
);

export const myWitnesses = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<{ signal_id: number }>`
      select signal_id from witnesses where user_id = ${context.userId}
    `;
    return rows.map((r) => r.signal_id);
  });

export const transmitSignal = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => {
    const o = (input ?? {}) as {
      body?: unknown;
      channel?: unknown;
      callsign?: unknown;
    };
    const body = cleanBody(String(o.body ?? ""));
    if (body.length < 8) throw new Error("Signal too short.");
    return {
      body,
      channel: asChannel(String(o.channel ?? "lattice")),
      callsign: cleanCallsign(String(o.callsign ?? "")),
    };
  })
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const rows = await sql<{ id: number }>`
      insert into signals (user_id, callsign, body, channel)
      values (${context.userId}, ${data.callsign}, ${data.body}, ${data.channel})
      returning id
    `;
    return { id: rows[0]?.id ?? 0 };
  });

export const toggleWitness = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => {
    const id = Number((input as { id?: unknown })?.id);
    if (!Number.isFinite(id) || id < 1) throw new Error("Bad signal.");
    return { id };
  })
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const existing = await sql<{ id: number }>`
      select id from witnesses
      where user_id = ${context.userId} and signal_id = ${data.id}
      limit 1
    `;
    if (existing[0]) {
      await sql`
        delete from witnesses
        where user_id = ${context.userId} and signal_id = ${data.id}
      `;
      return { on: false };
    }
    await sql`
      insert into witnesses (user_id, signal_id)
      values (${context.userId}, ${data.id})
      on conflict (user_id, signal_id) do nothing
    `;
    return { on: true };
  });

export const retractSignal = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => {
    const id = Number((input as { id?: unknown })?.id);
    if (!Number.isFinite(id) || id < 1) throw new Error("Bad signal.");
    return { id };
  })
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await sql`
      delete from signals
      where id = ${data.id} and user_id = ${context.userId}
    `;
    return { ok: true };
  });
