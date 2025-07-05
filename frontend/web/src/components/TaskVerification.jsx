import React from 'react';
import { api } from '../services/api';

const TaskVerification = ({ namespace, pod, templateId, taskIndex }) => {
    const handleVerification = async () => {
        try {
            const result = await api.validateTask(namespace, pod, templateId, taskIndex);
            if (result.success) {
                alert('Tarefa concluída com sucesso!');
            } else {
                alert(`Tarefa não concluída: ${result.message}`);
            }
        } catch (error) {
            console.error('Erro ao verificar tarefa:', error);
            alert('Erro ao verificar tarefa');
        }
    };

    return (
        <button onClick={handleVerification}>
            VERIFICAR
        </button>
    );
};

export default TaskVerification; 