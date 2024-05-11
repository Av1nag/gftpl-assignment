import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  Authorization: environment.auth_key,
});

@Injectable({
  providedIn: 'root',
})
export class DealerDataService {
  http = inject(HttpClient);
  // constructor() {}

  getCustomers<T>() {
    return this.http?.get<T>(environment.api_uri + '/pv-api/dealer/', {
      headers,
    });
  }

  deleteUser(id: number | undefined) {
    return this.http.delete(environment.api_uri + `/pv-api/dealer/?id=${id}`, {
      headers,
    });
  }

  createUser(updatedData: any) {
    return this.http.post<any>(
      environment.api_uri + '/pv-api/dealer/',
      updatedData,
      {
        headers,
      }
    );
  }

  updateUserDetails(id: number | undefined, updatedData: {}) {
    return this.http.put(
      environment.api_uri + `/pv-api/dealer/?id=${id}`,
      updatedData,
      { headers }
    );
  }
}
