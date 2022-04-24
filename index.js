const fs = require('fs');
const inquirer = require('inquirer');
const Manager = require('./lib/Manager');
let employeeInfo=[];




// TODO: Enter the team manager’s name, employee ID, email address, and office number
const init= async function () {
    try{
        const managerInfo= await managerinfo();
    }catch{

    }

}
const managerinfo= async function () {
   const generalAnswer= await getGeneralInfo();
   inquirer.prompt([
    {
         type: 'number',
         name: 'managerOfficeNum',
         message: 'please enter Manager Office number'
     }
    ])
    .then((answers) => {
        let newManager = new Manager(generalAnswer.employeeName, generalAnswer.employeeID, generalAnswer.employeeEmail, answers.managerOfficeNum)
       employeeInfo.push(newManager);
        managerOptions();

    })
}
function managerOptions() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'employeeOptions',
            message: 'please enter Manager Office number',
            choices: ['Engineer', 'Inter', 'finish building my team']
        }
        // TODO: presented with a menu with the option to add an engineer
        //  or an intern or to finish building my team
    ]).then((answers) => {
        switch (answers.employeeOptions) {
            // TODO: select the engineer option
            case 'Engineer':
                EngineerQ();
                break;
            case 'Inter':

                break;
            case 'finish building my team':

                break;

            default:
                
                break;
        }

    })
}
function engineerQ() {
inquirer.prompt([
    {
        
    }

])
}
const getManagerlInfo =function(){
   return inquirer.prompt([
        {
             type: 'number',
             name: 'managerOfficeNum',
             message: 'please enter Manager Office number'
         }
        ])
    }
const getGeneralInfo =  function (){
   return  inquirer.prompt([
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


// TODO: prompted to enter the engineer’s name, ID, email, and GitHub username, and I am taken back to the menu
// TODO: select the intern option
// TODO: prompted to enter the intern’s name, ID, email, and school, and I am taken back to the menu
// TODO: decide to finish building my team
// TODO: exit the application, and the HTML is generated

// TODO: click on an email address in the HTMLTHEN my default 
//       email program opens and populates the TO field of the email with the address
// TODO: click on the GitHub username THEN that GitHub profile opens in a new tab
