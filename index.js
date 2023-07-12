var button_isblue = true;
var canvars = document.getElementById("canvas");
var ctx = canvars.getContext("2d");;
var img_h, img_w;
var is_upload = false;
var line_pos = 0;
var now_cycle = 0, total_cycle;
var speed = 0.001;
var max_speed;
var stop_flag = false;
var start_btn = document.getElementById("start_but");
var preview = document.getElementById("preview");
var img_size_txt = document.getElementById("img_size_txt");
var Line_width_txt = document.getElementById("Line_width_txt");

var line_color = "#F75000";
var line_height = 5;
var image_size = 1;

// image resize
const observer = new ResizeObserver(function (entries) {
    img_w = preview.width;
    img_h = preview.height;
    canvars.width = img_w;
    canvars.height = img_h;
    ctx.clearRect(0, 0, img_w, img_h);
    ctx.fillStyle = line_color;
    ctx.fillRect(0, line_pos, img_w, line_height);
});

observer.observe(preview, {
    box: "border-box",
});

// save (no function now)
// function save() {
//     if (!is_upload) {
//         alert("Please upload the image first.");
//     }
//     else if (!button_isblue) {
//         alert("Please stop operating first.");
//     }
//     else {
//         console.log(`scale(${image_size})`)
//         ctx.clearRect(0, 0, img_w, img_h);
//         ctx.fillStyle = line_color;
//         ctx.fillRect(0, line_pos, img_w, line_height);
//     }
// }

// setting
function change_image_size(size) {
    preview.style.transform = `scale(${size})`;
    canvars.style.transform = `scale(${size})`;
    img_size_txt.textContent = ` x${size}`;
}

function change_color(color) {
    line_color = color;
    ctx.clearRect(0, 0, img_w, img_h);
    ctx.fillStyle = line_color;
    ctx.fillRect(0, line_pos, img_w, line_height);
}

function change_Line_width(width) {
    line_height = width
    Line_width_txt.textContent = ` ${width}px`
    ctx.clearRect(0, 0, img_w, img_h);
    ctx.fillStyle = line_color;
    ctx.fillRect(0, line_pos, img_w, line_height);
}

// function bongo_cat_check(show) {
//     var bongo_cat_btn = document.getElementById("bongo-cat-btn");
//     var bongo_cat = document.getElementById("bongo-cat");
//     if (!show) {
//         bongo_cat_btn.innerText = "show";
//         bongo_cat.style.opacity = 0;
//     }
//     else {
//         bongo_cat_btn.innerText = "hide";
//         bongo_cat.style.opacity = 1;
//     }
// }


// upload image
function handleFiles(files) {
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
        line_pos = Math.random() * img_h;
        // canvars.width = img_w;
        // canvars.height = img_h;
        // ctx = canvars.getContext("2d");
        // ctx.fillStyle = line_color;
        // ctx.fillRect(0, line_pos, img_w, line_height);
    };
    reader.readAsDataURL(file);
}

// draw line
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

    speed = speed_curve();
    line_pos += speed;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = line_color;
    ctx.fillRect(0, line_pos, img_w, line_height);

    if (line_pos > img_h) {
        line_pos -= img_h;
    }

    if (speed <= 0) {
        // alert("finish!")
        control();
        clearInterval(stop_flag);
    }

}

// start btn
function control() {
    element = document.getElementById("start_but");
    if (is_upload) {

        if (button_isblue) {

            button_isblue = false;
            // element.style.outlineColor = "#860d09";
            // element.style.color = "#860d09";
            element.innerHTML = `<span style=" font-size: 20px; color : #FF9797; ">stop</span>`;

            max_speed = Math.random() * img_h * 0.016129 + img_h * 0.024193;
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

