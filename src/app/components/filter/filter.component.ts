import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import {FilterService} from 'src/app/services/filter.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit {

  selectedRegion : string = '';
  regions : string[]= [];
  
  @Output() regionRangeChanged = new EventEmitter<{ region: string }>();
  ngOnInit() {
    this.loadRegions();

  }
   constructor(private dataService : DataService, private filterService : FilterService) {

   }

   filterByRegion(): void {

   
    if (this.selectedRegion) {
    //  this.filterService.setActiveSpinner(true);
      this.regionRangeChanged.emit({region:this.selectedRegion});
      this.filterService.setRegionName(this.selectedRegion);
      
      
    } else {
      alert('Choisissez une application svp');
      this.filterService.setRegionName('Toutes les regions');
    }
  }
  async loadRegions(): Promise<void> {
    this.dataService.getRegions().subscribe(regions => {
      this.regions = regions;
      this.regions.unshift('Toutes les régions');
      console.log('Regions chargées:', this.regions);
    });
  }

}
