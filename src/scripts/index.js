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

    const reds = createGroup(500, 1, 'red');

    update = () => {
        ctx.beginPath();
        ctx.clearRect(0, 0, width, height);
        ctx.stroke();

        if (selected) {
            selected.x = mouseX;
            selected.y = mouseY;
        }
        
        drawGroup(ctx, diffWidth, diffHeight, reds);

        createForce(reds, reds, 1);

        requestAnimationFrame(update);
    }

    update();

    canvas.addEventListener("wheel", (e) => {
        if (e.deltaY < 0) scale *= scaleFactor;
        else scale /= scaleFactor;

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(scale, scale);

        width = originalWidth / scale;
        height = originalHeight / scale;

        diffWidth = width - originalWidth;
        diffHeight = height - originalHeight;
    })

    var selected = null;

    // canvas.addEventListener("click", () => {
    //     if (!selected) {
    //         blues.forEach(cell => {
    //             if (cell.x + cell.radius + 10 > mouseX && cell.x - cell.radius - 10 < mouseX) {
    //                 if (cell.y + cell.radius + 10 > mouseY && cell.y - cell.radius - 10 < mouseY) {
    //                     selected = cell;
    //                 }
    //             }
    //         });
    //     } else {
    //         selected.x = mouseX;
    //         selected.y = mouseY;
    //         selected.velocityX = 0;
    //         selected.velocityY = 0;

    //         selected = null;
    //     }
    // });

    // canvas.addEventListener("mousemove", (e) => {
    //     mouseX = e.pageX;
    //     mouseY = e.pageY;

    //     if (selected) {
    //         document.body.style.cursor = "pointer";
    //     } else {
    //         var hover = false;

    //         blues.forEach(cell => {
    //             if (cell.x + cell.radius > mouseX && cell.x - cell.radius < mouseX) {
    //                 if (cell.y + cell.radius > mouseY && cell.y - cell.radius < mouseY) {
    //                     hover = true;
    //                 }
    //             }
    //         });

    //         if (hover) document.body.style.cursor = "pointer";
    //         else document.body.style.cursor = "default";
    //     }
    // });
}
