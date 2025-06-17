import Matter from "matter-js";

const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;

// create engine
const engine = Engine.create();
const world = engine.world;

// create renderer
const render = Render.create({
  canvas: document.getElementById("canvas") as HTMLCanvasElement,
  engine: engine,
  options: {
    width: 800,
    height: 600,
    wireframes: false,
    background: '#fafafa'
  }
});

Render.run(render);
Runner.run(Runner.create(), engine);

// ground and walls
const ground = Bodies.rectangle(400, 590, 810, 20, { isStatic: true });
const leftWall = Bodies.rectangle(10, 300, 20, 600, { isStatic: true });
const rightWall = Bodies.rectangle(790, 300, 20, 600, { isStatic: true });
const topWall = Bodies.rectangle(400, 10, 810, 20, { isStatic: true });
World.add(world, [ground, leftWall, rightWall, topWall]);

// robot (circle body)
const robot = Bodies.circle(100, 100, 25, {
  restitution: 0.5,
  friction: 0.1,
});
World.add(world, robot);

// Move robot with arrow keys
document.addEventListener("keydown", (event) => {
  const forceMagnitude = 0.05;
  if (event.key === "ArrowRight") Body.applyForce(robot, robot.position, { x: forceMagnitude, y: 0 });
  if (event.key === "ArrowLeft") Body.applyForce(robot, robot.position, { x: -forceMagnitude, y: 0 });
  if (event.key === "ArrowUp") Body.applyForce(robot, robot.position, { x: 0, y: -forceMagnitude });
  if (event.key === "ArrowDown") Body.applyForce(robot, robot.position, { x: 0, y: forceMagnitude });
});
