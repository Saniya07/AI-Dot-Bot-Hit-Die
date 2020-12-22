// This class defines a Dot
class Dot{
    // Constructor for the Dot, which gives it initial properties
    constructor(){
        // Position, velocity and acceleration of the Dot are all 2D vectors
        this.pos = createVector(windowWidth/2, windowHeight-100);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.dead = false;             // boolean variable for checking if Dot is dead or not
        this.isBest = false;           // boolean variable to check if Dot is best in its Population or not
        this.reachedGoal = false;      // boolean variable to check if Dot is in Goal or not
        this.fitness = 0;              // Fitness of Dot
        this.brain = new Brain(500);   // Create Brain of Dot with 500 random directions
    }
    
    // Function to style the Dot
    show(){
        // If Dot is best in its population, make it green and bigger
        if(this.isBest){
            stroke(0);
            fill(0, 255, 0);
            ellipse(this.pos.x, this.pos.y, 10, 10);            
        }
        // Else, make it black and translucent
        // The last argument in fill() is for transparency
        else{
            stroke(0);
            fill(0, 100);
            ellipse(this.pos.x, this.pos.y, 5, 5);    
        }
    }

    // Function to move the Dot
    move(){
        // Change acceleration of Dot only if it has taken steps less than the number of 
        // directions in its Brain
        if(this.brain.directions.length > this.brain.step){
            this.acc = this.brain.directions[this.brain.step];
            this.brain.step++;    
        }
        // If Dot has already taken all the directions in its Brain, then kill it.
        else{
            this.dead = true;
        }
        // Change velocity by adding acceleration
        this.vel.add(this.acc);
        // Limiting the velocity of the Dot, so it doesn't go too fast
        this.vel.limit(5);
        // Change position of Dot by adding velocity
        this.pos.add(this.vel);
    }

    // This function will update Dot in each frame
    update(){
        // Move Dot only if it is not dead or hasn't hit the Goal yet
        if(!this.dead && !this.reachedGoal){
            this.move();

            // If Dot hits the boundaries, kill it
            if(this.pos.x<5 || this.pos.y<5 || this.pos.x>windowWidth-17 ||this.pos.y>windowHeight-20){
                this.dead = true;
            }
            // If Dot hit the Goal, stop it
            else if(p5.Vector.dist(this.pos, goal.pos)<11){
                this.reachedGoal = true;
            }
        }
    }

    // This function will calculate the fitness of Dot
    calculateDotFitness(){
        // Make fitness of Dot really HIGH, if it hits the Goal
        if(this.reachedGoal){
            this.fitness = 1.0/16 + 100/(this.brain.step * this.brain.step);
        }
        // The Dot which is closer to the Goal will have more fitness than the one
        // which is farther
        else{
            var distanceToGoal = p5.Vector.dist(this.pos, goal.pos);
            this.fitness = 1.0/(distanceToGoal*distanceToGoal);    
        }
    }

    // Function to get babies of the Dot
    gimmeBaby(){
        // Create a baby Dot
        var baby = new Dot();

        // Copy the brain of parent to baby's
        baby.brain = this.brain.clone(this.brain.directions.length);
        
        // return the baby Dot
        return baby;
    }
}