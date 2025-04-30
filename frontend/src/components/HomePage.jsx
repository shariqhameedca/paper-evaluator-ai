import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="centered-heading">
            <h1>Welcome to Paper Evaluator AI</h1>
            <img src="/assets/paper_checker.png" width={400}></img>
            <div style={{ marginTop: '20px' }}>
                <button onClick={() => navigate('/create')} style={{ marginRight: '10px' }}>
                    Create Evaluation
                </button>
                <button onClick={() => navigate('/upload')}>
                    Submit Student Answer
                </button>
            </div>
        </div>
    );
};

export default HomePage;
