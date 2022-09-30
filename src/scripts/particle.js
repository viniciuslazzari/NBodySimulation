class Particle {
    constructor(x, y, velocityX, velocityY, mass, color, radius) {
        this.x = x;
        this.y = y;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.mass = mass;
        this.color = color;
        this.radius = radius;
    }

    draw(ctx, diffWidth, diffHeight) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x + diffWidth / 2, this.y + diffHeight / 2, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}

randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

createGroup = (qtd, mass, color, width, height) => {
    const group = [];

    for (var i = 0; i < qtd; i++) {
        x = Math.floor(randomIntFromInterval(1, width));
        y = Math.floor(randomIntFromInterval(1, height));

        group.push(new Particle(x, y, 0, 0, mass, color, 5))
    }

    return group;
}

drawGroup = (ctx, diffWidth, diffHeight, group) => {
    group.forEach(particle => {
        particle.draw(ctx, diffWidth, diffHeight);
    });
}

applyForce = (particle, forceX, forceY) => {
    accelerationX = forceX / particle.mass;
    accelerationY = forceY / particle.mass;

    particle.velocityX += accelerationX;
    particle.velocityY += accelerationY;
}

createForce = (group1, group2, alfa) => {
    softening = 1000;

    for (let i = 0; i < group1.length; i++) {
        particle1 = group1[i];
        
        for (let j = i + 1; j < group2.length; j++) {
            particle2 = group2[j];

            distanceX = particle1.x - particle2.x;
            distanceY = particle1.y - particle2.y;

            if (distanceX == 0 && distanceY == 0) continue;
        
            distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
        
            force = alfa * particle1.mass * particle2.mass / (Math.pow(distance, 2) + softening);

            forceX = force * distanceX;
            forceY = force * distanceY;

            applyForce(particle1, forceX, forceY)
            applyForce(particle2, -forceX, -forceY)
        }
    }

    group1.forEach(particle => {
        particle.x -= particle.velocityX;
        particle.y -= particle.velocityY;
    })
}