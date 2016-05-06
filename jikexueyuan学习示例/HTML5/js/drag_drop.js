window.onload = function() {
    var testBox = document.getElementById("testBox"),
    testBox2 = document.getElementById("testBox2"),
    imgContainer = document.getElementById("imgContainer"),
    testImg = document.getElementById("testImg");

    // testBox.ondragenter = function(e) {
    //     showProp(e);
    // };

    testBox.ondragover = function(e) {
        e.preventDefault();
    };
    testBox2.ondragover = function(e) {
        e.preventDefault();
    };

    testImg.ondragstart = function(e) {
        e.dataTransfer.setData("imgId", "testImg");
    };
    testBox.ondrop = function(e) {
        dropImgHandler(e);
    };
    testBox2.ondrop = function(e) {
        dropImgHandler(e);
    };

    imgContainer.ondragover = function(e) {
        e.preventDefault();
    };
    imgContainer.ondrop = function(e) {
        e.preventDefault();

        var file = e.dataTransfer.files[0],
        fileReader = new FileReader();

        fileReader.onload = function(e) {
            imgContainer.innerHTML = "<img src=\"" + fileReader.result + "\">"
        }
        fileReader.readAsDataURL(file);
    };
}

function dropImgHandler(e) {
    showProp(e.dataTransfer);
    e.preventDefault();

    var img = document.getElementById(e.dataTransfer.getData("imgId"));
    e.target.appendChild(img);
}

function showProp(obj) {
    var infoBox = document.getElementById("info"),
    str = "";

    for (var prop in obj) {
        str += prop + ":" + obj[prop] + "<br />";
    }

    infoBox.innerHTML = str;
}