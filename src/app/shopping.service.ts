import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs/operators';
import { ShoppingItem } from './store/models/shopping-item.model';

@Injectable()
export class ShoppingService {
  private SHOPPING_URL =
    'https://my-json-server.typicode.com/typicode/demo/posts';

  constructor(private http: HttpClient) {}

  getShoppingItems() {
    return this.http.get<ShoppingItem[]>(this.SHOPPING_URL).pipe(delay(500));
  }

  addShoppingItem(shoppingItem: ShoppingItem) {
    return this.http.post(this.SHOPPING_URL, shoppingItem).pipe(delay(500));
  }

  deleteShoppingItem(id: string) {
    return this.http.delete(`${this.SHOPPING_URL}/${id}`).pipe(delay(500));
  }
}
