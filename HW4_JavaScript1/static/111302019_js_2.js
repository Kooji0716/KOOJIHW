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

// evaluateScreen()：計算輸入框裡的算式
function evaluateScreen(){
    let expr = document.getElementById("screen").value; // 讀取輸入框的字串
    try{
        let ans = eval(expr);   // 用 eval() 計算算式
        alert(expr + " = " + ans);  // 顯示算式與答案
        document.getElementById("screen").value = ans;  // 把輸入框換成答案
    }catch(e){
        alert("算式錯誤!"); // 如果算式格式錯誤，顯示提示訊息
    }
}
//建立一個陣列 
let nums = [0,1,2,3,4,5,6,7,8,9];

// 用 for 迴圈把 0–9 的按鈕依序寫出來
for (let i=0; i<nums.length; i++){
    if (i % 3 === 0) document.write("<br>");    // 每 3 個數字換行（i=0,3,6 時會先寫一個 <br>）
    
    //建立數字按鈕
    document.write(
    "<button onclick='appendToScreen(" + nums[i] + ")' style='width:80px;height:87px;margin:8px;'>" 
    + nums[i] + "</button>"
  );
}

// 建立運算子陣列(加、減、乘、除、左括號、右括號)
let duck = ["+","-","*","/","(",")"];

// 用 for 迴圈把運算子按鈕依序寫出來
for (let i=0; i<duck.length; i++){
  // 每個按鈕的 onclick：呼叫 appendToScreen("符號")
  // 注意：字串要加跳脫字元 \" 才能正確顯示
  document.write(
    "<button onclick='appendToScreen(\"" + duck[i] + "\")' style='width:80px;height:47px;margin:4px;'>"
    + duck[i] + "</button>"
  );
}

// 等號按鈕
document.write(`
    <button onclick='evaluateScreen()' style='width:60px;height:40px;margin:2px;'>
    =
    </button>
    `);