// This class defines a population
class Population{
    // constructor takes argument of number of Dots in the Population
    constructor(size){
        this.dots = [];         // Array to store all Dots in the Population
        this.fitnessSum = 0;    // Variable to store sum of fitness of all Dots in the Population
        this.bestDotIndex;      // Index of best Dot in the Population
        this.minStepTakenToReachGoal = 500;   // Minimum steps taken by the Dot in Population to hit the Goal
        
        // Create Dots for the population
        for(var i = 0;i < size;i++){
            this.dots[i] = new Dot();
        }
    }

    // Function to show all the Dots in the Population by calling show() function
    // of class Dot
    show(){
        for(var i = 0;i<this.dots.length;i++){
            this.dots[i].show();
        }
    }

    // Function to update all the Dots in population by calling update()
    // function of class Dot
    update(){
        // Loop iterates for all the Dots in Population
        for(var i = 0;i<this.dots.length;i++){
            // If a Dot takes more than fixed steps, kill it
            if(this.dots[i].brain.step>this.minStepTakenToReachGoal){
                this.dots[i].dead = true;
            }
            // Else, update the Dot
            else{
                this.dots[i].update();
            }
        }
    }

    // Function to calculate fitness of all the Dots in the Population
    calculateFitness(){
        for(var i = 0;i<this.dots.length;i++){
            this.dots[i].calculateDotFitness();
        }
    }

    // Function to check if all the Dots in the Population are dead or not
    allDotsDead(){
        // Loop iterates for all Dots in Population
        for(var i = 0;i<this.dots.length;i++){
            // If Dot is not dead or has not hit the Goal
            if(!this.dots[i].dead && !this.dots[i].reachedGoal){
                return false;
            }
        }
        // If reaches here, that means, everyone is either DEAD or has HIT the Goal
        return true;
    }

    // Function for selecting Dots for next Generation
    naturalSelection(){
        gen++;  // Increment variable gen. It keeps record of which generation is currently playing
        dotsInPreviousGoal = dotsInGoal;  
        minStepsInLastRound = this.minStepTakenToReachGoal;

        if(minStepsInLastRound < minStepsYet){
            minStepsYet = minStepsInLastRound;
        }

        // Create array to store new Dots
        var newDots = [];

        // Find index of Best Dot in current gen
        this.findBestDotIndex();

        // Find sum of fitness of all Dots in current gen
        this.sumOfFitness();

        // We would keep the baby of the best Dot from this generation in the next generation
        // without mutating it.
        newDots[0] = this.dots[this.bestDotIndex].gimmeBaby();
        newDots[0].isBest = true;  // Set that this Dot is the best

        // Loop iterates for all Dots 
        for(var i = 1;i<this.dots.length;i++){
            // Select a parent
            var parent = this.selectParent();

            // If parent selected successfully
            // This 'if' condition is not really necessary, for getting babies
            if(parent!=undefined){
                // Store baby of this parent in newDots array
                newDots[i] = parent.gimmeBaby();
            }
        }

        // Clone newDots to dots array
        this.dots = [];
        for(var i = 0;i<newDots.length;i++){
            this.dots[i] = newDots[i];
        }

        // At the end of this Function, dots array will contain Dots of the next generation,
        // which will be left in the game to die.
    }

    // Function to calculate the sum of fitness of all the Dots in Population
    sumOfFitness(){
        for(var i = 0;i<this.dots.length;i++){
            this.fitnessSum += this.dots[i].fitness;
        }
    }

    // Function to select a parent from the Population
    selectParent(){
        // Get a random number from 0 to fitnessSum of the Population
        var rand = Math.random() * (this.fitnessSum-0) + 0;
        var sum = 0;

        // Return a Dot which makes the sum greater than rand
        // The exact explanation for this function can be found in ReadMe.md
        for(var i = 0;i<this.dots.length;i++){
            sum += this.dots[i].fitness;
            if(sum > rand){
                return this.dots[i];
            }
        }

        // Function will never reach here
        return this.dots[0];  // Optional
    }

    // Mutate the babies/Dot
    mutateBabies(){
        // If baby Dot has a Brain, then mutate it
        for(var i = 1;i<this.dots.length;i++){
            if(this.dots[i].brain!=undefined){
                this.dots[i].brain.mutate();  // This function is in brain.js
            }
        }
    }

    // Function to find index of Best Dot in Population
    findBestDotIndex(){
        var maxFitness = 0;
        var maxIndex = 0;

        // Find index of Dot with maximum fitness
        for(var i = 0;i<this.dots.length;i++){
            if(this.dots[i].fitness>maxFitness){
                maxFitness = this.dots[i].fitness;
                maxIndex = i;
            }
        }
        this.bestDotIndex = maxIndex;

        // If best Dot has hit the Goal, update minStepTakenToReachGoal
        if(this.dots[this.bestDotIndex].reachedGoal){
            this.minStepTakenToReachGoal = this.dots[this.bestDotIndex].brain.step;
        }
    }
}