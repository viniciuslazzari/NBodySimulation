game = () => {
    const canvas = document.getElementById("game");
    const ctx = canvas.getContext('2d');

    const originalWidth = ctx.canvas.width;
    const originalHeight = ctx.canvas.height;

    let width = originalWidth;
    let height = originalHeight;

    let diffWidth = 0;
    let diffHeight = 0;

    let mouseX = 0;
    let mouseY = 0;

    let scale = 1;
    let scaleFactor = 1.1;

    let selectedParticle = null;
    let hoverParticleMargin = 10;

    let groups = [];

    groups.push(createGroup(100, 1, 'red'));

    update = () => {
        ctx.beginPath();
        ctx.clearRect(0, 0, width, height);
        ctx.stroke();

        if (selectedParticle) {
            selectedParticle.x1 = selectedParticle.x = mouseX / scale - diffWidth / 2;
            selectedParticle.y1 = selectedParticle.y = mouseY / scale - diffHeight / 2;
        }

        groups.forEach(group => {
            drawGroup(ctx, diffWidth, diffHeight, group);
        })
        
        createForce(groups[0], groups[0], 1);

        requestAnimationFrame(update);
    }

    update();

    canvas.addEventListener("wheel", (e) => {
        scale = e.deltaY < 0 ? scale *= scaleFactor : scale /= scaleFactor;

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(scale, scale);

        width = originalWidth / scale;
        height = originalHeight / scale;

        diffWidth = width - originalWidth;
        diffHeight = height - originalHeight;

        hoverParticleMargin *= scale;
    })

    canvas.addEventListener("click", () => {
        if (selectedParticle) {
            selectedParticle.velocityX = 0;
            selectedParticle.velocityY = 0;

            selectedParticle = null;
            return;
        }

        for (let i = 0; i < groups.length; i++) {
            const group = groups[i];
            
            for (let j = 0; j < group.length; j++) {
                let particle = group[j];

                if (particle.x + particle.radius + 10 > mouseX && particle.x - particle.radius - 10 < mouseX) {
                    if (particle.y + particle.radius + 10 > mouseY && particle.y - particle.radius - 10 < mouseY) {
                        selectedParticle = particle;
                        return;
                    }
                }
            }
        }
    });

    canvas.addEventListener("mousemove", (e) => {
        mouseX = e.pageX;
        mouseY = e.pageY;

        if (selectedParticle) {
            return;
        }

        for (let i = 0; i < groups.length; i++) {
            const group = groups[i];
            
            for (let j = 0; j < group.length; j++) {
                let particle = group[j];

                if (particle.x + particle.radius + 10 > mouseX && particle.x - particle.radius - 10 < mouseX) {
                    if (particle.y + particle.radius + 10 > mouseY && particle.y - particle.radius - 10 < mouseY) {
                        document.body.style.cursor = "pointer";
                        return;
                    }
                }
            }
        }

        document.body.style.cursor = "default";
    });
}
