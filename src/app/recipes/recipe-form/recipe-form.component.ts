import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe, RecipeCategories } from 'src/app/models';
import { Router } from '@angular/router';

@Component({
  selector: 'cb-recipe-form',
  styleUrls: ['./recipe-form.component.scss'],
  template: `
    <h2 class="mat-h2">New recipe</h2>
    <mat-card>
      <form
        [formGroup]="recipeForm"
        (ngSubmit)="onSubmit()"
      >
        <!-- Name -->
        <mat-form-field>
          <input
            matInput
            type="text"
            placeholder="Name"
            formControlName="name"
          />
        </mat-form-field>

        <div class="row-flex">
          <!-- Category -->
          <mat-form-field class="first-row-flex">
            <mat-label>Category</mat-label>
            <mat-select formControlName="category">
              <mat-option
                *ngFor="let opt of RecipeCategoriesKeys"
                [value]="opt"
              >
                {{ RecipeCategories[opt] }}
              </mat-option>
            </mat-select>
          </mat-form-field>

          <!-- Cook Duration -->
          <mat-form-field>
            <input
              matInput
              class="number-time"
              type="number"
              placeholder="Cook time"
              formControlName="cookTime"
            />
            <span matSuffix>&nbsp;min</span>
          </mat-form-field>
        </div>

        <!-- Ingredients -->
        <!--h3 class="mat-h3">
          Ingredients
        </h3>
        <button
          mat-raised-button
          color="primary"
          click="onAddIngredient()"
        >
          Add ingredient
        </button>
        <div *ngFor="let ig of ingredients">
          <input
            type="text"
            formControlName="ingredients"
          />
        </div-->
        <mat-form-field>
          <input
            matInput
            type="text"
            placeholder="Ingredients"
            formControlName="ingredients"
          />
        </mat-form-field>

        <!-- Directions -->
        <mat-form-field>
          <input
            matInput
            type="text"
            placeholder="Directions"
            formControlName="directions"
          />
        </mat-form-field>

        <!-- Create Button -->
        <div>
          <button
            type="submit"
            mat-raised-button
            [disabled]="!recipeForm.valid"
          >Create</button>
        </div>
      </form>
    </mat-card>
  `
})
export class RecipeFormComponent {
  public recipeForm: FormGroup;
  public RecipeCategories = RecipeCategories;
  public RecipeCategoriesKeys: string[] = Object.keys(this.RecipeCategories);
  public ingredients: string[] = [''];

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private router: Router
  ) {
    this.recipeForm = this.fb.group({
        "name": new FormControl("", Validators.required),
        "cookTime": new FormControl("", Validators.required),
        "ingredients": new FormControl("", Validators.required),
        "directions": new FormControl("", Validators.required),
        "category": new FormControl("", Validators.required)
    });
  }

  public onSubmit() {
    console.log(this.recipeForm.value as Recipe);
    this.recipeService.createRecipe(this.recipeForm.value as Recipe).subscribe(() => {
      this.router.navigate(['recipes']);
    });
  }

  public onAddIngredient() {
    this.ingredients.push('');
  }
}
