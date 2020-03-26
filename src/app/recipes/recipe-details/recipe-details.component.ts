import { ConfirmDialogComponent } from "./../../core/confirm-dialog/confirm-dialog.component";
import { RecipeCategories } from "./../../models";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RecipeService } from "../recipe.service";
import { Recipe } from "src/app/models";
import { MatDialog } from "@angular/material";

@Component({
  selector: "cb-recipe-details",
  styleUrls: ["./recipe-details.component.scss"],
  template: `
    <div *ngIf="recipe">
      <h2 class="mat-h2">
        <div class="title-and-button">
          <button
            mat-icon-button
            routerLink="/recipes"
            matTooltip="Return"
            matTooltipPosition="above"
          >
            <mat-icon>arrow_back</mat-icon>
          </button>
          {{ recipe.name }}
        </div>
        <button
          mat-raised-button
          color="warn"
          class="delete-button"
          (click)="openDialog()"
        >
          {{ 'recipes.delete' | translate }}
        </button>
      </h2>
      <h3 class="mat-h3 title-and-button"><mat-icon>menu_book</mat-icon> {{ RecipeCategories[recipe.category] }}</h3>
      <h3 class="mat-h3 title-and-button"><mat-icon>timer</mat-icon> {{ recipe.cookTime }}{{ 'recipes.min' | translate }}</h3>
      <mat-divider></mat-divider>

      <mat-card>
        <h2 class="mat-h2">{{ 'recipes.ingredients' | translate }}</h2>
        <mat-list>
          <mat-list-item *ngFor="let ingredient of recipe.ingredients">
            <mat-icon mat-list-icon>add</mat-icon>
            {{ ingredient.label }} : {{ ingredient.quantity }}
          </mat-list-item>
        </mat-list>
        <h2 class="mat-h2">{{ 'recipes.directions' | translate }}</h2>
        <mat-list>
          <mat-list-item *ngFor="let dir of recipe.directions">
            <mat-icon mat-list-icon>add</mat-icon>
            {{ dir }}
          </mat-list-item>
        </mat-list>
      </mat-card>
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
    private router: Router,
    public dialog: MatDialog
  ) {
    this.route.queryParams.subscribe(params => {
      this.id = params.id;
    });
  }

  public ngOnInit() {
    this.recipeService.getRecipeDetails(this.id).subscribe((recipe: Recipe) => {
      this.recipe = recipe;
    });
  }

  public isRecipeLoaded() {
    return this.recipe !== undefined && this.recipe !== null;
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.recipeService.deleteRecipe(this.id).subscribe(() =>
          this.router.navigate(["/recipes"], {
            queryParams: { deleted: "1" }
          })
        );
      }
    });
  }
}
