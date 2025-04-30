import { useEffect, useState } from 'react';
import { getEvaluations, evaluateStudentAnswer } from '../services/api';

function StudentAnswerForm() {
    const [studentName, setStudentName] = useState('');
    const [selectedQuestionId, setSelectedQuestionId] = useState('');
    const [studentAnswer, setStudentAnswer] = useState('');
    const [questions, setQuestions] = useState([]);
    const [score, setScore] = useState(null);
    const [feedback, setFeedback] = useState(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const data = await getEvaluations();
                setQuestions(data);
            } catch (error) {
                console.error('Error fetching evaluations:', error);
            }
        };
        fetchQuestions();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                evaluation_id: selectedQuestionId,
                student_name: studentName,
                student_answer: studentAnswer
            };
            const result = await evaluateStudentAnswer(payload);
            setScore(result.score);
            setFeedback(result.feedback)
        } catch (error) {
            console.error('Error submitting student answer:', error);
        }
    };

    return (
        <div className="centered-form">
            <form onSubmit={handleSubmit} style={{ margin: '20px' }}>
                <h2>Upload Student Answer</h2>

                <div>
                    <label>Student Name:</label>
                    <input
                        type="text"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        style={{ width: '100%' }}
                        required
                    />
                </div>

                <div>
                    <label>Question:</label>
                    <select
                        value={selectedQuestionId}
                        onChange={(e) => setSelectedQuestionId(e.target.value)}
                        style={{ width: '100%', padding: '8px' }}
                        required
                    >
                        <option value="">Select a question</option>
                        {questions.map((q) => (
                            <option key={q.id} value={q.id}>
                                {q.question}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Student Answer:</label>
                    <textarea
                        value={studentAnswer}
                        onChange={(e) => setStudentAnswer(e.target.value)}
                        rows="5"
                        cols="50"
                        required
                    />
                </div>

                <button type="submit">Submit Answer</button>

                {score !== null && (
                    <div style={{ marginTop: '20px' }}>
                        <b>Score:</b> {score}/10<br></br>
                        <b>Feedback:</b> {feedback}
                    </div>
                )}
            </form>
        </div>
    );
}

export default StudentAnswerForm;
