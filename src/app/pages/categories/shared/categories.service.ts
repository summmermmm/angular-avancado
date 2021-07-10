import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders }from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { map, catchError, mergeMap } from 'rxjs/operators'
import { Categories } from './category.model';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private apiPath: string = 'api/categories'

  constructor(private http: HttpClient) { }


  // METHOD CRUD

  getAll(): Observable<Categories[]> {
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCatedories)
    )
  }


  getById(id: number): Observable<Categories> {
    const url = `${this.apiPath}/${id}`

    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategoriesId)
    )
  }

  create(category: Categories): Observable<Categories>{
    return this.http.post(this.apiPath, category).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategoriesId)
    )
  }

  update(category: Categories): Observable<Categories>{
    const url = `${this.apiPath}/${category.id}`
    return this.http.put(url, category).pipe(
      catchError(this.handleError),
      map(() => category)
    )
  }

  delete(id: number): Observable<any>{
    const url = `${this.apiPath}/${id}`

    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    )
  }


  // PRIVATE METHODS

  private handleError(error: any): Observable<any>{
    console.log('Erro na requisição categories', error)
    return throwError(error)
  }

  private jsonDataToCatedories(jsonData: any[]): Categories[]{
    const categories: Categories[] = []
    jsonData.forEach(element => categories.push(element as Categories))
    return categories
  }

  private jsonDataToCategoriesId(jsonData: any): Categories{
    return jsonData as Categories
  }
}
