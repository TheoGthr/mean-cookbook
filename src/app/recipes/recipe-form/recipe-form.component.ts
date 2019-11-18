import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe, RecipeCategories } from 'src/app/models';

@Component({
  selector: 'cb-recipe-form',
  styleUrls: ['./recipe-form.component.scss'],
  template: `
    <h2 class="mat-h2">
      <button mat-icon-button aria-label="Return" routerLink="/recipes">
        <mat-icon>arrow_back</mat-icon>
      </button>
      New recipe
    </h2>
    <mat-card>
      <form ngSubmit="onSubmit()">
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
            <mat-select>
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

        <!-- Add Button -->
        <div>
          <button type="submit" mat-raised-button>Add</button>
        </div>
      </form>
    </mat-card>
  `
})
export class RecipeFormComponent {
  public form: FormGroup;
  public RecipeCategories = RecipeCategories;
  public RecipeCategoriesKeys: string[] = Object.keys(this.RecipeCategories);

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService
  ) {
    this.form = this.fb.group({
        "firstName": new FormControl("", Validators.required),
        "password": new FormControl("", Validators.required)
    });
  }

  public onSubmit() {
    this.recipeService.createRecipe(this.form.value as Recipe);
  }
}
