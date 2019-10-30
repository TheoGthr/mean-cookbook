import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'cb-recipe-details',
  styleUrls: ['./recipe-details.component.scss'],
  template: `
    <div *ngIf="recipe" class="row">
      <div class="col-md-12">
        <h2 *ngIf="recipe._id">Recipe Details</h2>
        <h2 *ngIf="!recipe._id">New Recipe</h2>
      </div>
    </div>
    <div *ngIf="recipe" class="row">
      <form class="col-md-12">
        <div class="form-group">
          <label for="recipe-name">Name</label>
          <input
            class="form-control"
            name="recipe-name"
            [(ngModel)]="recipe.name"
            placeholder="Name"
          />
        </div>
        <button
          class="btn btn-info"
          *ngIf="recipe._id"
          (click)="updateRecipe(recipe)"
        >
          Update
        </button>
        <button
          class="btn btn-danger"
          *ngIf="recipe._id"
          (click)="deleteRecipe(recipe._id)"
        >
          Delete
        </button>
      </form>
    </div>
  `
})
export class RecipeDetailsComponent {
  @Input()
  public recipe: Recipe;

  constructor(private recipeService: RecipeService) {}

  createRecipe(recipe: Recipe) {
    this.recipeService.createRecipe(recipe).subscribe((newRecipe: Recipe) => {
      console.log(newRecipe);
    });
  }

  /*
  updateRecipe(recipe: Recipe): void {
    this.recipeService.updateRecipe(recipe).subscribe((updatedRecipe: Recipe) => {
      console.log(newRecipe);
    });
  }

  deleteRecipe(recipeId: String): void {
    this.recipeService
      .deleteRecipe(recipeId)
      .then((deletedRecipeId: String) => {
        this.deleteHandler(deletedRecipeId);
      });
  } */
}
