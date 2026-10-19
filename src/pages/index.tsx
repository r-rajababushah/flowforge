
import { useMemo, useState } from "react";

type Status = "Todo" | "In Progress" | "Done";
type Priority = "Low" | "Medium" | "High";

type Task = {
  id: number;
  title: string;
  project: string;
  assignee: string;
  initials: string;
  status: Status;
  priority: Priority;
  due: string;
};

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Design authentication flow",
    project: "Platform redesign",
    assignee: "Alex Morgan",
    initials: "AM",
    status: "Todo",
    priority: "High",
    due: "Oct 21",
  },
  {
    id: 2,
    title: "Create database schema",
    project: "Core platform",
    assignee: "Jamie Lee",
    initials: "JL",
    status: "Todo",
    priority: "Medium",
    due: "Oct 22",
  },
  {
    id: 3,
    title: "Build workspace switcher",
    project: "Platform redesign",
    assignee: "Sam Taylor",
    initials: "ST",
    status: "In Progress",
    priority: "High",
    due: "Oct 20",
  },
  {
    id: 4,
    title: "Implement project filters",
    project: "Core platform",
    assignee: "Alex Morgan",
    initials: "AM",
    status: "In Progress",
    priority: "Medium",
    due: "Oct 23",
  },
  {
    id: 5,
    title: "Set up linting rules",
    project: "Developer experience",
    assignee: "Jamie Lee",
    initials: "JL",
    status: "Done",
    priority: "Low",
    due: "Oct 18",
  },
  {
    id: 6,
    title: "Create initial wireframes",
    project: "Platform redesign",
    assignee: "Sam Taylor",
    initials: "ST",
    status: "Done",
    priority: "Medium",
    due: "Oct 17",
  },
];

const columns: Status[] = ["Todo", "In Progress", "Done"];

const projects = [
  { name: "Platform redesign", color: "#8b7cf6", progress: 68 },
  { name: "Core platform", color: "#42b8a4", progress: 42 },
  { name: "Developer experience", color: "#e9a35b", progress: 85 },
];

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeNav, setActiveNav] = useState("Overview");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newPriority, setNewPriority] = useState<Priority>("Medium");
  const [newStatus, setNewStatus] = useState<Status>("Todo");

  const filteredTasks = useMemo(
    () =>
      tasks.filter((task) =>
        `${task.title} ${task.project} ${task.assignee}`
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [tasks, search]
  );

  const completed = tasks.filter((task) => task.status === "Done").length;
  const inProgress = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  function addTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!newTitle.trim()) return;

    setTasks((current) => [
      {
        id: Date.now(),
        title: newTitle.trim(),
        project: "Core platform",
        assignee: "You",
        initials: "YO",
        status: newStatus,
        priority: newPriority,
        due: "Not set",
      },
      ...current,
    ]);

    setNewTitle("");
    setNewPriority("Medium");
    setNewStatus("Todo");
    setShowForm(false);
  }

  function moveTask(id: number, status: Status) {
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, status } : task))
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f8fc] text-slate-800 md:flex">
      <aside className="flex w-full shrink-0 flex-col border-b border-slate-200 bg-white p-5 md:min-h-screen md:w-[250px] md:border-b-0 md:border-r">
        <a href="#" className="mb-7 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-xl font-bold text-white">
            F
          </span>
          <span>
            <span className="block text-lg font-bold tracking-tight">
              FlowForge
            </span>
            <span className="text-xs text-slate-500">Workspace edition</span>
          </span>
        </a>

        <div className="mb-6 rounded-xl border border-slate-200 p-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
            Current workspace
          </p>
          <div className="mt-2 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 text-sm font-bold text-violet-700">
                A
              </span>
              <span className="text-sm font-semibold">Acme Studio</span>
            </div>
            <span className="text-slate-400">⌄</span>
          </div>
        </div>

        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
          Workspace
        </p>

        <nav className="flex flex-row gap-1 overflow-x-auto md:flex-col">
          {[
            ["Overview", "▦"],
            ["My tasks", "☑"],
            ["Projects", "◫"],
            ["Inbox", "✉"],
          ].map(([label, icon]) => (
            <button
              key={label}
              onClick={() => setActiveNav(label)}
              className={`flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                activeNav === label
                  ? "bg-violet-50 font-semibold text-violet-700"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span className="text-base">{icon}</span>
              {label}
              {label === "Inbox" && (
                <span className="ml-auto rounded-md bg-violet-100 px-1.5 py-0.5 text-xs text-violet-700">
                  3
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="mt-7 hidden md:block">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Your projects
            </p>
            <button
              onClick={() => setActiveNav("Projects")}
              className="text-lg text-slate-400 hover:text-violet-600"
              aria-label="View projects"
            >
              +
            </button>
          </div>

          <div className="space-y-1">
            {projects.map((project) => (
              <button
                key={project.name}
                onClick={() => {
                  setActiveNav("Projects");
                  setSearch(project.name);
                }}
                className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-xs text-slate-600 hover:bg-slate-50"
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: project.color }}
                />
                <span className="truncate">{project.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto hidden rounded-xl bg-slate-50 p-4 md:block">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-lg">✦</span>
            <p className="text-sm font-semibold">Build better, together.</p>
          </div>
          <p className="text-xs leading-5 text-slate-500">
            Keep your team's work organized and moving forward.
          </p>
        </div>

        <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-800">
            YO
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">Your account</p>
            <p className="text-xs text-slate-500">Free workspace</p>
          </div>
          <span className="ml-auto text-slate-400">···</span>
        </div>
      </aside>

      <main className="min-w-0 flex-1">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-5 py-4 md:px-8">
          <div>
            <p className="text-xs text-slate-400">
              Workspace / {activeNav}
            </p>
            <h1 className="mt-1 text-xl font-bold tracking-tight">
              {activeNav === "Overview"
                ? "Good morning, welcome back"
                : activeNav}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2">
              <span className="text-slate-400">⌕</span>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search tasks..."
                aria-label="Search tasks"
                className="w-28 bg-transparent text-sm outline-none placeholder:text-slate-400 sm:w-40"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="text-slate-400"
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </label>
            <button
              onClick={() => setShowForm(true)}
              className="rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"
            >
              <span className="mr-1">+</span> New task
            </button>
          </div>
        </header>

        <div className="mx-auto max-w-[1500px] space-y-7 p-5 md:p-8">
          <section className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500">Monday, October 19, 2026</p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight">
                Workspace overview
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Here's what's happening across your projects.
              </p>
            </div>
            <button
              onClick={() => {
                setActiveNav("Overview");
                setSearch("");
              }}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
            >
              ↻ Reset view
            </button>
          </section>

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                label: "Total tasks",
                value: tasks.length,
                note: "Across all projects",
                icon: "▤",
                color: "bg-violet-50 text-violet-700",
              },
              {
                label: "In progress",
                value: inProgress,
                note: "Currently being worked on",
                icon: "◷",
                color: "bg-blue-50 text-blue-700",
              },
              {
                label: "Completed",
                value: completed,
                note: "Successfully finished",
                icon: "✓",
                color: "bg-emerald-50 text-emerald-700",
              },
              {
                label: "Active projects",
                value: projects.length,
                note: "In this workspace",
                icon: "◫",
                color: "bg-amber-50 text-amber-700",
              },
            ].map((stat) => (
              <article
                key={stat.label}
                className="rounded-xl border border-slate-200 bg-white p-5"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-500">{stat.label}</p>
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-lg text-lg ${stat.color}`}
                  >
                    {stat.icon}
                  </span>
                </div>
                <p className="mt-4 text-3xl font-bold tracking-tight">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-slate-400">{stat.note}</p>
              </article>
            ))}
          </section>

          <section className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(280px,0.8fr)]">
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold">Project progress</h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Progress across your active projects
                  </p>
                </div>
                <button
                  onClick={() => setActiveNav("Projects")}
                  className="text-sm font-medium text-violet-700 hover:text-violet-900"
                >
                  View all →
                </button>
              </div>

              <div className="space-y-6">
                {projects.map((project) => (
                  <div key={project.name}>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-2">
                        <span
                          className="h-2.5 w-2.5 shrink-0 rounded-full"
                          style={{ backgroundColor: project.color }}
                        />
                        <span className="truncate text-sm font-medium">
                          {project.name}
                        </span>
                      </div>
                      <span className="text-sm font-semibold">
                        {project.progress}%
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${project.progress}%`,
                          backgroundColor: project.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-bold">Task distribution</h3>
              <p className="mt-1 text-xs text-slate-500">
                Current status of all tasks
              </p>

              <div className="mt-6 space-y-5">
                {columns.map((status) => {
                  const count = tasks.filter(
                    (task) => task.status === status
                  ).length;
                  const percent =
                    tasks.length === 0 ? 0 : (count / tasks.length) * 100;

                  return (
                    <div key={status}>
                      <div className="mb-2 flex justify-between text-sm">
                        <span className="text-slate-600">{status}</span>
                        <span className="font-semibold">{count}</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-100">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            status === "Todo"
                              ? "bg-amber-400"
                              : status === "In Progress"
                                ? "bg-blue-500"
                                : "bg-emerald-500"
                          }`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold">Task board</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Organize work and track what's next.
                </p>
              </div>
              <span className="rounded-full bg-white px-3 py-1 text-xs text-slate-500 ring-1 ring-slate-200">
                {filteredTasks.length} tasks
              </span>
            </div>

            <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3">
              {columns.map((status) => {
                const columnTasks = filteredTasks.filter(
                  (task) => task.status === status
                );

                return (
                  <div
                    key={status}
                    className="min-w-0 rounded-xl border border-slate-200 bg-[#f0f2f8] p-3"
                  >
                    <div className="mb-3 flex items-center justify-between px-1 py-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${
                            status === "Todo"
                              ? "bg-amber-400"
                              : status === "In Progress"
                                ? "bg-blue-500"
                                : "bg-emerald-500"
                          }`}
                        />
                        <h4 className="text-sm font-bold">{status}</h4>
                        <span className="rounded-md bg-white px-1.5 py-0.5 text-xs text-slate-500">
                          {columnTasks.length}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setNewStatus(status);
                          setShowForm(true);
                        }}
                        className="rounded-md px-2 py-1 text-lg text-slate-400 hover:bg-white hover:text-violet-700"
                        aria-label={`Add task to ${status}`}
                      >
                        +
                      </button>
                    </div>

                    <div className="space-y-3">
                      {columnTasks.map((task) => (
                        <article
                          key={task.id}
                          className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:border-violet-200"
                        >
                          <div className="mb-3 flex items-start justify-between gap-2">
                            <span
                              className={`rounded-md px-2 py-1 text-[10px] font-semibold ${
                                task.priority === "High"
                                  ? "bg-rose-50 text-rose-700"
                                  : task.priority === "Medium"
                                    ? "bg-amber-50 text-amber-700"
                                    : "bg-slate-100 text-slate-600"
                              }`}
                            >
                              {task.priority} priority
                            </span>
                            <span className="text-xs text-slate-400">
                              #{task.id.toString().slice(-4)}
                            </span>
                          </div>

                          <h5 className="text-sm font-semibold leading-5">
                            {task.title}
                          </h5>
                          <p className="mt-1 text-xs text-slate-500">
                            {task.project}
                          </p>

                          <div className="mt-4 flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
                            <div className="flex min-w-0 items-center gap-2">
                              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-100 text-[10px] font-bold text-violet-700">
                                {task.initials}
                              </span>
                              <span className="truncate text-xs text-slate-600">
                                {task.assignee}
                              </span>
                            </div>
                            <span className="shrink-0 text-[10px] text-slate-400">
                              {task.due}
                            </span>
                          </div>

                          <label className="mt-3 block">
                            <span className="sr-only">Change task status</span>
                            <select
                              value={task.status}
                              onChange={(event) =>
                                moveTask(task.id, event.target.value as Status)
                              }
                              className="w-full rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs outline-none focus:border-violet-400"
                            >
                              {columns.map((option) => (
                                <option key={option} value={option}>
                                  Move to: {option}
                                </option>
                              ))}
                            </select>
                          </label>
                        </article>
                      ))}

                      {columnTasks.length === 0 && (
                        <div className="rounded-lg border border-dashed border-slate-300 bg-white/60 px-3 py-8 text-center text-xs text-slate-400">
                          No tasks here yet.
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <footer className="border-t border-slate-200 py-4 text-center text-xs text-slate-400">
            FlowForge · Workspace overview · Demo data
          </footer>
        </div>
      </main>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="new-task-heading"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 id="new-task-heading" className="text-lg font-bold">
                  Create a task
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Add a task to your workspace board.
                </p>
              </div>
              <button
                onClick={() => setShowForm(false)}
                className="rounded-lg px-2 py-1 text-xl text-slate-400 hover:bg-slate-100"
                aria-label="Close form"
              >
                ×
              </button>
            </div>

            <form onSubmit={addTask} className="space-y-4">
              <div>
                <label
                  htmlFor="task-title"
                  className="mb-1.5 block text-sm font-medium"
                >
                  Task title
                </label>
                <input
                  id="task-title"
                  autoFocus
                  required
                  value={newTitle}
                  onChange={(event) => setNewTitle(event.target.value)}
                  placeholder="e.g. Implement task API"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                />
              </div>

              <div>
                <label
                  htmlFor="task-priority"
                  className="mb-1.5 block text-sm font-medium"
                >
                  Priority
                </label>
                <select
                  id="task-priority"
                  value={newPriority}
                  onChange={(event) =>
                    setNewPriority(event.target.value as Priority)
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-violet-500"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="task-status"
                  className="mb-1.5 block text-sm font-medium"
                >
                  Initial status
                </label>
                <select
                  id="task-status"
                  value={newStatus}
                  onChange={(event) =>
                    setNewStatus(event.target.value as Status)
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-violet-500"
                >
                  {columns.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-700"
                >
                  Create task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
