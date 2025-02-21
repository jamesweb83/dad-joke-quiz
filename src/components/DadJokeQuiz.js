import React, { useState, useEffect } from 'react';
import './DadJokeQuiz.css';

const AdComponent = ({ adSlot, adFormat }) => {
  useEffect(() => {
    try {
      if (window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense 광고 로드 실패:', err);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
      data-ad-slot={adSlot}
      data-ad-format={adFormat || 'auto'}
      data-full-width-responsive="true"
    />
  );
};

const DadJokeQuiz = () => {
  const [answer, setAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  
  const quizDatabase = [
    {
      question: "신발이 화나면?",
      answer: "신발끈"
    },
    {
      question: "미꾸라지가 시장에 가면?",
      answer: "미꾸손"
    },
    {
      question: "고기 먹을 때 자주 사용하는 재치있는 언어는?",
      answer: "상추어"
    },
    {
      question: "세상에서 가장 잘생긴 가위는?",
      answer: "핸썸가위"
    },
    {
      question: "사과가 웃으면?",
      answer: "풋사과"
    }
  ];

  const getTodayQuiz = () => {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    return quizDatabase[dayOfYear % quizDatabase.length];
  };

  const todayQuiz = getTodayQuiz();
  
  const handleCheck = () => {
    setShowResult(true);
  };

  const handleTryAgain = () => {
    setAnswer('');
    setShowResult(false);
  };

  const isCorrect = answer.trim().toLowerCase() === todayQuiz.answer.toLowerCase();

  return (
    <div className="quiz-container">
      <div className="quiz-content">
        {/* 상단 광고 */}
        <div className="mb-6">
          <AdComponent adSlot="1234567890" adFormat="auto" />
        </div>

        <div className="quiz-box">
          <div className="quiz-header">
            <h2 className="quiz-title">오늘의 아재개그</h2>
            <p className="quiz-subtitle">매일 새로운 퀴즈가 업데이트됩니다</p>
          </div>

          <div className="space-y-6">
            <div className="question-box">
              <p className="question-text">
                {todayQuiz.question}
              </p>
            </div>
            
            {!showResult ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="answer-input"
                  placeholder="정답을 입력하세요"
                />
                
                <button 
                  onClick={handleCheck}
                  className="check-button"
                >
                  정답 확인
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className={`result-box ${isCorrect ? 'result-correct' : 'result-wrong'}`}>
                  <h3 className="quiz-result-text">
                    {isCorrect ? '정답입니다! 👏' : '틀렸습니다! 😅 다시 도전해보세요!'}
                  </h3>
                </div>
                
                <button
                  onClick={handleTryAgain}
                  className="try-again-button"
                >
                  다시 도전하기
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 하단 광고 */}
        <div className="mt-6">
          <AdComponent adSlot="0987654321" adFormat="auto" />
        </div>
      </div>
    </div>
  );
};

export default DadJokeQuiz;