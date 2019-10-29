import { Component, OnInit } from '@angular/core';

declare function init_plugins();

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./login.component.css']
})
export class AuthenticationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}
