import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import QuestionForm from './components/QuestionForm';
import StudentAnswerForm from './components/StudentAnswerForm';
import HomePage from './components/HomePage';


function App() {
  const [evaluations, setEvaluations] = useState([]);
  const [studentAnswers, setStudentAnswers] = useState([]);

  const handleEvaluationSubmit = (evaluationData) => {
    console.log('Evaluation Saved:', evaluationData);
    setEvaluations([...evaluations, evaluationData]);
  };

  const handleStudentAnswerSubmit = (studentData) => {
    console.log('Student Answer Uploaded:', studentData);
    setStudentAnswers([...studentAnswers, studentData]);
  };

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<QuestionForm onSubmit={handleEvaluationSubmit} />} />
        <Route path="/upload" element={<StudentAnswerForm onSubmit={handleStudentAnswerSubmit} />} />
        <Route path="/results" element={<h1 className='centered-heading'>Results Page</h1>} />
      </Routes>
    </div>
  );
}

export default App;
