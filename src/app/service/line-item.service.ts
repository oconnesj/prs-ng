import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LineItem } from '../model/line-item.class';
import { Observable } from 'rxjs';
import { JsonResponse } from '../model/json-response.class';
const url: string = "http://localhost:8080/line-items/";

@Injectable({
  providedIn: 'root'
})
export class LineItemService {
  
  
  constructor(private http: HttpClient) { }

  listLineItemsForRequest(id: number): Observable<JsonResponse> {
    return this.http.get(url + "/lines-for-pr/" + id) as Observable<JsonResponse>;
  }
  get(id: number): Observable<JsonResponse> {
    return this.http.get(url+id) as Observable<JsonResponse>;
  } 
  create(lineitem: LineItem): Observable<JsonResponse> {
    return this.http.post(url,lineitem) as Observable<JsonResponse>;
  } 
  edit(lineitem: LineItem): Observable<JsonResponse> {
    return this.http.put(url,lineitem) as Observable<JsonResponse>;
  } 
  delete(id: number): Observable<JsonResponse> {
    return this.http.delete(url+id) as Observable<JsonResponse>;
  } 

}