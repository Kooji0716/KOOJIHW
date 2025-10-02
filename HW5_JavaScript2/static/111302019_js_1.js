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

  // 4) 比大小 → 把提示寫到頁面
  if (guess > answer) {
    document.getElementById('msg').innerHTML = '太大了，請再試一次。';
  } else if (guess < answer) {
    document.getElementById('msg').innerHTML = '太小了，請再試一次。';
  } else {
    // 5) 猜中！
    stopTimer(); // 停止計時

    alert('恭喜你猜對了！共猜了 ' + count + ' 次，耗時 ' + seconds + ' 秒。');

    // 在歷程區新增一筆紀錄
    var row = document.createElement('div');
    row.textContent = new Date().toLocaleTimeString() + '｜猜了 ' + count + ' 次｜耗時 ' + seconds + ' 秒';
    document.getElementById('log').appendChild(row);

    // 6) 重置遊戲（新題目、歸零、清畫面）
    answer = Math.floor(Math.random() * 101);
    count = 0;
    seconds = 0;
    document.getElementById('timer').textContent = '0';
    document.getElementById('msg').innerHTML = '已出新題目，繼續挑戰！';
    document.getElementById('input_1').value = '';
  }
}

