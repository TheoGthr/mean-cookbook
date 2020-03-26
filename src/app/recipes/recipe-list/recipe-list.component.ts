import { Component, OnInit } from "@angular/core";
import { RecipeService } from "../recipe.service";
import { Recipe, RecipeCategories } from "../../models";
import { Router, ActivatedRoute } from "@angular/router";
import { MatSnackBar } from '@angular/material';
import { ConfirmSnackbarComponent } from 'src/app/core/confirm-snackbar/confirm-snackbar.component';

@Component({
  selector: "cb-recipe-list",
  styleUrls: ["./recipe-list.component.scss"],
  template: `
    <div class="list-container">
      <div>
        <h2 class="mat-h2">{{ 'recipes.my_recipes' | translate }}</h2>
        <button mat-raised-button color="accent" routerLink="new">
          {{ 'recipes.new' | translate }}
        </button>
      </div>
      <table mat-table [dataSource]="recipes" class="mat-elevation-z8">
        <!-- Name Column -->
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>{{ 'recipes.name' | translate }}</th>
          <td mat-cell *matCellDef="let recipe">{{ recipe.name }}</td>
        </ng-container>

        <!-- Type Column -->
        <ng-container matColumnDef="category">
          <th mat-header-cell *matHeaderCellDef>Category</th>
          <td mat-cell *matCellDef="let recipe">
            {{ RecipeCategories[recipe.category] }}
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr
          mat-row
          *matRowDef="let row; columns: displayedColumns"
          (click)="onSelectRecipe(row._id)"
          class="rows"
        ></tr>
      </table>
    </div>
  `
})
export class RecipeListComponent implements OnInit {
  public recipes: Recipe[];
  public displayedColumns: string[] = ['name', 'category'];
  public RecipeCategories = RecipeCategories;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.recipeService.getRecipes().subscribe(recipes => {
      this.recipes = recipes;
    });
    this.route.queryParams.subscribe(params => {
      if (params.deleted === '1') {
        this._snackBar.openFromComponent(ConfirmSnackbarComponent, {
          duration: 3 * 1000,
          panelClass: ['success-bg']
        });
      }
    });
  }

  public onSelectRecipe(id: string) {
    this.router.navigate(['/details'], { queryParams: { id } });
  }
}
