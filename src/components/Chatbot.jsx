import { useEffect, useRef, useState } from 'react';
import { chatWithAI } from '../services/api.js';

const GREETING = {
  role: 'assistant',
  content: "Hi! I'm your Smart Image Search assistant. Ask me about the binary search, uploads, or the dataset.",
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  const send = async (e) => {
    e?.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    const next = [...messages, { role: 'user', content: text }];
    setMessages(next);
    setInput('');
    setLoading(true);
    try {
      const data = await chatWithAI({
        message: text,
        history: next.filter((m) => m.role !== 'system'),
      });
      setMessages((cur) => [...cur, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages((cur) => [
        ...cur,
        { role: 'assistant', content: 'Sorry — I could not reach the assistant. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quick = ['How does binary search work?', 'How many images?', 'How do I upload?'];

  return (
    <>
      <button
        className={`chat-fab ${open ? 'open' : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close assistant' : 'Open assistant'}
        aria-expanded={open}
      >
        {open ? '×' : '💬'}
      </button>

      {open && (
        <div className="chat-panel" role="dialog" aria-label="AI assistant">
          <header className="chat-header">
            <div className="chat-title">
              <span className="chat-dot" aria-hidden="true" />
              Smart Search Assistant
            </div>
            <span className="chat-sub">Powered by Binary Search project</span>
          </header>

          <div className="chat-scroll" ref={scrollRef}>
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.role}`}>
                <div className="chat-bubble">{m.content}</div>
              </div>
            ))}
            {loading && (
              <div className="chat-msg assistant">
                <div className="chat-bubble typing">
                  <span /><span /><span />
                </div>
              </div>
            )}
          </div>

          {messages.length <= 1 && (
            <div className="chat-quick">
              {quick.map((q) => (
                <button
                  key={q}
                  className="chip"
                  onClick={() => { setInput(q); }}
                  type="button"
                >{q}</button>
              ))}
            </div>
          )}

          <form className="chat-input" onSubmit={send}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about the search, algorithm, or uploads…"
              aria-label="Message the assistant"
              disabled={loading}
            />
            <button type="submit" disabled={loading || !input.trim()} aria-label="Send">➤</button>
          </form>
        </div>
      )}
    </>
  );
}