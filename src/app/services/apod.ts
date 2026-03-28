import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IApod{
  date: string;
  title: string;
  explanation: string;
  url: string;
  media_type: 'image' | 'video';
  thumbnail_url?: string;
  copyright?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApodService {
  private http = inject(HttpClient);
  private apiUrl = 'https://api.nasa.gov/planetary/apod';
  private apiKey = 'fLyf2DNbM49a32QTGVBvUYIdEX2Pgc7czFnLhNoN';

  getByCount(count: number): Observable<IApod[]> {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('count', count.toString())
      .set('thumbs', 'true');
    return this.http.get<IApod[]>(this.apiUrl, { params });
  }

  getByDateRange(startDate: string, endDate: string): Observable<IApod[]> {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('start_date', startDate)
      .set('end_date', endDate)
      .set('thumbs', 'true');
    return this.http.get<IApod[]>(this.apiUrl, { params });
  }

  getByDate(date: string): Observable<IApod> {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('date', date)
      .set('thumbs', 'true');
    return this.http.get<IApod>(this.apiUrl, { params });
  }

}
