// NEW-QUESTION-TYPE: add to questionFunctions dictionary below

var questionTypes = {
"changeOfBase":          {"f": changeOfBaseQuestion,       title: "Change of Base"},
"orderOfOperations":     {"f": orderOfOperationsQuestion,  title: "Order of Operations"},

"operandsAndOperators":  {"f":operandsAndOperatorsQuestion,
						title: "Operands and Operators", 
				   parameters: {"difficulty": ["easy", "medium", "hard"]}
				   		},

"pythonProgramOutput":   {"f":pythonProgramOutputQuestion, title: "Python Program Output"},
"pythonStringSlice":     {"f":pythonStringSliceQuestion,   title: "Python String Slice"},
"symbolicLogic":         {"f":symbolicLogicQuestion,       title: "Symbolic Logic"},
"CvariableType":         {"f":CvariableTypeQuestion,       title: "C Variable Type"},
"cStrings":              {"f":cStringsQuestion,            title: "C Strings"},
"pyStrings":             {"f":pyStringsQuestion,           title: "Python Strings"}
};


function addOptionForEachQuestionType(e) 
{    
    $.each(questionTypes, function(key, val) {
	    //console.log("key="+key+" val.title=" +val.title);
	    e.append($('<option></option>').val(key).html(val.title));
  
	});
}
    
function addOptionForParameters() {
       
    $('#questionType').change(function () 
    	{
    		var selectedQuestion =$(this).val();
    		var params = questionTypes[selectedQuestion].parameters; 
    		

			if (typeof params == "undefined") 
			{
				$('#difficultyParameter').empty();
	    		$('#difficultyParameter').hide();
				return;
			}
			
    		$('#difficultyParameter').show();
    		for (var param in params)
    		{
	    		for(var value in params[param])
				{
					$('#difficultyParameter').append($('<option></option>').html(params[param][value]));
	     
				};
    		}
		});
}//end of addOptionForParameters()
