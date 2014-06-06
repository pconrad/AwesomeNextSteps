est( "funcs", 30000, function() {
    var i;
    for(i=0;i<5000;i++) {
    var randomStream = new RandomStream(i);
    var params1={difficulty: "easy"};
    var params2={difficulty: "medium"};
    var params3={difficulty: "hard"};
    var array=orderOfOperationsQuestion(randomStream, params1);
    var orderCorrect=array[0].value;
    var orderAns1=array[1].value;
    var orderAns2=array[2].value;
    var orderAns3=array[3].value;
    notEqual(orderCorrect, orderAns1);
    notEqual(orderCorrect, orderAns2);
    notEqual(orderCorrect, orderAns3);
    notEqual(orderAns1, orderAns2);
    notEqual(orderAns2, orderAns3);
    notEqual(orderAns1, orderAns3);
    }
});
