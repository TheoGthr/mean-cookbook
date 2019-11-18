import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe, RecipeCategories } from '../../models';

@Component({
  selector: 'cb-recipe-list',
  styleUrls: ['./recipe-list.component.scss'],
  template: `
    <div class="list-container">
      <div>
        <h2 class="mat-h2">My recipes</h2>
        <button
          mat-raised-button
          color="accent"
          routerLink="new"
        >
          New
        </button>
      </div>
      <table mat-table [dataSource]="recipes" class="mat-elevation-z8">
        <!-- Name Column -->
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Name</th>
          <td mat-cell *matCellDef="let recipe"> {{ recipe.name }} </td>
        </ng-container>

        <!-- Type Column -->
        <ng-container matColumnDef="type">
          <th mat-header-cell *matHeaderCellDef>Type</th>
          <td mat-cell *matCellDef="let recipe"> {{ recipe.type }} </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
  `
})
export class RecipeListComponent implements OnInit {
  public recipes: Recipe[];
  public displayedColumns: string[] = ['name', 'type'];

  constructor(
    private recipeService: RecipeService
  ) { }

    ngOnInit() {
      this.recipeService.getRecipes().subscribe((recipes) => {
        this.recipes = recipes;
      });
    }
}
