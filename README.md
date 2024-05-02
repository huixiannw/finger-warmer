# Project-1-Finger Warmer

Game Instruction:

Your fingers are getting cold!
You have only 60 seconds to destroy the 3 ice cubes!


Game logic:

This game is based of a speed typer game where user will have to type the words given within a specific time to win.  

It is created largely using JavaScript, HTML, DOM manipulation, event listeners and CSS animations. 

User input will be verified with a word array upon pressing enter. If successful, a new word will be random generated from the word array and rendered on the browser using DOM manipulation. If unsuccessful, the input form will shake and turn red (using CSS animation) to signal user than input is unsuccessful.

For each successful input, the ice's cold meter will be deduced. Once it reaches 0, 1 ice block would have disappeared. 

Meanwhile, the 60 seconds countdown timer is programmed using setTimeout function and DOM manipulation. Once it reaches 0, the JavaScript function will determine if the there are still ice cubes left. If there are still ice cubes, user will lose. If ice cubes are destroyed before it reaches 0, user will win. 
