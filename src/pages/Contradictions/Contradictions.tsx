import { useState } from "react";
import { sendMessage } from "./sendMessage";
import { Button } from "@/components/core";

export const Contradictions = () => {
  const [text, setText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSending(true);
    await sendMessage(text);
    setIsSending(false);
    setIsSent(true);
  }

  if (isSent) {
    return <h1>Thanks for feedback!</h1>;
  }

  return (
    <div className="mt-16 text-center">
      <form onSubmit={handleSubmit}>
        <p>El estado de este componente es conflictivo</p>
        <textarea
          disabled={isSending}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <br />
        <Button disabled={isSending} isLoading={isSending} type="submit">
          Send
        </Button>
        {isSending && <p>Sending...</p>}
      </form>
    </div>
  );
};
