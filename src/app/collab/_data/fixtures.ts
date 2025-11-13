
const names = [
  "Alex Kim","Jordan Lee","Sam Patel","Taylor Morgan","Avery Chen","Riley Singh","Casey Brooks","Jamie Park","Dana Cruz","Quinn Shah"
];

const roles= ["host","cohost","participant","participant","participant","participant","participant","viewer","participant","participant"];

export function createFakeParticipants(count: number = 8) {
  const arr = Array.from({ length: count }).map((_, i) => {
    const id = `p-${i+1}`;
    const role = roles[i % roles.length];
    return {
      id,
      name: names[i % names.length],
      role,
      muted: Math.random() > 0.6,
      speaking: false,
      handRaised: false,
      videoEnabled: Math.random() > 0.3,
      screenSharing: false,
      avatarUrl: `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(names[i % names.length])}`
    };
  });
  if (arr.length) arr[0].role = "host";
  if (arr.length > 1) arr[1].role = "cohost";
  return arr;
}
