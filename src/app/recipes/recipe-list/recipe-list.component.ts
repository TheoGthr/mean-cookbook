import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe';

@Component({
  selector: 'cb-recipe-list',
  styleUrls: ['./recipe-list.component.scss'],
  template: `
    <div class="row">
      <div class="col-md-5 list-main">
        <h2 class="mat-h2">My recipes</h2>
        <button mat-raised-button>New recipe</button>
        <table mat-table [dataSource]="recipes" class="mat-elevation-z8">
          <!-- Position Column -->
          <ng-container matColumnDef="id">
            <th mat-header-cell *matHeaderCellDef>No.</th>
            <td mat-cell *matCellDef="let recipe"> {{recipe.id}} </td>
          </ng-container>

          <!-- Name Column -->
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef>Name</th>
            <td mat-cell *matCellDef="let recipe"> {{ recipe.name }} </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
        <!--button class="btn btn-warning" (click)="createNewRecipe()">New</button-->
      </div>
      <div class="col-md-5 col-md-offset-2">
        <cb-recipe-details [recipe]="selectedRecipe"> </cb-recipe-details>
      </div>
    </div>
  `
})
export class RecipeListComponent implements OnInit {
  public recipes: Recipe[];
  public selectedRecipe: Recipe;
  displayedColumns: string[] = ['id', 'name'];

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
    })

  public selectRecipe(recipe: Recipe): void {
    this.selectedRecipe = recipe;
  }

  public createNewRecipe(): void {
    const recipe: Recipe = {
      name: '',
      ingredients: '',
      process: '',
      time: new Date(0)
    };

    // By default, a newly-created recipe will have the selected state.
    this.selectRecipe(recipe);
  }
}
