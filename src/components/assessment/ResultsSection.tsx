import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Target, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  Book, 
  Code, 
  Users,
  ArrowRight,
  RotateCcw
} from 'lucide-react';

interface AssessmentScores {
  psychometric: {
    interest: number;
    personality: number;
    cognitive: number;
    motivation: number;
    overall: number;
  };
  technical: {
    aptitude: number;
    crypto: number;
    programming: number;
    blockchain: number;
    overall: number;
  };
  wiscar: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability: number;
    realWorld: number;
    overall: number;
  };
}

interface ResultsSectionProps {
  scores: AssessmentScores;
  onRestart: () => void;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ scores, onRestart }) => {
  // Calculate overall recommendation
  const overallScore = Math.round(
    (scores.psychometric.overall + scores.technical.overall + scores.wiscar.overall) / 3
  );

  const getRecommendation = () => {
    if (overallScore >= 75) return 'Yes';
    if (overallScore >= 55) return 'Maybe';
    return 'No';
  };

  const getRecommendationColor = () => {
    const rec = getRecommendation();
    if (rec === 'Yes') return 'text-green-600';
    if (rec === 'Maybe') return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRecommendationIcon = () => {
    const rec = getRecommendation();
    if (rec === 'Yes') return CheckCircle;
    if (rec === 'Maybe') return AlertCircle;
    return AlertCircle;
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-green-600';
    if (score >= 55) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 75) return 'bg-green-100';
    if (score >= 55) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getPersonalizedMessage = () => {
    const rec = getRecommendation();
    const highAreas = [];
    const lowAreas = [];

    if (scores.psychometric.overall >= 70) highAreas.push('psychological fit');
    else lowAreas.push('psychological alignment');

    if (scores.technical.overall >= 70) highAreas.push('technical aptitude');
    else lowAreas.push('technical skills');

    if (scores.wiscar.overall >= 70) highAreas.push('WISCAR readiness');
    else lowAreas.push('overall readiness factors');

    if (rec === 'Yes') {
      return `Excellent! You demonstrate strong ${highAreas.join(' and ')}. You're well-positioned to succeed in blockchain development.`;
    } else if (rec === 'Maybe') {
      return `You show promise with good ${highAreas.join(' and ')}, but may benefit from strengthening your ${lowAreas.join(' and ')} before diving deep into blockchain.`;
    } else {
      return `While blockchain is exciting, you may want to focus on building stronger ${lowAreas.join(' and ')} first. Consider exploring related fields or building foundational skills.`;
    }
  };

  const getNextSteps = () => {
    const rec = getRecommendation();
    
    if (rec === 'Yes') {
      return [
        'Start with Solidity fundamentals and smart contract development',
        'Explore Ethereum or Polygon ecosystems hands-on',
        'Contribute to open-source blockchain projects',
        'Build a portfolio of DApps and smart contracts',
        'Join blockchain developer communities and hackathons'
      ];
    } else if (rec === 'Maybe') {
      return [
        'Strengthen foundational programming skills (JavaScript/Python)',
        'Learn cryptography basics and hash functions',
        'Complete online blockchain courses (Coursera, Udemy)',
        'Practice with blockchain tutorials and simple projects',
        'Reassess in 3-6 months after building core skills'
      ];
    } else {
      return [
        'Focus on general programming fundamentals first',
        'Explore web development (HTML, CSS, JavaScript)',
        'Consider roles in Web3 product management or marketing',
        'Learn about blockchain from a business perspective',
        'Build technical skills gradually before specializing'
      ];
    }
  };

  const getCareerRoles = () => {
    const rec = getRecommendation();
    
    if (rec === 'Yes') {
      return [
        { title: 'Blockchain Developer', match: 'High', skills: ['Solidity', 'Web3', 'Smart Contracts'] },
        { title: 'Smart Contract Engineer', match: 'High', skills: ['Security', 'Auditing', 'Ethereum'] },
        { title: 'DApp Developer', match: 'High', skills: ['React', 'Web3.js', 'Frontend'] }
      ];
    } else if (rec === 'Maybe') {
      return [
        { title: 'Web3 Product Manager', match: 'Medium', skills: ['Strategy', 'UX', 'Blockchain Knowledge'] },
        { title: 'Blockchain Analyst', match: 'Medium', skills: ['Research', 'DeFi', 'Market Analysis'] },
        { title: 'Junior Blockchain Developer', match: 'Medium', skills: ['Learning Path', 'Mentorship'] }
      ];
    } else {
      return [
        { title: 'Crypto Community Manager', match: 'Medium', skills: ['Communication', 'Social Media'] },
        { title: 'Blockchain Content Creator', match: 'Medium', skills: ['Writing', 'Education'] },
        { title: 'Web3 Marketing Specialist', match: 'Low', skills: ['Marketing', 'Brand Strategy'] }
      ];
    }
  };

  const RecommendationIcon = getRecommendationIcon();

  return (
    <div className="space-y-6">
      {/* Overall Recommendation */}
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blockchain-blue to-blockchain-purple flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl">Your Assessment Results</CardTitle>
              <CardDescription>Comprehensive blockchain readiness evaluation</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <RecommendationIcon className={`w-8 h-8 ${getRecommendationColor()}`} />
                <div>
                  <div className="text-2xl font-bold">
                    <span className={getRecommendationColor()}>{getRecommendation()}</span>
                    <span className="text-muted-foreground">, you should learn blockchain</span>
                  </div>
                  <div className="text-lg text-muted-foreground">
                    Overall Score: {overallScore}/100
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {getPersonalizedMessage()}
              </p>
            </div>
            
            {/* Score Breakdown */}
            <div className="space-y-3">
              <h4 className="font-semibold">Score Breakdown</h4>
              <div className="space-y-2">
                {[
                  { label: 'Psychological Fit', score: scores.psychometric.overall },
                  { label: 'Technical Aptitude', score: scores.technical.overall },
                  { label: 'WISCAR Analysis', score: scores.wiscar.overall }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{item.label}</span>
                    <Badge className={`${getScoreBgColor(item.score)} ${getScoreColor(item.score)} border-0`}>
                      {item.score}/100
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Scores */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Psychometric Scores */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="w-5 h-5 text-primary" />
              Psychological Fit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(scores.psychometric).map(([key, score]) => (
                key !== 'overall' && (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-sm capitalize">{key}</span>
                    <span className={`font-medium ${getScoreColor(score)}`}>{score}</span>
                  </div>
                )
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Technical Scores */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Code className="w-5 h-5 text-primary" />
              Technical Aptitude
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(scores.technical).map(([key, score]) => (
                key !== 'overall' && (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-sm capitalize">{key}</span>
                    <span className={`font-medium ${getScoreColor(score)}`}>{score}</span>
                  </div>
                )
              ))}
            </div>
          </CardContent>
        </Card>

        {/* WISCAR Scores */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="w-5 h-5 text-primary" />
              WISCAR Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(scores.wiscar).map(([key, score]) => (
                key !== 'overall' && (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-sm capitalize">{key === 'realWorld' ? 'Real World' : key}</span>
                    <span className={`font-medium ${getScoreColor(score)}`}>{score}</span>
                  </div>
                )
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Book className="w-6 h-6 text-primary" />
            Recommended Next Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {getNextSteps().map((step, index) => (
              <div key={index} className="flex items-start gap-3">
                <Badge className="bg-primary text-primary-foreground mt-1">{index + 1}</Badge>
                <span className="text-sm">{step}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Career Roles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            Recommended Career Paths
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {getCareerRoles().map((role, index) => (
              <div key={index} className="p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{role.title}</h4>
                  <Badge 
                    variant={role.match === 'High' ? 'default' : role.match === 'Medium' ? 'secondary' : 'outline'}
                  >
                    {role.match} Match
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-1">
                  {role.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={onRestart}
          className="flex-1"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Retake Assessment
        </Button>
        <Button
          className="flex-1 bg-gradient-to-r from-blockchain-blue to-blockchain-purple text-white"
          asChild
        >
          <a href="https://docs.soliditylang.org/en/v0.8.17/" target="_blank" rel="noopener noreferrer">
            Start Learning
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </Button>
      </div>
    </div>
  );
};

export default ResultsSection;