import { Component, OnInit } from '@angular/core';
import { DocsExampleComponent } from '@docs-components/public-api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective } from '@coreui/angular';
import {Pagination2Component} from 'src/app/pagination/pagination.component';
import { FilterService } from 'src/app/services/filter.service';
@Component({
  selector: 'app-terre',
  standalone: true,
  imports: [ Pagination2Component,
    FormsModule, CommonModule, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective],
  templateUrl: './terre.component.html',
  styleUrl: './terre.component.scss'
})
export class TerreComponent {
  terreData : any [] = [];
  region_name : string ='';
  // Variables de pagination
  totalItems = 0;
  currentPage: number = 1;
  pageSize: number = 10;

  get paginatedData() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.terreData.slice(start, end);  // Slice les données pour afficher la page actuelle
  }
  constructor(private dataService : DataService, private filterService : FilterService) {

  }
  ngOnInit(): void {
    this.dataService.getTerre(this.currentPage, this.pageSize, this.region_name).subscribe(data => {
      console.log("Ndoumbs",data.items);
      this.terreData = data.items; 
      this.totalItems  = data.total;

    });
    this.filterService.currentRegionName.subscribe(async region_name => {
      this.region_name = region_name;
      this.dataService.getTerre(this.currentPage, this.pageSize, this.region_name).subscribe(data => {
        console.log("Ndoumbs",data.items);
        this.terreData = data.items; 
        this.totalItems  = data.total;
  
      });
     
     
    });
    
  }

  onPageChanged(page: number): void {
    this.currentPage = page;
    this.dataService.getTerre(this.currentPage, this.pageSize, this.region_name).subscribe(data => {
      console.log("Ndoumbs",data.items);
      this.terreData = data.items;
      this.totalItems  = data.total;

    });
   
    
  }

   

}
