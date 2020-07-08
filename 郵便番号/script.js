// button要素を取得し、
//document.getElementById('btn')
//button要素をクリックした際にイベントを実行する。
//.addEventListener('click', function() {});
document.getElementById('btn').addEventListener('click', function() {});

// 郵便番号欄に郵便番号を入れるための変数：getAddName
//getAddNameより郵便番号を渡される引数：$addNum
var getAddName = function($addNum) {
  // Script要素を（body要素の末尾に）生成する。
  var _zipcloudAPI = document.body.appendChild(document.createElement("script"));

  // script要素のsrc属性にリクエストURLを指定する。【①～③】
  // ①ベースとなるURL: http: zipcloud.ibsnet.co.jp/api/search?zipcode=
  // ②zipcodeに入力された郵便番号を指定：$addNum
  // ③callbackに関数名を指定する：&callback=getAddNameByZipcloudAPI
  _zipcloudAPI.src = "http://zipcloud.ibsnet.co.jp/api/search?zipcode=" + $addNum + "&callback=getAddNameByZipcloudAPI";

  // body要素のscript要素を削除する。
  document.body.removeChild(_zipcloudAPI);
};

// callbackに指定された関数名= getAddNameByZipcloudAPI
var getAddNameByZipcloudAPI = function($getAdd) {
  var _addFormatted1 = ""; // 都道府県の変数名：_addFormatted1
  if ($getAdd.status == 200) { //通信が成功した場合
    _addFormatted1 += $getAdd.results[0].address1; //変数＝(_addFormatted1)に都道府県名を入れる
    document.getElementById("add_prefecture").value = _addFormatted1; // 都道府県の欄に都道府県名を表示する
  } else {
    alert('該当するデーターが見つかりませんでした');
  }

  var _addFormatted2 = ""; // 市町村の変数名：_addFormatted2
  if ($getAdd.status == 200) { //通信が成功した場合
    _addFormatted2 += $getAdd.results[0].address2; //変数＝(_addFormatted2)に市町村名を入れる
    document.getElementById("add_city").value = _addFormatted2; // 市区町村の欄に市町村名を表示する
  }

  var _addFormatted3 = ""; // 町域の変数名：_addFormatted2
  if ($getAdd.status == 200) { //通信が成功した場合
    _addFormatted3 += $getAdd.results[0].address3; //変数＝(_addFormatted3)に町域名を入れる
    document.getElementById("add_address").value = _addFormatted3; // 住所の欄に町域名を表示する
  }
}