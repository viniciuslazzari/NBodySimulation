class Particle {
    constructor(x, y, velocityX, velocityY, mass, color, radius) {
        this.x = x;
        this.y = y;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.mass = mass;
        this.color = color;
        this.radius = radius;
        this.x1 = x;
        this.y1 = y;
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

createGroup = (qtd, mass, color) => {
    const group = [];

    for (var i = 0; i < qtd; i++) {
        x = Math.floor(randomIntFromInterval(250, 750));
        y = Math.floor(randomIntFromInterval(200, 600));

        group.push(new Particle(x, y, 0, 0, mass, color, 5))
    }

    return group;
}

drawGroup = (ctx, diffWidth, diffHeight, group) => {
    group.forEach(particle => {
        particle.draw(ctx, diffWidth, diffHeight);
    });
}

createForce = (group1, group2, alfa) => {
    softening = 1000;

    group1.forEach(particle1 => {
        forceX = 0;
        forceY = 0;

        group2.forEach(particle2 => {
            distanceX = particle1.x - particle2.x;
            distanceY = particle1.y - particle2.y;
        
            distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
        
            if (distance > 0){
                force = alfa * particle1.mass * particle2.mass / (Math.pow(distance, 2) + softening);
                forceX += force * distanceX;
                forceY += force * distanceY;

                // if (force > 0.0001){
                //     ctx.beginPath();
                //     ctx.strokeStyle = 'white';
                //     ctx.lineWidth = 0.1;
                //     ctx.moveTo(particle1.x, particle1.y);
                //     ctx.lineTo(particle2.x, particle2.y);
                //     ctx.stroke();
                // }
            }
        })

        accelerationX = forceX / particle1.mass;
        accelerationY = forceY / particle1.mass;

        particle1.velocityX += accelerationX;
        particle1.velocityY += accelerationY;

        particle1.x1 -= particle1.velocityX;
        particle1.y1 -= particle1.velocityY;
    })

    group1.forEach(particle => {
        particle.x = particle.x1;
        particle.y = particle.y1;
    })
}