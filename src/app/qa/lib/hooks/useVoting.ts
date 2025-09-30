import { useState } from "react";
export function useVoting(initial = 0) {
  const [votes, setVotes] = useState(initial);
  return { votes, up: () => setVotes(v => v + 1), down: () => setVotes(v => v - 1) };
}
