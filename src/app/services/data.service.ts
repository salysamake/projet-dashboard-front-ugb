import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import  Papa from 'papaparse';  // Importer Papaparse

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'assets/data/dashboard_projet_4m_1.csv';  // URL vers votre fichier CSV
  private regionApi = 'https://projet-dashboard-ugb.onrender.com/regions';
  private textureApi = 'https://projet-dashboard-ugb.onrender.com/data/soil-type-count';
  private api = 'https://projet-dashboard-ugb.onrender.com/data/regions-with-soil-types';
  private terreApi = 'https://projet-dashboard-ugb.onrender.com/data';

  constructor(private http: HttpClient) {}

  // Fonction pour récupérer et parser le CSV
  getData(): Observable<any> {
    return new Observable((observer) => {
      // Récupérer le fichier CSV avec HttpClient
      this.http.get(this.apiUrl, { responseType: 'text' }).subscribe(csvData => {
        // Parser le CSV avec Papaparse
        Papa.parse(csvData, {
          complete: (result) => {
            // Lancer l'observateur avec les données CSV converties
            observer.next(result.data);  // result.data contient les données sous forme de tableau d'objets
            observer.complete();
          },
          header: true  // Indiquer que la première ligne contient les noms de colonnes
        });
      });
    });
  }

  getDataByRegion(region: string): Observable<any> {
    if(region == 'Toutes les regions' || region=='' || region==undefined) {
      const url = `${this.textureApi}`;
      return this.http.get<any>(url);
    } else {
      const url = `${this.textureApi}?region=${region}`;
    return this.http.get<any>(url);
    }
    
  }

  getRegions() : Observable<string[]> {
    const url = `${this.regionApi}`;
    return this.http.get<any>(url);
  } 

  getRegionsWithTexture () : Observable<any> {
    const url = `${this.api}`;
    return this.http.get<any>(url);
  } 

  getTexture(region? : string) : Observable<any> {
    if(region == 'Toutes les régions' || region=='' || region==undefined) {
     
      const url = `${this.textureApi}`;
      return this.http.get<any>(url);
    }
    else {
     
      const url = `${this.textureApi}?region=${region}`;
      return this.http.get<any>(url);
    }
   
  }

  getTerre(currentPage : number, pageSize : number, region? : string ) : Observable<any> {
    if(region == 'Toutes les régions' || region=='' || region==undefined) {
     
      const url = `${this.terreApi}?page=${currentPage}&size=${pageSize}`;
      return this.http.get<any>(url);
    }
    else {
     
      const url = `${this.terreApi}?region=${region}&page=${currentPage}&size=${pageSize}`;
      return this.http.get<any>(url);
    }
   
  }
  
  
}
