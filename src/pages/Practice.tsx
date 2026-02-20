import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  BookOpen,
  Code,
  Database,
  Play,
  ChevronRight,
  ChevronLeft,
  Trophy
} from 'lucide-react';

import PracticeQuiz from '../components/practice/PracticeQuiz';
import { questionService, QuestionDto } from '@/services/questionsServices';

const user = JSON.parse(localStorage.getItem('user') || '{}');
const emailId: string = user?.emailId || '';

interface TopicConfig {
  id: number;
  name: string;
}

interface SubjectConfig {
  id: number;
  name: string;
  topics: TopicConfig[];
}

const subjects: SubjectConfig[] = [
  {
    id: 1001,
    name: 'DBMS',
    topics: [
      { id: 1001, name: 'Normalization' },
      { id: 1002, name: 'Concurrency Control' },
      { id: 1003, name: 'Deadlock' },
      { id: 1004, name: 'Keys in DBMS' }
    ]
  },
  {
    id: 1002,
    name: 'OOPS',
    topics: [
      { id: 1005, name: 'Concepts of OOPS' },
      { id: 1006, name: 'Inheritance' },
      { id: 1007, name: 'Abstraction' },
      { id: 1008, name: 'Polymorphism' }
    ]
  },
  {
    id: 1003,
    name: 'Data Structures',
    topics: [
      { id: 1009, name: 'Stack' },
      { id: 1010, name: 'Linked List' },
      { id: 1011, name: 'Queue' },
      { id: 1012, name: 'Tree' },
      { id: 1013, name: 'Heap' },
      { id: 1014, name: 'Graphs' }
    ]
  }
];

const splitIntoSets = (questions: QuestionDto[], size = 10) => {
  const sets: QuestionDto[][] = [];
  for (let i = 0; i < questions.length; i += size) {
    sets.push(questions.slice(i, i + size));
  }
  return sets;
};

const Practice = () => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectConfig | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<TopicConfig | null>(null);
  const [questionSets, setQuestionSets] = useState<QuestionDto[][]>([]);
  const [selectedSet, setSelectedSet] = useState(0);
  const [startQuiz, setStartQuiz] = useState(false);
  const [loading, setLoading] = useState(false);
  const [assessmentScore, setAssessmentScore] = useState(0);

  // const handleSubmitAssessment = async () => {
    
  //   setShowResult(true);
  //   try {
  //     await fetch('http://localhost:8080/api/assessments', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         emailId: emailId,
  //         topicID: selectedTopic?.id || 1015,
  //     //    subjectID: selectedSubject!.id,
  //     subjectID: selectedSubject.id,
  //         assessmentScore 
  //       })
  //     });
  //     console.log("Data saved successfully");
  //   } catch (err) {
  //     console.error('Data save nahi hua (Backend Error):', err);
  //   }
  // };

  const [showResult, setShowResult] = useState(false);


  const handleSelectSubject = (subject: SubjectConfig) => {
    setSelectedSubject(subject);
    setSelectedTopic(null);
    setQuestionSets([]);
    setStartQuiz(false);
  };

  const handleSelectTopic = async (topic: TopicConfig) => {
    setSelectedTopic(topic);
    setLoading(true);
    try {
      const data = await questionService.getQuestionsByTopic(topic.name);
      setQuestionSets(splitIntoSets(data, 10));
      setSelectedSet(0);
    } catch (err) {
      console.error(err);
      setQuestionSets([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTopicAssessment = async () => {
    if (!selectedTopic) return;
    setLoading(true);
    try {
      const data = await questionService.getTopicAssessmentQuestions(selectedTopic.name);
      setQuestionSets([data]);
      setSelectedSet(0);
      setStartQuiz(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubjectAssessment = async () => {
    if (!selectedSubject) return;
    setLoading(true);
    try {
      const data = await questionService.getQuestionsBySubject(selectedSubject.id);
      setQuestionSets([data]);
      setSelectedSet(0);
      setStartQuiz(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToSubjects = () => {
    setSelectedSubject(null);
    setSelectedTopic(null);
    setQuestionSets([]);
    setStartQuiz(false);
  };

  const handleBackToTopics = () => {
    setSelectedTopic(null);
    setQuestionSets([]);
    setStartQuiz(false);
  };

  const handleSubmitAssessment = async () => {
    try {
      await fetch('http://localhost:8080/api/assessments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          emailId,
          topicID: selectedTopic?.id || 1015,
          subjectID: selectedSubject?.id || null,
          assessmentScore
        })
      });

      setShowResult(true);
    } catch (err) {
      console.error('Assessment submission failed', err);
    }
  };

  /* ================= ASSESSMENT MODE ================= */
  if (startQuiz && selectedSubject) {
    return (
      <div className="min-h-screen bg-background pt-20 pb-24">
        <PracticeQuiz
          questions={questionSets[selectedSet] || []}
          subjectName={selectedSubject.name}
          topicName={selectedTopic?.name}
          onBack={() => setStartQuiz(false)}
          totalQuestionsInTopic={questionSets.flat().length}
          onScoreCalculated={setAssessmentScore}
          isAssessment={true}
          subjectId={selectedSubject.id}

          topicId={selectedTopic?.id || 1015}

         // topicId={selectedTopic?.id || null}
        />

        <div className="p-4 flex justify-center">
          <Button className="w-[240px]" onClick={handleSubmitAssessment}>
            Submit Assessment
          </Button>
        </div>

        <Dialog open={showResult} onOpenChange={setShowResult}>
          <DialogContent className="bg-[#1a1a2e] border border-gray-800 text-white sm:max-w-md p-0 overflow-hidden">
            <div className="flex flex-col items-center justify-center p-8 space-y-6">
              <div className="relative">
                <div className="absolute inset-0 bg-red-600 blur-2xl opacity-20 rounded-full"></div>
                <div className="relative bg-[#2a2a3e] p-5 rounded-full border border-gray-700 shadow-xl">
                  <Trophy className="h-10 w-10 text-red-500" />
                </div>
              </div>

              <div className="text-center">
                <h2 className="text-2xl font-bold">Assessment Submitted!</h2>
                <p className="text-gray-400 text-sm">
                  Here is your final score
                </p>
              </div>

              <div className="bg-[#0f0f1a] w-full py-6 rounded-xl border border-gray-800 flex flex-col items-center">
                <span className="text-gray-500 text-xs uppercase font-bold mb-2">
                  Total Score
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-extrabold text-red-500">
                    {assessmentScore}
                  </span>
                  <span className="text-xl text-gray-600">Points</span>
                </div>
              </div>

              <button
                onClick={() => setShowResult(false)}
                className="w-full py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold"
              >
                Close Result
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  /* ================= PRACTICE MODE ================= */
  if (selectedSubject && selectedTopic) {
    return (
      <div className="min-h-screen bg-background pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button variant="outline" onClick={handleBackToTopics} className="mb-6">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Topics
          </Button>

          <Badge variant="secondary">{selectedSubject.name}</Badge>
          <h1 className="text-3xl font-bold mt-2 mb-6">
            {selectedTopic.name}
          </h1>

          {!loading && questionSets.length > 0 && (
            <>
              <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                <div className="flex gap-3 flex-wrap">
                  {questionSets.map((_, index) => (
                    <Button
                      key={index}
                      variant={index === selectedSet ? 'default' : 'outline'}
                      onClick={() => setSelectedSet(index)}
                    >
                      Set {index + 1}
                    </Button>
                  ))}
                </div>

                <Button variant="secondary" onClick={handleTopicAssessment}>
                  Take Topic-wise Assessment
                </Button>
              </div>

              <PracticeQuiz
                questions={questionSets[selectedSet] || []}
                topicName={selectedTopic.name}
                subjectName={selectedSubject.name}
                onBack={handleBackToTopics}
                totalQuestionsInTopic={questionSets.flat().length}
                isAssessment={false}
                subjectId={selectedSubject.id}
                topicId={selectedTopic.id}
              />
            </>
          )}
        </div>
      </div>
    );
  }

  /* ================= SUBJECT LIST ================= */
  if (selectedSubject) {
    return (
      <div className="min-h-screen bg-background pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button variant="outline" onClick={handleBackToSubjects} className="mb-6">
            <ChevronLeft className="w-4 h-4 mr-2" /> Back to Subjects
          </Button>

          <h1 className="text-4xl font-bold mb-6">
            {selectedSubject.name}
          </h1>

          <div className="space-y-4">
            {selectedSubject.topics.map(topic => (
              <Card
                key={topic.id}
                className="p-6 cursor-pointer hover:shadow-md"
                onClick={() => handleSelectTopic(topic)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">{topic.name}</h3>
                  <ChevronRight />
                </div>
              </Card>
            ))}
          </div>

          <Button
            className="w-full mt-14"
            variant="secondary"
            onClick={handleSubjectAssessment}
          >
            Start {selectedSubject.name}'s Assessment
          </Button>
        </div>
      </div>
    );
  }

  /* ================= SUBJECT HOME ================= */
  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <BookOpen className="w-4 h-4 mr-2" /> Practice Mode
          </Badge>
          <h1 className="text-4xl font-bold">
            Choose Your Subject
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {subjects.map(subject => (
            <Card key={subject.id} className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  {subject.name === 'DBMS' ? (
                    <Database className="text-white" />
                  ) : (
                    <Code className="text-white" />
                  )}
                </div>
                <h3 className="text-xl font-semibold">
                  {subject.name}
                </h3>
              </div>

              <Button
                className="w-full"
                onClick={() => handleSelectSubject(subject)}
              >
                <Play className="w-4 h-4 mr-2" /> Start Practice
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Practice;