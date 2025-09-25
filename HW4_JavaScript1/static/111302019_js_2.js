document.write("<div style='max-width:500px;margin:20px auto;font-family:Arial;'>");

// 標題
document.write("<h1>尻哭累特</h1>");

// 輸入框
document.write("<input type='text' id='screen' style='width:100%;font-size:20px;margin-bottom:10px;'><br>");


// appendToScreen(txt)：把按下的按鈕文字加進輸入框
function appendToScreen(txt){
    document.getElementById("screen").value += txt;
}

// clearScreen()：clear的涵式，清除內容
function clearScreen(){
    document.getElementById("screen").value = "";
}