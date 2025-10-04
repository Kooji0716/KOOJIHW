// 取得所有商品列（對應 .row.item）
const rows = Array.from(document.querySelectorAll('.row.item'));
const checkAll = document.getElementById('checkAll');
const grandEl = document.getElementById('grand') || document.querySelector('.row.total > div:last-child');

// 小工具：把 $1,234 轉數字
const toNumber = (s) => parseInt(String(s).replace(/[^\d]/g, ''), 10) || 0;

// 限制數量在 1..stock，並回填到 input
function clampQty(row) {
  const stock = parseInt(row.dataset.stock, 10);
  const input = row.querySelector('.qty');
  let q = parseInt(input.value, 10);
  if (isNaN(q) || q < 1) q = 1;
  if (q > stock) q = stock;
  input.value = q;
  return q;
}

// 依勾選與數量更新該列小計
function updateRow(row) {
  const checked = row.querySelector('.item-check')?.checked;
  const price = parseInt(row.dataset.price, 10);
  const qty = clampQty(row);
  const sub = price * qty;
  row.querySelector('.sub').textContent = `$${sub.toLocaleString()}`;
  updateTotal();
}

// 重算總金額
function updateTotal() {
  let sum = 0;
  rows.forEach(row => {
    const checked = row.querySelector('.item-check').checked;
    if (!checked) return;                     // 只算有勾選的
    const price = parseInt(row.dataset.price, 10);
    const qty   = parseInt(row.querySelector('.qty').value, 10) || 1;
    sum += price * qty;
  });
  if (grandEl) grandEl.textContent = `$${sum.toLocaleString()}`;

  const btn = document.querySelector('.checkout');
  if (btn) btn.disabled = (sum <= 0);         // 總金額 0 時停用結帳（可選）
}


// 同步全選勾勾（只要有任何一列沒勾，全選就取消）
function syncCheckAll() {
  const allChecked = rows.every(row => row.querySelector('.item-check').checked);
  if (checkAll) checkAll.checked = allChecked;
}

// 綁定每一列的事件
rows.forEach(row => {
  const decBtn = row.querySelector('.dec');
  const incBtn = row.querySelector('.inc');
  const qtyInp = row.querySelector('.qty');
  const chk    = row.querySelector('.item-check');

  if (decBtn) decBtn.addEventListener('click', () => { qtyInp.value = clampQty(row) - 1; updateRow(row); });
  if (incBtn) incBtn.addEventListener('click', () => { qtyInp.value = clampQty(row) + 1; updateRow(row); });
  if (qtyInp) {
    qtyInp.addEventListener('blur',  () => updateRow(row));
    qtyInp.addEventListener('input', () => updateRow(row)); // 即時校正
  }
  if (chk)   chk.addEventListener('change', () => { updateRow(row); syncCheckAll(); });

  // 載入時先算一次
  updateRow(row);
});

// 全選 / 全不選
if (checkAll) {
  checkAll.addEventListener('change', () => {
    rows.forEach(row => {
      const chk = row.querySelector('.item-check');
      if (chk) chk.checked = checkAll.checked;
      updateRow(row);
    });
  });
}

// ========= 結帳 =========
const checkoutBtn = document.querySelector('.checkout');
if (checkoutBtn) checkoutBtn.addEventListener('click', checkout);

function checkout() {
  // 只計入有勾選的商品
  let total = 0;
  const lines = [];

  rows.forEach(row => {
    const chk = row.querySelector('.item-check');
    if (!chk || !chk.checked) return;

    const name  = row.children[1].textContent.trim(); // 第二欄是商品名稱
    const price = parseInt(row.dataset.price, 10);
    const qty   = clampQty(row);
    const sub   = price * qty;

    total += sub;
    lines.push(`${name} x ${qty} = $${sub.toLocaleString()}`);
  });

  if (total <= 0) {
    alert('請先勾選商品並設定數量。');
    return;
  }

  lines.push('--------------------');
  lines.push(`總金額 = $${total.toLocaleString()}`);
  alert(lines.join('\n'));

  // 扣庫存 + 重置狀態（只處理有勾選的列）
  rows.forEach(row => {
    const chk = row.querySelector('.item-check');
    if (!chk || !chk.checked) return;

    // 扣庫存（不小於 0）
    const qty = clampQty(row);
    let stock = parseInt(row.dataset.stock, 10);
    stock = Math.max(0, stock - qty);
    row.dataset.stock = String(stock);
    row.querySelector('.stock').textContent = stock;

    // 清狀態：取消勾選、數量回 1、小計改成「單價 × 1」
    chk.checked = false;
    const qtyInp = row.querySelector('.qty');
    qtyInp.value = 1;

    const price = parseInt(row.dataset.price, 10);
    row.querySelector('.sub').textContent = `$${(price * 1).toLocaleString()}`;
  });

  // 全選取消 & 重新計總金額（只會加總已勾選的，現在應為 0）
  if (checkAll) checkAll.checked = false;
  updateTotal();
}

