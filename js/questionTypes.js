// NEW-QUESTION-TYPE: add to questionFunctions dictionary below

//Tried to make this easy to read...
var questionTypes = 
{
    "changeOfBase":          
    {                          
        "f": changeOfBaseQuestion,       
        title: "Change of Base"
    },
    
    "orderOfOperations":     
    {
        "f": orderOfOperationsQuestion,  
        title: "Order of Operations"
    },
    
    "operandsAndOperators":  
    {
        "f":operandsAndOperatorsQuestion,
        title: "Operands and Operators", 
        parameters: 
        {
            "difficulty": ["easy", "medium", "hard"]
        }
    },
    
    "pythonProgramOutput":   
    {
        "f":pythonProgramOutputQuestion, 
        title: "Python Program Output"
    },
    
    "pythonStringSlice":     
    {
        "f":pythonStringSliceQuestion,   
        title: "Python String Slice"
    },
    
    "symbolicLogic":         
    {
        "f":symbolicLogicQuestion,       
        title: "Symbolic Logic"   
    },
    
    "CvariableType":         
    {
        "f":CvariableTypeQuestion,       
        title: "C Variable Type"  
    },
    
    "cStrings":              
    {
        "f":cStringsQuestion,            
        title: "C Strings"     
    },
    
    "pyStrings":             
    {
        "f":pyStringsQuestion,           
        title: "Python Strings"   
    }
};//End of questionTypes def


function addOptionForEachQuestionType(e) 
{    
    $.each(questionTypes, function(key, val) 
    {
	    e.append($('<option></option>').val(key).html(val.title));
	});
}
    
function addOptionForParameters() 
{ 
    //When the question type changes...
    $('#questionType').change(function () 
    {
        //Get the selected question, 
        //and take out any parameters
        var selectedQuestion =$(this).val();
    	var params = questionTypes[selectedQuestion].parameters; 
    	
        //If there aren't any parameters, 
        //clear out the parametersDiv and quit this function
		if (typeof params == "undefined") 
		{
		    document.getElementById("parametersDiv").innerHTML = "";
			return;
		}

		//Cycle through the parameters in the question
		for (var param in params)
		{
		    //Create a select for this parameter's options
            var paramSelect = document.createElement("select");
            
            paramSelect.setAttribute("name", param + "Parameter");
            paramSelect.setAttribute("id", param + "Parameter");
    		document.getElementById("parametersDiv").appendChild(paramSelect);

            //Populate the select with the appropriate parameter options
    		for(var value in params[param])
			{
                $('#' + param + "Parameter").append($('<option></option>').html(params[param][value]));
			
			};
		}//End of param loop
	});//End of change function
}//end of addOptionForParameters()
