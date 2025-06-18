import { WheeledRobot } from "../robot/Robot";
import Matter from "matter-js";

export function setupRobotControls(robot: WheeledRobot, world: Matter.World) {
  const force = 0.01;
  
  document.addEventListener("keydown", (event) => {
    switch(event.key) {
      case "ArrowRight":
        // Right wheel forward, left wheel backward (turn right)
        robot.applyWheelForce(-force, force);
        break;
      case "ArrowLeft":
        // Left wheel forward, right wheel backward (turn left)
        robot.applyWheelForce(force, -force);
        break;
      case "ArrowUp":
        // Both wheels forward
        robot.applyWheelForce(force, force);
        break;
      case "ArrowDown":
        // Both wheels backward
        robot.applyWheelForce(-force, -force);
        break;
      case " ":
        // Space to reset
        robot.reset({ x: 400, y: 300 });
        break;
    }
  });

  // Prevent arrow keys from scrolling the page
  window.addEventListener("keydown", (e) => {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].indexOf(e.key)>=0) {
      e.preventDefault();
    }
  });
}