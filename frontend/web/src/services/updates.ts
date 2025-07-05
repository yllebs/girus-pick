import axios from 'axios';

// Versão atual do Girus-CLI
export const CURRENT_VERSION = '0.1.0';

// Constantes para gerenciamento de notificações
export const NOTIFICATION_RESHOW_HOURS = 24; // Horas antes de mostrar a notificação novamente

// Chaves do localStorage
export const LS_KEYS = {
    LAST_CHECK: 'girus_update_last_check',
    DISMISSED_VERSION: 'girus_update_dismissed_version',
    RESHOW_HOURS: 'girus_update_reshow_hours'
};

/**
 * Obtém o tempo de reexibição da notificação (pode ser sobrescrito pelo localStorage)
 * @returns Número de horas antes de mostrar a notificação novamente
 */
export const getNotificationReshowHours = (): number => {
    const storedValue = localStorage.getItem(LS_KEYS.RESHOW_HOURS);
    if (storedValue) {
        const hours = parseInt(storedValue, 10);
        if (!isNaN(hours) && hours > 0) {
            return hours;
        }
    }
    return NOTIFICATION_RESHOW_HOURS;
};

// Interface para representar informações da release
export interface ReleaseInfo {
    version: string;
    url: string;
    name: string;
    published_at: string;
    body: string;
}

/**
 * Verifica se há uma nova versão do Girus-CLI disponível
 * @returns Promise contendo informações da versão mais recente ou null se estiver atualizado
 */
export const checkForUpdates = async (): Promise<ReleaseInfo | null> => {
    try {
        // Obter a versão mais recente do GitHub
        const response = await axios.get('https://api.github.com/repos/badtuxx/girus-cli/releases/latest');

        // Extrair o número da versão (remove o 'v' inicial)
        const latestVersion = response.data.tag_name.replace(/^v/, '');

        // Comparar com a versão atual
        if (isNewerVersion(latestVersion, CURRENT_VERSION)) {
            return {
                version: latestVersion,
                url: response.data.html_url,
                name: response.data.name,
                published_at: response.data.published_at,
                body: response.data.body
            };
        }

        // Retorna null se já estiver na versão mais recente
        return null;
    } catch (error) {
        console.error('Erro ao verificar atualizações:', error);
        return null;
    }
};

/**
 * Compara duas versões no formato semântico (x.y.z)
 * @param version1 Nova versão
 * @param version2 Versão atual
 * @returns true se version1 for mais recente que version2
 */
export const isNewerVersion = (version1: string, version2: string): boolean => {
    const v1Parts = version1.split('.').map(Number);
    const v2Parts = version2.split('.').map(Number);

    for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
        const v1Part = v1Parts[i] || 0;
        const v2Part = v2Parts[i] || 0;

        if (v1Part > v2Part) return true;
        if (v1Part < v2Part) return false;
    }

    return false; // As versões são iguais
}; 