import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { catchError, Observable, of } from "rxjs";

export interface Pokemon {
  id: number;
  name: string;
  type1?: string;
  type2?: string;
  speed?: number;
  legendary?: boolean;
  imageUrl?: string;
}

export interface PokemonQuery {
  page: number;
  limit: number;
  name?: string;
  type?: string;
  legendary?: boolean | null;
  speedMin?: number | null;
  speedMax?: number | null;
}

export interface PaginatedPokemon {
  items: Pokemon[];
  total: number;
  page: number;
  pageSize: number;
}

@Injectable({ providedIn: "root" })
export class PokemonService {
  private readonly base = `${environment.apiUrl}/pokemon`;
  constructor(private http: HttpClient) {}

  list(query: PokemonQuery): Observable<PaginatedPokemon> {
    let params = new HttpParams()
      .set("page", query.page)
      .set("limit", query.limit);
    if (query.name) params = params.set("name", query.name);
    if (query.type) params = params.set("type", query.type);
    if (query.legendary != null)
      params = params.set("legendary", String(query.legendary));
    if (query.speedMin != null)
      params = params.set("speedMin", String(query.speedMin));
    if (query.speedMax != null)
      params = params.set("speedMax", String(query.speedMax));
    return this.http.get<PaginatedPokemon>(this.base, { params });
  }

  byId(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.base}/${id}`);
  }

  toggleFavorite(id: number): Observable<{ favorite: boolean }> {
    return this.http
      .post<{ favorite: boolean }>(`${environment.apiUrl}/favorites/${id}`, {})
      .pipe(
        catchError((err) => {
          if (err.status === 409) {
            return of({ favorite: true });
          }
          throw err;
        })
      );
  }

  favorites(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(`${environment.apiUrl}/favorites`);
  }

  importCsv(file: File): Observable<any> {
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post(`${this.base}/import`, formData);
  }
}
