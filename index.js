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
var start_btn = document.getElementById("start_but");

var line_color = "#FFCCCC";
var line_height = 5;
var image_size = 1;

function save() {
    if (!is_upload) {
        alert("Please upload the image first.");
    }
    else if (!button_isblue) {
        alert("Please stop operating first.");
    }
    else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = line_color;
        ctx.fillRect(0, line_pos, img_w, line_height);
    }
}

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
        line_pos = Math.random() * img_h;
        canvars = document.getElementById("canvas");
        canvars.width = img_w;
        canvars.height = img_h;
        ctx = canvars.getContext("2d");
        ctx.fillStyle = line_color;
        ctx.fillRect(0, line_pos, img_w, line_height);
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
    now_cycle += 1;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = line_color;
    ctx.fillRect(0, line_pos, img_w, line_height);

    speed = speed_curve();
    line_pos += speed;

    if (line_pos > img_h) {
        line_pos -= img_h;
    }

    if (speed <= 0) {
        // alert("finish!")
        control();
        clearInterval(stop_flag);
    }

}

function control() {
    element = document.getElementById("start_but");
    if (is_upload) {

        if (button_isblue) {

            button_isblue = false;
            // element.style.outlineColor = "#860d09";
            // element.style.color = "#860d09";
            element.innerHTML = `<span style=" font-size: 20px; color : #FF9797; ">stop</span>`;

            max_speed = Math.random() * 10 + 15;
            total_cycle = Math.random() * 200 + 150;
            now_cycle = 0;
            speed = 0.001

            stop_flag = setInterval(draw, 15)


        }
        else if (!button_isblue) {
            button_isblue = true;
            // element.style.outlineColor = "#09203f";
            element.innerHTML = `<span style="font-size: 20px;">start</span>`;

            clearInterval(stop_flag);
        }
    }
    else {
        alert("Please upload the image first.");
    }

}

