import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getEndpointURL(endpoint: string): string {
    return [environment.api, endpoint].join('');
  }

  getHeaders(): Promise<any> {
    const headers = {};

    headers['Cache-Control'] = 'no-cache';
    headers['Cache-Control'] = 'no-store';
    headers['Cache-Control'] = 'must-revalidate';
    headers['Pragma'] = 'no-cache';
    headers['Expires'] = '0';

    return Promise.resolve(headers);
  }

  makeRequest(endpoint, options: IMakeRequestOptions = { method: 'GET' }): Promise<any> {
    return this.getHeaders()
      .then(headers => {
        const method = options.method.toLowerCase();
        const body = (options.body) ? options.body : null;
        const params = (options.params) ? options.params : null;
        const reqOptions = { headers, body, params };

        const uri = this.getEndpointURL(endpoint);
        const req = this.http.request(method, uri, reqOptions).toPromise();

        return req.then((r: any) => r as any);
      });
  }
}

export interface IMakeRequestOptions {
  method?: string;
  body?: any;
  params?: any;
}
