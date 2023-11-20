import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatGridListModule} from "@angular/material/grid-list";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Message} from "../message";
import {MatListModule} from "@angular/material/list";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatInputModule, MatGridListModule, ReactiveFormsModule, HttpClientModule, MatListModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  form = this.formBuilder.group({
    text: ''
  })

  messages: Message[] = [];

  constructor(public formBuilder: FormBuilder, private httpClient: HttpClient) {
  }

  submitForm() {
    this.messages.push({text: this.form.controls['text'].value ?? '', incoming: false})
    const headers = {'Content-Type': 'application/json'};
    let body = JSON.stringify({text: this.form.controls['text'].value});
    this.httpClient.post('http://localhost:8080/messages', body, {headers, responseType: 'text'}).subscribe({
      next: (response) => {
        this.messages.push({text: response, incoming: true})
        this.form.controls['text'].reset();
      },
      error: (error) => {
        console.log(error.message)
      }
    })
  }
}
