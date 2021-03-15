var qi;
const title = "Choose the Right Adobe App"; // Title of the app
const str_txtPDesc1 = "It's not always obvious which Adobe app is the best one for your project. Many apps in the Creative Cloud collection have features in common with each other and apps outside of that collection, so it's easy to overlook the one that may work better for what you need."; // First intro paragraph
const str_txtPDesc2 = "Take the quiz below to learn more about which Adobe app is the smart choice for your project."; // Second intro paragraph
const str_projectQ = "What type of project are you creating?"; // Project question
const pLength = Object.keys(projects).length;
const prodUrlPrefix = "https://www.techsoup.org/products/-"; // Part of the product URL before the product ID
const prodUrlSuffix = "-"; // Part of the product URL after the product ID

function hideNoscript() {
    var noscript = document.getElementById("noscript");
    noscript.remove();
}

function drawNav() {
    var appNav = '<div id="appNav" class="container-fluid"><div class="container"><div class="row"><div class="col-xs-11"><h1 class="appNavCtnH1">' + title + '</h1></div><div class="col-xs-1 restart text-right"><input type="image" id="restart" src="restart.svg"></div></div></div></div>';
    document.getElementById("app").insertAdjacentHTML('afterbegin',appNav);
    
    document.getElementById("restart").addEventListener("click", function(){
        reset();
        drawProjectQ();
    });
}

function hideProjectQ(project) {
    document.querySelector(".projectUl").remove();
}

function addTally(binary,short) {
    var value = binary.toString();
    var tallyUl = document.querySelector("#appBody .tally ul");
    var projectLi = '<li><span><img src="' + value + '.svg" class="img-' + value + '"></span>' + short + '</li>';
    tallyUl.insertAdjacentHTML('beforeend',projectLi);
}

function setQ(project,i) {
    
    document.querySelector("h2").textContent = questions[project][i]["question"];
    
/*    var binary = binary.toString();
    var tallyUl = document.querySelector("#appBody .tally ul");
    var projectLi = '<li><span><img src="' + binary + '.svg" class="img-' + binary + '"></span>' + tally + '</li>';
    tallyUl.insertAdjacentHTML('beforeend',projectLi); */
}

function hideButtons() {
    document.querySelector("#appBody .qRow div").remove();
    if (document.querySelector("#appBody .bodyContent")) {
        document.querySelector("#appBody .bodyContent").remove();
    }
}

function drawProduct(productName,productDesc,productId,productSrc) {
    var productHeader = '<div class="useProduct"><div class="col-md-12 header text-white">You should use</div><div class="col-xs-8 col-md-12 productName"><h2 class="text-white product">' + productName + '</h2></div><div class="col-xs-4 img text-right"><img src="' + productSrc + '.svg' + '" alt="' + productName + '" width="100" height="100" class="img-responsive"></div></div>';
    document.querySelector("#appBody .qRow").insertAdjacentHTML('afterbegin',productHeader);
    
    var product = '<div class="col-sm-6 description text-white">' + productDesc + '<button id="learnmore" class="btn btn-orange" role="link">Learn More</button></div><div class="col-sm-2 text-center desktop-img"><img src="' + productSrc + '.svg' + '" alt="' + productName + '" width="100" height="100" class="img-responsive"></div></div>';
    document.querySelector("#appBody .bodyContentCtn").insertAdjacentHTML('afterbegin',product);
        
    document.getElementById("learnmore").addEventListener("click",function() {
        window.location.href = prodUrlPrefix + productId + prodUrlSuffix;
    });
}

function clickBtn(project,i,choice) {
    var pick = questions[project][i][choice];    
    addTally(choice,questions[project][i]["short"]);
    
    switch(typeof(pick)) {
        case "string":
            hideButtons();
            var productName = apps[pick]["name"];
            var productDesc = apps[pick]["description"];
            var productId = apps[pick]["prodid"];
            var productSrc = pick;
            drawProduct(productName,productDesc,productId,productSrc);
            console.log(productName);
            break;
        case "number":
            var tally = questions[project][pick]["short"];
            setQ(project,pick);
            qi=pick;
            break;
        default:
    }
}

function drawButtons(project) {
    var buttons = '<button id="true" class="btn yesno">Yes</button><button id="false" class="btn yesno">No</button>';
    document.querySelector(".bodyContent").insertAdjacentHTML('afterbegin',buttons);
    
    var btns = document.querySelectorAll(".yesno");
    for(i=0;i<btns.length;i++) {
        btns[i].addEventListener("click",function() {
            clickBtn(project,qi,this.getAttribute("id"));
        });
    }
}

function drawProjectQ() {
    var appBody = '<div id="appBody" class="container-fluid"><div class="container"><div class="row qRow"><div class="col-md-8"><h2 class="text-white question">' + str_projectQ + '</h2></div></div><div class="row bodyContentCtn"><div class="col-sm-8 bodyContent"><ul class="projectUl"></ul></div><div class="col-sm-4 tally"><ul></ul></div></div></div></div>';
    document.getElementById("app").insertAdjacentHTML('beforeend',appBody);
    
    for(i=0;i<pLength;i++) {
        var str_project = Object.keys(projects)[i];
        var str_imgProjectSrc = str_project + ".svg";
        var str_txtProject = Object.entries(projects)[i][1].name;
        var project = '<li id="' + str_project + '" role="button"><div class="img text-center"><img src="' + str_imgProjectSrc + '"></div><div class="text">' + str_txtProject + '</div></li>';
        document.querySelector(".projectUl").insertAdjacentHTML('beforeend',project);
    }
    
    const projectLis = document.querySelectorAll(".projectUl li");
    for (i=0;i<projectLis.length;i++) {
        projectLis[i].addEventListener("click",function() {
            var project = this.getAttribute("id");
            var ul = this.parentNode;
            var index = Array.prototype.indexOf.call(ul.childNodes, this);
            var projectName = Object.entries(projects)[index][1].name;
            hideProjectQ(project);
            drawButtons(project);
            addTally(true,projectName);
            setQ(project,0);
        });
    }
}

function drawIntro() {
    var appIntro = '<div id="appIntro" class="container"><div class="row"><div class="col-md-8"><h1 class="text-white">' + title + '</h1></div></div><div class="row"><div class="col-md-8 description text-white"><p>' + str_txtPDesc1 + '</p><p></p>' + str_txtPDesc2 + '</div></div><div class="row"><div class="col-md-8"><button id="btnAppStart" class="btn">Get Started</button></div></div></div>';
    document.getElementById("app").insertAdjacentHTML('beforeend',appIntro);
    
    document.getElementById("btnAppStart").addEventListener("click",function(){
        hideIntro();
        drawNav();
        drawProjectQ();
    });
}

function reset() {
    qi = 0;
    if (document.getElementById("appBody")) {
        document.getElementById("appBody").remove();
    }
}

function init() {
    hideNoscript();
    reset();
    drawIntro();
}

function hideIntro() {
    var appStart = document.getElementById("appIntro");
    appStart.remove();
}

init();