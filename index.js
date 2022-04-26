const fs = require("fs");
const util = require("util");

const writePromise = util.promisify(fs.writeFile);
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
        employeeInfo.push(new Manager(generalAnswer.emplyeeName, generalAnswer.employeeID, generalAnswer.employeeEmail,
            managerInfo.managerOfficeNum))
        managerOptions();
    } catch {
        throw console.error();
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
            choices: ['Engineer', 'Intern', 'finish building my team']
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
        case 'Intern':
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

const creatHTMLfile = async function () {


    const htmltext = htmlFile();

    await writePromise("team.html", htmltext)

}
function htmlFile() {
    let text = "";
    employeeInfo.forEach(index => {
        console.log(index.getRole())
        text += `  
        employeeSectoion= $('#employee')
        cardTag= $('<div>')
       cardTag.addClass('card')
        ch= $('<div>')
        ch.addClass('cardHead')
        h3Tag=$('<h3>')
       h3Tag.text('${index.getRole()}') 
        h4Tag=$('<h4>')
       h4Tag.text('${index.getName()}')
       ch.append(h3Tag)
       ch.append(h4Tag)
       cardTag.append(ch)
       idTag =$('<h5>')
       idTag.addClass('info')
       idTag.text('${index.getId()}')
       cardTag.append(idTag)
       h5EmailTag=$('<h5>')
       h5EmailTag.addClass('info')  
       h5EmailTag.text("email :")
       aEmailTag=$('<a>')
        aEmailTag.attr('href','mailto:${index.getEmail()}')
        aEmailTag.text('${index.getEmail()}')
        h5EmailTag.append(aEmailTag)
       cardTag.append(h5EmailTag)
       employeeSectoion.append(cardTag);`
        if (index.getRole() === "Manager") {
            text += `
           officeTag =$('<h5>')
           officeTag.addClass('info')
           officeTag.text('Office Number:${index.getOfficeNumber()}')
       cardTag.append(officeTag)
           `

        } else if (index.getRole() === "Engineer") {
            text += `
        githubTag =$('<h5>')
        githubTag.addClass('info')
        githubTag.text('GitHub username:')
    cardTag.append(githubTag)
    aGitTag=$('<a>')
    aGitTag.attr('href','${index.getGithub()}')
    aGitTag.attr('target','_blanck')
    aGitTag.text('${index.getGithub()}')
    githubTag.append(aGitTag)
        `
        }
        else if (index.getRole() === "Intern") {
            text += `
        schoolTag =$('<h5>')
        schoolTag.addClass('info')
        schoolTag.text('School: ${index.getSchool()}')
    cardTag.append(schoolTag)
        `

        }


    });

    // <h5 class="info">email: <a href="mailto:saghar">saghar@gmail</a></h5>

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
            flex-wrap: wrap;
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
    employeeSectoion= $('#employee')
    
  ${text}
   
</script>
</body>

</html>
    `
    // TODO: click on an email address in the HTMLTHEN my default 
    //       email program opens and populates the TO field of the email with the address
    // TODO: click on the GitHub username THEN that GitHub profile opens in a new tab

}