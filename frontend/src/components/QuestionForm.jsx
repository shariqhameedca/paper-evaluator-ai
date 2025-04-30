import { useState } from 'react';
import { createEvaluation } from '../services/api';

function QuestionForm() {
    const [question, setQuestion] = useState('');
    const [idealAnswer, setIdealAnswer] = useState('');
    const [keyPoints, setKeyPoints] = useState(['']);
    const [statusMessage, setStatusMessage] = useState('');

    const handleKeyPointChange = (index, value) => {
        const newKeyPoints = [...keyPoints];
        newKeyPoints[index] = value;
        setKeyPoints(newKeyPoints);
    };

    const addKeyPointField = () => {
        setKeyPoints([...keyPoints, '']);
    };

    const removeKeyPointField = (index) => {
        const newKeyPoints = [...keyPoints];
        newKeyPoints.splice(index, 1);
        setKeyPoints(newKeyPoints);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const evaluationData = {
            question,
            ideal_answer: idealAnswer,
            key_points: keyPoints.filter(kp => kp.trim() !== ''),
        };

        try {
            await createEvaluation(evaluationData);
            setStatusMessage('Evaluation saved successfully!');
            setQuestion('');
            setIdealAnswer('');
            setKeyPoints(['']);
        } catch (error) {
            console.error('Error creating evaluation:', error);
            setStatusMessage('Failed to save evaluation.');
        }
    };

    return (
        <div className='centered-form'>
            <form onSubmit={handleSubmit} style={{ margin: '20px' }}>
                <h2 style={{ textAlign: 'center' }}>Create Evaluation</h2>

                {statusMessage && (
                    <p style={{ color: 'green', textAlign: 'center' }}>{statusMessage}</p>
                )}

                <div>
                    <label>Question:</label>
                    <textarea
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        rows="3"
                        cols="50"
                        required
                    />
                </div>

                <div>
                    <label>Ideal Answer:</label>
                    <textarea
                        value={idealAnswer}
                        onChange={(e) => setIdealAnswer(e.target.value)}
                        rows="5"
                        cols="50"
                        required
                    />
                </div>

                <div>
                    <label>Key Points to Look For:</label>
                    {keyPoints.map((kp, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                            <input
                                type="text"
                                value={kp}
                                onChange={(e) => handleKeyPointChange(index, e.target.value)}
                                style={{ width: '300px' }}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => removeKeyPointField(index)}
                                style={{
                                    marginLeft: '10px',
                                    backgroundColor: 'red',
                                    color: 'white',
                                    border: 'none',
                                    padding: '5px 10px',
                                    cursor: 'pointer'
                                }}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={addKeyPointField}>+ Add another key point</button>
                </div>
                <button type="submit" style={{ marginTop: '20px' }}>Save Evaluation</button>
            </form>
        </div>
    );
}

export default QuestionForm;
