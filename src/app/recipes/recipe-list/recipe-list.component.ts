import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe';

@Component({
  selector: 'cb-recipe-list',
  styleUrls: ['./recipe-list.component.scss'],
  template: `
    <div class="row">
      <div class="col-md-5">
        <h2>Recipes</h2>
        <ul class="list-group">
          <li
            class="list-group-item"
            *ngFor="let recipe of recipes"
            (click)="selectRecipe(recipe)"
            [class.active]="recipe === selectedRecipe"
          >
            {{ recipe.name }}
          </li>
        </ul>
        <button class="btn btn-warning" (click)="createNewRecipe()">New</button>
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

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipeService.getRecipes().subscribe((recipes: Recipe[]) => {
      this.recipes = recipes.map(recipe => {
        return recipe;
      });
    });
  }

  private getIndexOfRecipe = (recipeId: string) => {
    return this.recipes.findIndex(recipe => {
      return recipe._id === recipeId;
    });
  };

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
