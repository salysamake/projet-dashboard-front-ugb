import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageItemDirective, PageLinkDirective, PaginationComponent} from '@coreui/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [PageItemDirective, PageLinkDirective, PaginationComponent, RouterLink, CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class Pagination2Component {
  @Input() totalItems: number = 0; // Nombre total d'éléments
  @Input() pageSize: number = 10;   // Nombre d'éléments par page
  @Input() currentPage: number = 1; // Page actuelle

  @Output() pageChanged = new EventEmitter<number>(); // Événement émis lors du changement de page

  get totalPages(): number {
    if(this.totalItems <= 10) 
      return 1;
    else 
      return Math.ceil(this.totalItems / this.pageSize);
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.pageChanged.emit(this.currentPage);
    }
  }
}
