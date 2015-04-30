function print(a, b, c, d) {
  console.log(a + b + c + d);
}

function example(a, b, c, d) {
  //用call方式借用print,参数显式打散传递
  print.call(this, a, b, c, d);
  //用apply方式借用print, 参数作为一个数组传递,
  //这里直接用JavaScript方法内本身有的arguments数组
  print.apply(this, arguments);
  //或者封装成数组
  print.apply(this, [a, b, c, d]);
}

//下面将显示”ABCD”
example('A', 'B', 'C', 'D');

//当参数明确时可用call,
//当参数不明确时可用apply给合arguments
