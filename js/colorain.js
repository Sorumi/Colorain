/**
 * Created by Sorumi on 16/12/30.
 */

window.onload = function () {
    addColors();
}

var rainButton;

function addColors() {

    var rainDiv = document.getElementById('rain-div');
    if (rainButton != null) {
        rainButton.destroy();
    }

    rainDiv.innerHTML = "";

    var colorsArray = _.sample(allColors, 3);

    for (var index1 in colorsArray) {
        var colors = colorsArray[index1];

        var svg = document.createElement('div');
        svg.className = "rains rains-" + index1;
        //$(svg).css('top', index1 * 200 +  'px');

        for (var index2 in colors) {

            var pos = index2;
            //if (colors.length < 5) {
            //pos++;
            //}

            svg.innerHTML += '<svg data-clipboard-text="#' + colors[index2] + '" width="40px" height="57px" viewBox=" 0 0 40 57" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="rain-' + index1 + '-' + index2 + '" class="animated fadeInDown rain rain-' + pos + '">' +
                ' <path fill="#' + colors[index2] + '" d="M20,57 C31.045695,57 40,48.045695 40,37 C40,25.954305 31.045695,17 20,0 C8.954305,17 0,25.954305 0,37 C0,48.045695 8.954305,57 20,57 Z" ></path>' +
                '</svg>';
        }


        $(svg).append('<span class="hex-string">Haskel</span>');
        rainDiv.appendChild(svg);
        //console.log(colors);
    }

    $('.rain').qtip({
        content: {
            text: 'Copied!'
        },
        show: {
            event: 'click'
        },
        position: {
            my: 'right top', at: 'center left'
        },
        style: {
            classes: 'qtip-mint qtip-rounded'
        }
    })

    rainButton = new Clipboard('.rain');


    $('.rain').mouseenter(function (event) {
        //console.log($(svg.currentTarget).nextAll().filter('.hex-string'));
        var string = $(event.currentTarget).find('path').attr('fill');
        //console.log(string);
        var hexString = $(event.currentTarget).nextAll().filter('.hex-string');
        hexString.text(string);
        hexString.fadeIn(300);


    })
    $('.rain').mouseleave(function (event) {
        //console.log($(svg.currentTarget).nextAll().filter('.hex-string'));
        var svg = $(event.currentTarget);
        var hexString = svg.nextAll().filter('.hex-string');

        var next = svg.parent().children('svg');

        var mouseX = 0;
        var mouseY = 0;
        var show = false;

        for (var i=0; i<next.length; i++) {
            var node = $(next[i]);

            mouseX = (event.pageX - node.offset().left);
            mouseY = (event.pageY - node.offset().top);
            //console.log("next: " + mouseX + " " + mouseY);

            if ((mouseX > 0 && mouseX < 40 && mouseY > 0 && mouseY < 57)) {
                show = true;
                break;
            }
        }

        if (!show) {
            hexString.fadeOut(300);
        }

    })
}