import Matter from "matter-js";
import { RobotSensors } from "./RobotSensors";
const { Bodies, Body, Constraint, World } = Matter;

export class WheeledRobot {
  public chassis: Matter.Body;
  public wheels: Matter.Body[];
  public constraints: Matter.Constraint[];
  
  constructor(x: number, y: number, world: Matter.World) {
    // Create chassis (main body)
    this.chassis = Bodies.rectangle(x, y, 80, 40, {
      friction: 0.05,
      restitution: 0.3,
      render: {
        fillStyle: '#3498db',
        strokeStyle: '#2980b9',
        lineWidth: 1
      }
    });

    // Create wheels
    this.wheels = [
      Bodies.circle(x - 30, y + 25, 15, {
        friction: 0.8,
        restitution: 0.3,
        render: { fillStyle: '#34495e' }
      }),
      Bodies.circle(x + 30, y + 25, 15, {
        friction: 0.8,
        restitution: 0.3,
        render: { fillStyle: '#34495e' }
      })
    ];

    // Create constraints to attach wheels to chassis
    this.constraints = [
      Constraint.create({
        bodyA: this.chassis,
        bodyB: this.wheels[0],
        pointA: { x: -30, y: 20 },
        pointB: { x: 0, y: 0 },
        stiffness: 1,
        render: { type: 'line', anchors: false }
      }),
      Constraint.create({
        bodyA: this.chassis,
        bodyB: this.wheels[1],
        pointA: { x: 30, y: 20 },
        pointB: { x: 0, y: 0 },
        stiffness: 1,
        render: { type: 'line', anchors: false }
      })
    ];

    // Add everything to world
    World.add(world, [this.chassis, ...this.wheels, ...this.constraints]);
  }

  public applyWheelForce(left: number, right: number) {
    Body.applyForce(this.wheels[0], this.wheels[0].position, {
      x: left * Math.cos(this.wheels[0].angle),
      y: left * Math.sin(this.wheels[0].angle)
    });
    
    Body.applyForce(this.wheels[1], this.wheels[1].position, {
      x: right * Math.cos(this.wheels[1].angle),
      y: right * Math.sin(this.wheels[1].angle)
    });
  }

  public reset(position: { x: number; y: number }) {
    Body.setPosition(this.chassis, position);
    Body.setVelocity(this.chassis, { x: 0, y: 0 });
    Body.setAngularVelocity(this.chassis, 0);
    
    // Reset wheels
    this.wheels.forEach(wheel => {
      Body.setPosition(wheel, {
        x: position.x + (wheel === this.wheels[0] ? -30 : 30),
        y: position.y + 25
      });
      Body.setVelocity(wheel, { x: 0, y: 0 });
      Body.setAngularVelocity(wheel, 0);
    });
  }
  // Add to WheeledRobot class
   public getSensorReadings(world: Matter.World) {
    return {
      front: RobotSensors.getDistance(this.chassis, world, 0),
      left: RobotSensors.getDistance(this.chassis, world, -Math.PI/4),
      right: RobotSensors.getDistance(this.chassis, world, Math.PI/4)
    };
  }
}