import React, { useState, lazy, Suspense } from 'react';
import './DadJokeQuiz.css';

const AdComponent = lazy(() => import('./AdComponent'));

const DadJokeQuiz = () => {
  const [answer, setAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  
  const quizDatabase = [
    {
      question: "세상에서 가장 빠른 떡은?",
      answer: "헐레벌떡"
    },
    {
      question: "왕이 넘어지면?",
      answer: "킹콩"
    },
    {
      question: "신발이 화나면?",
      answer: "신발끈"
    },
    {
      question: "서울이 추우면?",
      answer: "서울시립"
    },
    {
      question: "소금의 유통기한은?",
      answer: "천일"
    },
    {
      question: "비가 한시간 동안 내리면?",
      answer: "추적60분"
    },
    {
      question: "세상에서 가장 쉬운 숫자는?",
      answer: "십구만"
    },
    {
      question: "칼이 정색하면?",
      answer: "검정색"
    },
    {
      question: "반성문을 영어로 하면?",
      answer: "글로벌"
    },
    {
      question: "세상에서 가장 추운 바다는?",
      answer: "썰렁해"
    },
    {
      question: "닭들이 좋아하는 약은?",
      answer: "삐약"
    },
    {
      question: "공이 웃으면?",
      answer: "풋볼"
    },
    {
      question: "세상에서 가장 지루한 중학교는?",
      answer: "로딩중"
    },
    {
      question: "세상에서 가장 억울한 도형은?",
      answer: "원통"
    },
    {
      question: "사과가 웃으면?",
      answer: "풋사과"
    },
    {
      question: "소나무가 삐지면?",
      answer: "칫솔"
    },
    {
      question: "바나나가 웃으면?",
      answer: "바나나킥"
    },
    {
      question: "세상에서 가장 비싼 새는?",
      answer: "백조"
    },
    {
      question: "오리가 얼면?",
      answer: "언덕"
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
    <main 
      className="quiz-container" 
      role="main" 
      aria-label="아재개그 퀴즈 메인 컨테이너"
    >
      <div className="quiz-content">
        {/* 상단 광고 */}
        <Suspense fallback={<div aria-live="polite">광고 로딩 중...</div>}>
          <div className="mb-6">
            <AdComponent 
              adSlot="1234567890" 
              adFormat="auto" 
              aria-label="상단 광고 배너"
            />
          </div>
        </Suspense>

        <article className="quiz-box" aria-live="polite">
          <header className="quiz-header">
            <h1 className="quiz-title">오늘의 아재개그</h1>
            <p className="quiz-subtitle">매일 새로운 퀴즈가 업데이트됩니다</p>
          </header>

          <section className="space-y-6">
            <div 
              className="question-box" 
              role="region" 
              aria-label="오늘의 퀴즈 문제"
            >
              <h2 
                className="question-text" 
                id="quiz-question"
              >
                {todayQuiz.question}
              </h2>
            </div>
            
            {!showResult ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="answer-input"
                  placeholder="정답을 입력하세요"
                  aria-describedby="quiz-question"
                  aria-label="정답 입력 필드"
                />
                
                <button 
                  onClick={handleCheck}
                  className="check-button"
                  aria-label="정답 확인 버튼"
                >
                  정답 확인
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div 
                  className={`result-box ${isCorrect ? 'result-correct' : 'result-wrong'}`}
                  role="alert"
                  aria-live="assertive"
                >
                  <h3 className="quiz-result-text">
                    {isCorrect ? '정답입니다! 👏' : '틀렸습니다! 😅 다시 도전해보세요!'}
                  </h3>
                </div>
                
                <button
                  onClick={handleTryAgain}
                  className="try-again-button"
                  aria-label="다시 도전하기 버튼"
                >
                  다시 도전하기
                </button>
              </div>
            )}
          </section>
        </article>

        {/* 하단 광고 */}
        <Suspense fallback={<div aria-live="polite">광고 로딩 중...</div>}>
          <div className="mt-6">
            <AdComponent 
              adSlot="0987654321" 
              adFormat="auto" 
              aria-label="하단 광고 배너"
            />
          </div>
        </Suspense>
      </div>

      {/* JSON-LD 구조화된 데이터 */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "오늘의 아재개그 퀴즈",
          "description": "매일 새로운 아재개그 퀴즈로 웃음 가득한 하루를 시작하세요!",
          "keywords": "아재개그, 퀴즈, 개그, 일일 퀴즈",
          "inLanguage": "ko-KR"
        })}
      </script>
    </main>
  );
};

export default DadJokeQuiz;
