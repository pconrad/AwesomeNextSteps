test( "funcs", 30000, function() {
    var i;
    for(i=0;i<5000;i++) {
    var randomStream = new RandomStream(i);
    var params1={difficulty: "easy"};
    var params2={difficulty: "medium"};
    var params3={difficulty: "hard"};
    var array=pythonStringSliceQuestion(randomStream, params1);
    var pyCorrect=array[0].value;
    var pyAns1=array[1].value;
    var pyAns2=array[2].value;
    var pyAns3=array[3].value;
    notEqual(pyCorrect, pyAns1);
    notEqual(pyCorrect, pyAns2);
    notEqual(pyCorrect, pyAns3);
    notEqual(pyAns1, pyAns2);
    notEqual(pyAns2, pyAns3);
    notEqual(pyAns1, pyAns3);
    }
});
