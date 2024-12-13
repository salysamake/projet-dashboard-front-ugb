import { Component, OnInit } from '@angular/core';
import { DocsExampleComponent } from '@docs-components/public-api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective } from '@coreui/angular';

@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss'],
    standalone: true,
    imports: [FormsModule, CommonModule, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective]
})


export class TablesComponent implements OnInit {

  regionsData : any[] = [];
  region_name : string = '';

  constructor(private dataService : DataService) { }
  ngOnInit(): void {
    this.dataService.getRegionsWithTexture().subscribe(data => {
      console.log("soulll",data);
      this.regionsData = data;
    })
  }

  // Méthode pour obtenir le count d'un type de sol spécifique
  getSoilCount(soilCounts: any[], soilType: string): number {
    const soil = soilCounts.find((s) => s.Texture === soilType);
    return soil ? soil.Count : 0; // Retourne 0 si le type de sol n'est pas trouvé
  }


}
