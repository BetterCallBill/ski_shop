import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IOrder } from '../shared/models/order';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }
  
  getOrdersForUser() {
    return this.http.get<IOrder[]>(`${this.baseUrl}/orders`);
  }
  
  getOrderDetails(id: number) {
    return this.http.get<IOrder>(`${this.baseUrl}/orders/${id}`);
  }
}
