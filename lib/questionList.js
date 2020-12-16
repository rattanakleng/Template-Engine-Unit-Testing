
const questionList = [
    {
        managerQuestions: [
            {
                message: "What is the manager's name?",
                name: "name",
                type: "input",
            },
            {
                message: "What is the manager's id",
                name: "id",
                type: "input",
            },
            {
                message: "What is the manager's email?",
                name: "email",
                type: "input",
            },
            {
                message: "What is the manager's office number?",
                name: "officeNumber",
                type: "input",
            }
        ]
    },
    {
        engineerQuestion: [
            {
                message: "What is the engineer name?",
                name: "name",
                type: "input",
            },
            {
                message: "What is the engineer's id",
                name: "id",
                type: "input"
            },
            {
                message: "Whatis the's email?",
                name: "email",
                type: "input"
            },
            {
                message: "What is engineer's GitHub user name?",
                name: "github",
                type: "input"
            }
        ]
    },
    {
        internQuestion: [
            {
                message: 'W t is the interns name?',
                name: 'name',
                type: 'input',
            },
            {
                message: 'What is the interns id?',
                name: 'id',
                type: 'input'
            },
            {
                message: 'What is the interns email?',
                name: 'email',
                type: 'input'
            },
            {
                message: 'What school does the intern currently attend?',
                name: 'school',
                type: 'input'
            }
        ]
    },
    {
        nextEmployeeQuestion:
        {
            message: "Do you want to add employee information?",
            name: "role",
            choices: ["engineer", "intern", "no more employee"],
            type: "list"
        }
    }
];

module.exports = questionList;