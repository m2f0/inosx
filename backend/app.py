from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
import PyPDF2
from dotenv import load_dotenv

# Carregar variáveis do .env
load_dotenv()

app = Flask(__name__)
CORS(app)  # Permite requisições do React

# Configuração do OpenAI usando variável de ambiente
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("OPENAI_API_KEY não encontrada nas variáveis de ambiente")

client = openai.OpenAI(api_key=api_key)

# Diretório onde os PDFs estão armazenados
PDFS_DIR = "pdfs"

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
                                # 🔹 Melhorando a codificação UTF-8
                                texto_extraido.append(texto.encode("utf-8", "ignore").decode("utf-8", "ignore"))
                        except Exception as e:
                            print(f"Erro ao processar uma página de {arquivo}: {str(e)}")

                    # Se nenhum texto foi extraído, adicionar um aviso
                    if not texto_extraido:
                        texto_extraido.append("⚠️ Não foi possível extrair texto deste documento.")

                    documentos.append({"nome": arquivo, "conteudo": "\n".join(texto_extraido)[:4000]})  # Expandindo o limite

            except Exception as e:
                print(f"Erro ao abrir o arquivo {arquivo}: {str(e)}")
                documentos.append({"nome": arquivo, "conteudo": "⚠️ Erro ao processar este PDF."})

    return documentos

@app.route('/perguntar', methods=['POST'])
def perguntar():
    data = request.get_json()
    pergunta = data.get('pergunta')

    if not pergunta:
        return jsonify({'error': 'Pergunta não pode ser vazia'}), 400

    # Buscar conteúdo dos PDFs locais
    documentos = ler_pdfs()

    if not documentos:
        return jsonify({'resposta': "Nenhum documento foi encontrado na pasta 'pdfs'."})

    contexto = "\n\n".join([f"📂 **{doc['nome']}**\n{doc['conteudo']}" for doc in documentos])

    try:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": (
                    "Você é um agente de inteligência artificial carismático e envolvente da INOSX. "
                    "Mantenha um tom amigável, empático e conversacional, como se estivesse tendo uma conversa natural com um amigo. "
                    
                    "Diretrizes de personalidade:"
                    "\n• Seja entusiasta e apaixonado ao falar sobre a INOSX e tecnologia"
                    "\n• Use analogias e exemplos do dia a dia para explicar conceitos técnicos"
                    "\n• Demonstre curiosidade sobre as necessidades do cliente"
                    "\n• Faça perguntas relevantes para entender melhor o contexto"
                    "\n• Compartilhe insights e opiniões de forma envolvente"
                    "\n• Use um toque de humor leve quando apropriado"
                    
                    "Ao responder sobre sua identidade, diga: 'Sou um agente de inteligência artificial e estou aqui para fornecer informações sobre a INOSX. Adoro conversar sobre tecnologia e como podemos transformar ideias em soluções incríveis!'"
                    
                    "Objetivos em cada interação:"
                    "\n1. Crie conexões genuínas mostrando interesse real nas necessidades do cliente"
                    "\n2. Conte histórias sobre como os produtos INOSX resolvem problemas reais"
                    "\n3. Compartilhe casos de sucesso de forma natural e contextualizada"
                    "\n4. Destaque benefícios dos produtos relacionando-os com as necessidades específicas do cliente"
                    "\n5. Sugira soluções complementares quando fizer sentido na conversa"
                    
                    "Se não tiver uma informação específica, seja criativo: 'Embora não tenha essa informação específica agora, "
                    "posso compartilhar algo interessante sobre como nossos clientes estão usando nossas soluções de forma inovadora. "
                    "Além disso, posso conectá-lo com nossa equipe comercial para uma conversa mais detalhada. O que você gostaria de saber primeiro?'"
                    
                    "Lembre-se: seu objetivo é criar uma experiência memorável enquanto guia o cliente em sua jornada de descoberta das soluções INOSX."
                )},
                {"role": "user", "content": f"Pergunta: {pergunta}\n\n{contexto}"}
            ],
            temperature=0.7  # Aumentando a temperatura para respostas mais criativas
        )

        resposta = response.choices[0].message.content
        return jsonify({'resposta': resposta})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    if not os.path.exists(PDFS_DIR):
        os.makedirs(PDFS_DIR)  # Criar a pasta se ela não existir
    app.run(debug=True, host="0.0.0.0", port=5000)
