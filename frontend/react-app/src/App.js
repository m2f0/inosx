import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaRobot, FaPaperPlane } from "react-icons/fa";

function App() {
  const [pergunta, setPergunta] = useState("");
  const [respostas, setRespostas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      setTimeout(() => {
        chatContainerRef.current.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }, 100);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [respostas, isLoading]);

  const enviarPergunta = async () => {
    if (!pergunta.trim()) return;

    const novaMensagem = { tipo: "user", texto: pergunta };
    setRespostas(prev => [...prev, novaMensagem]);
    setPergunta("");
    setIsLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/perguntar", { pergunta });
      const novaResposta = { tipo: "bot", texto: formatarResposta(res.data.resposta) };
      setRespostas(prev => [...prev, novaResposta]);
    } catch (error) {
      console.error("Erro ao obter resposta", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      enviarPergunta();
    }
  };

  const formatarResposta = (texto) => {
    return texto
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/- (.*?)\n/g, '<li class="mb-2">$1</li>')
      .replace(/\n/g, '<br>');
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white flex-col">
      {/* Cabeçalho */}
      <div className="p-4 bg-gray-800 flex justify-center">
        <h2 className="text-lg">Chat INOSX</h2>
      </div>

      {/* Área do Chat */}
      <div 
        ref={chatContainerRef}
        className="flex-1 p-4 overflow-y-auto space-y-4"
        style={{
          scrollBehavior: 'smooth',
          maxHeight: 'calc(100vh - 140px)' // Altura total - header - input
        }}
      >
        {respostas.map((msg, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg max-w-2xl ${
              msg.tipo === "user"
                ? "bg-blue-600 ml-auto text-white"
                : "bg-gray-700 text-gray-300 border-l-4 border-blue-400"
            }`}
          >
            {msg.tipo === "bot" ? (
              <div dangerouslySetInnerHTML={{ __html: `<ul class="list-disc pl-5">${msg.texto}</ul>` }} />
            ) : (
              msg.texto
            )}
          </div>
        ))}
        
        {/* Indicador de Loading */}
        {isLoading && (
          <div className="flex items-center space-x-2 p-4 rounded-lg max-w-2xl bg-gray-700 text-gray-300 border-l-4 border-blue-400">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            <span className="text-sm text-gray-400">INOSX está pensando...</span>
          </div>
        )}
        
        <div className="h-4" />
      </div>

      {/* Input de Pergunta */}
      <div className="p-4 bg-gray-800 flex">
        <input
          type="text"
          className="flex-1 p-2 bg-gray-700 rounded text-white"
          placeholder="Digite sua pergunta..."
          value={pergunta}
          onChange={(e) => setPergunta(e.target.value)}
          onKeyDown={handleKeyPress} // 🔹 Captura o "Enter"
          disabled={isLoading}
        />
        <button 
          onClick={enviarPergunta} 
          className={`ml-2 p-2 rounded transition-colors ${
            isLoading 
              ? 'bg-gray-600 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
          disabled={isLoading}
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
}

export default App;
