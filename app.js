const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeeList = [];

// Ask for manager info
const askUserForManagerInfo = () => {

    return inquirer.prompt(
        [
            {
                message: "What is the manager's name?",
                name: "name",
                type: "input",
            },
            {
                message: "What is the manager's id",
                name: "id",
                type: "input"
            },
            {
                message: "What is the manager's email?",
                name: "email",
                type: "input"
            },
            {
                message: "What is the manager's office number?",
                name: "officeNumber",
                type: "input"
            }
        ]).then((managerData) => {
            const newManager = new Manager(managerData.name, managerData.id, managerData.email, managerData.officeNumber)


            // console.log(newManager);

            employeeList.push(newManager)

            console.log(employeeList);

            askEmployeeRole();
        });
}

//Ask user for next employee type
const askEmployeeRole = () => {
    inquirer.prompt([{
        message: "Do you want to add employee information?",
        name: "role",
        choices: ["engineer", "intern", "no more employee"],
        type: "list"
    }]).then((nextEmployee) => {

        console.log(nextEmployee);
        if (nextEmployee.role === "engineer") {

            askEngineerInfo();
        } else if (nextEmployee.role === "intern") {

            askInternInfo();
        } else {
            createHtmlFile();
        }
    })
}




// Ask user for next employee type
// askEmployeeType = () => {
//     inquirer.prompt([{
//         message: "Do you want to add employee information?",
//         name: "employeeChoice",
//         type: "confirm",
//     }]).then((newEmployeeChoice) => {

//         console.log(newEmployeeChoice);
//         if (newEmployeeChoice) {

//             inquirer.prompt({
//                 message: "Do you want to add Engineer?",
//                 name: "true or false",
//                 type: "confirm"
//             }).then((engineer) => {
//                 if (engineer === true) {
//                     askEngineerInfo();
//                 } else {
//                     askInternInfo();
//                 }
//             })

//         } else {
//             console.log("user does not want to add employee!")
//             return;
//         }
//     })
// }

// Ask for enginner info (name, id, email, github)
const askEngineerInfo = () => {
    // console.log("User select engineer")
    inquirer.prompt(
        [
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
                message: "What is the's email?",
                name: "email",
                type: "input"
            },
            {
                message: "What is engineer's GitHub user name?",
                name: "github",
                type: "input"
            }
        ]).then((engineerData) => {
            const newEngineer = new Engineer(engineerData.name, engineerData.id, engineerData.email, engineerData.github)

            employeeList.push(newEngineer)
            console.log(employeeList);

            askEmployeeRole();
        });
}

const askInternInfo = () => {
    inquirer.prompt([{
        message: 'What is the interns name?',
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
    }]).then((internData) => {
        const newIntern = new Intern(internData.name, internData.id, internData.email, internData.school)

        employeeList.push(newIntern)
        console.log(employeeList);

        askEmployeeRole();
    });

}
// Ask user for engineer info
// function askUserForEngineerInfo() {


// };

// Ask user for intern
// function askUserForInternInfo() {


// };

const createHtmlFile = () => {
    // const htmlContent = render(employee)


    const htmlContent = render(employeeList);
    // fs mod to write html
    fs.writeFile(__dirname + '/main.html', htmlContent, (err) => {
        // check for error
        err ?
            // if failed console log 
            console.log('Failed to write file') :
            // if success console log
            console.log('File has been writen');
    })
};

askUserForManagerInfo();
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
