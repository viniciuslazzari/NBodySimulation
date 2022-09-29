class Cell {
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

        group.push(new Cell(x, y, 0, 0, mass, color, 5))
    }

    return group;
}

drawGroup = (ctx, gainX, gainY, group) => {
    group.forEach(cell => {
        cell.draw(ctx, gainX, gainY);
    });
}

createForce = (group1, group2, alfa) => {
    softening = 1000;

    for (let i = 0; i < group1.length; i++) {
        forceX = 0;
        forceY = 0;

        for (let j = 0; j < group2.length; j++) {
            cell1 = group1[i];
            cell2 = group2[j];
        
            distanceX = cell1.x - cell2.x;
            distanceY = cell1.y - cell2.y;
        
            distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
        
            if (distance > 0){
                force = alfa * cell1.mass * cell2.mass / (Math.pow(distance, 2) + softening);
                forceX += force * distanceX;
                forceY += force * distanceY;

                // if (force > 0.0001){
                //     ctx.beginPath();
                //     ctx.strokeStyle = 'white';
                //     ctx.lineWidth = 0.1;
                //     ctx.moveTo(cell1.x, cell1.y);
                //     ctx.lineTo(cell2.x, cell2.y);
                //     ctx.stroke();
                // }
            }
        }

        accelerationX = forceX / cell1.mass;
        accelerationY = forceY / cell1.mass;

        cell1.velocityX += accelerationX;
        cell1.velocityY += accelerationY;

        cell1.x1 -= cell1.velocityX;
        cell1.y1 -= cell1.velocityY;
    }

    group1.forEach(cell => {
        cell.x = cell.x1;
        cell.y = cell.y1;
    })
}