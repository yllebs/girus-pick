import axios from 'axios';

// Criar objeto API para atender todos os padrões de chamadas na aplicação
const api = axios.create({
    baseURL: '/api/v1'  // Ajustar para usar o prefixo correto
});

// Adicionar logs detalhados para todas as requisições
api.interceptors.request.use(config => {
    console.log(`[API Request] ${config.method?.toUpperCase() || 'UNKNOWN'} ${config.url || 'UNKNOWN'}`);
    return config;
});

// Adicionar logs para todas as respostas
api.interceptors.response.use(response => {
    console.log(`[API Response] Status: ${response.status} from ${response.config.url}`);
    console.log("Dados recebidos:", response.data);
    return response;
}, error => {
    console.error(`[API Error] ${error.config?.url || 'Unknown URL'}:`, error);
    return Promise.reject(error);
});

// Método para buscar templates
api.fetchTemplates = async () => {
    try {
        console.log("Tentando buscar templates de:", `/templates`);
        const response = await api.get('/templates');
        console.log("Resposta recebida:", response);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar templates:", error);
        throw error;
    }
};

// Método para criar um laboratório
api.createLab = async (templateId) => {
    try {
        console.log(`Criando laboratório para template: ${templateId}`);
        const response = await api.post('/labs', { templateId });
        console.log("Resposta da criação de laboratório:", response.data);
        return response.data;
    } catch (error) {
        console.error("Erro ao criar laboratório:", error);
        throw error;
    }
};

// Método para validar uma tarefa específica
api.validateTask = async (namespace, pod, templateId, taskIndex) => {
    try {
        console.log(`Validando tarefa ${taskIndex} do template ${templateId}`);
        const response = await api.post(`/labs/${namespace}/${pod}/validate`, {
            templateId,
            taskIndex
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao validar tarefa:", error);
        throw error;
    }
};

// Método para validar o laboratório completo
api.validateLab = async (namespace, pod, templateId) => {
    try {
        console.log(`Validando laboratório completo ${templateId}`);
        const response = await api.post(`/labs/${namespace}/${pod}/validate-lab`, {
            templateId
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao validar laboratório:", error);
        throw error;
    }
};

// Método para obter URL do WebSocket do terminal
api.getTerminalWebSocketUrl = (namespace, pod) => {
    // Construir URL WebSocket mantendo o mesmo host mas mudando o protocolo
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = window.location.host;
    // A rota agora foi alterada para /ws/terminal/:namespace/:pod
    const wsUrl = `${protocol}//${host}/ws/terminal/${namespace}/${pod}`;
    console.log(`Conectando terminal ao WebSocket: ${wsUrl}`);
    return wsUrl;
};

// Exportações para compatibilidade com diferentes padrões de importação
export default api;
export const fetchTemplates = api.fetchTemplates;
export { api }; 