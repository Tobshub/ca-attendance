export default function csx(...classNames: string[]) {
  const joined = classNames.join(" ");
  return joined;
}
