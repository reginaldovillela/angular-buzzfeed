import { Component, OnInit } from '@angular/core';
import quizData from '../../../assets/data/quiz_questions.json';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css',
})
export class QuizComponent implements OnInit {
  title: string = '';
  questions: any;
  questionSelected: any;
  answers: string[] = [];
  answerSelected: string = '';
  questionIndex: number = 0;
  questionMaxIndex: number = 0;
  finished: boolean = true;

  ngOnInit(): void {
    if (quizData) {
      this.finished = false;
      this.title = quizData.title;
      this.questions = quizData.questions;
      this.questionSelected = this.questions[this.questionIndex];

      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;
    }
  }

  playerChoose(alias: string): void {
    this.answers.push(alias);
    this.nextStep();
    //console.log(this.answers);
  }

  async nextStep() {
    this.questionIndex += 1;

    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      this.finished = true;
      const finalAnswer:string = await this.checkResult(this.answers);
      this.answerSelected = quizData.results[finalAnswer as keyof typeof quizData.results]
      //console.log(this.answers);
    }
  }

  async checkResult(answers: string[]) {
    const result = answers.reduce((prev, curr, i, arr) => {
      if (
        arr.filter((item) => item === prev).length >
        arr.filter((item) => item === curr).length
      ) {
        return prev;
      } else {
        return curr;
      }
    });

    return result;
  }
}
