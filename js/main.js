var count = 0;
var cells;

// ブロックのパターン
var blocks = {
  i: {
    class: "i",
    pattern: [[1, 1, 1, 1]],
  },
  o: {
    class: "o",
    pattern: [
      [1, 1],
      [1, 1],
    ],
  },
  t: {
    class: "t",
    pattern: [
      [0, 1, 0],
      [1, 1, 1],
    ],
  },
  s: {
    class: "s",
    pattern: [
      [0, 1, 1],
      [1, 1, 0],
    ],
  },
  z: {
    class: "z",
    pattern: [
      [1, 1, 0],
      [0, 1, 1],
    ],
  },
  j: {
    class: "j",
    pattern: [
      [1, 0, 0],
      [1, 1, 1],
    ],
  },
  l: {
    class: "l",
    pattern: [
      [0, 0, 1],
      [1, 1, 1],
    ],
  },
};

// ゲーム盤を読み込む
loadTable();

setInterval(function () {
  // 何回目かを数えるために変数countを1ずつ増やす
  count++;
  // 何回目かを文字にまとめて表示する
  document.getElementById("title").textContent =
    "さだおのホームページ【テトリス】(" + count + ")";
  // 落下中のブロックがあるか確認する
  if (hasFallingBlock()) {
    // あればブロックを落とす
    fallBlocks();
  } else {
    // なければそろっている行を消す
    deleteRow();
    // ランダムにブロックを作成する
    generateBlock();
  }
}, 100);

// ------------------ここから下は関数の宣言部分-----------------------------

// ゲーム盤を変数cellsにまとめる
function loadTable() {
  // 200この要素を持つ配列
  var td_array = document.getElementsByTagName("td");
  cells = [];
  var index = 0;
  for (var row = 0; row < 20; row++) {
    // 配列のそれぞれの要素を配列にする
    cells[row] = [];
    for (var col = 0; col < 10; col++) {
      cells[row][col] = td_array[index];
      index++;
    }
  }
}

// ブロックを落とすプログラムを記述する
function fallBlocks() {
  // 1.底についていないか？
  for (var i = 0; i < 10; i++) {
    if (cells[19][i].blockNum == fallingBlockNum) {
      isFalling = false;
      // 一番下の行にブロックがいるので落とさない
      return;
    }
  }
  // 2.1マス下に別のブロックがないか？
  for (var row = 18; row >= 0; row--) {
    for (var col = 0; col < 10; col++) {
      if (cells[row][col].blockNum == fallingBlockNum) {
        if (
          cells[row + 1][col].className != "" &&
          cells[row + 1][col].blockNum != fallingBlockNum
        ) {
          isFalling = false;
          // 一つ下のマスにブロックがいるので落とさない
          return;
        }
      }
    }
  }
  row = 18;
  col = 0;
  // 下から２番目の行から繰り返しクラスを下げていく
  for (row = 18; row >= 0; row--) {
    for (col = 0; col < 10; col++) {
      if (cells[row][col].blockNum == fallingBlockNum) {
        cells[row + 1][col].className = cells[row][col].className;
        cells[row + 1][col].blockNum = cells[row][col].blockNum;
        cells[row][col].className = "";
        cells[row][col].blockNum = null;
      }
    }
  }
}

var isFalling = false;
// 落下中のブロックがあるか確認する
function hasFallingBlock() {
  return isFalling;
}

// そろっている行を消す
function deleteRow() {
  for (var row = 19; row >= 0; row--) {
    var canDelete = true;
    for (var col = 0; col < 10; col++) {
      if (cells[row][col].className == "") {
        canDelete = false;
      }
    }
    if (canDelete) {
      col = 0;
      // １行消す
      for (col = 0; col < 10; col++) {
        cells[row][col].className = "";
      }
      col = 0;
      // 上の行のブロックをすべて1マス落とす
      for (var downRow = row - 1; downRow >= 0; downRow--) {
        for (col = 0; col < 10; col++) {
          cells[downRow + 1][col].className = cells[downRow][col].className;
          cells[downRow + 1][col].blockNum = cells[downRow][col].blockNum;
          cells[downRow][col].className = "";
          cells[downRow][col].blockNum = null;
        }
      }
    }
  }
}

var fallingBlockNum = 0;
// ランダムにブロックを生成する
function generateBlock() {
  // １.ブロックパターンからランダムに１つパターンを選ぶ
  var Keys = Object.keys(blocks);
  var nextBlockKey = Keys[Math.floor(Math.random() * Keys.length)];
  var nextBlock = blocks[nextBlockKey];
  var nextFallingBlockNum = fallingBlockNum + 1;
  // ２. 選んだパターンをもとにブロックを配置する
  var pattern = nextBlock.pattern;
  for (var row = 0; row < pattern.length; row++) {
    for (var col = 0; col < pattern[row].length; col++) {
      if (pattern[row][col]) {
        cells[row][col + 3].className = nextBlock.class;
        cells[row][col + 3].blockNum = nextFallingBlockNum;
      }
    }
  }
  // 3. 落下中のブロックがあるとする
  isFalling = true;
  fallingBlockNum = nextFallingBlockNum;
}

// ブロックを右に移動させる
function moveRight() {
  // 右のマスに別のブロックがないか？
  for (var row = 0; row < 20; row++) {
    for (var col = 0; col < 10; col++) {
      if (cells[row][col].blockNum == fallingBlockNum) {
        // 右が画面端じゃないか
        if (
          col + 1 > 20 ||
          (cells[row][col + 1].className != "" &&
            cells[row][col + 1].blockNum != fallingBlockNum)
        ) {
          // ブロックが動けない
          return;
        }
      }
    }
  }
  row = 0;
  col = 9;
  for (row = 0; row < 20; row++) {
    for (col = 9; col >= 0; col--) {
      if (cells[row][col].blockNum == fallingBlockNum) {
        cells[row][col + 1].className = cells[row][col].className;
        cells[row][col + 1].blockNum = cells[row][col].blockNum;
        cells[row][col].className = "";
        cells[row][col].blockNum = null;
      }
    }
  }
}

// ブロックを左に移動させる
function moveLeft() {
  // 左のマスに別のブロックがないか？
  for (var row = 0; row < 20; row++) {
    for (var col = 0; col < 10; col++) {
      if (cells[row][col].blockNum == fallingBlockNum) {
        // 左が画面端じゃないか
        if (
          col - 1 < 0 ||
          (cells[row][col - 1].className != "" &&
            cells[row][col - 1].blockNum != fallingBlockNum)
        ) {
          // ブロックが動けない
          return;
        }
      }
    }
  }
  row = 0;
  col = 0;
  for (row = 0; row < 20; row++) {
    for (col = 0; col < 10; col++) {
      if (cells[row][col].blockNum == fallingBlockNum) {
        cells[row][col - 1].className = cells[row][col].className;
        cells[row][col - 1].blockNum = cells[row][col].blockNum;
        cells[row][col].className = "";
        cells[row][col].blockNum = null;
      }
    }
  }
}

// キーボードイベントを監視する
document.addEventListener("keydown", onKeyDown);

// キー入力によってそれぞれの関数を呼び出す
function onKeyDown(event) {
  if (event.keyCode == 37) {
    moveLeft();
  } else if (event.keyCode == 39) {
    moveRight();
  }
}
