// Global variables
let totalDots = 700;          // Number of Dots in a Population
let dotsInGoal = 0;           // Number of Dots that hit the Goal
let dotsInPreviousGoal = 0;   // Number of Dots that hit Goal in previous gen
let minStepsInLastRound = 0;  // Minimum steps taken to hit Goal in previous gen
let maxInGoalYet = 0;         // Maximum number of Dots that have hit the Goal
let minStepsYet = 700;        // Minimum steps taken to hit the Goal yet
let gen = 0;                  // To keep record of the generation currently playing
let obstacles = [];           // Array to store all the obstacles in the game

// This function is called when the program starts, to set the initial environment
function setup(){
    // Create canvas
    createCanvas(windowWidth-17, windowHeight-20);
    
    // Create obstacles
    obstacle1 = new Obstacle(150, 300, 400, 10);
    obstacle2 = new Obstacle(440, 150, 200, 10);
    obstacle3 = new Obstacle(250, 420, 100, 10);
    obstacle4 = new Obstacle(800, 150, 200, 10);
    obstacle5 = new Obstacle(700, 230, 100, 10);
    obstacle6 = new Obstacle(600, 370, 650, 10);
    obstacle7 = new Obstacle(300, 70, 10, 150);
    obstacle8 = new Obstacle(850, 550, 200, 10);
    obstacle9 = new Obstacle(1150, 120, 10, 170);
    
    // Push all the above created obstacles in the array
    obstacles.push(obstacle1);
    obstacles.push(obstacle2);
    obstacles.push(obstacle3);
    obstacles.push(obstacle4);
    obstacles.push(obstacle5);
    obstacles.push(obstacle6);
    obstacles.push(obstacle7);
    obstacles.push(obstacle8);
    obstacles.push(obstacle9);
    
    // Create goal
    goal = new Goal();

    // Create Population
    test = new Population(totalDots);
}

// This function will be automatically called for every frame
function draw(){
    // Background color of canvas
    background(200, 200, 200);

    // Show the goal
    goal.show();
    
    // Show all the obstacles
    for(var i = 0;i<obstacles.length;i++){
        obstacles[i].show();
    }

    // Check is any Dot hit any goal or not
    for(var i = 0;i<test.dots.length;i++){
        for(var j = 0;j<obstacles.length;j++){
            // If a Dot hit a obstacle, kill it
            if(obstacles[j].dotHitObstacle(test.dots[i])){
                test.dots[i].dead = true;
            }
        }
    }

    // If all the Dots in a generation are dead
    if(test.allDotsDead()){
        // Calculate fitness of all the dead Dots
        test.calculateFitness();

        // Select the Dots from this generation to go to the next generation
        test.naturalSelection();

        // Mutate all the Dots that will go to the next Generation
        // Because, we don't want the babies to be exactly like their
        // parents, it will highly slow the process of evolution.
        test.mutateBabies();
    }
    // If all the Dots are not dead in the current generation
    else{
        // Show all the Dots
        test.show();
        
        // Update all the Dots
        test.update(); 

        // Calculate how many Dots are in the goal in current frame
        goal.calculateDotsInGoal(test.dots);   
    }

    // Printing various info
    textSize(20);  // Size of the below texts
    stroke(0);     // Outline color of the below texts
    fill(0);       // Inline color of the below texts
    text('Generation: ', 10, 30);   
    text('Dots in Goal: ', 10, 60);
    text('Total Dots: ', 1340, 30);
    text(str(gen), 120, 30);
    text(str(dotsInGoal), 132, 60);
    text(str(totalDots), 1440, 30);

    textSize(13);  // Size of the below texts
    text('Minimum steps taken by last Gen: ', 10, 95);
    text('Dots in last Goal: ', 10, 115);
    text(str(minStepsInLastRound), 210, 95);
    text(str(dotsInPreviousGoal), 113, 115);

    // To get maximum number of Dots in Goal yet
    if(dotsInGoal > maxInGoalYet){
        maxInGoalYet = dotsInGoal;
    }

    text('Maximum number of Dots in Goal Yet: ', 10, 150);
    text('Min Steps taken Yet: ', 10, 170);
    text(str(maxInGoalYet), 234, 150);
    text(str(minStepsYet), 133, 170);
}


