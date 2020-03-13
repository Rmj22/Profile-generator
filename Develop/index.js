var pdf = require('html-pdf');

var axios = require('axios');

var inquirer = require('inquirer');

const colors = {
    green: {
      wrapperBackground: "#E6E1C3",
      headerBackground: "#C1C72C",
      headerColor: "black",
      photoBorderColor: "#black"
    },
    blue: {
      wrapperBackground: "#5F64D3",
      headerBackground: "#26175A",
      headerColor: "white",
      photoBorderColor: "#73448C"
    },
    pink: {
      wrapperBackground: "#879CDF",
      headerBackground: "#FF8374",
      headerColor: "white",
      photoBorderColor: "#FEE24C"
    },
    red: {
      wrapperBackground: "#DE9967",
      headerBackground: "#870603",
      headerColor: "white",
      photoBorderColor: "white"
    }
  };
  function generateHTML(info, data) {
    //   console.log("this is info" + JSON.stringify(info.data))
    const github = info.data;

    //   console.log("this is info" + JSON.stringify(data.color))
      
    return `<!DOCTYPE html>
  <html lang="en">
     <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
        <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
        <title>Document</title>
        <style>
            @page {
              margin: 0;
            }
           *,
           *::after,
           *::before {
           box-sizing: border-box;
           }
           html, body {
           padding: 0;
           margin: 0;
           }
           html, body, .wrapper {
           height: 100%;
           }
           .wrapper {
           background-color: ${colors[data.color].wrapperBackground};
           padding-top: 100px;
           }
           body {
           background-color: white;
           -webkit-print-color-adjust: exact !important;
           font-family: 'Cabin', sans-serif;
           }
           main {
           background-color: #E9EDEE;
           height: auto;
           padding-top: 30px;
           }
           h1, h2, h3, h4, h5, h6 {
           font-family: 'BioRhyme', serif;
           margin: 0;
           }
           h1 {
           font-size: 3em;
           }
           h2 {
           font-size: 2.5em;
           }
           h3 {
           font-size: 2em;
           }
           h4 {
           font-size: 1.5em;
           }
           h5 {
           font-size: 1.3em;
           }
           h6 {
           font-size: 1.2em;
           }
           .photo-header {
           position: relative;
           margin: 0 auto;
           margin-bottom: -50px;
           display: flex;
           justify-content: center;
           flex-wrap: wrap;
           background-color: ${colors[data.color].headerBackground};
           color: ${colors[data.color].headerColor};
           padding: 10px;
           width: 95%;
           border-radius: 6px;
           }
           .photo-header img {
           width: 250px;
           height: 250px;
           border-radius: 50%;
           object-fit: cover;
           margin-top: -75px;
           border: 6px solid ${colors[data.color].photoBorderColor};
           box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
           }
           .photo-header h1, .photo-header h2 {
           width: 100%;
           text-align: center;
           }
           .photo-header h1 {
           margin-top: 10px;
           }
           .links-nav {
           width: 100%;
           text-align: center;
           padding: 20px 0;
           font-size: 1.1em;
           }
           .nav-link {
           display: inline-block;
           margin: 5px 10px;
           }
           .workExp-date {
           font-style: italic;
           font-size: .7em;
           text-align: right;
           margin-top: 10px;
           }
           .container {
           padding: 50px;
           padding-left: 100px;
           padding-right: 100px;
           }
  
           .row {
             display: flex;
             flex-wrap: wrap;
             justify-content: space-between;
             margin-top: 20px;
             margin-bottom: 20px;
           }
  
           .card {
             padding: 20px;
             border-radius: 6px;
             background-color: ${colors[data.color].headerBackground};
             color: ${colors[data.color].headerColor};
             margin: 20px;
           }
           
           .col {
           flex: 1;
           text-align: center;
           }
  
           a, a:hover {
           text-decoration: none;
           color: inherit;
           font-weight: bold;
           }
  
           @media print { 
            body { 
              zoom: .75; 
            } 
           }
        </style>
         </head>
          
          <body>
            <div class="wrapper">
            <div class="content">
            <div class="photo-header">
            <h1 class="photo-header">Hi I'm ${github.name} a Full stack developer</h1>
            
           <img class="photo-header img" src="${github.avatar_url}">
            </div>
            <br>
            <hr
            <div class="row">
            <div class="card">
            <h3> Alittle bit about myself ${github.bio}</h3>
            <h3 class="nav-link">checkout github:${github.html_url}</h3>
              <h3>I have: ${github.public_repos} repos </h2>
              <h3>There are ${github.followers} people following me</h3>
              <h3> I'm following ${github.following} team members</h3>
              </div>
              </div>
            </div>
            </div>
          </body>
          </html>`
          
          }
//   <img class="photo-header" ${github.avatar_url}>

    inquirer.prompt([
        {
            message:"Whats is your favorite color?",
            type:"list",
            choices:["red", "blue", "green", "pink" ],
            name:"color"

    },
    {
        message:"Whats your username?",
        type:"input",
        name:"user"
    }
]).then (function(ans){
    // console.log(ans);
    const userInput = ans;
    const newGuy = ans.user;
    // const back = ans.color;
    const queryUrl = `https://api.github.com/users/${userInput.user}`;

    axios.get(queryUrl).then(function(results){
        console.log(userInput)

        let html = generateHTML(results, userInput);

        pdf.create(html).toFile(`./${newGuy}.pdf`, function(err, res){
            if (err) return console.log(err)
        });
        
        console.log("done")
    })
}
)
    //   .then(function({ user }) {
    //         const queryUrl = `https://api.github.com/users/${user}`;
        
    //         axios.get(queryUrl).then(function(res) {
    //           const repoNames = res.data.map(function(repo) {
    //             return repo.name;
    //           });
        
    //           const repoNamesStr = repoNames.join("\n");
        
    //           fs.writeFile("repos.txt", repoNamesStr, function(err) {
    //             if (err) {
    //               throw err;
    //             }
        
    //             console.log(`Saved ${repoNames.length} repos`);
    //           });
    //         });
    //   });


    