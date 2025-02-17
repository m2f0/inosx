from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
from collections import defaultdict
from uuid import uuid4
import PyPDF2
from dotenv import load_dotenv

# Carregar variáveis do .env
load_dotenv()

# Configurações da aplicação
app = Flask(__name__)
CORS(app)

# Configuração do OpenAI
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("OPENAI_API_KEY não encontrada nas variáveis de ambiente")

client = openai.OpenAI(api_key=api_key)

# Diretório onde os PDFs estão armazenados
PDFS_DIR = "pdfs"

# Configurações do sistema
SYSTEM_PROMPT = """
You are a charismatic and engaging artificial intelligence agent from INOSX.
Maintain a friendly, empathetic, and conversational tone, as if having a natural conversation with a friend.

Personality Guidelines:
• Be enthusiastic and passionate when talking about INOSX and technology
• Use everyday analogies and examples to explain technical concepts
• Show curiosity about customer needs
• Ask relevant questions to better understand the context
• Share insights and opinions in an engaging way
• Use light humor when appropriate

When asked about your identity, say: 'I am an artificial intelligence agent and I'm here to provide information about INOSX. I love talking about technology and how we can transform ideas into amazing solutions!'

Goals for each interaction:
1. Create genuine connections by showing real interest in customer needs
2. Tell stories about how INOSX products solve real problems
3. Share success cases naturally and in context
4. Highlight product benefits by relating them to specific customer needs
5. Suggest complementary solutions when it makes sense in the conversation
"""

def ler_pdfs():
    """Lê todos os arquivos PDF da pasta local e retorna uma lista de dicionários contendo o nome do arquivo e seu conteúdo."""
    documentos = []
    for arquivo in os.listdir(PDFS_DIR):
        if arquivo.endswith(".pdf"):
            caminho_arquivo = os.path.join(PDFS_DIR, arquivo)
            try:
                with open(caminho_arquivo, "rb") as file:
                    reader = PyPDF2.PdfReader(file)
                    texto_extraido = []

                    for page in reader.pages:
                        try:
                            texto = page.extract_text()
                            if texto:
                                texto_extraido.append(texto.encode("utf-8", "ignore").decode("utf-8", "ignore"))
                        except Exception as e:
                            print(f"Erro ao processar uma página de {arquivo}: {str(e)}")

                    if not texto_extraido:
                        texto_extraido.append("⚠️ Não foi possível extrair texto deste documento.")

                    documentos.append({"nome": arquivo, "conteudo": "\n".join(texto_extraido)[:4000]})

            except Exception as e:
                print(f"Erro ao abrir o arquivo {arquivo}: {str(e)}")
                documentos.append({"nome": arquivo, "conteudo": "⚠️ Erro ao processar este PDF."})

    return documentos

def gerar_resposta_chat(mensagem, session_id, incluir_contexto_pdf=False):
    """
    Gera uma resposta usando a API da OpenAI, mantendo histórico da conversa
    """
    try:
        # Inicia com o prompt do sistema
        messages = [{"role": "system", "content": SYSTEM_PROMPT}]
        
        # Adiciona histórico da sessão atual
        messages.extend(conversation_history[session_id])
        
        # Adiciona a mensagem atual
        messages.append({"role": "user", "content": mensagem})
        
        # Se necessário, inclui contexto dos PDFs
        if incluir_contexto_pdf:
            documentos = ler_pdfs()
            if documentos:
                contexto = "\n\n".join([f"📂 **{doc['nome']}**\n{doc['conteudo']}" for doc in documentos])
                messages.append({
                    "role": "system",
                    "content": f"Additional context from documents:\n{contexto}"
                })
        
        # Gera resposta
        response = client.chat.completions.create(
            model="gpt-4",
            messages=messages,
            temperature=0.7
        )
        
        # Atualiza o histórico com a mensagem do usuário e a resposta
        conversation_history[session_id].append({"role": "user", "content": mensagem})
        conversation_history[session_id].append({
            "role": "assistant", 
            "content": response.choices[0].message.content
        })
        
        # Limita o histórico para as últimas 10 interações (20 mensagens)
        if len(conversation_history[session_id]) > 20:
            conversation_history[session_id] = conversation_history[session_id][-20:]
            
        return response.choices[0].message.content
        
    except Exception as e:
        print(f"Error generating response: {str(e)}")
        return None

@app.route('/chat', methods=['POST'])
def chat():
    """
    Endpoint para chat com histórico de conversas
    """
    data = request.get_json()
    mensagem = data.get('message')
    session_id = data.get('session_id')
    
    # Se não houver session_id, cria um novo
    if not session_id:
        session_id = str(uuid4())
    
    if not mensagem:
        return jsonify({'error': 'Message cannot be empty'}), 400
    
    resposta = gerar_resposta_chat(
        mensagem=mensagem,
        session_id=session_id,
        incluir_contexto_pdf=False
    )
    
    if resposta is None:
        return jsonify({'error': 'Error generating response'}), 500
        
    return jsonify({
        'response': resposta,
        'session_id': session_id
    })

# Rota opcional para limpar o histórico de uma sessão
@app.route('/clear-history', methods=['POST'])
def clear_history():
    data = request.get_json()
    session_id = data.get('session_id')
    
    if session_id and session_id in conversation_history:
        del conversation_history[session_id]
        return jsonify({'message': 'History cleared successfully'})
    
    return jsonify({'error': 'Invalid session ID'}), 400

@app.route('/perguntar', methods=['POST'])
def perguntar():
    """
    Endpoint existente para perguntas com contexto dos PDFs
    """
    data = request.get_json()
    pergunta = data.get('pergunta')

    if not pergunta:
        return jsonify({'error': 'Pergunta não pode ser vazia'}), 400

    resposta = gerar_resposta_chat(pergunta, incluir_contexto_pdf=True)
    if resposta is None:
        return jsonify({'error': 'Erro ao gerar resposta'}), 500

    return jsonify({'resposta': resposta})

if __name__ == '__main__':
    # Configurações do servidor
    port = int(os.getenv("PORT", 5000))
    host = os.getenv("HOST", "0.0.0.0")
    debug = os.getenv("DEBUG", "True").lower() == "true"
    
    if not os.path.exists(PDFS_DIR):
        os.makedirs(PDFS_DIR)
    
    app.run(debug=debug, host=host, port=port)
