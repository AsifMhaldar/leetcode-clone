import { useState, useEffect, useRef } from 'react';
import axiosClient from '../../../utils/axiosClient';
import { langMap } from '../utils/problemData';

export const useProblemPage = (problemId) => {
  const [problem, setProblem] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('cpp');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [runResult, setRunResult] = useState(null);
  const [submitResult, setSubmitResult] = useState(null);
  const [activeLeftTab, setActiveLeftTab] = useState('description');
  const [activeRightTab, setActiveRightTab] = useState('code');
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const editorRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const fetchProblem = async () => {
      setLoading(true);
      try {
        const response = await axiosClient.get(`/problem/problemById/${problemId}`);
        const initialCode = response.data.startCode.find(sc => sc.language === langMap[selectedLanguage]).initialCode;

        setProblem(response.data);
        setCode(initialCode);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching problem:', error);
        setLoading(false);
      }
    };

    fetchProblem();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [problemId]);

  useEffect(() => {
    if (problem) {
      const initialCode = problem.startCode.find(sc => sc.language === langMap[selectedLanguage]).initialCode;
      setCode(initialCode);
    }
  }, [selectedLanguage, problem]);

  const startTimer = () => {
    if (!isTimerRunning) {
      setIsTimerRunning(true);
      timerRef.current = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
  };

  const pauseTimer = () => {
    if (isTimerRunning) {
      setIsTimerRunning(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setTimer(0);
  };

  const handleEditorChange = (value) => {
    setCode(value || '');
  };

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const handleRun = async () => {
    setLoading(true);
    setRunResult(null);
    
    try {
      const response = await axiosClient.post(`/submission/run/${problemId}`, {
        code,
        language: selectedLanguage
      });

      setRunResult(response.data);
      setLoading(false);
      setActiveRightTab('testcase');
    } catch (error) {
      console.error('Error running code:', error);
      setRunResult({
        success: false,
        error: 'Internal server error'
      });
      setLoading(false);
      setActiveRightTab('testcase');
    }
  };

  const handleSubmitCode = async () => {
    setLoading(true);
    setSubmitResult(null);
    
    try {
      const response = await axiosClient.post(`/submission/submit/${problemId}`, {
        code: code,
        language: selectedLanguage
      });

      setSubmitResult(response.data);
      setLoading(false);
      setActiveRightTab('result');
      pauseTimer();
    } catch (error) {
      console.error('Error submitting code:', error);
      setSubmitResult(null);
      setLoading(false);
      setActiveRightTab('result');
    }
  };

  return {
    problem,
    selectedLanguage,
    code,
    loading,
    runResult,
    submitResult,
    activeLeftTab,
    setActiveLeftTab,
    activeRightTab,
    setActiveRightTab,
    timer,
    isTimerRunning,
    editorRef,
    startTimer,
    pauseTimer,
    resetTimer,
    handleEditorChange,
    handleEditorDidMount,
    handleLanguageChange,
    handleRun,
    handleSubmitCode
  };
};
