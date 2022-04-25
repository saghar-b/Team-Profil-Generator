const fs = require("fs");
const util = require("util");

const writePromise = util.promisify(fs.writeFile);
const inquirer = require('inquirer');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');
let employeeInfo = [];
let employee={
    role:"",
    employeeObj:""
}



// TODO: Enter the team manager’s name, employee ID, email address, and office number
const init = async function () {
    try {
        const generalAnswer = await getGeneralInfo();
        const managerInfo = await getManagerInfo();
        let newManager = new Manager(generalAnswer.emplyeeName, generalAnswer.employeeID, generalAnswer.employeeEmail, managerInfo.managerOfficeNum)
        employee={
            role:newManager.getRole(),
            employeeObj:newManager
        }
        employeeInfo.push(employee);
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
            let newEngineer =new Engineer(generalAnswerM.emplyeeName, generalAnswerM.employeeID,
                generalAnswerM.employeeEmail, enginerrAns.github)
                
                employee={
                    role:newEngineer.getRole(),
                    employeeObj:newEngineer
                }
                employeeInfo.push(employee);
            managerOptions();
            break;
        // TODO: select the intern option
        case 'Inter':
            console.log("//////Intern Information//////")
            const generalAnswerIn = await getGeneralInfo();
            const internAns = await getInternlInfo();
            let newIntern = new Intern(generalAnswerIn.emplyeeName, generalAnswerIn.employeeID,
                generalAnswerIn.employeeEmail, internAns.school)
                employee={
                    role:newIntern.getRole(),
                    employeeObj:newIntern
                }
                employeeInfo.push(employee);
            managerOptions();

            break;
        // TODO: exit the application, and the HTML is generated
        case 'finish building my team':
            console.log("your team is:")
            console.table(employeeInfo)
            await creatHTMLfile()
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

const creatHTMLfile =async function(){

   


   
//  try{
   let text=` let employeeSectoion= $('#employee')
    let cardTag= $('<div>')
    cardTag.addClass('card')
    let ch= $('<div>')
     ch.addClass('cardHead')
 
    
     let h3Tag=$('<h3>')
    h3Tag.text("saghar")
    
    let h4Tag=$('<h4>')
    h4Tag.text("saghar")
    
    ch.append(h3Tag)
    ch.append(h4Tag)
 
    cardTag.append(ch)
    employeeSectoion.append(cardTag);`
    const htmltext = htmlFile(text);

    await writePromise("team.html",htmltext )
// let h2=$('h2')
// h2.text('saghar')

    // let employeeSectoion= document.querySelector('#employee')
//    let cardTag= document.createAttribute('<div>')
//    cardTag.classList.add('card')
//    employeeSectoion.appendChild(cardTag);
//    let hedearTag=document.createAttribute('<div>')
//    headerTag.classList.add('header')
//    cardTag.appendChild(headerTag)
//    let h3Tag=document.createAttribute('<h3>')
//    h3Tag.textContent="saghar"
   
//    let h4Tag=document.createAttribute('<h4>')
//    h4Tag.textContent="saghar"

//    headerTag.appendChild(h3Tag)
//    headerTag.appendChild(h4Tag)

    employeeInfo.forEach(index =>{
        let role=index.role;
        
        console.log(index)
    })
        
//  }catch{
     
//  }

}
function htmlFile(text){
    return `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <title>Employee Team</title>
    <style>
        header {
            background-color: rgb(117, 178, 235);
            color: white;
            height: 60px;
            text-align: center;
        }

        h2 {
            padding-top: 20px;
        }

        .cardHead {
            background-color: rgb(236, 127, 63);
            color: white;
            margin-bottom:10px ;
        }

        h3,
        h4 {
            margin: 0%;
            padding: 5px;
        }

        #employee {
            display: flex;
            flex-direction: row;
        }

        .card {
            height: 300px;
            width: fit-content;
            border: 3px solid rgb(236, 127, 63);
            min-width: 200px;
            margin: 10px;
            border-radius: 10px;

        }

        .info {
            width: 90%;
            padding: 5px;
            margin: 3px;
            border: 1px solid rgb(110, 108, 108);
            border-radius: 3px;
        }

        a {
            text-decoration: none;
        }
    </style>
</head>

<body>
    <header>
        <h2>My team</h2>
    </header>
    <main>
        <section id="employee">

        </section>
    </main>
    <script>
    
  ${text}
   
</script>
</body>

</html>
    `
// TODO: click on an email address in the HTMLTHEN my default 
//       email program opens and populates the TO field of the email with the address
// TODO: click on the GitHub username THEN that GitHub profile opens in a new tab

}