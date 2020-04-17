import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormArray
} from '@angular/forms';
import { RecipeService } from '../services/recipe.service';
import { Recipe, RecipeCategories, Ingredient } from 'src/app/models';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cb-recipe-form',
  styleUrls: ['./recipe-form.component.scss'],
  template: `
    <h2 *ngIf="!isModif" class="mat-h2">
      <button mat-icon-button routerLink="/recipes" matTooltip="Return">
        <mat-icon>arrow_back</mat-icon>
      </button>
      {{ 'recipes.new_recipe' | translate }}
    </h2>
    <h2 *ngIf="isModif" class="mat-h2">
      <button mat-icon-button routerLink="/recipes" matTooltip="Return">
        <mat-icon>arrow_back</mat-icon>
      </button>
      {{ 'recipes.modify' | translate }}
    </h2>
    <mat-card>
      <form [formGroup]="recipeForm" (ngSubmit)="onSubmit()">
        <!-- Name -->
        <mat-form-field>
          <input
            matInput
            type="text"
            placeholder="{{ 'recipes.name' | translate }}"
            formControlName="name"
          />
        </mat-form-field>

        <div class="row-flex">
          <!-- Category -->
          <mat-form-field class="first-row-flex">
            <mat-label>{{ 'recipes.category' | translate }}</mat-label>
            <mat-select formControlName="category">
              <mat-option
                *ngFor="let opt of RecipeCategoriesKeys"
                [value]="opt"
              >
                {{ RecipeCategories[opt] | translate }}
              </mat-option>
            </mat-select>
          </mat-form-field>

          <!-- Cook Duration -->
          <mat-form-field>
            <input
              matInput
              class="number-time"
              type="number"
              placeholder="{{ 'recipes.cook_time' | translate }}"
              formControlName="cookTime"
            />
            <span matSuffix>&nbsp;{{ 'recipes.min' | translate }}</span>
          </mat-form-field>
        </div>

        <!-- Ingredients -->
        <div formArrayName="ingredients" class="divided">
          <h3 class="mat-h3">
            {{ 'recipes.ingredients' | translate }}
            <mat-divider></mat-divider>
          </h3>
          <button
            mat-raised-button
            color="primary"
            type="button"
            (click)="addIngredient()"
            [disabled]="isLastIngredientEmpty()"
          >
            {{ 'recipes.add' | translate }}
          </button>
          <button
            mat-raised-button
            type="button"
            (click)="deleteIngredient()"
            [disabled]="ingredients.length <= 1"
          >
            {{ 'recipes.remove' | translate }}
          </button>
          <mat-list>
            <mat-list-item *ngFor="let ig of recipeForm.get('ingredients')['controls']; let i=index;">
              <mat-icon mat-list-icon>add</mat-icon>
              <div [formGroupName]="i" class="ingredients-fields">
                <mat-form-field>
                  <input
                    matInput
                    type="text"
                    placeholder="{{ 'recipes.ingredient' | translate }}"
                    formControlName="label"
                  />
                </mat-form-field>
                <mat-form-field>
                  <input
                    matInput
                    type="text"
                    placeholder="{{ 'recipes.quantity' | translate }}"
                    formControlName="quantity"
                  />
                </mat-form-field>
              </div>
            </mat-list-item>
          </mat-list>
        </div>

        <!-- Directions -->
        <div formArrayName="directions" class="divided">
          <h3 class="mat-h3">
            {{ 'recipes.directions' | translate }}
            <mat-divider></mat-divider>
          </h3>
          <button
            mat-raised-button
            color="primary"
            type="button"
            (click)="addDirection()"
            [disabled]="isLastDirectionEmpty()"
          >
            {{ 'recipes.add' | translate }}
          </button>
          <button
            mat-raised-button
            type="button"
            (click)="deleteDirection()"
            [disabled]="directions.length <= 1"
          >
            {{ 'recipes.remove' | translate }}
          </button>
          <mat-list>
            <mat-list-item *ngFor="let ig of directions.controls; let i=index">
              <mat-icon mat-list-icon>add</mat-icon>
              <mat-form-field class="directions-field">
                <textarea
                  cdkTextareaAutosize
                  #autosize="cdkTextareaAutosize"
                  cdkAutosizeMinRows="1"
                  cdkAutosizeMaxRows="2"
                  matInput
                  placeholder="{{ 'recipes.direction' | translate }}"
                  [formControlName]="i"
                ></textarea>
              </mat-form-field>
            </mat-list-item>
          </mat-list>
        </div>

        <!-- Create Button -->
        <div class="submit-button">
          <button
            type="submit"
            mat-raised-button
            [disabled]="!recipeForm.valid"
            *ngIf="!isModif"
          >
            {{ 'recipes.create' | translate }}
          </button>
        </div>
        <!-- Save Button -->
        <div class="submit-button">
          <button
            type="submit"
            mat-raised-button
            [disabled]="!recipeForm.valid"
            *ngIf="isModif"
          >
            {{ 'recipes.save' | translate }}
          </button>
        </div>
      </form>
    </mat-card>
  `
})
export class RecipeFormComponent {
  public recipeForm: FormGroup;
  public RecipeCategories = RecipeCategories;
  public RecipeCategoriesKeys: string[] = Object.keys(this.RecipeCategories);
  public isModif = false;

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.isModif = history.state.data !== undefined;
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      cookTime: ['', Validators.required],
      ingredients: this.fb.array([
        this.fb.group({
          label: ['', Validators.required],
          quantity: ['']
        })
      ]),
      directions: this.fb.array([
        this.fb.control('', Validators.required)
      ]),
      category: ['', Validators.required]
    });
    if (this.isModif) {
      const recipeToModify: Recipe = history.state.data as Recipe;
      this.recipeForm.patchValue({
        name: recipeToModify.name,
        cookTime: recipeToModify.cookTime,
        category: recipeToModify.category
      });
      this.ingredients.removeAt(0);
      this.directions.removeAt(0);
      for (const ingredient of recipeToModify.ingredients) {
        this.addIngredientModify(ingredient);
      }
      for (const direction of recipeToModify.directions) {
        this.addDirectionModify(direction);
      }
      console.log(history.state.data);
    }
  }

  public get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  public addIngredient() {
    this.ingredients.push(this.fb.group({
      label: ['', Validators.required],
      quantity: ['']
    }));
  }

  public addIngredientModify(ingredient: Ingredient) {
    this.ingredients.push(this.fb.group({
      label: [ingredient.label, Validators.required],
      quantity: [ingredient.quantity]
    }));
  }

  public isLastIngredientEmpty() {
    const ig: Ingredient = this.ingredients.value[this.ingredients.length - 1];
    return ig.label === '';
  }

  public deleteIngredient() {
    if (this.ingredients.length > 1) {
      this.ingredients.removeAt(-1);
    }
  }

  public get directions() {
    return this.recipeForm.get('directions') as FormArray;
  }

  public addDirection() {
    this.directions.push(this.fb.control('', Validators.required));
  }

  public addDirectionModify(direction: string) {
    this.directions.push(this.fb.control(direction, Validators.required));
  }

  public isLastDirectionEmpty() {
    return this.directions.value[this.directions.length - 1] === '';
  }

  public deleteDirection() {
    if (this.directions.length > 1) {
      this.directions.removeAt(-1);
    }
  }

  public onSubmit() {
    if (!this.isModif) {
      this.recipeService
        .createRecipe(this.recipeForm.value as Recipe)
        .subscribe(() => {
          this.router.navigate(['recipes']);
        });
    } else {
      const updatedRecipe = this.recipeForm.value as Recipe;
      updatedRecipe._id = history.state.data._id;
      this.recipeService.updateRecipe(updatedRecipe)
      .subscribe(() => {
        this.router.navigate(['details'], { queryParams: { id: updatedRecipe._id } });
      });
    }
  }
}
