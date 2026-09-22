import { useState } from "react";
import DocumentUpload from "./components/DocumentUpload";

import {
  BookOpen,
  ChevronDown,
  FileText,
  FolderOpen,
  LayoutDashboard,
  Menu,
  MessageSquare,
  Plus,
  Search,
  Settings,
  Upload,
  X,
} from "lucide-react";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigationItems = [
    {
      label: "Overview",
      icon: LayoutDashboard,
      active: true,
    },
    {
      label: "Documents",
      icon: FileText,
      active: false,
    },
    {
      label: "Ask AI",
      icon: MessageSquare,
      active: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#111110] text-stone-200">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <button
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-stone-800/80 bg-[#171716] transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between border-b border-stone-800/80 px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md border border-stone-700 bg-stone-800/60">
              <BookOpen size={16} strokeWidth={1.7} />
            </div>

            <span className="text-sm font-semibold tracking-tight text-stone-100">
              CodeVault
            </span>
          </div>

          <button
            aria-label="Close sidebar"
            onClick={() => setSidebarOpen(false)}
            className="rounded-md p-1.5 text-stone-500 transition hover:bg-stone-800 hover:text-stone-200 lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* Workspace Selector */}
        <div className="px-4 py-5">
          <button className="flex w-full items-center justify-between rounded-lg border border-stone-800 bg-stone-900/50 px-3 py-2.5 text-left transition hover:border-stone-700">
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-stone-200">
                Personal workspace
              </p>

              <p className="mt-0.5 text-[11px] text-stone-500">
                Free workspace
              </p>
            </div>

            <ChevronDown size={15} className="shrink-0 text-stone-500" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3">
          <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-600">
            Workspace
          </p>

          <div className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.label}
                  className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm transition ${
                    item.active
                      ? "bg-stone-800/80 text-stone-100"
                      : "text-stone-500 hover:bg-stone-800/50 hover:text-stone-300"
                  }`}
                >
                  <Icon size={16} strokeWidth={1.7} />

                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <p className="mb-2 mt-9 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-600">
            Library
          </p>

          <button className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-stone-500 transition hover:bg-stone-800/50 hover:text-stone-300">
            <FolderOpen size={16} strokeWidth={1.7} />

            <span>Collections</span>
          </button>
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-stone-800/80 p-3">
          <button className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-stone-500 transition hover:bg-stone-800/50 hover:text-stone-300">
            <Settings size={16} strokeWidth={1.7} />

            <span>Settings</span>
          </button>
        </div>
      </aside>

      {/* Main Application */}
      <div className="min-h-screen lg:pl-72">
        {/* Top Header */}
        <header className="flex h-16 items-center justify-between border-b border-stone-800/80 px-4 sm:px-6 lg:px-8">
          <button
            aria-label="Open navigation"
            onClick={() => setSidebarOpen(true)}
            className="rounded-md p-2 text-stone-400 transition hover:bg-stone-800 hover:text-stone-100 lg:hidden"
          >
            <Menu size={20} />
          </button>

          <div className="hidden text-xs text-stone-500 sm:block">
            Workspace / Overview
          </div>

          <div className="ml-auto flex items-center gap-3">
            <span className="hidden text-xs text-stone-500 sm:block">
              Local workspace
            </span>

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-700 text-xs font-medium text-stone-200">
              K
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-12">
          {/* Page Heading */}
          <section className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-stone-500">
                Overview
              </p>

              <h1 className="text-2xl font-semibold tracking-tight text-stone-100 sm:text-3xl">
                Your knowledge base
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-stone-500">
                Find documentation, explore your resources, and ask questions
                using your knowledge base.
              </p>
            </div>

            <button className="inline-flex w-fit items-center justify-center gap-2 rounded-md bg-stone-100 px-4 py-2.5 text-sm font-medium text-stone-900 transition hover:bg-white">
              <Plus size={16} />
              Add document
            </button>
          </section>

          {/* Search */}
          <section className="mt-9">
            <div className="flex items-center gap-3 rounded-lg border border-stone-800 bg-[#171716] px-4 transition focus-within:border-stone-600">
              <Search size={17} className="shrink-0 text-stone-500" />

              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search your knowledge base..."
                className="min-w-0 flex-1 bg-transparent py-3.5 text-sm text-stone-200 outline-none placeholder:text-stone-600"
              />

              <kbd className="hidden rounded border border-stone-800 px-2 py-1 text-[10px] text-stone-600 sm:block">
                ⌘ K
              </kbd>
            </div>
          </section>

          {/* Overview Metrics */}
          <section className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <MetricCard
              label="Documents"
              value="—"
              description="No documents added"
            />

            <MetricCard
              label="Collections"
              value="—"
              description="Organize your resources"
            />

            <MetricCard
              label="Questions asked"
              value="—"
              description="Your AI activity"
            />
          </section>

          {/* Content Area */}
          <section className="mt-10 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
            {/* Recent Documents */}
            <div className="min-w-0 rounded-xl border border-stone-800 bg-[#171716]">
              <div className="flex items-center justify-between border-b border-stone-800 px-5 py-4">
                <div>
                  <h2 className="text-sm font-medium text-stone-200">
                    Recent documents
                  </h2>

                  <p className="mt-1 text-xs text-stone-600">
                    Your latest uploaded resources
                  </p>
                </div>

                <FileText size={17} className="text-stone-600" />
              </div>

              <div className="flex min-h-56 flex-col items-center justify-center px-5 py-10 text-center">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-stone-800 bg-stone-900/50">
                  <FolderOpen
                    size={18}
                    className="text-stone-500"
                    strokeWidth={1.5}
                  />
                </div>

                <h3 className="text-sm font-medium text-stone-300">
                  Your library is empty
                </h3>

                <p className="mt-2 max-w-xs text-xs leading-5 text-stone-600">
                  Upload your first document to begin building your developer
                  knowledge base.
                </p>

                <button className="mt-5 inline-flex items-center gap-2 rounded-md border border-stone-700 px-3 py-2 text-xs font-medium text-stone-300 transition hover:border-stone-500 hover:bg-stone-800">
                  <Upload size={14} />
                  Upload document
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-xl border border-stone-800 bg-[#171716]">
              <div className="border-b border-stone-800 px-5 py-4">
                <h2 className="text-sm font-medium text-stone-200">
                  Quick actions
                </h2>

                <p className="mt-1 text-xs text-stone-600">
                  Get started with your workspace
                </p>
              </div>

              <div className="space-y-2 p-3">
                <QuickAction
                  icon={Upload}
                  title="Upload documentation"
                  description="Add a new resource"
                />

                <QuickAction
                  icon={MessageSquare}
                  title="Ask a question"
                  description="Explore your knowledge"
                />

                <QuickAction
                  icon={FolderOpen}
                  title="Create collection"
                  description="Organize your documents"
                />
              </div>
            </div>
          </section>
          <DocumentUpload />
        </main>
      </div>
    </div>
  );
}

function MetricCard({ label, value, description }) {
  return (
    <div className="rounded-xl border border-stone-800 bg-[#171716] p-5">
      <p className="text-xs text-stone-500">{label}</p>

      <p className="mt-3 text-2xl font-semibold tracking-tight text-stone-100">
        {value}
      </p>

      <p className="mt-1 text-xs text-stone-600">{description}</p>
    </div>
  );
}

function QuickAction({ icon: Icon, title, description }) {
  return (
    <button className="flex w-full items-center gap-3 rounded-lg p-3 text-left transition hover:bg-stone-800/60">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-stone-800 bg-stone-900/50">
        <Icon size={16} strokeWidth={1.5} className="text-stone-400" />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium text-stone-300">{title}</p>

        <p className="mt-1 text-[11px] text-stone-600">{description}</p>
      </div>
    </button>
  );
}

export default App;
