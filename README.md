# AI-Dot-Bot-Hit-Die

This is a simple game, in which in order to win, the player, i.e., the Dot has to hit the Goal. 
An AI is trying to learn how to win the game. In every genration, 300 Dots are left in the game to Die in order to learn how to win. Well, they don't really die, they just stick
to the walls and obstacles. 
The source code is so detailedly commented that a person who only codes "Hello World" can also understand it and I know detailedly is not a word.
Some functions are explained below with images.
To see the working example, click on the link in the repository's __About__.
</br>
</br>
</br>
## getRandomDirection() in brain.js
Given position of Dot, it can go in any of these below 8 directions.

![](https://github.com/Saniya07/AI-Dot-Bot-Hit-Die/blob/master/images/Git.png)

The 9th direction is (0, 0), i.e., the Dot doesn't move. This function randomly returns one of these directions to store in the directions[] array of the Dot's brain.
</br>
</br>
## selectParent() in population.js
For a parent we want the fittest Dot but we also want to keep the diversity among the babies. So, we select different Dots which are fittest among their population. For this, we use Roulette Wheel Selectin method. In this method a pie is create, in which the Dot with highest fitness will be covering more portion of pie such as

![](https://github.com/Saniya07/AI-Dot-Bot-Hit-Die/blob/master/images/Git2.png)

Now, if we rotate the wheel, then it the red marker has greater chance of stopping on the bigger colored portions, that are Dots with higher fitnesses.
Similarly, in this function we use a __for__ loop to find a Dot whose fitness when added to __sum__, makes it bigger than the random number between 0 and sum of fitness of all the Dots in the current Population. __sum__ is variable in __selectParent()__ function.
