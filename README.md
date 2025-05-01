
Built by https://www.blackbox.ai

---

```markdown
# Host Fire - Duo Fighting Game

## Project Overview
Host Fire is a browser-based duo fighting game where two players can compete against each other while battling against AI bots. Players use various controls to navigate their characters, shoot at the bots, and gain points for each bot destroyed. The game offers an engaging and interactive experience, leveraging HTML5 and JavaScript to create an enjoyable gaming atmosphere.

## Installation
To run the game locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/host-fire.git
   cd host-fire
   ```

2. **Open `index.html` in your browser:**
   Simply double-click on `index.html`, or use the following command in your terminal if you have a local server setup:
   ```bash
   open index.html
   ```

## Usage
2 players can play the game using the following controls:
- **Player 1:**
  - Move Up: `W`
  - Move Down: `S`
  - Move Left: `A`
  - Move Right: `D`
  - Shoot: `Space`

- **Player 2:**
  - Move Up: `↑ Arrow`
  - Move Down: `↓ Arrow`
  - Move Left: `← Arrow`
  - Move Right: `→ Arrow`
  - Shoot: `Enter`

Players aim to shoot the AI bots while remaining cautious of their health points displayed on the screen.

## Features
- Quick-paced duo fighting gameplay.
- Player vs Player action alongside AI bot challenges.
- Health and score tracking for each player.
- Interactive canvas rendering using HTML5 and JavaScript.
- Responsive design utilizing TailwindCSS for styling.

## Dependencies
This project depends on the following libraries:
- **Tailwind CSS**: For styling the game interface.
- **Font Awesome**: For icons (if you decide to include them in the future).

Included libraries:
- Tailwind CSS CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Font Awesome CDN: `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />`

(There are no dependencies listed in the `package.json`.)

## Project Structure
The project consists of the following files:

```
├── index.html       # The main HTML file providing the game interface
├── game.js          # JavaScript file containing the game logic and functionality
```

### `index.html`
- Contains the layout and structure of the game interface.
- Loads the necessary styles and scripts.
- Provides a canvas element for rendering the game.

### `game.js`
- Implements the game logic, including the Player and Bullet classes.
- Manages user input and player movement.
- Handles collision detection and game updates via the animation frame loop.

---

Feel free to contribute to the project by opening issues or submitting pull requests. Enjoy the game!
```