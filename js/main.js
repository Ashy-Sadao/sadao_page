// document.getElementById("hello_text").textContent="はじめてのJavascript";

var count = 0;
var cells;

// ゲーム盤を読み込む
loadTable();

setInterval(function(){
  // 何回目かを数えるために変数countを1ずつ増やす
  count++;
  // 何回目かを文字にまとめて表示する
  document.getElementById("title").textContent = "さだおのホームページ(" + count + ")";
  // ブロックを落とす
  fallBlocks();
}, 1000);

// ------------------ここから下は関数の宣言部分-----------------------------

// ゲーム盤を変数cellsにまとめる
function loadTable(){
  // 200この要素を持つ配列
  var td_array = document.getElementsByTagName("td");
  cells =[];
  var index = 0;
  for(var row=0; row<20; row++){
    // 配列のそれぞれの要素を配列にする
    cells[row] = [];
    for(var col=0; col<10; col++){
      cells[row][col] = td_array[index];
      index++;
    }
  }
}

// ブロックを落とすプログラムを記述する
function fallBlocks(){
    // 一番下の行のクラスを空にする
    for(var i=0; i<10; i++){
      cells[19][i].className = "";
    }
    // 下から2番目の行から繰り返しクラスを下げて行く
    for(var row=18; row >=0; row--){
      for(var col=0; col < 10; col++){
        if(cells[row][col].className != ""){
          cells[row+1][col].className = cells[row][col].className;
          cells[row][col].className = "";
        }
      }
    }
}