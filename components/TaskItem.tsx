"use client";

import { useState } from "react";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string) => void;
}

export default function TaskItem({
  task,
  onToggle,
  onDelete,
  onUpdate,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleSave = () => {
    if (editTitle.trim() !== "") {
      onUpdate(task.id, editTitle.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  const handleDelete = () => {
    onDelete(task.id);
    setIsDeleteModalOpen(false);
  };

  return (
    <li className="flex items-center justify-between gap-4 rounded-xl border border-zinc-100 bg-white px-4 py-4 shadow-sm shadow-zinc-100 transition hover:border-zinc-200 hover:shadow-md hover:shadow-zinc-100">
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <button
          type="button"
          onClick={() => onToggle(task.id)}
          aria-label={task.completed ? "Mark task as incomplete" : "Mark task as complete"}
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition focus:outline-none focus:ring-4 focus:ring-blue-100 ${
            task.completed
              ? "border-blue-600 bg-blue-600 text-white"
              : "border-zinc-300 bg-white text-transparent hover:border-blue-500"
          }`}
        >
          <svg
            aria-hidden="true"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
          </svg>
        </button>

        {isEditing ? (
          <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              className="min-h-10 min-w-0 flex-1 rounded-lg border border-zinc-200 bg-white px-3 text-zinc-950 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="rounded-lg bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-200 focus:outline-none focus:ring-4 focus:ring-zinc-100"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <span
            className={`min-w-0 flex-1 truncate text-left text-base font-medium transition ${
              task.completed
                ? "text-zinc-400 line-through decoration-zinc-300"
                : "text-zinc-900"
            }`}
          >
            {task.title}
          </span>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {!isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            aria-label="Edit task"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-zinc-400 transition hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-100"
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125"
              />
            </svg>
          </button>
        )}
        <button
          type="button"
          onClick={() => setIsDeleteModalOpen(true)}
          aria-label="Delete task"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-zinc-400 transition hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-4 focus:ring-red-100"
        >
          <svg
            aria-hidden="true"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673A2.25 2.25 0 0 1 15.916 21H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
      </div>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/50 px-4 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`delete-task-${task.id}`}
            className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl shadow-zinc-950/20"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
              <svg
                aria-hidden="true"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m0 3.75h.008v.008H12v-.008Zm9-4.5a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
            <h2
              id={`delete-task-${task.id}`}
              className="mt-4 text-xl font-semibold text-zinc-950"
            >
              Delete this task?
            </h2>
            <p className="mt-2 text-sm leading-6 text-zinc-500">
              This action cannot be undone. The task will be removed from your list.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="rounded-xl bg-zinc-100 px-4 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-200 focus:outline-none focus:ring-4 focus:ring-zinc-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-red-600/20 transition hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-100"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </li>
  );
}
