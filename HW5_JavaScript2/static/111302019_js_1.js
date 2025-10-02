// 產生 0~100 的隨機整數
var answer = Math.floor(Math.random() * 101);  // 0 ≤ answer ≤ 100
var count = 0;                                  // 記錄已猜幾次
var timerId = null;  // 計時器編號（用來停止）
var seconds = 0;     // 已經過幾秒

function startTimerIfNeeded() {
  if (timerId !== null) return;      // 已在計時就不要重複開
  seconds = 0;
  document.getElementById('timer').textContent = seconds;
  timerId = setInterval(function () {
    seconds++;
    document.getElementById('timer').textContent = seconds;
  }, 1000);
}

function stopTimer() {
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }
}


function guessNumber() {
    
// 第一次按「猜」就開始計時
  startTimerIfNeeded();

  // 1) 取得輸入框文字（字串）
  var val = document.getElementById('input_1').value;

  // 2) 轉成十進位整數（字串 → 整數）
  var guess = parseInt(val, 10);

  // 3) 檢查不是數字（NaN）就提示並中止本次函式
  if (isNaN(guess)) { 
    alert('請輸入數字'); 
    return; 
  }

  // 4) 有有效輸入才累計次數
  count++;

    // 5) 和答案比較，分三種情況提示
  if (guess > answer) {
    alert('太大了，請重猜一次');
  } else if (guess < answer) {
    alert('太小了，請重猜一次');
  } else {
    // 6) 猜中：顯示總次數，並重置遊戲（新答案、次數歸零）
    alert('答對！共猜了 ' + count + ' 次');
    answer = Math.floor(Math.random() * 101);  // 重新出題
    count = 0;                                 // 歸零次數
  }
}

