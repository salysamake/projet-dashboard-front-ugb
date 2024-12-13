import { Component, OnInit } from '@angular/core';
import { DocsExampleComponent } from '@docs-components/public-api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective } from '@coreui/angular';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective]
})
export class AppTabsComponent implements OnInit{

  terreData : any [] = [];
  constructor(private dataService : DataService) {

  }
  ngOnInit(): void {
    
    
  }
}
