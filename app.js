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

    inquirer.prompt(
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