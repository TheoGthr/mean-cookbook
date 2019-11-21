import { ConfirmDialogComponent } from './../../core/confirm-dialog/confirm-dialog.component';
import { RecipeCategories } from './../../models';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from 'src/app/models';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'cb-recipe-details',
  styleUrls: ['./recipe-details.component.scss'],
  template: `
    <div *ngIf="recipe">
      <h2 class="mat-h2">
        <button
          mat-icon-button
          routerLink="/recipes"
          matTooltip="Return"
        >
          <mat-icon>arrow_back</mat-icon>
        </button>
        {{ recipe.name }}
        <button
          mat-raised-button
          color="warn"
          class="delete-button"
          (click)="null"
        >
          Delete
        </button>
      </h2>
      <h3 class="mat-h3">{{ RecipeCategories[recipe.category] }}</h3>
      <mat-divider></mat-divider>
      <p>Cook time: {{ recipe.cookTime }}min</p>
      <p>Ingredients: {{ recipe.ingredients }}</p>
      <p>Directions: {{ recipe.directions }}</p>
    </div>
  `
})
export class RecipeDetailsComponent implements OnInit {
  public id: string;
  public recipe: Recipe;
  public RecipeCategories = RecipeCategories;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    public dialog: MatDialog
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
      });
  }

  public isRecipeLoaded() {
    return this.recipe !== undefined && this.recipe !== null;
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}
