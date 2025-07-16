import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, ChevronRight, ArrowLeft } from 'lucide-react';

interface Question {
  id: string;
  text: string;
  type: 'likert' | 'mcq';
  options?: string[];
  category: 'interest' | 'personality' | 'cognitive' | 'motivation';
}

interface PsychometricSectionProps {
  onComplete: (scores: {
    interest: number;
    personality: number;
    cognitive: number;
    motivation: number;
    overall: number;
  }) => void;
  onBack: () => void;
}

const PsychometricSection: React.FC<PsychometricSectionProps> = ({ onComplete, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const questions: Question[] = [
    // Interest Scale (5 questions)
    {
      id: 'interest_1',
      text: 'I actively follow cryptocurrency and Web3 trends in the news and social media.',
      type: 'likert',
      category: 'interest'
    },
    {
      id: 'interest_2',
      text: 'I enjoy understanding how decentralized systems work at a technical level.',
      type: 'likert',
      category: 'interest'
    },
    {
      id: 'interest_3',
      text: 'I find the concept of digital ownership (NFTs, tokens) fascinating.',
      type: 'likert',
      category: 'interest'
    },
    {
      id: 'interest_4',
      text: 'I am curious about how blockchain could revolutionize traditional industries.',
      type: 'likert',
      category: 'interest'
    },
    {
      id: 'interest_5',
      text: 'I regularly explore new blockchain projects and DeFi protocols.',
      type: 'likert',
      category: 'interest'
    },

    // Personality Compatibility (8 questions)
    {
      id: 'personality_1',
      text: 'I am comfortable working in ambiguous, rapidly changing environments.',
      type: 'likert',
      category: 'personality'
    },
    {
      id: 'personality_2',
      text: 'I enjoy taking calculated risks when the potential rewards are high.',
      type: 'likert',
      category: 'personality'
    },
    {
      id: 'personality_3',
      text: 'I prefer to dive deep into complex systems rather than work on surface-level tasks.',
      type: 'likert',
      category: 'personality'
    },
    {
      id: 'personality_4',
      text: 'I am highly detail-oriented and thorough in my work.',
      type: 'likert',
      category: 'personality'
    },
    {
      id: 'personality_5',
      text: 'I tend to be an early adopter of new technologies.',
      type: 'likert',
      category: 'personality'
    },
    {
      id: 'personality_6',
      text: 'I am comfortable with the idea of working in unregulated or minimally regulated spaces.',
      type: 'likert',
      category: 'personality'
    },
    {
      id: 'personality_7',
      text: 'I believe in the importance of financial privacy and decentralization.',
      type: 'likert',
      category: 'personality'
    },
    {
      id: 'personality_8',
      text: 'I am resilient and bounce back quickly from setbacks.',
      type: 'likert',
      category: 'personality'
    },

    // Cognitive Style (6 questions)
    {
      id: 'cognitive_1',
      text: 'I prefer learning through hands-on experimentation rather than structured courses.',
      type: 'likert',
      category: 'cognitive'
    },
    {
      id: 'cognitive_2',
      text: 'I enjoy solving abstract problems that require creative thinking.',
      type: 'likert',
      category: 'cognitive'
    },
    {
      id: 'cognitive_3',
      text: 'I am comfortable working with incomplete information and making decisions.',
      type: 'likert',
      category: 'cognitive'
    },
    {
      id: 'cognitive_4',
      text: 'I think in terms of systems and how different components interact.',
      type: 'likert',
      category: 'cognitive'
    },
    {
      id: 'cognitive_5',
      text: 'I enjoy analyzing patterns and finding underlying structures in complex data.',
      type: 'likert',
      category: 'cognitive'
    },
    {
      id: 'cognitive_6',
      text: 'I prefer working on projects that have multiple possible solutions.',
      type: 'likert',
      category: 'cognitive'
    },

    // Motivation Style (5 questions)
    {
      id: 'motivation_1',
      text: 'I am more motivated by the potential to build something revolutionary than by high salaries.',
      type: 'likert',
      category: 'motivation'
    },
    {
      id: 'motivation_2',
      text: 'I am driven by the desire to be part of the future of technology.',
      type: 'likert',
      category: 'motivation'
    },
    {
      id: 'motivation_3',
      text: 'I am motivated by the challenge of solving problems that haven\'t been solved before.',
      type: 'likert',
      category: 'motivation'
    },
    {
      id: 'motivation_4',
      text: 'I am excited by the potential for entrepreneurial opportunities in blockchain.',
      type: 'likert',
      category: 'motivation'
    },
    {
      id: 'motivation_5',
      text: 'I am motivated by the idea of contributing to a more decentralized world.',
      type: 'likert',
      category: 'motivation'
    }
  ];

  const likertOptions = [
    { value: 1, label: 'Strongly Disagree' },
    { value: 2, label: 'Disagree' },
    { value: 3, label: 'Neutral' },
    { value: 4, label: 'Agree' },
    { value: 5, label: 'Strongly Agree' }
  ];

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScores();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScores = () => {
    const categoryScores = {
      interest: 0,
      personality: 0,
      cognitive: 0,
      motivation: 0
    };

    const categoryCounts = {
      interest: 0,
      personality: 0,
      cognitive: 0,
      motivation: 0
    };

    questions.forEach(question => {
      const answer = answers[question.id];
      if (answer) {
        categoryScores[question.category] += answer;
        categoryCounts[question.category]++;
      }
    });

    // Convert to 0-100 scale
    const normalizedScores = {
      interest: Math.round((categoryScores.interest / (categoryCounts.interest * 5)) * 100),
      personality: Math.round((categoryScores.personality / (categoryCounts.personality * 5)) * 100),
      cognitive: Math.round((categoryScores.cognitive / (categoryCounts.cognitive * 5)) * 100),
      motivation: Math.round((categoryScores.motivation / (categoryCounts.motivation * 5)) * 100)
    };

    const overall = Math.round(
      (normalizedScores.interest + normalizedScores.personality + normalizedScores.cognitive + normalizedScores.motivation) / 4
    );

    onComplete({
      ...normalizedScores,
      overall
    });
  };

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isAnswered = answers[currentQ.id] !== undefined;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-primary" />
              <CardTitle>Psychological Fit Assessment</CardTitle>
            </div>
            <Badge variant="secondary">
              {currentQuestion + 1} of {questions.length}
            </Badge>
          </div>
          <CardDescription>
            Evaluating your psychological alignment with blockchain work
          </CardDescription>
          
          {/* Progress Bar */}
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Question */}
          <div className="space-y-4">
            <div className="text-lg font-medium">
              {currentQ.text}
            </div>
            
            {/* Likert Scale */}
            {currentQ.type === 'likert' && (
              <div className="space-y-3">
                {likertOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    <input
                      type="radio"
                      name={currentQ.id}
                      value={option.value}
                      checked={answers[currentQ.id] === option.value}
                      onChange={(e) => handleAnswer(currentQ.id, parseInt(e.target.value))}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-sm font-medium">{option.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={currentQuestion === 0 ? onBack : handlePrevious}
              disabled={currentQuestion === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {currentQuestion === 0 ? 'Back to Introduction' : 'Previous'}
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!isAnswered}
              className="bg-gradient-to-r from-blockchain-blue to-blockchain-purple text-white"
            >
              {currentQuestion === questions.length - 1 ? 'Complete Section' : 'Next'}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PsychometricSection;