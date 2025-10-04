import { prisma } from "./client";
import { UserRole, SubmissionType, SubmissionStatus, NotificationType } from "../generated/client";
// This seed file is created with the help of an LLM
// Seed data for the Mystical Tarot LMS
const USERS_DATA = [
  // Admins
  { name: "Grape Rose", email: "grape@udel.edu", role: UserRole.ADMIN },
  
  // Instructors
  { name: "Apple Lily", email: "apple@udel.edu", role: UserRole.INSTRUCTOR },
  { name: "Banana Orchid", email: "banana@udel.edu", role: UserRole.INSTRUCTOR },
  { name: "Orange Jasmine", email: "orange@udel.edu", role: UserRole.INSTRUCTOR },
  
  // Teaching Assistants
  { name: "Strawberry Tulip", email: "strawberry@udel.edu", role: UserRole.TA },
  { name: "Blueberry Daisy", email: "blueberry@udel.edu", role: UserRole.TA },
  { name: "Raspberry Iris", email: "raspberry@udel.edu", role: UserRole.TA },
  
  // Students
  { name: "Cherry Violet", email: "cherry@udel.edu", role: UserRole.STUDENT },
  { name: "Peach Sunflower", email: "peach@udel.edu", role: UserRole.STUDENT },
  { name: "Pear Carnation", email: "pear@udel.edu", role: UserRole.STUDENT },
  { name: "Plum Lavender", email: "plum@udel.edu", role: UserRole.STUDENT },
  { name: "Kiwi Peony", email: "kiwi@udel.edu", role: UserRole.STUDENT },
  { name: "Mango Hibiscus", email: "mango@udel.edu", role: UserRole.STUDENT },
  { name: "Pineapple Magnolia", email: "pineapple@udel.edu", role: UserRole.STUDENT },
  { name: "Watermelon Poppy", email: "watermelon@udel.edu", role: UserRole.STUDENT },
  { name: "Coconut Zinnia", email: "coconut@udel.edu", role: UserRole.STUDENT },
  { name: "Lemon Marigold", email: "lemon@udel.edu", role: UserRole.STUDENT },
  { name: "Lime Daffodil", email: "lime@udel.edu", role: UserRole.STUDENT },
  { name: "Papaya Camellia", email: "papaya@udel.edu", role: UserRole.STUDENT },
];

const COURSES_DATA = [
  {
    title: "Fundamentals of Programming Sorcery",
    description: "Master the ancient arts of code creation through mystical programming practices.",
    tarotTheme: "The Magician - Creation and Manifestation",
    code: "PROG101",
    instructorEmail: "apple@udel.edu",
  },
  {
    title: "Data Structures & Mystical Algorithms",
    description: "Journey through the labyrinth of data organization and algorithmic incantations.",
    tarotTheme: "The High Priestess - Hidden Knowledge",
    code: "ALGO201",
    instructorEmail: "banana@udel.edu",
  },
  {
    title: "Web Development Arcanum",
    description: "Weave the threads of the digital realm with HTML, CSS, and JavaScript spells.",
    tarotTheme: "The Empress - Creative Expression",
    code: "WEB301",
    instructorEmail: "orange@udel.edu",
  },
];

const ASSIGNMENTS_DATA = [
  // PROG101 Assignments
  {
    title: "Hello World Ritual",
    description: "Your first incantation in the realm of programming.",
    instructions: "Create a program that outputs 'Hello, Mystical World!' using any programming language. This is your initiation into the sacred art of code.",
    courseCode: "PROG101",
    allowedTypes: [SubmissionType.TRADITIONAL_CODE, SubmissionType.SOLUTION_WALKTHROUGH],
    maxPoints: 50,
    daysFromNow: 7,
  },
  {
    title: "Variables & Data Types Divination",
    description: "Understand the essence of data through variables and types.",
    instructions: "Write a program that demonstrates the use of different data types (integers, strings, booleans, arrays). Show how variables can transform and hold different mystical energies.",
    courseCode: "PROG101",
    allowedTypes: [SubmissionType.TRADITIONAL_CODE, SubmissionType.REVERSE_PROGRAMMING],
    maxPoints: 75,
    daysFromNow: 14,
    providedCode: `# Mystical Data Types Example
name = "Seeker"
level = 1
has_magic = True
spells = ["fireball", "heal", "teleport"]
print(f"{name} is level {level}")
if has_magic:
    print(f"Known spells: {', '.join(spells)}")`,
  },
  
  // ALGO201 Assignments
  {
    title: "Sorting Spells Implementation",
    description: "Master the art of organizing chaos through sorting algorithms.",
    instructions: "Implement at least two different sorting algorithms (e.g., bubble sort, selection sort, or merge sort). Compare their mystical efficiency and explain when each spell is most powerful.",
    courseCode: "ALGO201",
    allowedTypes: [SubmissionType.TRADITIONAL_CODE, SubmissionType.SOLUTION_WALKTHROUGH],
    maxPoints: 100,
    daysFromNow: 21,
  },
  {
    title: "Binary Search Tree Oracle",
    description: "Build a tree that holds the wisdom of efficient searching.",
    instructions: "Create a Binary Search Tree implementation with insertion, deletion, and search operations. Your tree will serve as an oracle for quick data retrieval.",
    courseCode: "ALGO201",
    allowedTypes: [SubmissionType.TRADITIONAL_CODE, SubmissionType.REVERSE_PROGRAMMING, SubmissionType.SOLUTION_WALKTHROUGH],
    maxPoints: 150,
    daysFromNow: 28,
    providedCode: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def search_tree(root, target):
    if not root or root.val == target:
        return root
    if target < root.val:
        return search_tree(root.left, target)
    return search_tree(root.right, target)`,
  },
  
  // WEB301 Assignments
  {
    title: "Responsive Tarot Card Layout",
    description: "Create a mystical web layout that adapts to different viewing crystals (devices).",
    instructions: "Design and code a responsive webpage that displays tarot cards in a grid layout. Use CSS Grid/Flexbox and ensure it works on desktop, tablet, and mobile devices.",
    courseCode: "WEB301",
    allowedTypes: [SubmissionType.TRADITIONAL_CODE, SubmissionType.SOLUTION_WALKTHROUGH],
    maxPoints: 120,
    daysFromNow: 35,
  },
];

async function seedDatabase() {
  console.log("🔮 Starting mystical database seeding...");

  try {
    // Clear existing data
    await prisma.notification.deleteMany();
    await prisma.feedback.deleteMany();
    await prisma.submission.deleteMany();
    await prisma.assignment.deleteMany();
    await prisma.courseTA.deleteMany();
    await prisma.enrollment.deleteMany();
    await prisma.course.deleteMany();
    await prisma.user.deleteMany();

    console.log("🧹 Cleared existing data");

    // Create users
    const users = await Promise.all(
      USERS_DATA.map(user =>
        prisma.user.create({ data: user })
      )
    );
    console.log("👥 Created users");

    // Create courses
    const courses = await Promise.all(
      COURSES_DATA.map(async courseData => {
        const instructor = users.find(u => u.email === courseData.instructorEmail);
        if (!instructor) throw new Error(`Instructor not found: ${courseData.instructorEmail}`);
        
        return prisma.course.create({
          data: {
            title: courseData.title,
            description: courseData.description,
            tarotTheme: courseData.tarotTheme,
            code: courseData.code,
            instructorId: instructor.id,
          }
        });
      })
    );
    console.log("🏫 Created courses");

    // Assign TAs to courses
    const tas = users.filter(u => u.role === UserRole.TA);
    if (tas.length < 3 || courses.length < 3) {
      throw new Error('Not enough TAs or courses for seeding');
    }
    const courseTA1 = await prisma.courseTA.create({
      data: {
        userId: tas[0]!.id, // Crystal Debugger
        courseId: courses[0]!.id, // PROG101
      }
    });
    const courseTA2 = await prisma.courseTA.create({
      data: {
        userId: tas[1]!.id, // Raven Compiler
        courseId: courses[1]!.id, // ALGO201
      }
    });
    const courseTA3 = await prisma.courseTA.create({
      data: {
        userId: tas[2]!.id, // Phoenix Parser
        courseId: courses[2]!.id, // WEB301
      }
    });
    console.log("🎭 Assigned TAs to courses");

    // Enroll students in courses
    const students = users.filter(u => u.role === UserRole.STUDENT);
    const enrollments = [];
    for (let i = 0; i < students.length; i++) {
      const student = students[i];
      if (!student) continue;
      
      // Enroll each student in 1-3 courses randomly
      const numCourses = Math.floor(Math.random() * 3) + 1;
      const shuffledCourses = [...courses].sort(() => Math.random() - 0.5);
      
      for (let j = 0; j < numCourses && j < courses.length; j++) {
        const course = shuffledCourses[j];
        if (!course) continue;
        
        enrollments.push(
          prisma.enrollment.create({
            data: {
              userId: student.id,
              courseId: course.id,
            }
          })
        );
      }
    }
    await Promise.all(enrollments);
    console.log("📚 Enrolled students in courses");

    // Create assignments
    const assignments = await Promise.all(
      ASSIGNMENTS_DATA.map(async assignmentData => {
        const course = courses.find(c => c.code === assignmentData.courseCode);
        if (!course) throw new Error(`Course not found: ${assignmentData.courseCode}`);
        
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + assignmentData.daysFromNow);
        
        return prisma.assignment.create({
          data: {
            title: assignmentData.title,
            description: assignmentData.description,
            instructions: assignmentData.instructions,
            courseId: course.id,
            allowedTypes: assignmentData.allowedTypes,
            maxPoints: assignmentData.maxPoints,
            dueDate,
            providedCode: assignmentData.providedCode,
          }
        });
      })
    );
    console.log("📝 Created assignments");

    // Create sample submissions
    if (students.length < 3 || assignments.length < 4) {
      throw new Error('Not enough students or assignments for seeding submissions');
    }
    
    const sampleSubmissions = [
      // PROG101 - Hello World submissions
      {
        userId: students[0]!.id,
        assignmentId: assignments[0]!.id,
        type: SubmissionType.TRADITIONAL_CODE,
        status: SubmissionStatus.GRADED,
        codeContent: `print("Hello, Mystical World!")
# My first spell in the realm of programming
print("I am ready to learn the ancient arts!")`,
        submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      },
      {
        userId: students[1]!.id,
        assignmentId: assignments[0]!.id,
        type: SubmissionType.SOLUTION_WALKTHROUGH,
        status: SubmissionStatus.SUBMITTED,
        walkthroughText: "To complete the Hello World ritual, I would use the sacred print() function in Python. This function channels our message to the mystical output realm, allowing us to communicate with the digital spirits. The message 'Hello, Mystical World!' serves as our first incantation, establishing our presence in the programming dimension.",
        submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      },
      
      // ALGO201 - Binary Search Tree submissions
      {
        userId: students[2]!.id,
        assignmentId: assignments[3]!.id,
        type: SubmissionType.REVERSE_PROGRAMMING,
        status: SubmissionStatus.GRADED,
        codeExplanation: "This mystical code creates a Binary Search Tree Oracle. The TreeNode class represents each node in our sacred tree, holding a value and connections to left and right children. The search_tree function is a powerful divination spell that finds specific values by comparing the target with the current node's value. If the target is smaller, it searches the left subtree; if larger, it searches the right subtree. This creates an efficient O(log n) search through the tree's mystical structure.",
        submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      },
    ];

    const submissions = await Promise.all(
      sampleSubmissions.map(sub =>
        prisma.submission.create({ data: sub })
      )
    );
    console.log("📤 Created sample submissions");

    // Create feedback for graded submissions
    const gradedSubmissions = submissions.filter(s => s.status === SubmissionStatus.GRADED);
    const feedback = await Promise.all(
      gradedSubmissions.map(async (submission, index) => {
        const assignment = assignments.find(a => a.id === submission.assignmentId);
        const course = courses.find(c => c.id === assignment?.courseId);
        
        // Randomly choose between instructor and TA for grading
        const instructorId = course?.instructorId;
        const taAssignment = await prisma.courseTA.findFirst({
          where: { courseId: course?.id }
        });
        const graderId = Math.random() > 0.5 && taAssignment ? taAssignment.userId : instructorId;
        
        const feedbackData = [
          {
            points: 45,
            comments: "Excellent first incantation! Your code is clean and follows the mystical conventions. Well done on joining the realm of programming sorcery. +5 bonus points for the enthusiastic comment!",
          },
          {
            points: 140,
            comments: "Outstanding analysis of the Binary Search Tree Oracle! You demonstrated deep understanding of how the recursive search spell works. Your explanation of the O(log n) complexity shows mastery of algorithmic mysticism.",
          },
        ];
        
        return prisma.feedback.create({
          data: {
            submissionId: submission.id,
            graderId: graderId!,
            studentId: submission.userId,
            points: feedbackData[index % 2]!.points,
            comments: feedbackData[index % 2]!.comments,
            isPublished: true,
          }
        });
      })
    );
    console.log("💬 Created feedback");

    // Create notifications
    const notifications = [];
    for (const student of students.slice(0, 5)) {
      notifications.push(
        prisma.notification.create({
          data: {
            userId: student.id,
            type: NotificationType.ASSIGNMENT_DUE,
            title: "Assignment Due Soon",
            message: "Your Variables & Data Types Divination assignment is due in 3 days. Channel your mystical energies!",
            courseId: courses[0]!.id,
          }
        }),
        prisma.notification.create({
          data: {
            userId: student.id,
            type: NotificationType.GRADE_POSTED,
            title: "Grade Posted",
            message: "Your Hello World Ritual has been graded by the Oracle. Excellent work, seeker!",
            courseId: courses[0]!.id,
            isRead: Math.random() > 0.5,
          }
        })
      );
    }
    await Promise.all(notifications);
    console.log("🔔 Created notifications");

    console.log("✨ Mystical database seeding completed successfully!");
    console.log(`Created:
    - ${users.length} mystical users
    - ${courses.length} arcane courses  
    - ${assignments.length} sacred assignments
    - ${submissions.length} divine submissions
    - ${feedback.length} oracle judgments
    - ${notifications.length} mystical notifications`);

  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();
