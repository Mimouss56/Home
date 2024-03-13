import { OpenAI } from 'openai';
import { APIError, OpenAIError } from 'openai/error';
import { Chat } from 'openai/resources';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Textarea from '../Form/textarea';

const openai = new OpenAI({
  apiKey: 'KtiBj2AOUrMYnXAISiDTl-AOvmYfl_8Wz8v1Tl9TE2F-4l1IonENk-DJJHH7RG2Qg',
  dangerouslyAllowBrowser: true,
  maxRetries: 1,

});

function ChatGPT() {
  const [showResultGPT, setShowResultGPT] = useState(false);
  const [gptChat, setGptChat] = useState('');

  const generateText = async (inputText: string) => {
    try {
      const response = await openai.chat.completions.create(
        {
          model: 'gpt-3.5-turbo-1106',

          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant.',
            },
            {
              role: 'user',
              content: inputText,
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },

        },
      );
      console.log(response.choices[0].message.content);
      setGptChat(response.choices[0].message.content as string);
    } catch (err: any) {
      setGptChat(err.message);
      toast.error(err.message);
    }
  };
  const handleGPT = () => {
    setShowResultGPT(!showResultGPT);
    generateText('form.prez');
  };
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary mb-3"
        onClick={handleGPT}
      >
        Générer un texte
      </button>
      {showResultGPT && (
        <Textarea
          title="GPT"
          text={gptChat}
          onChange={(e) => setGptChat(e.target.value)}
          name="gpt"
          icon={null}
        />

      )}
    </div>
  );
}

export default ChatGPT;
