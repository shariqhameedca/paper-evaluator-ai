import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // Update if deployed elsewhere

export const createEvaluation = async (evaluation) => {
    const response = await axios.post(`${API_BASE_URL}/create-evaluation/`, evaluation);
    return response.data;
};

export const getEvaluations = async () => {
    const response = await axios.get(`${API_BASE_URL}/evaluations/`);
    return response.data;
};

export const evaluateStudentAnswer = async (payload) => {
    const response = await axios.post(`${API_BASE_URL}/evaluate/`, payload);
    return response.data;
};
