import { RecipeShort } from '../../models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  // private baseUrl = environment.apiUrl; // for dev purposes
  private baseUrl = '';
  private searchUrl = `${this.baseUrl}/api/search`;

  constructor(private http: HttpClient) {}

  /**
   * GET /api/search:q
   * Find all the recipes
   */
  public search(q: string): Observable<RecipeShort[]> {
    const params = new HttpParams({fromString: `search=${q}`});
    return this.http.get<RecipeShort[]>(`${this.searchUrl}`, { params }).pipe(
      map(res => res || []),
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
