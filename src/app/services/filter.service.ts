import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  // Créer un BehaviorSubject pour chaque variable
  private solTotalSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private sableuxSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private limoneuxSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private argileuxSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private regionNameSource = new BehaviorSubject<string>('');

  currentRegionName = this.regionNameSource.asObservable();

  // Permet de mettre à jour 
  setRegionName(region_name: string) {
    this.regionNameSource.next(region_name);
  }

  constructor() { }

  // Observables pour que les composants puissent s'abonner
  solTotal$ = this.solTotalSubject.asObservable();
  sableux$ = this.sableuxSubject.asObservable();
  limoneux$ = this.limoneuxSubject.asObservable();
  argileux$ = this.argileuxSubject.asObservable();
  
 // Méthodes pour mettre à jour les valeurs des variables
  updateSolTotal(value: number): void {
    this.solTotalSubject.next(value);
  }

  updateSableux(value: number): void {
    this.sableuxSubject.next(value);
  }

  updateLimoneux(value: number): void {
    this.limoneuxSubject.next(value);
  }

  updateArgileux(value: number): void {
    this.argileuxSubject.next(value);
  }
}
