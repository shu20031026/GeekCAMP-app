import { FC, useRef, useState } from 'react';
import ThreeDotsLoader from '../domain/ThreeDotsLoader';

export const Test: FC = () => {
  const [loading, setLoading] = useState(false);
  const [generatedBios, setGeneratedBios] = useState<String>('');

  const prompt = `次の文章をビジネスの場で使う想定で変換してください。 条件:最大限フォーマルな場合を100%として90%程度で日本語で生成。「おはようございます！ いよいよ明日が本番ですね」`;

  const myRef = useRef<null | HTMLDivElement>(null);

  const scrollToHeader = () => {
    if (myRef.current !== null) {
      myRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  console.log(generatedBios);

  const generateBio = async (e: any) => {
    e.preventDefault();
    setGeneratedBios('');
    setLoading(true);
    const response = await fetch('/api/message/stream/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
      }),
    });
    console.log('Edge function returned.');

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    console.log(response.body);

    setTimeout(() => {
      scrollToHeader();
    }, 500);

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedBios((prev) => prev + chunkValue);
    }
    scrollToHeader();
    setLoading(false);
  };

  return (
    <div>
      <button onClick={(e) => generateBio(e)}>aaa</button>
      {loading && <ThreeDotsLoader />}
      {generatedBios && (
        <>
          <div className='space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto'>
            {generatedBios
              .substring(generatedBios.indexOf('1'))
              .split('2.')
              .map((generatedBio) => {
                return (
                  <div
                    className='bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border'
                    onClick={() => {
                      navigator.clipboard.writeText(generatedBio);
                    }}
                    key={generatedBio}
                  >
                    <p>{generatedBio}</p>
                  </div>
                );
              })}
          </div>
        </>
      )}
    </div>
  );
};
