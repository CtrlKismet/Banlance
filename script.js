function ResetSVG(id) {
    svgStr = document.getElementsByClassName('rounds')[id].innerHTML = '<circle cx="250" cy="250" r="248" />';
    // console.log(svgStr);
    // document.getElementsByClassName('round')[0].innerHTML = svgStr;
}

let home = new Vue({
    el: '#homePage',
    data: {
        estimateNum: ''
    },
    methods: {
        drawPoly: function (id) {
            // console.log(document.getElementsByClassName('rounds')[parseInt(id)].in);
            ResetSVG(id);
            svgStr = document.getElementsByClassName('rounds')[parseInt(id)].innerHTML;
            total = parseInt(this.estimateNum);
            for (let num = 0; num < total; num++) {
                svgStr += '<line x1="250" y1="250" x2="250" y2="2" transform-origin="250 250"></line>';
                // console.log(svgStr);
            }
            document.getElementsByClassName('rounds')[parseInt(id)].innerHTML = svgStr;
            setTimeout(function () {
                for (let num = 0; num < total; num++) {
                    $('#round_0 line')[num].style = 'transition-duration:' + num * (2 / total) + 's;transform:rotate(' + num * (360 / total) + 'deg)';
                }
                console.log('done');
            }, 1);
            // svgStr += '<line x1="250" y1="250" x2="250" y2="2" transform-origin="250 250" transform="rotate(30)"></line>';
            // console.log(svgStr);

        }
    }
});