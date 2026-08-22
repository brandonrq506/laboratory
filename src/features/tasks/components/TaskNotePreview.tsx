import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";

interface Props {
  note: string;
}

export const TaskNotePreview = ({ note }: Props) => {
  if (!note) return null;

  const firstLine = note.split("\n")[0];

  return (
    <div
      role="note"
      className="flex min-w-0 items-center gap-1 text-xs text-gray-600">
      <ChatBubbleLeftEllipsisIcon aria-hidden className="size-4 shrink-0" />
      <p className="min-w-0 truncate">{firstLine}</p>
    </div>
  );
};
