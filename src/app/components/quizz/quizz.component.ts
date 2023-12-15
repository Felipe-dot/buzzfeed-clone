import { Component, OnInit } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_questions.json"


@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {
  title:string = ""

  questions:any
  questionSelected:any
  answers:string[] = []
  answerSelected:any   
  questionIndex:number = 0
  questionMaxIndex:number = 0
  
  gifClassName: string = ""

  finished: boolean = false

  constructor() { }

  ngOnInit(): void {
    if(quizz_questions) {
      this.finished = false;
      this.title = quizz_questions.title

      this.questions = quizz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]
      console.log(this.questionSelected)

      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length 
    }
  }

  playerChoose(value:string) {
    this.answers.push(value)
    this.nextStep()
  }

  async nextStep() {
    this.questionIndex +=1

    if(this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex]
    }else {
      const finalAnswer:string = "result_" + await this.checkResult(this.answers);
      this.gifClassName = finalAnswer
      this.finished = true
      this.answerSelected = quizz_questions.results.filter((e) => e.id === finalAnswer)
    }
  }

async checkResult(answers:string[]) {
    const result = answers.reduce((prev, curr, i, arr) => {
      if(
        arr.filter(item => item === prev).length > 
        arr.filter(item => item === curr).length 
      ) {
        return prev
      }else {
        return curr
      }

    })
    return result
  }

  retakeTest() {
    this.questionIndex = 0;
    this.questionSelected = this.questions[this.questionIndex]
    this.finished = false;
    this.answerSelected = {}
  }
}