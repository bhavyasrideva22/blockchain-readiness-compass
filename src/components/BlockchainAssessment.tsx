import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  Shield, 
  Globe, 
  Code, 
  Users, 
  BarChart3, 
  Brain,
  Lock,
  Coins,
  Network,
  ArrowRight,
  Clock,
  Target,
  TrendingUp
} from 'lucide-react';

import PsychometricSection from './assessment/PsychometricSection';
import TechnicalSection from './assessment/TechnicalSection';
import WiscarSection from './assessment/WiscarSection';
import ResultsSection from './assessment/ResultsSection';

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

const BlockchainAssessment: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('introduction');
  const [progress, setProgress] = useState(20);
  const [assessmentStarted, setAssessmentStarted] = useState(false);
  const [assessmentScores, setAssessmentScores] = useState<AssessmentScores | null>(null);
  const [completedSections, setCompletedSections] = useState<string[]>([]);

  const tabs = [
    { id: 'introduction', label: 'Introduction', icon: Zap },
    { id: 'psychological', label: 'Psychological Fit', icon: Brain },
    { id: 'technical', label: 'Technical Aptitude', icon: Code },
    { id: 'wiscar', label: 'WISCAR Analysis', icon: BarChart3 },
    { id: 'results', label: 'Your Results', icon: Target }
  ];

  const careerRoles = [
    {
      title: 'Blockchain Developer',
      description: 'Build core blockchain systems',
      skills: ['Solidity', 'Cryptography', 'Web3'],
      icon: Code
    },
    {
      title: 'Smart Contract Engineer',
      description: 'Write and audit Ethereum contracts',
      skills: ['Ethereum', 'Remix', 'Security'],
      icon: Shield
    },
    {
      title: 'Web3 App Developer',
      description: 'Front-end + smart contracts',
      skills: ['React', 'Web3.js', 'DApps'],
      icon: Globe
    },
    {
      title: 'Crypto Analyst',
      description: 'Analyze markets and tokens',
      skills: ['Tokenomics', 'DeFi', 'Research'],
      icon: TrendingUp
    },
    {
      title: 'Blockchain Product Manager',
      description: 'Drive features in DApp teams',
      skills: ['UX', 'Blockchain fluency', 'Strategy'],
      icon: Users
    }
  ];

  const blockchainFeatures = [
    {
      title: 'Decentralized Ledger',
      description: 'Distributed across network nodes',
      icon: Network,
      color: 'text-blue-600'
    },
    {
      title: 'Cryptographic Security',
      description: 'Advanced encryption & hashing',
      icon: Lock,
      color: 'text-purple-600'
    },
    {
      title: 'Smart Contracts',
      description: 'Self-executing digital contracts',
      icon: Code,
      color: 'text-green-600'
    },
    {
      title: 'Digital Assets',
      description: 'Cryptocurrencies, NFTs, tokens',
      icon: Coins,
      color: 'text-yellow-600'
    }
  ];

  const idealTraits = [
    'Systems thinkers & architecture-minded',
    'Deep curiosity about emerging tech',
    'Security and decentralization advocates',
    'Builders and explorers in unstructured domains',
    'Comfortable with ambiguity and change',
    'Strong analytical and logical thinking'
  ];

  const handleStartAssessment = () => {
    setAssessmentStarted(true);
    setCurrentTab('psychological');
    setProgress(25);
  };

  const handlePsychometricComplete = (scores: AssessmentScores['psychometric']) => {
    setAssessmentScores(prev => ({ ...prev!, psychometric: scores }));
    setCompletedSections(prev => [...prev, 'psychological']);
    setCurrentTab('technical');
    setProgress(50);
  };

  const handleTechnicalComplete = (scores: AssessmentScores['technical']) => {
    setAssessmentScores(prev => ({ ...prev!, technical: scores }));
    setCompletedSections(prev => [...prev, 'technical']);
    setCurrentTab('wiscar');
    setProgress(75);
  };

  const handleWiscarComplete = (scores: AssessmentScores['wiscar']) => {
    setAssessmentScores(prev => ({ ...prev!, wiscar: scores }));
    setCompletedSections(prev => [...prev, 'wiscar']);
    setCurrentTab('results');
    setProgress(100);
  };

  const handleRestart = () => {
    setCurrentTab('introduction');
    setProgress(20);
    setAssessmentStarted(false);
    setAssessmentScores(null);
    setCompletedSections([]);
  };

  const handleBackToIntro = () => {
    setCurrentTab('introduction');
    setProgress(20);
  };

  const handleBackToPsychometric = () => {
    setCurrentTab('psychological');
    setProgress(25);
  };

  const handleBackToTechnical = () => {
    setCurrentTab('technical');
    setProgress(50);
  };

  const renderTabContent = () => {
    switch (currentTab) {
      case 'introduction':
        return (
          <div className="space-y-8">
            {/* Hero Section */}
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-background to-secondary/30">
              <CardHeader className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-blockchain-blue to-blockchain-purple flex items-center justify-center">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold">
                  Discover Your Blockchain Career Potential
                </CardTitle>
                <CardDescription className="text-lg max-w-2xl mx-auto">
                  Take our comprehensive assessment to evaluate your psychological fit, 
                  technical readiness, and career alignment for a future in blockchain 
                  development and Web3 innovation.
                </CardDescription>
                <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    25-30 minutes
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Personalized Results
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Career Guidance
                  </div>
                </div>
                <Button 
                  size="lg" 
                  className="mt-4 bg-gradient-to-r from-blockchain-blue to-blockchain-purple hover:opacity-90 text-white"
                  onClick={handleStartAssessment}
                >
                  Start Assessment
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardHeader>
            </Card>

            {/* What is Blockchain */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Network className="w-6 h-6 text-primary" />
                  What is Blockchain?
                </CardTitle>
                <CardDescription className="text-base">
                  Blockchain is a <strong>distributed ledger technology</strong> enabling secure, 
                  transparent, and decentralized transactions. It's foundational to{' '}
                  <strong>cryptocurrencies, smart contracts, NFTs, DeFi, and Web3</strong>.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {blockchainFeatures.map((feature, index) => (
                    <div key={index} className="feature-card">
                      <feature.icon className={`w-8 h-8 mb-3 ${feature.color}`} />
                      <h4 className="font-semibold mb-2">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Career Opportunities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Users className="w-6 h-6 text-primary" />
                  Career Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {careerRoles.map((role, index) => (
                    <div key={index} className="feature-card">
                      <div className="flex items-start gap-3">
                        <role.icon className="w-6 h-6 text-primary mt-1" />
                        <div>
                          <h4 className="font-semibold mb-1">{role.title}</h4>
                          <p className="text-sm text-muted-foreground mb-3">{role.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {role.skills.map((skill, skillIndex) => (
                              <Badge key={skillIndex} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Ideal Traits */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Brain className="w-6 h-6 text-primary" />
                  Ideal Traits & Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {idealTraits.map((trait, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-sm">{trait}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* What You'll Discover */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">What You'll Discover</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Assessment Modules:</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <Badge className="bg-primary text-primary-foreground">1</Badge>
                        <span className="text-sm">Psychological Fit Evaluation</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className="bg-primary text-primary-foreground">2</Badge>
                        <span className="text-sm">Technical Aptitude Testing</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className="bg-primary text-primary-foreground">3</Badge>
                        <span className="text-sm">WISCAR Framework Analysis</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Your Results Include:</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div>• Personalized fit score (0-100)</div>
                      <div>• Detailed trait analysis</div>
                      <div>• Technical readiness assessment</div>
                      <div>• Career pathway recommendations</div>
                      <div>• Next steps and learning resources</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'psychological':
        return (
          <PsychometricSection
            onComplete={handlePsychometricComplete}
            onBack={handleBackToIntro}
          />
        );

      case 'technical':
        return (
          <TechnicalSection
            onComplete={handleTechnicalComplete}
            onBack={handleBackToPsychometric}
          />
        );

      case 'wiscar':
        return (
          <WiscarSection
            onComplete={handleWiscarComplete}
            onBack={handleBackToTechnical}
          />
        );

      case 'results':
        return assessmentScores ? (
          <ResultsSection
            scores={assessmentScores}
            onRestart={handleRestart}
          />
        ) : (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Results</CardTitle>
                <CardDescription>
                  Personalized recommendations and career guidance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Results will appear after completing the assessment...</p>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Should I Learn Blockchain?</h1>
              <p className="text-sm text-muted-foreground">
                A Readiness and Alignment Assessment for Aspiring Blockchain Professionals
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">{progress}% Complete</div>
              <div className="progress-bar w-32 mt-1">
                <div 
                  className="progress-fill" 
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 mt-4 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentTab === tab.id;
              const isCompleted = completedSections.includes(tab.id);
              const isAccessible = tab.id === 'introduction' || assessmentStarted;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => isAccessible && setCurrentTab(tab.id)}
                  disabled={!isAccessible}
                  className={`assessment-tab ${isActive ? 'active' : 'inactive'} whitespace-nowrap flex items-center gap-2 ${!isAccessible ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                  {isCompleted && <Badge className="bg-green-500 text-white text-xs ml-1">✓</Badge>}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default BlockchainAssessment;