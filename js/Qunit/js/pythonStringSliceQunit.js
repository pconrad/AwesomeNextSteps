
function pythonStringSliceQuestion(randomStream, params) {
    var nameArray = ["Malibu", "Ventura", "Goleta", "Lompoc", "Oxnard", "Montecido", "IslaVista", "Morpark", "SanLuisObispo", "AvilaBeach", "PismoBeach" ];//cannot have repeat letters, or sandwich repeats (axa, cxc, etc.)
    this.name = nameArray[randomStream.nextIntRange(nameArray.length)];
    this.index = 0;
    this.increment = 0;
    //Array of {String, bool} pairs: string and a flag indicating whether or not it is the correct answer.
    this.answerChoices= new Array(4);
    this.difficulty=params.difficulty;

if(this.difficulty == "easy" || this.difficulty == "medium") {
    if(this.difficulty =="easy") {//single index
        this.index=randomStream.nextIntRange(this.name.length + 2) - 1;//index chosen in closed interval [-1,name.length]
        this.index1= this.index;
        this.index2= this.index;
    }
    else if(this.difficulty == "medium") {// two indices
        this.index2 = randomStream.nextIntRange(this.name.length) + 1;//second index (index2) chosen in closed interval [1,name.length]
        this.index1 = randomStream.nextIntRange(this.index2);//first index (index1) chosen in closed interval [0, this.index2 - 1]
    }

    if (this.index === 0) {//multiple indices OR single index is 0
        if (this.index1 === 0 && this.index2 === this.name.length) {
            this.correct = this.name;
            this.distract1 = this.name.substring(1, this.name.length);
            this.distract2 = this.name.substring(0, this.name.length - 1);
            this.distract3 = this.name.substring(1, this.name.length - 1);
        } else if (this.index1 === 0 && this.index2 === 1) {
            this.correct = this.name[0];
            this.distract1 = this.name[1];
            this.distract2 = " ";
            this.distract3 = this.name.substring(0, 2);
        }  else if (this.index1 === 0 && this.index2 === 2) {
            this.correct = this.name.substring(0, 2);
            this.distract1 = this.name[0];
            this.distract2 = this.name[1];
            this.distract3 = this.name.substring(0, 3);
        } else if (this.index1 === this.name.length-1 && this.index2 === this.name.length) {
            this.correct = this.name[this.name.length - 1];
            this.distract1 = this.name.substring(this.name.length - 2, this.name.length); 
            this.distract2 = " ";             
            this.distract3 = this.name[this.name.length - 2];
        } else if (this.index1+1 === this.index2) {
            this.correct = this.name.substring(this.index1, this.index2);
            this.distract1 = this.name.substring(this.index1, this.index2 + 1);
            this.distract2 = this.name.substring(this.index1 - 1, this.index2);
            this.distract3 = " ";
        } else if (this.index1 === 0 && this.index2 === 0) {//single index is 0
            this.correct = this.name[0];
            this.distract1 = this.name[1];
            this.distract2 = this.name.substring(0,2);
            this.distract3 = " ";
        } else if (this.index1 === 0) {
            this.correct = this.name.substring(0, this.index2);
            this.distract1 = this.name.substring(1, this.index2 + 1);
            this.distract2 = this.name.substring(0, this.index2-1);
            this.distract3 = this.name.substring(1, this.index2-1);
        } else if(this.index2 === this.name.length) {
            this.correct = this.name.substring(this.index1, this.name.length);
            this.distract1 = this.name.substring(this.index1, this.name.length-1);
            this.distract2 = this.name.substring(this.index1 - 1, this.name.length);
            this.distract3 = this.name.substring(this.index1 - 1, this.name.length-1);
        } else {
            this.correct = this.name.substring(this.index1, this.index2);
            this.distract1 = this.name.substring(this.index1, this.index2 + 1);
            this.distract2 = this.name.substring(this.index1 - 1, this.index2);
            this.distract3 = this.name.substring(this.index1 - 1, this.index2 + 1);
        } 
    } else {//single index but index is not 0
        if(this.index === this.name.length) {
            this.correct = "IndexError: string index out of range";
            this.distract1 = this.name[this.index-1];
            this.distract2 = " ";
            this.distract3 = this.name[0];
        } else if (this.index === 0) {
            this.correct = this.name[0];
            this.distract1 = this.name[1];
            this.distract2 = this.name.substring(0, 2);
            this.distract3 = " ";
        } else if (this.index === this.name.length - 1) {
            this.correct = this.name[this.name.length - 1];
            this.distract1 = this.name[this.name.length - 2];
            this.distract2 = this.name.substring(this.name.length - 2, this.name.length);
            this.distract3 = " ";
        } else if (this.index == -1) {
            this.correct = this.name[this.name.length-1];
            this.distract1 = this.name[this.name.length-2];
            this.distract2 = this.name[0];
            this.distract3 = this.name.substring(0,this.name.length-1);
        } else {
            this.correct = this.name[this.index];
            this.distract1 = this.name[this.index - 1];
            this.distract2 = this.name[this.index + 1];
            this.distract3 = this.name.substring(this.index, this.name.length);
        }
    }
}
else if(this.difficulty == "hard") {//multiple indices with increment
    this.index2 = randomStream.nextIntRange(this.name.length) + 1;
    this.index1 = randomStream.nextIntRange(this.index2);
    this.increment = randomStream.nextIntRange(this.name.length - 1) + 1;
    if(this.index1 === 0 && this.index2 === this.name.length) {
        this.correct = subString(this.name, 0, this.index2, this.increment);
        this.distract1 = subString(this.name, 1, this.index2, this.increment);
        this.distract2 = subString(this.name, this.increment + 1, this.index2, this.increment);
        this.distract3 = subString(this.name, 0, this.index2, this.increment+1);
    }
    else if (this.index1 === 0 && this.index2 === 1) {
        this.correct = this.name[0];
        this.distract1 = subString(this.name, 0, this.name.length, this.increment);
        this.distract2 = this.name.substring(0,this.name.length-1);
        this.distract3 = subString(this.name, 1, this.name.length, this.increment);
    }
    else if (this.index1 === 0 && this.index2 === 2) {
        this.correct = subString(this.name, 0, 2, this.increment);
        this.distract1 = subString(this.name, 0, this.name.length, this.increment);
        this.distract2 = subString(this.name, 1, this.name.length, this.increment);
        this.distract3 = this.name[2];
    }
    else if (this.index1 === this.name.length-1 && this.index2 === this.name.length) {
        this.correct = this.name[this.index1];
        this.distract1 = subString(this.name, 0, this.name.length, this.increment);
        this.distract2 = this.name.substring(this.name.length-2, this.name.length);
        this.distract3 = " ";
    }    
    else if (this.index2 === this.index1 +1) {
        this.correct = this.name[this.index1];
        this.distract1 = this.name.substring(this.index1, this.index1+2);
        this.distract2 = subString(this.name, this.index1, this.name.length, 2);
        this.distract3 = " ";
    }
    else if (this.index1 === 0) {
        this.correct = subString(this.name, 0, this.index2, this.increment);
        this.distract1 = subString(this.name, 1, this.index2, this.increment);
        this.distract2 = this.name.substring(0,this.index2+1);
        this.distract3 = this.name.substring(0, this.index2-1);
    }
    else if (this.index2 === this.name.length) {
        this.correct = subString(this.name, this.index1, this.name.length, this.increment);
        this.distract1 = subString(this.name, this.index1-1, this.name.length, this.increment);
        this.distract2 = subString(this.name, this.index1+1, this.name.length, this.increment);
        this.distract3 = " ";
    }
    else {
        this.correct = subString(this.name, this.index1, this.index2, this.increment);
        this.distract1 = subString(this.name, this.index1-1, this.index2, this.increment);
        this.distract2 = subString(this.name, this.index1+1, this.index2, this.increment);
        this.distract3 = this.name;
    }
}
else alert("Invalid difficulty");
    this.answerChoices=[ {value: this.correct, flag: true},
                         {value: this.distract1, flag: false},
                         {value: this.distract2, flag: false},
                         {value: this.distract3, flag: false} ];
                
    return this.answerChoices;

}

var subString = function (string, index1, index2, increment) {
    var j, string2 = "";
    for (j = index1; j<index2; j += increment) {
        string2 += string[j];
    }
    return string2;
}
