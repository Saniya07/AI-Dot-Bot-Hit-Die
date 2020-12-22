// This class defines the Goal
class Goal{
    // constructor which initializes the position of Goal by a 2D vector
    constructor(){
        this.pos = createVector(windowWidth/2, 30);
    }

    // Function to style and show the Goal
    show(){
        // Make the Goal red
        fill(200, 0, 0);
        ellipse(this.pos.x, this.pos.y, 20, 20);
    }

    // Function to calculate how many Dots have hit the Goal
    // It takes an array of type Dot as arguments\
    calculateDotsInGoal(dots){
        // Variable to store the count
        dotsInGoal = 0;
        for(var i = 0;i<dots.length;i++){
            // If a Dot has hit the Goal, increment the variable
            if(dots[i].reachedGoal){
                dotsInGoal++;
            }
        }
    }
}