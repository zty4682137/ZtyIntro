/**
 * Created by zhangtianyang on 2017/6/7.
 */
/**
 *主体算法
 */

var arr = [], boxX, boxY, time, statu = 0, boomNum;

//因为生成dom后要重新绑定事件 所以要集合成方法
function bindEvent(){
    $(".col")
        .off("mousedown")
        .off("mouseup")
        .off("mouseenter")
        .mousedown(function (e) {
            var y = $(this).parent().attr("class").replace(/[^0-9]/ig, "");
            var x = $(this).attr("class").replace(/[^0-9]/ig, "");

            //左键按下
            if (e.button == 0) {
                $(".col").removeClass("Mdown");
                $(this).addClass("Mdown");
                $(".col")
                    .on("mouseenter", function () {
                        $(".col").removeClass("Mdown");
                        $(this).addClass("Mdown");
                    })
            }
            //右键
            else if(e.button == 2){
                shockDown(x,y);
                $(".col")
                    .on("mouseenter", function () {
                        y = $(this).parent().attr("class").replace(/[^0-9]/ig, "");
                        x = $(this).attr("class").replace(/[^0-9]/ig, "");
                        shockDown(x,y);
                    })
            }
        })
        .mouseup(function (e) {
            $(".col").removeClass("Mdown");
            $(".col").off("mouseenter");

            var y = $(this).parent().attr("class").replace(/[^0-9]/ig, "");
            var x = $(this).attr("class").replace(/[^0-9]/ig, "");
            if (e.button == 0) {
                activeOne(x, y);
            }
            else if (e.button == 2) {
                flag(x, y);
                shock(x, y);
            }
        });
}
//开始方法
function start() {
    boomNum = $("#bombNum").val();
    boxX= $("#Xarc").val();
    boxY= $("#Yarc").val();
    //判断格子
    if (boxX && boxY) {

    }
    else if((!boxX)&&(!boxY)){
        boxX=20;
        boxY=10;
    }
    else{
        alert("宽高请输入完整");
        return
    }
    //判断雷数
    if (boomNum == "") {
        boomNum = Math.floor(boxX * boxY * .15);
    }
    else if (boomNum < 0) {
        alert("你在逗我");
        return
    }
    else if (boomNum >= boxX * boxY) {
        alert("地雷数量不能超过" + (boxX * boxY-1) + "个");
        return
    }
    //生成格子
    createPlayground(boxX,boxY);
    //重新绑定事件
    bindEvent();
    //判断游戏状态并开始
    if (statu == 0) {
        $(".modal").css("display", "none");
        initGame();
        clearDraw();
        statu = 1;
        $(".startBtn").html("重新开始");
    }
    else if (statu == 1) {
        initGame();
        clearDraw();
        statu = 1;
        $(".startBtn").html("重新开始");
    }
}
//生成面板
function createPlayground(X,Y){
    $(".container").children(".row").remove();
    for(var i=0;i<Y;i++){
        var row=$('<div class="row r'+i+'"></div>');
        for(var j=0;j<X;j++){
            var col='<div class="col c'+j+'"></div>';
            row.append(col);
        }
        $(".container").width(X*42+"px").append(row);
    }
}
//随机数
function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
//初始化游戏
function initGame() {
    for (var i = 0; i < boxY; i++) {
        arr[i] = [];
        for (var j = 0; j < boxX; j++) {
            arr[i][j] = "";
        }
    }
    for (var k = 0; k < boomNum; k++) {
        createABoob();
    }
//        console.log(arr);
}
//创建炸弹
function createABoob() {
    var x = randomNum(0, boxX);
    var y = randomNum(0, boxY);
    if (arr[y][x] == 1) {
        createABoob();
    }
    else {
        arr[y][x] = 1;
    }
}
//画出所有格子信息
function draw() {
    for (var i = 0; i < boxY; i++) {
        for (var j = 0; j < boxX; j++) {
            if (arr[i][j] == 1) {
                $(".r" + i + " .c" + j).html('<img class="bomb" src="img/boob.png" alt=""/>');
            }
            else if (arr[i][j] == 4) {
                $(".r" + i + " .c" + j).html('<img class="succflag" src="img/success.png" alt=""/>');
            }
            else if (arr[i][j] == 3) {
                $(".r" + i + " .c" + j).html('<img class="wrong" src="img/wrong.png" alt=""/>');
            }
        }
    }
}
//遍历周围格子此功能返回[0]是数组坐标[1]是数组值
function round(x,y){
    x = Number(x);
    y = Number(y);
    var proX = x - 1, nextX = x + 1, proY = y - 1, nextY = y + 1;
    var
        arc1 = [proX, proY],
        arc2 = [x, proY],
        arc3 = [nextX, proY],
        arc4 = [proX, y],
        arc5 = [nextX, y],
        arc6 = [proX, nextY],
        arc7 = [x, nextY],
        arc8 = [nextX, nextY];
    var cellArcArr = [], cellArr = [];

    for (var k = 1; k <= 8; k++) {
        var arc = eval("arc" + k);
        if (ifExsist(arc[0], arc[1])) {
            cellArcArr.push(arc);
            cellArr.push(arr[arc[1]][arc[0]]);
        }
    }
    return([cellArcArr,cellArr]);
}
//触发一格
function activeOne(x, y) {
    x = Number(x);
    y = Number(y);

    var proX = x - 1, nextX = x + 1, proY = y - 1, nextY = y + 1;
    if (arr[y][x] == 1) {
        gameOver();
    }
    else if (arr[y][x] == 4 || arr[y][x] == 2 || arr[y][x] == 3) {
        return
    }
    else if (arr[y][x] == "") {
        $(".r" + y + " .c" + x).addClass("down");
        arr[y][x] = 2;
        var howMany = 0;
        var cellArr=round(x,y)[1];
        var cellArcArr=round(x,y)[0];
        for (var i = 0; i < cellArr.length; i++) {
            if (cellArr[i] == 1 ||cellArr[i] == 4) {
                howMany += 1;
            }
        }
//            console.log(cellArcArr);
        //雷数量
        if (howMany == 0) {
            for (var j = 0; j < cellArr.length; j++) {
                activeOne(cellArcArr[j][0], cellArcArr[j][1])
            }
        }
        else {
            $(".r" + y + " .c" + x).html(howMany);
        }
        if (ifSucc()) {
            success()
        }
    }
}
//判断是否有格
function ifExsist(x, y) {
    if (y < 0 || y >= boxY) {
        return false
    }
    else {
        if (x < 0 || x >= boxX) {
            return false
        }
        else {
            return true
        }
    }
}
//清空画面
function clearDraw() {
    $(".col").removeClass("down").html("");
}
//插旗子
function flag(x, y) {
    //2是已被选中
    if (arr[y][x] == 2) {
        return
    }
    //""是空 3是旗子空
    else if (arr[y][x] == "") {
        $(".r" + y + " .c" + x).html('<img class="flag" src="img/flag.png" alt=""/>');
        arr[y][x] = 3;
    }
    else if (arr[y][x] == 3) {
        $(".r" + y + " .c" + x).html("");
        arr[y][x] = "";
    }
    //1是雷 4是旗子雷
    else if (arr[y][x] == 1) {
        $(".r" + y + " .c" + x).html('<img class="flag" src="img/flag.png" alt=""/>');
        arr[y][x] = 4;
    }
    else if (arr[y][x] == 4) {
        $(".r" + y + " .c" + x).html("");
        arr[y][x] = 1;
    }
}
//游戏结束
function gameOver() {
    statu = 0;
    $(".startBtn").html("开始");
    alert("GameOver!!!!!");
    draw();
    $(".modal").css("display", "block");
}
//支付接口尝试
function pay() {
    if (statu == 0) {
        alert("还没开始游戏 别急着付钱")
    }
    else if(statu==1){
        show();
    }
}
//支付成功
function payFinish() {
    closeModal();
    draw();
}
//打开模态框
function show() {
    $(".modalBg").css("display", "block");
}
//关闭模态框
function closeModal() {
    console.log(1);
    $(".modalBg").css("display", "none");
}
//判断是否成功
function ifSucc(){
    for (var i = 0; i < boxY; i++) {
        for (var j = 0; j < boxX; j++) {
            if (arr[i][j] == "" || arr[i][j] == undefined||arr[i][j] == 3) {
                return false
            }
        }
    }
    return true
}
//赢得比赛
function success(){
    statu = 0;
//        alert("你赢了！！！！！！");
    $(".modal").css("display","block");
    $(".startBtn").html("开始");
    $(".succCtn").css("display","block");
    var time=setTimeout(function(){
        $(".succCtn").css("display","none");
    },5000)
}
//震抬起
function shock(x,y){
    //当空旗数等于雷数时 再判断有没有1（没插旗的雷）有就死 没有就打开
    var flagNum=0,bombNum=0;
    if (arr[y][x] == 2) {
        var roundArr=round(x,y);
        for(var i=0;i<roundArr[1].length;i++){
            if (roundArr[1][i] == 1) {
                bombNum+=1;
            }
            if (roundArr[1][i] == 3) {
                flagNum+=1;
            }
        }
        if (flagNum == bombNum) {
            if(bombNum>0){
                gameOver()
            }
            else{
                for (var j = 0; j < round(x,y)[0].length; j++) {
                    activeOne(round(x,y)[0][j][0], round(x,y)[0][j][1])
                }
            }
        }
        else{
            return
        }
    }
    else{
        return
    }
}
//震按下
function shockDown(x,y){
    $(".col").removeClass("Mdown");
    if (arr[y][x] == 2) {
        var roundArr=round(x, y);
        for(var i=0;i<roundArr[1].length;i++){
            if (roundArr[1][i] == "" || roundArr[1][i] == 1) {
                var cx=roundArr[0][i][0];
                var cy=roundArr[0][i][1];
                $(".r" + cy + " .c" + cx).addClass("Mdown");
            }
        }
    }
}
