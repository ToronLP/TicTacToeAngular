import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit{
  squares: any[];
  xIsNext: boolean;
  winner: string;

  constructor(){
    this.squares = Array();
    this.winner = '';
    this.xIsNext = true;
  };

  ngOnInit(): void {
    this.newGame();
  }

  newGame(){
    this.squares = Array(9).fill(null);
    this.winner = '';
    this.xIsNext = true;
  }

  get player(){
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(idx: number){
    if(!this.squares[idx] && this.calculateWinner() == ''){
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }

    this.winner = this.calculateWinner();
  }

  calculateWinner(): string {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for(let i = 0; i < lines.length; i++){
      const [a, b, c] = lines[i];
      if(this.squares[a] && this.squares[a] === this.squares[b] && this.squares[a] === this.squares[c]){
        return 'Spieler ' + this.squares[a] + " hat das Spiel gewonnen.";
      }
    }

    let fieldSetCounter = 0;
    for(let i = 0; i < 9; i++){
      if(this.squares[i] != null){
        fieldSetCounter++;
      }
    }
    if(fieldSetCounter>=9){
      return 'Keiner hat das Spiel gewonnen.';
    }
    return '';
  }
}
