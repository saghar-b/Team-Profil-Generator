const fs = require('fs');
const inquirer = require('inquirer');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');
let employeeInfo = [];




// TODO: Enter the team manager’s name, employee ID, email address, and office number
const init = async function () {
    try {
        const generalAnswer = await getGeneralInfo();
        const managerInfo = await getManagerInfo();
        let newManager = new Manager(generalAnswer.emplyeeName, generalAnswer.employeeID, generalAnswer.employeeEmail, managerInfo.managerOfficeNum)
        employeeInfo.push(newManager);
        managerOptions();
        //  creatHTMLfile()
    } catch {

    }

}
function getManagerInfo() {
    return inquirer.prompt([
        {
            type: 'number',
            name: 'managerOfficeNum',
            message: 'please enter Manager Office number'
        }
    ])

}
const managerOptions = async function () {
    const opt = await inquirer.prompt([
        {
            type: 'list',
            name: 'employeeOptions',
            message: 'please select an Employee',
            choices: ['Engineer', 'Inter', 'finish building my team']
        }
        // TODO: presented with a menu with the option to add an engineer
        //  or an intern or to finish building my team
    ])

    switch (opt.employeeOptions) {
        // TODO: select the engineer option
        case 'Engineer':
            console.log("//////Engineer Information//////")
            const generalAnswerM = await getGeneralInfo();
            const enginerrAns = await getEngineerlInfo();
            employeeInfo.push(new Engineer(generalAnswerM.emplyeeName, generalAnswerM.employeeID,
                generalAnswerM.employeeEmail, enginerrAns.github))

            managerOptions();
            break;
        // TODO: select the intern option
        case 'Inter':
            console.log("//////Intern Information//////")
            const generalAnswerIn = await getGeneralInfo();
            const internAns = await getInternlInfo();
            employeeInfo.push(new Intern(generalAnswerIn.emplyeeName, generalAnswerIn.employeeID,
                generalAnswerIn.employeeEmail, internAns.school))
            managerOptions();

            break;
        // TODO: exit the application, and the HTML is generated
        case 'finish building my team':
            console.log("your team is:")
            console.table(employeeInfo)
            creatHTMLfile()
            break;

        default:
            console.table(employeeInfo)
            break;
    }


}
const getEngineerlInfo = function () {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'github',
            message: 'please enter Engineer GitHub username'
        }
    ])

}
const getInternlInfo = function () {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'school',
            message: 'please enter Intern school name'
        }
    ])

}
const getManagerlInfo = function () {
    return inquirer.prompt([
        {
            type: 'number',
            name: 'managerOfficeNum',
            message: 'please enter Manager Office number'
        }
    ])
}
const getGeneralInfo = function () {
    return inquirer.prompt([
        {
            type: 'input',
            message: 'please enter name',
            name: 'emplyeeName',

        }, {
            type: 'number',
            message: 'please enter ID',
            name: 'employeeID',

        }, {
            type: 'input',
            name: 'employeeEmail',
            message: 'please enter Email adress'
        },
    ])
}
init()

function creatHTMLfile() {
    saveEmployees();
 let employeeList=readEmployees();
const htmlfile = htmlFile(employeeInfo);
    console.log("creat html file")
}

function saveEmployees(){

}
function readEmployees(){
    const employeelist=[];
return employeelist
}
function htmlFile(employees){
// TODO: click on an email address in the HTMLTHEN my default 
//       email program opens and populates the TO field of the email with the address
// TODO: click on the GitHub username THEN that GitHub profile opens in a new tab

}


