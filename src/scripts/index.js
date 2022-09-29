game = () => {
    var canvas = document.getElementById("game");
    var width = canvas.width;
    var height = canvas.height;

    var mouseX = 0;
    var mouseY = 0;

    var ctx = canvas.getContext('2d');

    const reds = createGroup(100, 1, 'red');

    update = () => {
        ctx.clearRect(0, 0, width, height);

        if (selected) {
            selected.x = mouseX;
            selected.y = mouseY;
        }
        
        drawGroup(ctx, reds);

        createForce(ctx, reds, reds, 6.2);

        requestAnimationFrame(update);
    }

    update();

    var selected = null;

    canvas.addEventListener("click", () => {
        if (!selected) {
            blues.forEach(cell => {
                if (cell.x + cell.radius + 10 > mouseX && cell.x - cell.radius - 10 < mouseX) {
                    if (cell.y + cell.radius + 10 > mouseY && cell.y - cell.radius - 10 < mouseY) {
                        selected = cell;
                    }
                }
            });
        } else {
            selected.x = mouseX;
            selected.y = mouseY;
            selected.velocityX = 0;
            selected.velocityY = 0;

            selected = null;
        }
    });

    canvas.addEventListener("mousemove", (e) => {
        mouseX = e.pageX;
        mouseY = e.pageY;

        if (selected) {
            document.body.style.cursor = "pointer";
        } else {
            var hover = false;

            blues.forEach(cell => {
                if (cell.x + cell.radius > mouseX && cell.x - cell.radius < mouseX) {
                    if (cell.y + cell.radius > mouseY && cell.y - cell.radius < mouseY) {
                        hover = true;
                    }
                }
            });

            if (hover) document.body.style.cursor = "pointer";
            else document.body.style.cursor = "default";
        }
    });
}
