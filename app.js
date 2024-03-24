// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];
  
//   function getLearnerData(course, ag, submissions) {
//     // here, we would process this data to achieve the desired result.
//     const result = [
//       {
//         id: 125,
//         avg: 0.985, // (47 + 150) / (50 + 150)
//         1: 0.94, // 47 / 50
//         2: 1.0 // 150 / 150
//       },
//       {
//         id: 132,
//         avg: 0.82, // (39 + 125) / (50 + 150)
//         1: 0.78, // 39 / 50
//         2: 0.833 // late: (140 - 15) / 150
//       }
//     ];
  
//     return result;
//   }
  
//   const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  
//   console.log(result);

























function getLearnerData(minScore) {
    const AssignmentGroup = {
      id: 12345,
      name: "Fundamentals of JavaScript",
      course_id: 451,
      group_weight: 25,
      assignments: [
        { id: 1, name: "Declare a Variable", due_at: "2023-01-25", points_possible: 50 },
        { id: 2, name: "Write a Function", due_at: "2023-02-27", points_possible: 150 },
        { id: 3, name: "Code the World", due_at: "3156-11-15", points_possible: 500 }
      ]
    }
  
    const LearnerSubmissions = [
      { learner_id: 125, assignment_id: 1, submission: { submitted_at: "2023-01-25", score: 47 } },
      { learner_id: 125, assignment_id: 2, submission: { submitted_at: "2023-02-12", score: 150 } },
      { learner_id: 125, assignment_id: 3, submission: { submitted_at: "2023-01-25", score: 400 } },
      { learner_id: 132, assignment_id: 1, submission: { submitted_at: "2023-01-24", score: 39 } },
      { learner_id: 132, assignment_id: 2, submission: { submitted_at: "2023-03-07", score: 140 } }
    ]
  
    const result = []
    for (const submission of LearnerSubmissions) {
      const assignment = AssignmentGroup.assignments.find(a => a.id === submission.assignment_id)
      if (!assignment) continue
      if (assignment.id === 3 && new Date(assignment.due_at) > new Date()) continue 
      if (submission.submission.score === undefined || submission.submission.score < minScore) continue
      const dueDate = new Date(assignment.due_at)
      const submittedDate = new Date(submission.submission.submitted_at)
      if (submittedDate > dueDate) continue
      const percentage = submission.submission.score / assignment.points_possible
      let learnerData = result.find(data => data.id === submission.learner_id)
      if (!learnerData) {
        learnerData = { id: submission.learner_id }
        result.push(learnerData)
      }
      learnerData.avg = (learnerData.avg || 0) + (percentage / LearnerSubmissions.length)
      learnerData[assignment.id] = percentage
    }
    result.forEach(data => {
      data.avg = Math.round(data.avg * 100) / 100
    })
    return result
  }
    
     const result = getLearnerData(AssignmentGroup, LearnerSubmissions)
    console.log(result)
    