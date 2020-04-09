import { Injectable } from '@angular/core';
import { Recipe } from '../models';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  // private baseUrl = environment.apiUrl; // for dev purposes
  private baseUrl = '';
  private recipesUrl = `${this.baseUrl}/api/recipes`;

  constructor(private http: HttpClient) {}

  /**
   * GET /api/recipes
   * Find all the recipes
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
   * GET /api/recipes/:id
   * Find a recipe by id
   */
  public getRecipeDetails(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.recipesUrl}/${id}`).pipe(
      map(res => res),
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

  /**
   * DELETE /api/recipes/:id
   * Find a recipe by id
   */
  public deleteRecipe(id: string): Observable<string> {
    return this.http.delete<string>(`${this.recipesUrl}/${id}`).pipe(
      map(res => res),
      catchError(error => {
        this.handleError(error);
        return throwError(error.message || error);
      })
    );
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
