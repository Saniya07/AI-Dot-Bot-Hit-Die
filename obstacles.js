// This class defines a Obstacle
class Obstacle{
    // constructor which initializes the position, height and width
    // of the obstacle
    // The obstacle is a rectangle
    constructor(x, y, w, h){
        this.x = x;       // Top Left corner's x-coordinate
        this.y = y;       // Top Left corner's y-coordinate
        this.w = w;       // Width
        this.h = h;       // Height
        this.x2 = x + w   // Bottom right corner's x-coordinate
        this.y2 = y + h;  // Bottom right corner's y-coordinate
    }

    // Function to style and show the obstacle
    show(){
        stroke(0);          // Outline color is black
        fill(255, 100, 0);  // Inline color is orange
        rect(this.x, this.y, this.w, this.h);   // To draw a rectangle
    }

    // Function to check if any Dot hit the obstacle or not
    dotHitObstacle(dot){
        // If Dot's position coordinates lie inside the rectangle obstacle,
        // that means Dot hit obstacle
        if(dot.pos.x < this.x2 && dot.pos.y < this.y2 && dot.pos.x > this.x && dot.pos.y > this.y){
            return true;
        }

        // If it reaches here, that means no Dot has hit the obstacle
        return false;
    }
}