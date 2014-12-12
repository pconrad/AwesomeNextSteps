//Parameter randomStream should be an instance of the RandomStream class.
function orderOfOperationsQuestion(randomStream, params) {
    this.difficulty=params.difficulty;
    //Generate the three variables
    this.a = randomStream.nextIntRange(8) + 2;
    while (1) {
        this.b = randomStream.nextIntRange(8) + 2;
        if(this.b != this.a) break;
    }
    while (1) {
        this.c = randomStream.nextIntRange(8) + 2;
        if(this.c != this.a && this.c != this.b) break;
    }
    
    this.ops = {easy: [" + ", " * "], 
                medium: {firstOp: [" + ", " - "], secondOp: [" * ", " / ", " ** "]}, 
                hard: {firstOp: [" * ", " / ", " ** "], secondOp: [" + ", " - "], thirdOp: [" * ", " / ", " ** "]} };

    //easy= + *, medium= any two of ops, hard= any three of ops
    //Calculate the correct answer and the distractor obtained by applying Order of Operations incorrectly
    if (this.difficulty == "easy") {//only + and *
        this.op1 = this.ops.easy[0];
        this.op2 = this.ops.easy[1];
        this.correct = this.a + this.b * this.c;
        this.distract1 = (this.a + this.b) * this.c;
        this.distract2 = this.b * this.c;
        this.distract3 = this.a + this.b;
    }

    else if (this.difficulty == "medium") {//any two of ops in this.ops.medium (one from firstOp, one from secondOp)
        this.op1 = this.ops.medium.firstOp[randomStream.nextIntRange(2)];
        this.op2 = this.ops.medium.secondOp[randomStream.nextIntRange(3)];
        if (this.op2 == " ** ") this.c = randomStream.nextIntRange(2) + 2;//so exponents are not ridiculously high
        if (this.op1 == " + " && this.op2 == " * ") {
            this.correct = this.a + this.b * this.c;
            this.distract1 = (this.a + this.b) * this.c;
            this.distract2 = this.b * this.c;
            this.distract3 = this.a + this.b;
        } else if (this.op1 == " + " && this.op2 == " / ") {
            this.correct = this.a + this.b / this.c;
            this.distract1 = (this.a + this.b) / this.c;
            this.distract2 = this.b / this.c;
            this.distract3 = this.a + this.b;
        } else if (this.op1 == " + " && this.op2 == " ** ") {
            this.correct = this.a + Math.pow(this.b, this.c);
            this.distract1 = Math.pow(this.a + this.b, this.c);
            this.distract2 = Math.pow(this.b, this.c);
            this.distract3 = this.a + this.b;
        } else if (this.op1 == " - " && this.op2 == " * ") {
            this.correct = this.a - this.b * this.c;
	    this.distract1 = (this.a - this.b) * this.c;
	    this.distract2 = this.b * this.c;
	    this.distract3 = this.a - this.b;
        } else if (this.op1 == " - " && this.op2 == " / ") {
            if(this.c * this.a == 2 * this.b)this.c += 1;
            this.correct = this.a - this.b / this.c;
	    this.distract1 = (this.a - this.b) / this.c;
	    this.distract2 = this.b / this.c;
	    this.distract3 = this.a - this.b;
        } else if (this.op1 == " - " && this.op2 == " ** ") {
            this.correct = this.a - Math.pow(this.b, this.c);
	    this.distract1 = Math.pow(this.a - this.b, this.c);
	    this.distract2 = Math.pow(this.b, this.c);
	    this.distract3 = this.a - this.b;
        } else console.log("operations not matching");
    }
    else if (this.difficulty == "hard") {//3 operations chosen in this.ops.hard: one from firstOp, one from secondOp, one from thirdOp
      while(1) {//pick a fourth number since using 3 operations
        this.d = randomStream.nextIntRange(8) + 2;
        if(this.d != this.c && this.d != this.b && this.d != this.a) break;
      }
      this.op1 = this.ops.hard.firstOp[randomStream.nextIntRange(3)];
      this.op2 = this.ops.hard.secondOp[randomStream.nextIntRange(2)];
      this.op3 = this.ops.hard.thirdOp[randomStream.nextIntRange(3)];
      //generate the correct answer first
      //firstTerm and secondTerm are always calulcated separately using this.a,this.b and this.c,this.d respectively
      //Ex: 3*2 + 5/2: firstTerm=3*2, secondTerm=5/2, correct=firstTerm + secondTerm
      //calculate firstTerm
      if(this.op1 == " * ") this.firstTerm = this.a * this.b;
      else if(this.op1 == " / ") this.firstTerm = this.a / this.b;
      else if(this.op1 == " ** ") {
        this.b = randomStream.nextIntRange(2)+2;//to avoid large exponents
        this.firstTerm = Math.pow(this.a,this.b);
      }
      else console.log("first operation not matching");
      //calculate secondTerm
      if(this.op3 == " * ") this.secondTerm = this.c * this.d;
      else if(this.op3 == " / ") this.secondTerm = this.c / this.d;
      else if(this.op3 == " ** ") {
        this.d = randomStream.nextIntRange(2)+2;//to avoid large exponents
        this.secondTerm = Math.pow(this.c,this.d);
      }
      else console.log("third operation not matching");
      //calculate correct answer
      if(this.op2 == " + ") {
        this.correct = this.firstTerm + this.secondTerm;
        this.middleTerm = this.b + this.c;
      }
      else if(this.op2 == " - ") {
        this.correct = this.firstTerm - this.secondTerm;
        this.middleTerm = this.b - this.c;
      }
      else console.log("second operation not matching");
      //use firstTerm and secondTerm as the first and second distractors respectively
      this.distract1 = this.firstTerm;
      this.distract2 = this.secondTerm;
      //calculate tricky distractor (applying the middle operation first)
      if(this.op1  == " * ") this.middleTerm = this.middleTerm * this.a;
      else if(this.op1 == " / ") this.middleTerm = this.middleTerm / this.a;
      else if(this.op1 == " ** ") this.middleTerm = Math.pow(this.middleTerm,this.a);// fix
      if(this.op3 == " * ") this.distract3 = this.middleTerm * this.d;
      else if(this.op3 == " / ") this.distract3 = this.middleTerm / this.d;
      else if(this.op3 == " ** ") this.distract3 = Math.pow(this.middleTerm,this.d);// fix
    }
    //to ensure no repeat answer choices (guaranteed in easy and medium difficulties)
    //hard difficulty still has possibililty of repeat answer choices
    if(this.distract2==this.distract3 || this.distract1==this.distract3)this.distract3 += 1;
    if(this.distract1==this.distract2)this.distract2 += 1;
    //array of (int, bool) pairs, with the bool indiciating whether the answer is correct or not
    this.answerChoices=[{value: this.correct, flag: true},
                        {value: this.distract1, flag: false},
                        {value: this.distract2, flag: false},
                        {value: this.distract3, flag: false} ];   
    return this.answerChoices;

};
