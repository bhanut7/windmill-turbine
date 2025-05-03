import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HierarchyService {

  public levels: any = [];
  public currentLevel: any = {
    name: 'Level 1',
    id: 'level_1',
    key: 'site_id'
  };

  private hierarchyStackSubject = new BehaviorSubject<any>({});
  hierarchyStack$ = this.hierarchyStackSubject.asObservable();

  get currentStack(): any[] {
    return this.hierarchyStackSubject.value;
  }

  pushLevel(levelData: any) {
    this.hierarchyStackSubject.next(levelData);
  }

  popLevel() {
    const updated = this.currentStack.slice(0, -1);
    this.hierarchyStackSubject.next(updated);
  }

  resetHierarchy() {
    this.hierarchyStackSubject.next([]);
  }
}
