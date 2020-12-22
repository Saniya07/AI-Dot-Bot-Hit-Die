// This class defines Brain of a Dot
class Brain {
    // constructor
    // The Brain will contain a number of random directions for the Dot to follow
    constructor(size) {
        this.directions = []
        this.step = 0;
        
        // Function to initialize directions[]
        this.randomDirections(size);
    }

    // This function initializes the directions[] array of teh Brain
    randomDirections(size) {
        for (var i = 0; i < size; i++) {
            // Calling getRandomDirection() function to get a direction
            this.directions[i] = this.getRandomDirection();
        }
    }

    // This function returns random directions
    // Explanation is provided in ReadMe.md
    getRandomDirection() {
        var randomNumber = floor(random(9));
        switch (randomNumber) {
            case 0:
                return createVector(0, 1);
            case 1:
                return createVector(1, 1);
            case 2:
                return createVector(1, 0);
            case 3:
                return createVector(1, -1);
            case 4:
                return createVector(0, -1);
            case 5:
                return createVector(-1, -1);
            case 6:
                return createVector(-1, 0);
            case 7:
                return createVector(-1, 1);
            case 8:
                return createVector(0, 0);
        }

        return createVector();
    }

    // Function to return clone of the Brain
    clone(){
        // Make a Brain clone with same number of directions
        var clone = new Brain(this.directions.length);
        
        // Copy all the directions
        for(var i = 0;i<this.directions.length;i++){
            clone.directions[i] = this.directions[i];
        }
        
        // Return the clone
        return clone;
    }

    // Function to mutate Brain of the baby
    mutate(){
        // Mutation rate is what percentage of directions will be mutated
        // Here it is 1%
        var mutationrate = 0.01;

        // Loop iterate for all the directions in directions[]
        for(var i = 0;i<this.directions.length;i++){
            // Variable to store a random number between 0 and 1
            var rand = Math.random(1);
            // If random number is less than mutationrate, then replace a direction
            // in the Brain with a new direction
            if(rand<mutationrate){
                this.directions[i] = this.getRandomDirection();
            }
        }
    }
}