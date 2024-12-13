import { DOCUMENT, NgStyle } from '@angular/common';
import { Component, DestroyRef, effect, inject, OnInit, Renderer2, signal, WritableSignal , ViewChild ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChartOptions, Chart } from 'chart.js';

import { DataService } from 'src/app/services/data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import {
  AvatarComponent,
  ButtonDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
  ColComponent,
  FormCheckLabelDirective,
  GutterDirective,
  ProgressBarDirective,
  ProgressComponent,
  RowComponent,
  TableDirective,
  TextColorDirective
} from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { IconDirective } from '@coreui/icons-angular';

import { WidgetsBrandComponent } from '../widgets/widgets-brand/widgets-brand.component';
import { WidgetsDropdownComponent } from '../widgets/widgets-dropdown/widgets-dropdown.component';
import { DashboardChartsData, IChartProps } from './dashboard-charts-data';

interface IDataRow {
  'Analysis Name': string;
  'Condition': string;
  'pH': string;
  'EC(S) (uS/cm)': string;
  'C.E.C (meq/100g)' : string;
  'Ca (ppm)' : string;
  'Mg (ppm)' : string;
  'P (ppm)': string;
  'Na (ppm)' : string;
  'K (ppm)': string;
  'Region': string;
  'Texture': string;
  'Recommandation': string;
}


interface IUser {
  name: string;
  state: string;
  registered: string;
  country: string;
  usage: number;
  period: string;
  payment: string;
  activity: string;
  avatar: string;
  status: string;
  color: string;
}



@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
  standalone: true,
  imports: [WidgetsDropdownComponent, TextColorDirective, CardComponent, CardBodyComponent, RowComponent, ColComponent, ButtonDirective, IconDirective, ReactiveFormsModule, ButtonGroupComponent, FormCheckLabelDirective, ChartjsComponent, NgStyle, CardFooterComponent, GutterDirective, ProgressBarDirective, ProgressComponent, WidgetsBrandComponent, CardHeaderComponent, TableDirective, AvatarComponent]
  ,schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DashboardComponent implements OnInit {
 

  readonly #destroyRef: DestroyRef = inject(DestroyRef);
  readonly #document: Document = inject(DOCUMENT);
  readonly #renderer: Renderer2 = inject(Renderer2);
  readonly #chartsData: DashboardChartsData = inject(DashboardChartsData);
  regionsData: any = {};  // Pour stocker les données par région
  nutrientAnalysis: any = {};  // Pour stocker l'analyse des nutriments par région
 

  public users: IUser[] = [
    {
      name: 'Yiorgos Avraamu',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'Us',
      usage: 50,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Mastercard',
      activity: '10 sec ago',
      avatar: './assets/images/avatars/1.jpg',
      status: 'success',
      color: 'success'
    },
    {
      name: 'Avram Tarasios',
      state: 'Recurring ',
      registered: 'Jan 1, 2021',
      country: 'Br',
      usage: 10,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Visa',
      activity: '5 minutes ago',
      avatar: './assets/images/avatars/2.jpg',
      status: 'danger',
      color: 'info'
    },
    {
      name: 'Quintin Ed',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'In',
      usage: 74,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Stripe',
      activity: '1 hour ago',
      avatar: './assets/images/avatars/3.jpg',
      status: 'warning',
      color: 'warning'
    },
    {
      name: 'Enéas Kwadwo',
      state: 'Sleep',
      registered: 'Jan 1, 2021',
      country: 'Fr',
      usage: 98,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Paypal',
      activity: 'Last month',
      avatar: './assets/images/avatars/4.jpg',
      status: 'secondary',
      color: 'danger'
    },
    {
      name: 'Agapetus Tadeáš',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'Es',
      usage: 22,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'ApplePay',
      activity: 'Last week',
      avatar: './assets/images/avatars/5.jpg',
      status: 'success',
      color: 'primary'
    },
    {
      name: 'Friderik Dávid',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'Pl',
      usage: 43,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Amex',
      activity: 'Yesterday',
      avatar: './assets/images/avatars/6.jpg',
      status: 'info',
      color: 'dark'
    }
  ];

  public mainChart: IChartProps = { type: 'line' };
  public mainChartRef: WritableSignal<any> = signal(undefined);
  #mainChartRefEffect = effect(() => {
    if (this.mainChartRef()) {
      this.setChartStyles();
    }
  });
  //public chart: Array<IChartProps> = [];
  public trafficRadioGroup = new FormGroup({
    trafficRadio: new FormControl('Month')
  });

  displayedColumns: string[] = ['Analysis Name', 'Condition', 'pH', 'EC(S) (uS/cm)', 'P (ppm)', 'K (ppm)', 'Region', 'Texture', 'Recommandation'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  chart: any;

  
  @ViewChild(MatSort) sort!: MatSort;  // Utiliser l'opérateur non-null
  @ViewChild(MatPaginator) paginator!: MatPaginator;  // Utiliser l'opérateur non-null

  constructor(private dataService: DataService) {}
  

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.initCharts();
    this.updateChartOnColorModeChange();
    this.dataService.getData().subscribe(data => {
      // Organiser les données par région
     // this.regionsData = this.organizeDataByRegion(data);

      // Effectuer une analyse des nutriments pour chaque région
    //  this.nutrientAnalysis = this.analyzeNutrientsByRegion(this.regionsData);
      this.createChart(data);
      this.createECChart(data);
      this.createCECChart(data);
      this.createPHChart(data);
     /* this.createBarChart(data);
      this.createLineChart(data);
      this.createPieChart(data);*/
    });
  }

 
 /* organizeDataByRegion(data: IDataRow[]) {
    const regions = {};

    data.forEach((row : IDataRow) => {
      if (!regions[row['Region']]) {
        regions[row['Region']] = [];
      }
      regions[row['Region']].push(row);
    });

    return regions;
  }*/

  
  /*analyzeNutrientsByRegion(regionsData: any) {
    const analysis = {};

    Object.keys(regionsData).forEach((region) => {
      const regionData = regionsData[region];

      const avgP = regionData.reduce((acc, curr) => acc + curr['P (ppm)'], 0) / regionData.length;
      const avgK = regionData.reduce((acc, curr) => acc + curr['K (ppm)'], 0) / regionData.length;
      const avgCa = regionData.reduce((acc, curr) => acc + curr['Ca (ppm)'], 0) / regionData.length;
      const avgMg = regionData.reduce((acc, curr) => acc + curr['Mg (ppm)'], 0) / regionData.length;

      analysis[region] = { avgP, avgK, avgCa, avgMg };
    });

    return analysis;
  }*/
    createChart(data: IDataRow[]) {
      // Filtrer les données où la région et les valeurs sont valides
      const filteredData = data.filter((row: IDataRow) => row.Region && !isNaN(parseFloat(row['EC(S) (uS/cm)'])) && !isNaN(parseFloat(row['C.E.C (meq/100g)'])));
    
      // Grouper les données par région
      const groupedData = filteredData.reduce((acc: any, row: IDataRow) => {
        const region = row.Region;
        if (!acc[region]) {
          acc[region] = { count: 0, totalEC: 0, totalCEC: 0, totalK: 0, totalCa: 0, totalMg: 0, totalNa: 0 };
        }
    
        // Convertir les valeurs en nombre avec parseFloat et vérifier qu'elles sont valides
        const ecValue = parseFloat(row['EC(S) (uS/cm)']);
        const cecValue = parseFloat(row['C.E.C (meq/100g)']);
        const kValue = parseFloat(row['K (ppm)']);
        const caValue = parseFloat(row['Ca (ppm)']);
        const mgValue = parseFloat(row['Mg (ppm)']);
        const naValue = parseFloat(row['Na (ppm)']);
    
        // Ajouter les valeurs pour chaque paramètre si elles sont valides
        if (!isNaN(ecValue)) acc[region].totalEC += ecValue;
        if (!isNaN(cecValue)) acc[region].totalCEC += cecValue;
        if (!isNaN(kValue)) acc[region].totalK += kValue;
        if (!isNaN(caValue)) acc[region].totalCa += caValue;
        if (!isNaN(mgValue)) acc[region].totalMg += mgValue;
        if (!isNaN(naValue)) acc[region].totalNa += naValue;
    
        acc[region].count++; // Incrémenter le nombre de sols par région
        return acc;
      }, {});
    
      // Calculer la moyenne pour chaque propriété par région
      const regions = Object.keys(groupedData);
      const ecValues = regions.map(region => groupedData[region].totalEC / groupedData[region].count);
      const cecValues = regions.map(region => groupedData[region].totalCEC / groupedData[region].count);
      const kValues = regions.map(region => groupedData[region].totalK / groupedData[region].count);
      const caValues = regions.map(region => groupedData[region].totalCa / groupedData[region].count);
      const mgValues = regions.map(region => groupedData[region].totalMg / groupedData[region].count);
      const naValues = regions.map(region => groupedData[region].totalNa / groupedData[region].count);
    
      // Créer les graphiques ensuite
      this.chart = new Chart('chart', {
        type: 'bar',
        data: {
          labels: regions,
          datasets: [
            
            {
              label: 'K (ppm)',
              data: kValues,
              backgroundColor: '#FFA726',
              borderColor: '#FB8C00',
              borderWidth: 1
            },
            {
              label: 'Ca (ppm)',
              data: caValues,
              backgroundColor: '#AB47BC',
              borderColor: '#8E24AA',
              borderWidth: 1
            },
            {
              label: 'Mg (ppm)',
              data: mgValues,
              backgroundColor: '#5C6BC0',
              borderColor: '#3F51B5',
              borderWidth: 1
            },
            {
              label: 'Na (ppm)',
              data: naValues,
              backgroundColor: '#FFEB3B',
              borderColor: '#FBC02D',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            x: { beginAtZero: true },
            y: { beginAtZero: true }
          }
        }
      });
    }

    createECChart(data: IDataRow[]) {
      const regions = [...new Set(data.map((row: IDataRow) => row.Region))]; // Éviter les doublons
      const ecValues = regions.map(region => {
        const regionData = data.filter(row => row.Region === region);
        return regionData.reduce((acc, row) => {
          const ecValue = parseFloat(row['EC(S) (uS/cm)']); // Convertir en nombre
          // Si la valeur est un nombre valide, l'ajouter à l'accumulateur, sinon l'ignorer
          return acc + (isNaN(ecValue) ? 0 : ecValue); // Vérifier si ce n'est pas NaN
        }, 0) / regionData.length; // Calcul de la moyenne de l'E.C.
      });
    
      // Créer le graphique avec ces valeurs
      new Chart('barChart', {
        type: 'bar',
        data: {
          labels: regions,
          datasets: [
            {
              label: 'E.C. (uS/cm)',
              data: ecValues,
              backgroundColor: '#FF7043',
              borderColor: '#F4511E',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            x: { beginAtZero: true },
            y: { beginAtZero: true }
          }
        }
      });
    }

    createCECChart(data: IDataRow[]) {
      const regions = [...new Set(data.map((row: IDataRow) => row.Region))];  // Éviter les doublons
      const cecValues = regions.map(region => {
        const regionData = data.filter(row => row.Region === region);
        return regionData.reduce((acc, row) => {
          const cecValue = parseFloat(row['C.E.C (meq/100g)']); // Convertir en nombre
          // Si la valeur est un nombre valide, l'ajouter à l'accumulateur, sinon l'ignorer
          return acc + (isNaN(cecValue) ? 0 : cecValue); // Vérifier si ce n'est pas NaN
        }, 0) / regionData.length; // Calcul de la moyenne du C.E.C.
      });
    
      // Créer le graphique avec ces valeurs
      new Chart('pieChart', {
        type: 'bar',  // Graphique à barres
        data: {
          labels: regions,
          datasets: [
            {
              label: 'C.E.C. (meq/100g)',
              data: cecValues,  // Valeurs de C.E.C.
              backgroundColor: '#66BB6A',  // Couleur de fond
              borderColor: '#388E3C',  // Couleur du bord
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            x: { beginAtZero: true },  // L'axe des X commence à zéro
            y: { beginAtZero: true }   // L'axe des Y commence à zéro
          }
        }
      });
    }

    createPHChart(data: IDataRow[]) {
      // Récupérer toutes les régions uniques
      const regions = [...new Set(data.map((row: IDataRow) => row.Region))];
    
      // Calculer la moyenne de pH pour chaque région
      const phValues = regions.map(region => {
        const regionData = data.filter(row => row.Region === region);
        
        // Calculer la moyenne du pH en s'assurant que les valeurs sont valides
        return regionData.reduce((acc, row) => {
          const phValue = parseFloat(row['pH']); // Convertir en nombre
          // Si la valeur est un nombre valide, l'ajouter à l'accumulateur, sinon l'ignorer
          return acc + (isNaN(phValue) ? 0 : phValue); // Vérifier si ce n'est pas NaN
        }, 0) / regionData.length; // Moyenne du pH
      });
    
      // Créer le graphique pour le pH
      new Chart('phChart', {
        type: 'bar',  // Type de graphique
        data: {
          labels: regions,  // Étiquettes des régions
          datasets: [
            {
              label: 'pH',
              data: phValues,  // Données des niveaux de pH
              backgroundColor: '#42A5F5',  // Couleur du fond des barres
              borderColor: '#1E88E5',  // Couleur du bord des barres
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            x: { beginAtZero: true },  // Commencer l'axe X à zéro
            y: { beginAtZero: true }   // Commencer l'axe Y à zéro
          }
        }
      });
    }
    
    
    
    
    

   
  
    


  initCharts(): void {
    this.mainChart = this.#chartsData.mainChart;
  }

  setTrafficPeriod(value: string): void {
    this.trafficRadioGroup.setValue({ trafficRadio: value });
    this.#chartsData.initMainChart(value);
    this.initCharts();
  }

  handleChartRef($chartRef: any) {
    if ($chartRef) {
      this.mainChartRef.set($chartRef);
    }
  }

  updateChartOnColorModeChange() {
    const unListen = this.#renderer.listen(this.#document.documentElement, 'ColorSchemeChange', () => {
      this.setChartStyles();
    });

    this.#destroyRef.onDestroy(() => {
      unListen();
    });
  }

  setChartStyles() {
    if (this.mainChartRef()) {
      setTimeout(() => {
        const options: ChartOptions = { ...this.mainChart.options };
        const scales = this.#chartsData.getScales();
        this.mainChartRef().options.scales = { ...options.scales, ...scales };
        this.mainChartRef().update();
      });
    }
  }
}
