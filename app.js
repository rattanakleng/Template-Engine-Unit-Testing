const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const questionList = require("./lib/questionList");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeeList = [];

// Ask for manager info
const askUserForManagerInfo = () => {

    inquirer.prompt(

        questionList[0].managerQuestions 

        ).then((managerData) => {

            const newManager = new Manager(toTitleCase(managerData.name),managerData.id.toUpperCase(), managerData.email.toLowerCase(), managerData.officeNumber.toUpperCase());

            employeeList.push(newManager);

            console.log(employeeList);

            askEmployeeRole();
        });
}

//Ask user for next employee type
const askEmployeeRole = () => {

    inquirer.prompt(

        questionList[3].nextEmployeeQuestion
 
    ).then((nextEmployee) => {

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
        
        questionList[1].engineerQuestion
 
        ).then((engineerData) => {

            const newEngineer = new Engineer(toTitleCase(engineerData.name), engineerData.id.toUpperCase(), engineerData.email.toLowerCase(), engineerData.github.toLowerCase());

            employeeList.push(newEngineer);

            console.log(employeeList);

            askEmployeeRole();
        });
}

const askInternInfo = () => {
    inquirer.prompt(

        questionList[2].internQuestion

        ).then((internData) => {

        const newIntern = new Intern(toTitleCase(internData.name), internData.id.toUpperCase(), internData.email.toLowerCase(), toTitleCase(internData.school));

        employeeList.push(newIntern);

        console.log(employeeList);

        askEmployeeRole();
    });
}
//Render information in main.html
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

//Function convert first letter to upper case

function toTitleCase(str) {
    console.log("str parameter from totitle case funct: " + str)

    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}