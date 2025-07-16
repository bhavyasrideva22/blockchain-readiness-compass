import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart3, ChevronRight, ArrowLeft } from 'lucide-react';

interface Question {
  id: string;
  text: string;
  dimension: 'will' | 'interest' | 'skill' | 'cognitive' | 'ability' | 'realWorld';
}

interface WiscarSectionProps {
  onComplete: (scores: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability: number;
    realWorld: number;
    overall: number;
  }) => void;
  onBack: () => void;
}

const WiscarSection: React.FC<WiscarSectionProps> = ({ onComplete, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const questions: Question[] = [
    // Will - Grit, consistency, drive (6 questions)
    {
      id: 'will_1',
      text: 'I complete what I start, even when it becomes difficult or tedious.',
      dimension: 'will'
    },
    {
      id: 'will_2',
      text: 'I maintain effort and interest despite failures, adversity, and plateaus in progress.',
      dimension: 'will'
    },
    {
      id: 'will_3',
      text: 'I am a hard worker who never gives up on long-term goals.',
      dimension: 'will'
    },
    {
      id: 'will_4',
      text: 'I am willing to put in months or years to master complex blockchain concepts.',
      dimension: 'will'
    },
    {
      id: 'will_5',
      text: 'I have a track record of sticking with challenging projects until completion.',
      dimension: 'will'
    },
    {
      id: 'will_6',
      text: 'I am motivated by long-term goals rather than immediate gratification.',
      dimension: 'will'
    },

    // Interest - Passion, curiosity (6 questions)
    {
      id: 'interest_1',
      text: 'I actively follow technology that isn\'t yet mainstream.',
      dimension: 'interest'
    },
    {
      id: 'interest_2',
      text: 'I find myself naturally drawn to understanding how complex systems work.',
      dimension: 'interest'
    },
    {
      id: 'interest_3',
      text: 'I spend my free time learning about blockchain, even without external motivation.',
      dimension: 'interest'
    },
    {
      id: 'interest_4',
      text: 'I am genuinely excited about the potential of decentralized technologies.',
      dimension: 'interest'
    },
    {
      id: 'interest_5',
      text: 'I enjoy discussing blockchain concepts and applications with others.',
      dimension: 'interest'
    },
    {
      id: 'interest_6',
      text: 'I believe blockchain technology will significantly impact the future.',
      dimension: 'interest'
    },

    // Skill - Actual vs required capabilities (6 questions)
    {
      id: 'skill_1',
      text: 'I have strong programming skills in at least one language.',
      dimension: 'skill'
    },
    {
      id: 'skill_2',
      text: 'I understand basic cryptographic concepts like hashing and digital signatures.',
      dimension: 'skill'
    },
    {
      id: 'skill_3',
      text: 'I am comfortable working with APIs and web technologies.',
      dimension: 'skill'
    },
    {
      id: 'skill_4',
      text: 'I have experience with version control systems like Git.',
      dimension: 'skill'
    },
    {
      id: 'skill_5',
      text: 'I understand database concepts and data structures.',
      dimension: 'skill'
    },
    {
      id: 'skill_6',
      text: 'I am comfortable with command-line interfaces and development tools.',
      dimension: 'skill'
    },

    // Cognitive - Abstract thinking, problem-solving (6 questions)
    {
      id: 'cognitive_1',
      text: 'I enjoy figuring out how complex systems work.',
      dimension: 'cognitive'
    },
    {
      id: 'cognitive_2',
      text: 'I am comfortable working with abstract mathematical concepts.',
      dimension: 'cognitive'
    },
    {
      id: 'cognitive_3',
      text: 'I can break down complex problems into smaller, manageable parts.',
      dimension: 'cognitive'
    },
    {
      id: 'cognitive_4',
      text: 'I think systematically about cause and effect relationships.',
      dimension: 'cognitive'
    },
    {
      id: 'cognitive_5',
      text: 'I am good at identifying patterns and connections between different concepts.',
      dimension: 'cognitive'
    },
    {
      id: 'cognitive_6',
      text: 'I can understand and work with multiple levels of abstraction simultaneously.',
      dimension: 'cognitive'
    },

    // Ability to Learn - Growth mindset, metacognition (6 questions)
    {
      id: 'ability_1',
      text: 'I learn from feedback and use it to improve my performance.',
      dimension: 'ability'
    },
    {
      id: 'ability_2',
      text: 'I actively seek out learning opportunities and challenges.',
      dimension: 'ability'
    },
    {
      id: 'ability_3',
      text: 'I am comfortable admitting when I don\'t know something.',
      dimension: 'ability'
    },
    {
      id: 'ability_4',
      text: 'I enjoy learning new programming languages and technologies.',
      dimension: 'ability'
    },
    {
      id: 'ability_5',
      text: 'I can learn effectively from online resources, documentation, and tutorials.',
      dimension: 'ability'
    },
    {
      id: 'ability_6',
      text: 'I view challenges as opportunities to grow rather than threats.',
      dimension: 'ability'
    },

    // Real-World Alignment - Job fit, role expectations (6 questions)
    {
      id: 'realWorld_1',
      text: 'I enjoy working in fast-moving, high-uncertainty industries.',
      dimension: 'realWorld'
    },
    {
      id: 'realWorld_2',
      text: 'I am comfortable working remotely and with distributed teams.',
      dimension: 'realWorld'
    },
    {
      id: 'realWorld_3',
      text: 'I am willing to work in an industry that is still evolving and may face regulatory challenges.',
      dimension: 'realWorld'
    },
    {
      id: 'realWorld_4',
      text: 'I am comfortable with the responsibility that comes with handling financial transactions and assets.',
      dimension: 'realWorld'
    },
    {
      id: 'realWorld_5',
      text: 'I am excited about the potential for career growth in emerging technologies.',
      dimension: 'realWorld'
    },
    {
      id: 'realWorld_6',
      text: 'I am comfortable working in an environment where continuous learning is essential.',
      dimension: 'realWorld'
    }
  ];

  const likertOptions = [
    { value: 1, label: 'Strongly Disagree' },
    { value: 2, label: 'Disagree' },
    { value: 3, label: 'Neutral' },
    { value: 4, label: 'Agree' },
    { value: 5, label: 'Strongly Agree' }
  ];

  const dimensionInfo = {
    will: { name: 'Will', description: 'Grit, persistence, and drive' },
    interest: { name: 'Interest', description: 'Passion and curiosity' },
    skill: { name: 'Skill', description: 'Current technical capabilities' },
    cognitive: { name: 'Cognitive', description: 'Abstract thinking and problem-solving' },
    ability: { name: 'Ability', description: 'Growth mindset and learning ability' },
    realWorld: { name: 'Real-World', description: 'Job fit and industry alignment' }
  };

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
    const dimensionScores = {
      will: 0,
      interest: 0,
      skill: 0,
      cognitive: 0,
      ability: 0,
      realWorld: 0
    };

    const dimensionCounts = {
      will: 0,
      interest: 0,
      skill: 0,
      cognitive: 0,
      ability: 0,
      realWorld: 0
    };

    questions.forEach(question => {
      const answer = answers[question.id];
      if (answer) {
        dimensionScores[question.dimension] += answer;
        dimensionCounts[question.dimension]++;
      }
    });

    // Convert to 0-100 scale
    const normalizedScores = {
      will: Math.round((dimensionScores.will / (dimensionCounts.will * 5)) * 100),
      interest: Math.round((dimensionScores.interest / (dimensionCounts.interest * 5)) * 100),
      skill: Math.round((dimensionScores.skill / (dimensionCounts.skill * 5)) * 100),
      cognitive: Math.round((dimensionScores.cognitive / (dimensionCounts.cognitive * 5)) * 100),
      ability: Math.round((dimensionScores.ability / (dimensionCounts.ability * 5)) * 100),
      realWorld: Math.round((dimensionScores.realWorld / (dimensionCounts.realWorld * 5)) * 100)
    };

    const overall = Math.round(
      (normalizedScores.will + normalizedScores.interest + normalizedScores.skill + 
       normalizedScores.cognitive + normalizedScores.ability + normalizedScores.realWorld) / 6
    );

    onComplete({
      ...normalizedScores,
      overall
    });
  };

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isAnswered = answers[currentQ.id] !== undefined;
  const currentDimension = dimensionInfo[currentQ.dimension];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-primary" />
              <CardTitle>WISCAR Framework Analysis</CardTitle>
            </div>
            <Badge variant="secondary">
              {currentQuestion + 1} of {questions.length}
            </Badge>
          </div>
          <CardDescription>
            Comprehensive evaluation across six key dimensions for blockchain readiness
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
          {/* Current Dimension */}
          <div className="p-4 rounded-lg bg-muted/30 border">
            <div className="flex items-center gap-2 mb-1">
              <Badge className="bg-gradient-to-r from-blockchain-blue to-blockchain-purple text-white">
                {currentDimension.name}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{currentDimension.description}</p>
          </div>

          {/* Question */}
          <div className="space-y-4">
            <div className="text-lg font-medium">
              {currentQ.text}
            </div>
            
            {/* Likert Scale */}
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
          </div>

          {/* WISCAR Dimensions Overview */}
          <div className="mt-6 p-4 bg-muted/20 rounded-lg">
            <h4 className="font-semibold mb-3">WISCAR Dimensions</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
              {Object.entries(dimensionInfo).map(([key, info]) => (
                <div key={key} className={`p-2 rounded ${currentQ.dimension === key ? 'bg-primary/10 border border-primary' : 'bg-background'}`}>
                  <div className="font-medium">{info.name}</div>
                  <div className="text-muted-foreground">{info.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={currentQuestion === 0 ? onBack : handlePrevious}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {currentQuestion === 0 ? 'Back to Technical' : 'Previous'}
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!isAnswered}
              className="bg-gradient-to-r from-blockchain-blue to-blockchain-purple text-white"
            >
              {currentQuestion === questions.length - 1 ? 'Complete Assessment' : 'Next'}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WiscarSection;