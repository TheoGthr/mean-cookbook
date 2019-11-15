import { Injectable } from '@angular/core';
import { Recipe } from '../models';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private baseUrl = 'http://localhost:8080';
  private recipesUrl = `${this.baseUrl}/api/recipes`;

  constructor(private http: HttpClient) {}

  /**
   * GET /api/recipes
   */
  public getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipesUrl).pipe(
      map(res => res || []),
      catchError(error => {
        this.handleError(error);
        return throwError(error.message || error);
      })
    );
  }

  /**
   * POST /api/recipes
   */
  public createRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http
      .post<Recipe>(this.recipesUrl, recipe)
      .pipe(catchError(error => {
        this.handleError(error);
        return throwError(error.message || error);
      }));
  }

  private handleError(error: any) {
    const errMsg = error.message
      ? error.message
      : error.status
      ? `${error.status} - ${error.statusText}`
      : 'Server error';
    console.error(errMsg); // log to console instead
  }
}
