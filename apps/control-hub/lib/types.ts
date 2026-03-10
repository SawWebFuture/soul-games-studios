export type Subagent = {
  id: string;
  role: string;
  status: "running" | "completed" | "failed" | "idle";
  createdAt: string;
  lastUpdateAt: string;
  summary?: string;
};

export type SubagentEvent = {
  id: string;
  subagentId: string;
  type: "created" | "updated" | "completed" | "failed";
  at: string;
  message: string;
};

export type Store = {
  subagents: Subagent[];
  events: SubagentEvent[];
};
