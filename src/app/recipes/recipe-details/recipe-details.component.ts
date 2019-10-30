import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-details',
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
        <div class="form-group">
          <label for="recipe-email">Email</label>
          <input
            class="form-control"
            name="recipe-email"
            [(ngModel)]="recipe.email"
            placeholder="support@mlab.com"
          />
        </div>
        <div class="form-group">
          <label for="recipe-phone-mobile">Mobile</label>
          <input
            class="form-control"
            name="recipe-phone-mobile"
            [(ngModel)]="recipe.phone.mobile"
            placeholder="1234567890"
          />
        </div>
        <div class="form-group">
          <label for="recipe-phone-work">Work</label>
          <input
            class="form-control"
            name="recipe-phone-work"
            [(ngModel)]="recipe.phone.work"
            placeholder="0123456789"
          />
        </div>
        <button
          class="btn btn-primary"
          *ngIf="!recipe._id"
          (click)="createRecipe(recipe)"
        >
          Create
        </button>
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
export class RecipeDetailsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
