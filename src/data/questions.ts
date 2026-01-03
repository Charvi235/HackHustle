// export interface Question {
//   questionID: number;
//   questionText: string;
//   options: string[];
//   correctAnswer: number;
// }
export interface Question {
  questionID: number;
  questionText: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correctAnswer: string;
  topicName: string;
}


export interface Topic {
  id: number;
  name: string;
  questions: Question[][];
}

export interface Subject {
  id: number;
  name: string;
  topics: Topic[];
}

// Dummy questions for different subjects
const dummyQuestions: Question[] = [
  
  //   id: 1,
  //   question: "What is normalization in databases?",
  //   options: [
  //     "Process of organizing data to reduce redundancy",
  //     "Process of creating backups",
  //     "Process of indexing tables",
  //     "Process of deleting data"
  //   ],
  //   correctAnswer: 0,
  //   explanation: "Normalization is the process of organizing data in a database to reduce redundancy and improve data integrity."
  // },
  // {
  //   id: 2,
  //   question: "Which SQL command is used to retrieve data?",
  //   options: ["INSERT", "UPDATE", "SELECT", "DELETE"],
  //   correctAnswer: 2
  // },
  // {
  //   id: 3,
  //   question: "What does ACID stand for in databases?",
  //   options: [
  //     "Atomicity, Consistency, Isolation, Durability",
  //     "Addition, Computation, Integration, Distribution",
  //     "Array, Class, Interface, Data",
  //     "None of the above"
  //   ],
  //   correctAnswer: 0
  // },
  // {
  //   id: 4,
  //   question: "What is a primary key?",
  //   options: [
  //     "A key that opens the database",
  //     "A unique identifier for a record",
  //     "A foreign key reference",
  //     "An index key"
  //   ],
  //   correctAnswer: 1
  // },
  // {
  //   id: 5,
  //   question: "Which process scheduling algorithm is non-preemptive?",
  //   options: ["Round Robin", "FCFS", "Priority Scheduling", "Shortest Job First"],
  //   correctAnswer: 1
  // },
  // {
  //   id: 6,
  //   question: "What is thrashing in OS?",
  //   options: [
  //     "High paging activity",
  //     "CPU scheduling",
  //     "Memory allocation",
  //     "Disk formatting"
  //   ],
  //   correctAnswer: 0
  // },
  // {
  //   id: 7,
  //   question: "What is the OSI model?",
  //   options: [
  //     "A 7-layer networking framework",
  //     "An operating system",
  //     "A programming language",
  //     "A database model"
  //   ],
  //   correctAnswer: 0
  // },
  // {
  //   id: 8,
  //   question: "What does TCP stand for?",
  //   options: [
  //     "Transfer Control Protocol",
  //     "Transmission Control Protocol",
  //     "Transport Connection Protocol",
  //     "Terminal Control Protocol"
  //   ],
  //   correctAnswer: 1
  // },
  // {
  //   id: 9,
  //   question: "What is encapsulation in OOP?",
  //   options: [
  //     "Hiding implementation details",
  //     "Creating multiple classes",
  //     "Inheriting properties",
  //     "Overloading methods"
  //   ],
  //   correctAnswer: 0
  // },
  // {
  //   id: 10,
  //   question: "What is polymorphism?",
  //   options: [
  //     "Multiple inheritance",
  //     "Ability to take multiple forms",
  //     "Data hiding",
  //     "Object creation"
  //   ],
  //   correctAnswer: 1
  // }
];

// Generate multiple sets of questions
function generateQuestionSets(count: number): Question[][] {
  const sets: Question[][] = [];
  for (let i = 0; i < count; i++) {
    sets.push(dummyQuestions.map((q, idx) => ({
      ...q,
      id: i * 10 + idx + 1
    })));
  }
  return sets;
}

export const subjects: Subject[] = [
  {
    id: 1,
    name: "Database Management System",
    topics: [
      { id: 1, name: "Introduction to DBMS", questions: generateQuestionSets(5) },
      { id: 2, name: "Relational Model", questions: generateQuestionSets(5) },
      { id: 3, name: "SQL Queries", questions: generateQuestionSets(5) },
      { id: 4, name: "Normalization", questions: generateQuestionSets(5) },
      { id: 5, name: "Transactions", questions: generateQuestionSets(5) },
      { id: 6, name: "Indexing", questions: generateQuestionSets(5) },
    ]
  },
  {
    id: 2,
    name: "Operating System",
    topics: [
      { id: 1, name: "Process Management", questions: generateQuestionSets(5) },
      { id: 2, name: "CPU Scheduling", questions: generateQuestionSets(5) },
      { id: 3, name: "Memory Management", questions: generateQuestionSets(5) },
      { id: 4, name: "Deadlocks", questions: generateQuestionSets(5) },
      { id: 5, name: "File Systems", questions: generateQuestionSets(5) },
    ]
  },
  {
    id: 3,
    name: "Computer Network",
    topics: [
      { id: 1, name: "Network Fundamentals", questions: generateQuestionSets(5) },
      { id: 2, name: "OSI Model", questions: generateQuestionSets(5) },
      { id: 3, name: "TCP/IP Protocol", questions: generateQuestionSets(5) },
      { id: 4, name: "Network Security", questions: generateQuestionSets(5) },
      { id: 5, name: "Routing Algorithms", questions: generateQuestionSets(5) },
    ]
  },
  {
    id: 4,
    name: "Object Oriented Programming",
    topics: [
      { id: 1, name: "OOP Concepts", questions: generateQuestionSets(5) },
      { id: 2, name: "Inheritance", questions: generateQuestionSets(5) },
      { id: 3, name: "Polymorphism", questions: generateQuestionSets(5) },
      { id: 4, name: "Encapsulation", questions: generateQuestionSets(5) },
      { id: 5, name: "Abstraction", questions: generateQuestionSets(5) },
    ]
  },
  {
    id: 5,
    name: "Data Structure and Algorithms",
    topics: [
      { id: 1, name: "Arrays and Strings", questions: generateQuestionSets(5) },
      { id: 2, name: "Linked Lists", questions: generateQuestionSets(5) },
      { id: 3, name: "Stacks and Queues", questions: generateQuestionSets(5) },
      { id: 4, name: "Trees", questions: generateQuestionSets(5) },
      { id: 5, name: "Graphs", questions: generateQuestionSets(5) },
      { id: 6, name: "Sorting Algorithms", questions: generateQuestionSets(5) },
      { id: 7, name: "Searching Algorithms", questions: generateQuestionSets(5) },
    ]
  },
  {
    id: 6,
    name: "Java Programming",
    topics: [
      { id: 1, name: "Java Basics", questions: generateQuestionSets(5) },
      { id: 2, name: "Collections Framework", questions: generateQuestionSets(5) },
      { id: 3, name: "Multithreading", questions: generateQuestionSets(5) },
      { id: 4, name: "Exception Handling", questions: generateQuestionSets(5) },
      { id: 5, name: "Java 8 Features", questions: generateQuestionSets(5) },
    ]
  }
];

export const interviewQuestions: Question[] = dummyQuestions;
export const battleQuestions: Question[] = dummyQuestions;
