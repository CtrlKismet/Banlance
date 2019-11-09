//re-draw the banlance round
function ResetSVG(id) {
    svgStr = document.getElementsByClassName('Rounds')[id].innerHTML = '<circle cx="50%" cy="50%" r="40%" id="round_0_base"/>';
    // console.log(svgStr);
    // document.getElementsByClassName('round')[0].innerHTML = svgStr;
}

//rotate position theta degrees in clockwise
function RotatePosition(position, theta) {
    let cosTheta, sinTheta, nX, nY, offsetX, offsetY;

    cosTheta = Math.cos(theta);
    sinTheta = Math.sin(theta);

    nX = cosTheta * position.X + sinTheta * position.Y;
    nY = cosTheta * position.Y - sinTheta * position.X;

    if (nX === 0) offsetX = '-1em';
    else if (nX < 0) offsetX = '-2em';
    else offsetX = '0';
    if (nY >= 0) offsetY = '0';
    else offsetY = '.5em';

    return {
        X: nX,
        Y: nY,
        Offset: {
            X: offsetX,
            Y: offsetY
        }
    };
}

let home = new Vue({
    el: '#home_page',
    data: {

        inputOpt: 1, //  --- display the input box when equals to 1
        estimateNum: '5', //  --- number of edges in banlance round
        estimateName: '家庭、健康、财富、休闲、学业', //  --- names of every edges in banlance round (connnet with '、' )
        estimateProps: [''], //  --- names of every edges in banlance round (in array)
        estimateScore: [],
        expectedScore: []
    },
    methods: {
        // draw balance round in SVG
        DrawPoly: function (id) {
            // svgStr                                   --- SVG's inner HTML
            // total                                    --- number of edges in banlance round
            let svgStr, total;

            ResetSVG(id);
            svgStr = document.getElementsByClassName('Rounds')[parseInt(id)].innerHTML;
            total = parseInt(this.estimateNum);

            // add all lines into SVG
            for (let num = 0; num < total; num++) {
                svgStr += '<line x1="50%" y1="50%" x2="50%" y2="10%" transform-origin="50% 50%"></line>';
            }
            document.getElementsByClassName('Rounds')[parseInt(id)].innerHTML = svgStr;

            // rotate all lines
            setTimeout(function () {
                for (let num = 0; num < total; num++) {
                    $('#round_0 line')[num].style = 'transition-duration:' + num * (2 / total) + 's;transform:rotate(' + num * (360 / total) + 'deg)';
                }
            }, 1);
        },
        // add balance round's property into SVG
        DrawText: function (id) {
            // (position.X, position.Y)                 --- position of current text
            // {position.Offset.X, position.Offset.Y}   --- text's offset of current position
            // (oX, oY)                                 --- the original point in SVG
            // theta                                    --- the rotate theta of lines
            // svgStr                                   --- SVG's inner HTML
            let position, oX, oY, theta, svgStr;

            // initializing paramters
            oX = document.getElementById('round_0_base').cx.baseVal.value;
            oY = document.getElementById('round_0_base').cy.baseVal.value;
            position = {
                X: 0,
                Y: oY * .85,
                Offset: {
                    X: '-1em',
                    Y: '0'
                }
            };

            // re-draw the polygon
            this.DrawPoly(id);
            svgStr = document.getElementsByClassName('Rounds')[parseInt(id)].innerHTML;
            theta = 2 * Math.PI / parseInt(this.estimateNum);

            // modify the Vue paramters according to input's estimateName
            // add text to SVG
            let eid = 0;
            this.estimateName.split('、').forEach(element => {
                Vue.set(home.estimateProps, eid, element);

                // draw text in (x, y) and it's offset is (dx,dy)
                svgStr += '<text x="' + (position.X + oX) + '" y="' + (oY - position.Y) + '" dx="' + position.Offset.X + '" dy="' + position.Offset.Y + '" fill="black">' + element + '</text>';

                // rotating position to next
                position = RotatePosition(position, theta);
                eid++;
            });

            // rewriting the SVG
            document.getElementsByClassName('Rounds')[parseInt(id)].innerHTML = svgStr;
            home.inputOpt = 0;

            this.AddMark();
        },
        // add score input UI in bottom
        AddMark: function () {
            let tableStr = '<tr><th></th>';
            for (let index = 0; index < home.estimateProps.length; index++) {
                const prop = home.estimateProps[index];
                tableStr += '<th>' + prop + '</th>';
            }
            tableStr += '</tr><tr><th>自我评估</th>';
            for (let index = 0; index < home.estimateProps.length; index++) {
                tableStr += '<th><input type="text" v-model="estimateScore[' + index + ']" /></th>';
            }
            tableStr += '</tr><tr><th>期望分数</th>';
            for (let index = 0; index < home.estimateProps.length; index++) {
                tableStr += '<th><input type="text" v-model="expectedScore[' + index + ']" /></th>';
            }
            document.getElementById('table_mark').innerHTML = tableStr + '</tr>';
        }
    }
});

// 家庭、健康、财富、休闲、学业