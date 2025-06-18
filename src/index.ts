import Matter from "matter-js";
import { setupWorld } from "./world/World";
import { WheeledRobot } from "./robot/Robot";
import { setupRobotControls } from "./utils/Controls";

// Initialize physics engine
const { Engine, Render, Runner } = Matter;
const engine = Engine.create({ gravity: { x: 0, y: 1 } });
const world = engine.world;

// Create renderer
const render = Render.create({
  canvas: document.getElementById("canvas") as HTMLCanvasElement,
  engine: engine,
  options: {
    width: 800,
    height: 600,
    wireframes: false,
    background: '#f4f4f4',
    showAngleIndicator: true
  }
});

// Setup world with boundaries
const { ground, walls } = setupWorld(world);

// Create robot
const robot = new WheeledRobot(400, 300, world);

// Setup controls
setupRobotControls(robot, world);

// Start the simulation
Render.run(render);
const runner = Runner.create();
Runner.run(runner, engine);

// Debugging
(window as any).robot = robot;
(window as any).Matter = Matter;