// document.write("<h1>請上傳照片</h1>")

var button_isblue = true;
var canvars;
var ctx;
var img_h, img_w;
var is_upload = false;
var line_pos = 0;
var now_cycle = 0, total_cycle;
var speed = 0.001;
var max_speed;
var stop_flag = false;

function handleFiles(files) {
    const preview = document.getElementById("preview");
    const file = files[0];
    const reader = new FileReader();
    is_upload = true;

    reader.onload = function (event) {
        preview.src = event.target.result;
    }

    // get image h & w
    preview.onload = function () {
        img_w = preview.width;
        img_h = preview.height;
        console.log(img_h, img_w);
    };
    reader.readAsDataURL(file);
}


function speed_curve() {
    m = 750;
    if (now_cycle <= total_cycle) {
        return max_speed * (1 / total_cycle * now_cycle);
    }
    else if (now_cycle <= total_cycle + m) {
        return max_speed / (-1 * m) * (now_cycle - (total_cycle + m));
    }
    else {
        return 0;
    }
}


function draw() {
    console.log(speed);
    console.log(line_pos);
    now_cycle += 1;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#FFCCCC";
    ctx.fillRect(0, line_pos, img_w, 5);

    speed = speed_curve();
    line_pos += speed;

    if (line_pos > img_h) {
        line_pos -= img_h;
    }

    if (speed <= 0) {
        alert("finish!")
        clearInterval(stop_flag);
    }

}

function control(element) {
    if (is_upload) {
        canvars = document.getElementById("canvas");
        canvars.width = img_w;
        canvars.height = img_h;
        ctx = canvars.getContext("2d");
        if (button_isblue) {

            button_isblue = false;
            element.style = "width:240px;height:80px;border:2px #860d09 dashed;";
            element.innerHTML = `<span style="font-size: 20px;">stop</span>`;

            max_speed = Math.random() * 10 + 15;
            total_cycle = Math.random() * 200 + 150;
            now_cycle = 0;
            speed = 0.001

            stop_flag = setInterval(draw, 25)

        }
        else if (!button_isblue) {
            button_isblue = true;
            element.style = "width:240px;height:80px;border:2px #9999FF dashed;";
            element.innerHTML = `<span style="font-size: 20px;">start</span>`;

            clearInterval(stop_flag);
        }
    }
    else {
        alert("圖都沒上傳是在start個雞巴");
    }

    // preview.src = canvas.toDataURL();
}

// var button_isblue = true;
// var canvas, context;
// var lineColor = "red";
// var lineWidth = 2;
// var startX, startY, endX, endY;
// var isDrawing = false;

// function handleFiles(files) {
//     const preview = document.getElementById("preview");
//     const file = files[0];
//     const reader = new FileReader();
//     reader.onload = function (event) {
//         preview.src = event.target.result;
//     }
//     reader.readAsDataURL(file);
//     preview.onload = function () {
//         preview.src = canvas.toDataURL();
//     };
// }

// function control(element) {
//     if (button_isblue) {
//         button_isblue = false;
//         element.style = "width:240px;height:80px;border:2px #860d09 dashed;";

//         canvas = document.createElement("canvas");
//         context = canvas.getContext("2d");
//         canvas.width = preview.width;
//         canvas.height = preview.height;
//         context.drawImage(preview, 0, 0);

//         startX = canvas.width / 2;
//         startY = canvas.height / 2;
//         endX = startX + 100;
//         endY = startY + 100;
//         isDrawing = true;

//         animateLine();
//     }
// }

// function animateLine() {
//     if (!isDrawing) return;

//     context.clearRect(0, 0, canvas.width, canvas.height);
//     context.drawImage(preview, 0, 0);

//     context.beginPath();
//     context.moveTo(startX, startY);
//     context.lineTo(endX, endY);
//     context.strokeStyle = lineColor;
//     context.lineWidth = lineWidth;
//     context.stroke();

//     // 修改線條的座標，這裡使用固定的速度
//     startX += 1;
//     endX += 1;

//     requestAnimationFrame(animateLine);
// }

// 將包含線條的 Canvas 元素轉換為圖片並顯示
// preview.onload = function () {
//     preview.src = canvas.toDataURL();
// };
