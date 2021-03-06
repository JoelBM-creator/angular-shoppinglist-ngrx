import { Component, OnInit } from '@angular/core';

import { AppState } from './store/models/app-state.model';
import { ShoppingItem } from './store/models/shopping-item.model';
import {
  AddItemAction,
  DeleteItemAction,
  LoadShoppingAction
} from './store/actions/shopping.actions';

import { v4 as uuid } from 'uuid';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  shoppingItems: Observable<Array<ShoppingItem>>;
  loading$: Observable<Boolean>;
  error$: Observable<Error>;
  newShoppingItem: ShoppingItem = { id: '', title: '' };

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.shoppingItems = this.store.select(store => store.shopping.list);
    this.loading$ = this.store.select(store => store.shopping.loading);
    this.error$ = this.store.select(store => store.shopping.error);

    this.store.dispatch(new LoadShoppingAction());
  }

  addItem() {
    this.newShoppingItem.id = uuid();
    this.store.dispatch(new AddItemAction(this.newShoppingItem));
    this.newShoppingItem = { id: '', title: '' };
  }

  deleteItem(id: string) {
    this.store.dispatch(new DeleteItemAction(id));
  }
}
