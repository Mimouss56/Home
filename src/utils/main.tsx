export default function excerpt(text: string, length = 30) {
  if (text.length <= length) {
    return text;
  }
  return `${text.substring(0, length)} ... voir plus`;
}
