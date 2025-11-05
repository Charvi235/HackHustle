-- OOP Questions Database
-- 100 Questions organized by topics
-- Copy and paste this into MySQL Workbench to create and populate the questions table

-- Create table structure
CREATE TABLE IF NOT EXISTS questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  subject VARCHAR(100) NOT NULL,
  topic VARCHAR(100) NOT NULL,
  question TEXT NOT NULL,
  option_a VARCHAR(255) NOT NULL,
  option_b VARCHAR(255) NOT NULL,
  option_c VARCHAR(255) NOT NULL,
  option_d VARCHAR(255) NOT NULL,
  correct_answer INT NOT NULL,
  explanation TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Classes and Objects (15 questions)
INSERT INTO questions (subject, topic, question, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES
('OOP', 'Classes and Objects', 'What is a class in OOP?', 'A function', 'A blueprint for creating objects', 'A variable', 'A data type', 1, 'A class is a blueprint or template that defines the structure and behavior of objects.'),
('OOP', 'Classes and Objects', 'What is an object?', 'A class definition', 'An instance of a class', 'A method', 'A constructor', 1, 'An object is a specific instance created from a class with its own state and behavior.'),
('OOP', 'Classes and Objects', 'Which keyword is used to create an object in Java?', 'create', 'new', 'object', 'make', 1, 'The new keyword is used to instantiate a class and create an object in Java.'),
('OOP', 'Classes and Objects', 'What is the default access modifier for class members in Java?', 'public', 'private', 'protected', 'package-private', 3, 'In Java, if no access modifier is specified, the default is package-private (accessible within the same package).'),
('OOP', 'Classes and Objects', 'Can a class have multiple constructors?', 'Yes, through constructor overloading', 'No, only one constructor allowed', 'Yes, but only with same parameters', 'No, constructors are not allowed', 0, 'A class can have multiple constructors with different parameters, known as constructor overloading.'),
('OOP', 'Classes and Objects', 'What is a static member in a class?', 'Member that belongs to the class rather than instances', 'Member that cannot be changed', 'Member that is private', 'Member that is final', 0, 'Static members belong to the class itself rather than to any specific instance of the class.'),
('OOP', 'Classes and Objects', 'Which method is called when an object is created?', 'main()', 'Constructor', 'init()', 'create()', 1, 'The constructor is automatically called when an object is instantiated.'),
('OOP', 'Classes and Objects', 'What is the difference between class and object?', 'Class is template, object is instance', 'No difference', 'Class is instance, object is template', 'Both are same', 0, 'A class is a blueprint/template, while an object is a specific instance created from that class.'),
('OOP', 'Classes and Objects', 'Can a class extend multiple classes in Java?', 'Yes', 'No', 'Only interfaces', 'Depends on modifier', 1, 'Java does not support multiple inheritance for classes, but a class can implement multiple interfaces.'),
('OOP', 'Classes and Objects', 'What is instance variable?', 'Variable declared inside a method', 'Variable declared inside a class', 'Variable declared as static', 'Variable declared in main method', 1, 'Instance variables are declared inside a class but outside methods, and each object has its own copy.'),
('OOP', 'Classes and Objects', 'What is method overloading?', 'Same method name with different parameters', 'Different method names', 'Same method in different classes', 'Methods with same signature', 0, 'Method overloading allows multiple methods with the same name but different parameter lists in the same class.'),
('OOP', 'Classes and Objects', 'What is this keyword used for?', 'To refer to current object', 'To create new object', 'To delete object', 'To copy object', 0, 'The this keyword refers to the current instance of the class.'),
('OOP', 'Classes and Objects', 'Can we declare a class as static?', 'Yes, inner classes only', 'Yes, any class', 'No', 'Only abstract classes', 0, 'Only nested (inner) classes can be declared as static in Java.'),
('OOP', 'Classes and Objects', 'What is the purpose of finalize method?', 'To clean up before garbage collection', 'To initialize object', 'To create object', 'To destroy object explicitly', 0, 'The finalize method is called by garbage collector before reclaiming the memory.'),
('OOP', 'Classes and Objects', 'Can constructor be private?', 'Yes', 'No', 'Only in abstract class', 'Only in final class', 0, 'Constructors can be private, often used in singleton pattern to restrict object creation.'),

-- Inheritance (15 questions)
INSERT INTO questions (subject, topic, question, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES
('OOP', 'Inheritance', 'What is inheritance in OOP?', 'Creating new objects', 'Mechanism where one class acquires properties of another', 'Deleting classes', 'Copying classes', 1, 'Inheritance allows a class to inherit properties and methods from another class.'),
('OOP', 'Inheritance', 'Which keyword is used for inheritance in Java?', 'inherit', 'extends', 'implements', 'inherits', 1, 'The extends keyword is used to inherit from a class in Java.'),
('OOP', 'Inheritance', 'What is a superclass?', 'Class that is inherited from', 'Class that inherits', 'Abstract class', 'Final class', 0, 'A superclass (parent class) is the class from which properties and methods are inherited.'),
('OOP', 'Inheritance', 'What is a subclass?', 'Class that inherits from another class', 'Class that is inherited', 'Abstract class', 'Static class', 0, 'A subclass (child class) is the class that inherits properties and methods from a superclass.'),
('OOP', 'Inheritance', 'Can a subclass access private members of superclass?', 'Yes, directly', 'No', 'Yes, through methods only', 'Only if declared as protected', 1, 'Private members are not directly accessible to subclasses; only through public/protected methods.'),
('OOP', 'Inheritance', 'What is multilevel inheritance?', 'Class inherits from a class that inherits from another', 'Multiple classes inherit from one class', 'One class inherits from multiple classes', 'No inheritance', 0, 'Multilevel inheritance is when a class inherits from a derived class, creating a chain.'),
('OOP', 'Inheritance', 'What is hierarchical inheritance?', 'Multiple classes inherit from single class', 'Single class inherits from multiple classes', 'Chain of inheritance', 'No inheritance', 0, 'Hierarchical inheritance is when multiple classes inherit from a single parent class.'),
('OOP', 'Inheritance', 'Which method is called first in inheritance?', 'Subclass constructor', 'Superclass constructor', 'main method', 'Depends on order', 1, 'In inheritance, the superclass constructor is called first, then the subclass constructor.'),
('OOP', 'Inheritance', 'What is super keyword used for?', 'To call superclass members', 'To create superclass', 'To delete superclass', 'To copy superclass', 0, 'The super keyword is used to refer to superclass members and constructors.'),
('OOP', 'Inheritance', 'Can we override static methods?', 'No, method hiding occurs', 'Yes', 'Only in same class', 'Only if public', 0, 'Static methods cannot be overridden; instead, method hiding occurs if redefined in subclass.'),
('OOP', 'Inheritance', 'What is method overriding?', 'Redefining superclass method in subclass', 'Same method name with different parameters', 'Creating new method', 'Deleting method', 0, 'Method overriding is redefining a superclass method in the subclass with the same signature.'),
('OOP', 'Inheritance', 'Can final class be inherited?', 'No', 'Yes', 'Only by abstract classes', 'Only by interfaces', 0, 'A final class cannot be inherited or extended by any other class.'),
('OOP', 'Inheritance', 'What is the root class of all classes in Java?', 'System', 'Object', 'Class', 'Main', 1, 'The Object class is the root class of all classes in Java.'),
('OOP', 'Inheritance', 'Can constructor be inherited?', 'No', 'Yes', 'Only public constructors', 'Only protected constructors', 0, 'Constructors are not inherited, but can be called from subclass using super().'),
('OOP', 'Inheritance', 'What is IS-A relationship?', 'Inheritance relationship', 'Composition relationship', 'No relationship', 'Association relationship', 0, 'IS-A relationship represents inheritance where subclass is a type of superclass.'),

-- Polymorphism (15 questions)
INSERT INTO questions (subject, topic, question, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES
('OOP', 'Polymorphism', 'What is polymorphism?', 'Ability to take many forms', 'Single form only', 'No forms', 'Two forms only', 0, 'Polymorphism means the ability of an object to take many forms.'),
('OOP', 'Polymorphism', 'What are the types of polymorphism?', 'Compile-time and Runtime', 'Static only', 'Dynamic only', 'No types', 0, 'Polymorphism is divided into compile-time (static) and runtime (dynamic) polymorphism.'),
('OOP', 'Polymorphism', 'What is compile-time polymorphism?', 'Method overloading and operator overloading', 'Method overriding', 'Inheritance', 'Encapsulation', 0, 'Compile-time polymorphism is achieved through method overloading and operator overloading.'),
('OOP', 'Polymorphism', 'What is runtime polymorphism?', 'Method overriding', 'Method overloading', 'Operator overloading', 'Constructor overloading', 0, 'Runtime polymorphism is achieved through method overriding.'),
('OOP', 'Polymorphism', 'Which binding is used in method overloading?', 'Static binding', 'Dynamic binding', 'No binding', 'Late binding', 0, 'Method overloading uses static binding (early binding) resolved at compile time.'),
('OOP', 'Polymorphism', 'Which binding is used in method overriding?', 'Dynamic binding', 'Static binding', 'No binding', 'Early binding', 0, 'Method overriding uses dynamic binding (late binding) resolved at runtime.'),
('OOP', 'Polymorphism', 'Can we achieve polymorphism without inheritance?', 'Yes, through method overloading', 'No', 'Only with interfaces', 'Only with abstract classes', 0, 'Compile-time polymorphism (method overloading) does not require inheritance.'),
('OOP', 'Polymorphism', 'What is upcasting?', 'Converting subclass reference to superclass reference', 'Converting superclass to subclass', 'Converting to same type', 'No conversion', 0, 'Upcasting is converting a subclass reference to a superclass reference.'),
('OOP', 'Polymorphism', 'What is downcasting?', 'Converting superclass reference to subclass reference', 'Converting subclass to superclass', 'Converting to same type', 'No conversion', 0, 'Downcasting is converting a superclass reference to a subclass reference, requiring explicit casting.'),
('OOP', 'Polymorphism', 'Is method overriding possible in same class?', 'No', 'Yes', 'Only for static methods', 'Only for private methods', 0, 'Method overriding requires inheritance; it cannot occur within the same class.'),
('OOP', 'Polymorphism', 'Can we override private methods?', 'No', 'Yes', 'Only in same package', 'Only if protected', 0, 'Private methods cannot be overridden as they are not visible to subclasses.'),
('OOP', 'Polymorphism', 'Can we override final methods?', 'No', 'Yes', 'Only in same class', 'Only if public', 0, 'Final methods cannot be overridden in subclasses.'),
('OOP', 'Polymorphism', 'What is covariant return type?', 'Overriding method can return subclass type', 'Must return same type', 'Cannot return anything', 'Must return superclass type', 0, 'Covariant return type allows overriding method to return a subtype of the return type.'),
('OOP', 'Polymorphism', 'Can constructor be overridden?', 'No', 'Yes', 'Only public constructors', 'Only default constructors', 0, 'Constructors cannot be overridden as they are not inherited.'),
('OOP', 'Polymorphism', 'What is dynamic method dispatch?', 'Runtime determination of overridden method', 'Compile time method resolution', 'No method resolution', 'Static method resolution', 0, 'Dynamic method dispatch is the mechanism by which overridden methods are called at runtime.'),

-- Encapsulation (12 questions)
INSERT INTO questions (subject, topic, question, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES
('OOP', 'Encapsulation', 'What is encapsulation?', 'Wrapping data and methods together', 'Separating data and methods', 'Deleting data', 'Creating data', 0, 'Encapsulation is bundling data and methods that operate on that data within a single unit.'),
('OOP', 'Encapsulation', 'How is encapsulation achieved?', 'Using access modifiers', 'Using inheritance', 'Using polymorphism', 'Using abstraction', 0, 'Encapsulation is achieved by using access modifiers to restrict direct access to data.'),
('OOP', 'Encapsulation', 'What are access modifiers in Java?', 'public, private, protected, default', 'Only public and private', 'Only protected', 'No modifiers', 0, 'Java has four access modifiers: public, private, protected, and default (package-private).'),
('OOP', 'Encapsulation', 'Which is the most restrictive access modifier?', 'private', 'public', 'protected', 'default', 0, 'Private is the most restrictive access modifier, limiting access to within the class only.'),
('OOP', 'Encapsulation', 'What are getter methods?', 'Methods to access private variables', 'Methods to modify variables', 'Methods to delete variables', 'Methods to create variables', 0, 'Getter methods (accessors) are used to retrieve the values of private variables.'),
('OOP', 'Encapsulation', 'What are setter methods?', 'Methods to modify private variables', 'Methods to access variables', 'Methods to delete variables', 'Methods to create variables', 0, 'Setter methods (mutators) are used to modify the values of private variables.'),
('OOP', 'Encapsulation', 'What is data hiding?', 'Restricting direct access to data members', 'Showing all data', 'Deleting data', 'Creating data', 0, 'Data hiding is the practice of keeping data members private to prevent direct access.'),
('OOP', 'Encapsulation', 'Can private members be accessed outside class?', 'No, not directly', 'Yes, always', 'Only in same package', 'Only in subclasses', 0, 'Private members cannot be accessed directly outside the class; only through public methods.'),
('OOP', 'Encapsulation', 'What is the benefit of encapsulation?', 'Data security and flexibility', 'Faster execution', 'Less memory usage', 'Easier syntax', 0, 'Encapsulation provides data security, better control, and flexibility in code maintenance.'),
('OOP', 'Encapsulation', 'Can we have public variables in encapsulation?', 'Not recommended', 'Yes, always use public', 'No, never allowed', 'Only for constants', 0, 'While allowed, public variables break encapsulation; private with getters/setters is recommended.'),
('OOP', 'Encapsulation', 'What is a fully encapsulated class?', 'All data members are private', 'All data members are public', 'Mix of public and private', 'No data members', 0, 'A fully encapsulated class has all data members declared as private with public getters/setters.'),
('OOP', 'Encapsulation', 'Is encapsulation same as abstraction?', 'No, different concepts', 'Yes, exactly same', 'Sometimes same', 'Depends on language', 0, 'Encapsulation is data hiding while abstraction is hiding implementation complexity.'),

-- Abstraction (12 questions)
INSERT INTO questions (subject, topic, question, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES
('OOP', 'Abstraction', 'What is abstraction?', 'Hiding implementation details', 'Showing all details', 'Creating objects', 'Deleting objects', 0, 'Abstraction is hiding complex implementation details and showing only necessary features.'),
('OOP', 'Abstraction', 'How is abstraction achieved in Java?', 'Abstract classes and interfaces', 'Only classes', 'Only methods', 'Only variables', 0, 'Abstraction in Java is achieved using abstract classes and interfaces.'),
('OOP', 'Abstraction', 'What is an abstract class?', 'Class that cannot be instantiated', 'Class that can be instantiated', 'Final class', 'Static class', 0, 'An abstract class cannot be instantiated and may contain abstract methods.'),
('OOP', 'Abstraction', 'Can abstract class have constructor?', 'Yes', 'No', 'Only private constructor', 'Only public constructor', 0, 'Abstract classes can have constructors, used when subclass objects are created.'),
('OOP', 'Abstraction', 'What is an abstract method?', 'Method without implementation', 'Method with implementation', 'Static method', 'Final method', 0, 'An abstract method is declared without an implementation body.'),
('OOP', 'Abstraction', 'Can abstract class have concrete methods?', 'Yes', 'No', 'Only private methods', 'Only static methods', 0, 'Abstract classes can have both abstract and concrete (implemented) methods.'),
('OOP', 'Abstraction', 'Can we create object of abstract class?', 'No', 'Yes', 'Only with new keyword', 'Only through inheritance', 0, 'We cannot directly instantiate an abstract class; must use a concrete subclass.'),
('OOP', 'Abstraction', 'Must abstract methods be overridden?', 'Yes, in concrete subclass', 'No', 'Optional', 'Only if public', 0, 'Abstract methods must be overridden in the first concrete subclass.'),
('OOP', 'Abstraction', 'Can abstract class be final?', 'No', 'Yes', 'Only if no abstract methods', 'Only if all methods are abstract', 0, 'Abstract class cannot be final as it needs to be inherited to be useful.'),
('OOP', 'Abstraction', 'Can abstract method be static?', 'No', 'Yes', 'Only if private', 'Only if public', 0, 'Abstract methods cannot be static as they need to be overridden.'),
('OOP', 'Abstraction', 'Can abstract method be private?', 'No', 'Yes', 'Only in Java 8+', 'Only if final', 0, 'Abstract methods cannot be private as they must be visible to subclasses for overriding.'),
('OOP', 'Abstraction', 'What is the purpose of abstraction?', 'To reduce complexity', 'To increase complexity', 'To delete code', 'To copy code', 0, 'Abstraction helps reduce complexity by hiding unnecessary details and showing only relevant information.'),

-- Interfaces (13 questions)
INSERT INTO questions (subject, topic, question, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES
('OOP', 'Interfaces', 'What is an interface?', 'Contract specifying methods to implement', 'Concrete class', 'Abstract class', 'Final class', 0, 'An interface is a contract that specifies which methods a class must implement.'),
('OOP', 'Interfaces', 'Which keyword is used to implement interface?', 'implements', 'extends', 'inherit', 'interface', 0, 'The implements keyword is used to implement an interface in Java.'),
('OOP', 'Interfaces', 'Can interface have concrete methods?', 'Yes, from Java 8 (default methods)', 'No', 'Only private methods', 'Only static methods', 0, 'From Java 8, interfaces can have default and static methods with implementation.'),
('OOP', 'Interfaces', 'Can interface have variables?', 'Yes, public static final only', 'Yes, any type', 'No', 'Only private variables', 0, 'Interface variables are implicitly public, static, and final (constants).'),
('OOP', 'Interfaces', 'Can interface extend another interface?', 'Yes', 'No', 'Only abstract interfaces', 'Only if same package', 0, 'An interface can extend one or more interfaces using the extends keyword.'),
('OOP', 'Interfaces', 'Can class implement multiple interfaces?', 'Yes', 'No', 'Only two interfaces', 'Only in Java 8+', 0, 'A class can implement multiple interfaces, enabling multiple inheritance of type.'),
('OOP', 'Interfaces', 'Are interface methods public by default?', 'Yes', 'No', 'Only if specified', 'Only abstract methods', 0, 'All interface methods are implicitly public and abstract (before Java 8).'),
('OOP', 'Interfaces', 'Can we create object of interface?', 'No', 'Yes', 'Only with new keyword', 'Only anonymous objects', 0, 'We cannot instantiate an interface directly; only through implementing class.'),
('OOP', 'Interfaces', 'What is marker interface?', 'Interface with no methods', 'Interface with methods', 'Abstract interface', 'Final interface', 0, 'A marker interface has no methods and is used to mark classes for special treatment.'),
('OOP', 'Interfaces', 'What is functional interface?', 'Interface with single abstract method', 'Interface with multiple methods', 'Interface with no methods', 'Interface with only variables', 0, 'A functional interface has exactly one abstract method, used for lambda expressions.'),
('OOP', 'Interfaces', 'Can interface have constructor?', 'No', 'Yes', 'Only private', 'Only public', 0, 'Interfaces cannot have constructors as they cannot be instantiated.'),
('OOP', 'Interfaces', 'What is default method in interface?', 'Method with implementation in interface', 'Method without implementation', 'Static method', 'Private method', 0, 'Default methods (Java 8+) provide implementation in interfaces, with default keyword.'),
('OOP', 'Interfaces', 'Can interface be private?', 'No, only public or default', 'Yes', 'Only nested interfaces', 'Only in Java 8+', 0, 'Top-level interfaces can only be public or package-private (default access).'),

-- Constructors (10 questions)
INSERT INTO questions (subject, topic, question, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES
('OOP', 'Constructors', 'What is a constructor?', 'Special method to initialize objects', 'Normal method', 'Static method', 'Final method', 0, 'A constructor is a special method used to initialize objects when they are created.'),
('OOP', 'Constructors', 'What is the name of constructor?', 'Same as class name', 'Any name', 'Must be init', 'Must be constructor', 0, 'A constructor must have the same name as its class.'),
('OOP', 'Constructors', 'Can constructor have return type?', 'No', 'Yes', 'Only void', 'Only int', 0, 'Constructors do not have a return type, not even void.'),
('OOP', 'Constructors', 'What is default constructor?', 'No-argument constructor provided by compiler', 'Constructor with arguments', 'Constructor defined by user', 'Static constructor', 0, 'If no constructor is defined, Java provides a default no-argument constructor.'),
('OOP', 'Constructors', 'What is parameterized constructor?', 'Constructor with parameters', 'Constructor without parameters', 'Static constructor', 'Final constructor', 0, 'A parameterized constructor accepts arguments to initialize object with specific values.'),
('OOP', 'Constructors', 'What is constructor chaining?', 'Calling one constructor from another', 'Creating multiple constructors', 'Deleting constructors', 'No relationship between constructors', 0, 'Constructor chaining is calling one constructor from another using this() or super().'),
('OOP', 'Constructors', 'Can constructor be static?', 'No', 'Yes', 'Only in abstract class', 'Only in final class', 0, 'Constructors cannot be static as they are associated with object creation.'),
('OOP', 'Constructors', 'Can constructor be final?', 'No', 'Yes', 'Only public constructor', 'Only private constructor', 0, 'Constructors cannot be declared final as they are not inherited.'),
('OOP', 'Constructors', 'What is copy constructor?', 'Constructor that creates object from another object', 'Constructor with no parameters', 'Constructor with multiple parameters', 'Static constructor', 0, 'A copy constructor creates a new object as a copy of an existing object.'),
('OOP', 'Constructors', 'When is constructor called?', 'When object is created', 'When method is called', 'When class is loaded', 'When program starts', 0, 'A constructor is automatically called when an object is instantiated with the new keyword.'),

-- Access Modifiers (8 questions)
INSERT INTO questions (subject, topic, question, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES
('OOP', 'Access Modifiers', 'What is the scope of private modifier?', 'Within the class only', 'Within package', 'Anywhere', 'Within subclass', 0, 'Private members are accessible only within the same class.'),
('OOP', 'Access Modifiers', 'What is the scope of public modifier?', 'Accessible from anywhere', 'Within class only', 'Within package only', 'Within subclass only', 0, 'Public members are accessible from any other class.'),
('OOP', 'Access Modifiers', 'What is the scope of protected modifier?', 'Within package and subclasses', 'Within class only', 'Anywhere', 'Within package only', 0, 'Protected members are accessible within the same package and by subclasses.'),
('OOP', 'Access Modifiers', 'What is default (package-private) access?', 'Accessible within same package', 'Accessible anywhere', 'Accessible in class only', 'Accessible in subclass only', 0, 'Default access (no modifier) means accessible only within the same package.'),
('OOP', 'Access Modifiers', 'Which is most restrictive access modifier?', 'private', 'protected', 'public', 'default', 0, 'Private is the most restrictive, limiting access to within the class.'),
('OOP', 'Access Modifiers', 'Which is least restrictive access modifier?', 'public', 'private', 'protected', 'default', 0, 'Public is the least restrictive, allowing access from anywhere.'),
('OOP', 'Access Modifiers', 'Can top-level class be private?', 'No', 'Yes', 'Only nested classes', 'Only in Java 8+', 0, 'Top-level classes cannot be private; only public or package-private.'),
('OOP', 'Access Modifiers', 'Can interface methods be private?', 'Yes, from Java 9', 'No', 'Yes, always', 'Only static methods', 0, 'From Java 9, interfaces can have private methods for code reuse.');
