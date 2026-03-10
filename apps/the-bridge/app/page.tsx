import { readStore } from "@/lib/store";

function badge(status: string) {
  const map: Record<string, string> = {
    running: "#1d9bf0",
    completed: "#19c37d",
    failed: "#ff5d5d",
    idle: "#9aa4bf",
  };
  return map[status] ?? "#9aa4bf";
}

export default function HomePage() {
  const store = readStore();
  const sortedEvents = [...store.events].sort((a, b) => (a.at < b.at ? 1 : -1));

  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: 24 }}>
      <h1 style={{ marginBottom: 6 }}>The Bridge</h1>
      <p style={{ marginTop: 0, color: "#9aa4bf" }}>Single view for subagents, creation events, and operating status.</p>

      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ background: "#111833", border: "1px solid #24305e", borderRadius: 12, padding: 16 }}>
          <h2>Subagents</h2>
          {store.subagents.length === 0 ? <p>No subagents yet.</p> : (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {store.subagents.map((a) => (
                <li key={a.id} style={{ padding: "10px 0", borderBottom: "1px solid #1c264a" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                    <strong>{a.role}</strong>
                    <span style={{ background: badge(a.status), color: "#06101d", borderRadius: 999, padding: "2px 8px", fontWeight: 700 }}>{a.status}</span>
                  </div>
                  <div style={{ color: "#9aa4bf", fontSize: 13 }}>{a.id}</div>
                  <div style={{ color: "#9aa4bf", fontSize: 13 }}>Created: {a.createdAt}</div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div style={{ background: "#111833", border: "1px solid #24305e", borderRadius: 12, padding: 16 }}>
          <h2>Event Timeline</h2>
          {sortedEvents.length === 0 ? <p>No events yet.</p> : (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {sortedEvents.map((e) => (
                <li key={e.id} style={{ padding: "10px 0", borderBottom: "1px solid #1c264a" }}>
                  <div><strong>{e.type}</strong> · {e.subagentId}</div>
                  <div style={{ color: "#9aa4bf", fontSize: 13 }}>{e.at}</div>
                  <div style={{ color: "#c8d5ff", fontSize: 14 }}>{e.message}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}
