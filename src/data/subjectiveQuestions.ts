export interface SubjectiveQuestion {
  id: number;
  question: string;
  expectedKeyPoints: string[];
  sampleAnswer: string;
}
// dummy for now only(will replace by real data later)
export const subjectiveInterviewQuestions: SubjectiveQuestion[] = [
  {
    id: 1,
    question: "Explain the concept of normalization in databases and why it's important.",
    expectedKeyPoints: [
      "Organizing data to reduce redundancy",
      "Improves data integrity",
      "Eliminates update anomalies",
      "Multiple normal forms (1NF, 2NF, 3NF, BCNF)"
    ],
    sampleAnswer: "Normalization is the process of organizing data in a database to reduce redundancy and improve data integrity. It involves dividing larger tables into smaller ones and defining relationships between them. This helps eliminate update, insertion, and deletion anomalies. The process follows several normal forms (1NF, 2NF, 3NF, BCNF) with each form adding stricter rules for data organization."
  },
  {
    id: 2,
    question: "What is the difference between process and thread in operating systems?",
    expectedKeyPoints: [
      "Process is independent execution unit",
      "Thread shares process resources",
      "Processes have separate memory space",
      "Threads share memory within process",
      "Context switching overhead"
    ],
    sampleAnswer: "A process is an independent execution unit with its own memory space, while a thread is a lightweight unit of execution within a process that shares the process's resources. Processes are isolated from each other with separate memory spaces, making inter-process communication more complex. Threads within the same process share memory and resources, making communication faster but requiring synchronization. Context switching between threads is faster than between processes."
  },
  {
    id: 3,
    question: "Describe the OSI model and its seven layers.",
    expectedKeyPoints: [
      "Seven layer networking framework",
      "Physical, Data Link, Network, Transport",
      "Session, Presentation, Application layers",
      "Each layer has specific responsibilities",
      "Encapsulation and abstraction"
    ],
    sampleAnswer: "The OSI (Open Systems Interconnection) model is a conceptual framework with seven layers: Physical (hardware transmission), Data Link (node-to-node transfer), Network (routing and logical addressing), Transport (end-to-end communication), Session (session management), Presentation (data formatting), and Application (user interface). Each layer provides services to the layer above it and uses services from the layer below, enabling modular network design."
  },
  {
    id: 4,
    question: "Explain polymorphism in object-oriented programming with an example.",
    expectedKeyPoints: [
      "Ability to take multiple forms",
      "Method overloading (compile-time)",
      "Method overriding (runtime)",
      "Interface implementation",
      "Code reusability"
    ],
    sampleAnswer: "Polymorphism allows objects to take multiple forms. It comes in two types: compile-time (method overloading - same method name with different parameters) and runtime (method overriding - child class provides specific implementation of parent method). For example, a Shape class might have a draw() method that's implemented differently in Circle, Square, and Triangle subclasses. This enables writing flexible, reusable code where a single interface can represent different underlying forms."
  },
  {
    id: 5,
    question: "What is the time complexity of binary search and why?",
    expectedKeyPoints: [
      "O(log n) time complexity",
      "Divides search space in half",
      "Requires sorted array",
      "Much faster than linear search",
      "Logarithmic growth"
    ],
    sampleAnswer: "Binary search has O(log n) time complexity because it divides the search space in half with each comparison. Starting with a sorted array, it compares the target with the middle element and eliminates half the remaining elements. This continues until the element is found or the search space is empty. The number of comparisons needed is logarithmic to the array size - for an array of 1 million elements, it needs at most about 20 comparisons."
  }
];
