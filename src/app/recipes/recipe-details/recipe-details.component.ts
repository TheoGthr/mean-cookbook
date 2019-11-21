import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from 'src/app/models';

@Component({
  selector: 'cd-recipe-details',
  styleUrls: ['./recipe-details.component.scss'],
  template: `
    <div *ngIf="recipe">
      <h2 class="mat-h2">{{ recipe.name }}</h2>
    </div>
  `
})
export class RecipeDetailsComponent implements OnInit {
  public id: string;
  public recipe: Recipe;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams
      .subscribe(params => {
        this.id = params.id;
      });
  }

  public ngOnInit() {
    this.recipeService.getRecipeDetails(this.id)
      .subscribe((recipe: Recipe) => {
        this.recipe = recipe;
        console.log(this.recipe);
      });
  }

  public isRecipeLoaded() {
    return this.recipe !== undefined && this.recipe !== null;
  }
}