import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe, RecipeTypes } from '../../models';

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
  public selectedRecipe: Recipe;
  public displayedColumns: string[] = ['name', 'type'];

  private RecipeTypes = RecipeTypes;

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipeService.getRecipes().subscribe((recipes: Recipe[]) => {
      this.recipes = recipes.map(recipe => {
        return recipe;
      });
    });
  }

  private getIndexOfRecipe = (recipeId: string) =>
    this.recipes.findIndex(recipe => {
      return recipe._id === recipeId;
    });

  public selectRecipe(recipe: Recipe): void {
    this.selectedRecipe = recipe;
  }

  public createNewRecipe(): void {
    const recipe: Recipe = {
      name: '',
      ingredients: '',
      process: '',
      time: new Date(0),
      type: RecipeTypes.MISC
    };

    // By default, a newly-created recipe will have the selected state.
    this.selectRecipe(recipe);
  }
}
