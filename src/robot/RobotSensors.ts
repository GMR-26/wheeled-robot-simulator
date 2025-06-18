import * as Matter from "matter-js";

// Type-safe interface declaration
interface IMatterExtended {
    Ray: any;
    Query: any;
}

// Create extended Matter object with proper typing
const M: typeof Matter & IMatterExtended = Matter as any;

export class RobotSensors {
    static getDistance(
        robot: Matter.Body,
        world: Matter.World,
        angleOffset: number
    ): number {
        const rayLength = 300;
        
        // Create ray with proper typing
        const from = { x: robot.position.x, y: robot.position.y };
        const to = {
            x: from.x + rayLength * Math.cos(robot.angle + angleOffset),
            y: from.y + rayLength * Math.sin(robot.angle + angleOffset)
        };

        const ray = (M as any).Ray.create(from, to);

        // Get bodies as array (handles all Matter.js versions)
        const bodies = this.getBodiesAsArray(world);
        
        // Perform raycast
        const collisions = (M as any).Query.ray(bodies, ray, rayLength);
        
        return collisions.length > 0 
            ? this.getCollisionDistance(collisions[0], rayLength)
            : rayLength;
    }

    private static getBodiesAsArray(world: Matter.World): Matter.Body[] {
        // Handle both array and object-based body collections
        if (Array.isArray(world.bodies)) {
            return world.bodies;
        }
        return Object.keys(world.bodies).map(key => (world.bodies as any)[key]);
    }

    private static getCollisionDistance(collision: any, maxDistance: number): number {
        // Handle all possible collision object structures
        if (typeof collision.distance === 'number') {
            return Math.min(collision.distance, maxDistance);
        }
        if (collision.bodyA && collision.bodyB) {
            const dx = collision.bodyA.position.x - collision.bodyB.position.x;
            const dy = collision.bodyA.position.y - collision.bodyB.position.y;
            return Math.min(Math.sqrt(dx * dx + dy * dy), maxDistance);
        }
        return maxDistance;
    }
}