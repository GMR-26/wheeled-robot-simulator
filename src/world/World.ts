import Matter from "matter-js";
const { Bodies, Body, World } = Matter;

export function setupWorld(world: Matter.World) {
  // Create boundaries
  const ground = Bodies.rectangle(400, 590, 810, 20, { 
    isStatic: true,
    render: { fillStyle: '#2c3e50' }
  });
  
  const leftWall = Bodies.rectangle(10, 300, 20, 600, { 
    isStatic: true,
    render: { fillStyle: '#2c3e50' }
  });
  
  const rightWall = Bodies.rectangle(790, 300, 20, 600, { 
    isStatic: true,
    render: { fillStyle: '#2c3e50' }
  });
  
  const topWall = Bodies.rectangle(400, 10, 810, 20, { 
    isStatic: true,
    render: { fillStyle: '#2c3e50' }
  });

  // Add some obstacles
  const obstacle1 = Bodies.rectangle(200, 400, 100, 20, { 
    isStatic: true, 
    angle: Math.PI/4,
    render: { fillStyle: '#e74c3c' }
  });
  
  const obstacle2 = Bodies.rectangle(600, 300, 150, 30, { 
    isStatic: true,
    render: { fillStyle: '#e74c3c' }
  });

  // Add everything to world
  World.add(world, [ground, leftWall, rightWall, topWall, obstacle1, obstacle2]);

  return {
    ground,
    walls: [leftWall, rightWall, topWall],
    obstacles: [obstacle1, obstacle2]
  };
}