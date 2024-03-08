export default async function GenerateByChatGPT(inputText: string) {
  const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: inputText,
      max_tokens: 250,
    }),
  });
  const data = await response.json();
  return data.choices[0].text;
}
