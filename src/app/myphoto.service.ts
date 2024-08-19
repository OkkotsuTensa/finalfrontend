import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { API } from './global';
import { HttpClient } from '@angular/common/http';
import { Iphoto } from './photos.service';

const userName  = localStorage.getItem('userName')

@Injectable({
  providedIn: 'root'
})
export class MyphotoService {

  constructor(private router: Router , private http: HttpClient) { }
  
  async addMovie(newPhoto: Iphoto) {    // working 
    const res = await fetch(`${API}/photos/user/${userName}`, {
      method: 'POST',
      body: JSON.stringify(newPhoto),
      headers: {
        'Content-type': 'application/json',
      },
    });
    return await res.json();
  }

  async editMovie(updatedPhoto: Iphoto) { // working 
    const res = await fetch(`${API}/photos/user/${userName}/${updatedPhoto.photoId}`, {
      method: 'PUT',
      body: JSON.stringify(updatedPhoto),
      headers: {
        'Content-type': 'application/json',
      },
    });
    return await res.json();
  }


  async getAllMoviesP(): Promise<Iphoto[]> {      // Working 
    const res = await fetch(`${API}/photos/user/${userName}`);
    return await res.json();
  }

  async deleteMovie(photo: Iphoto) {     // working 
    const res = await fetch(`${API}/photos/user/${userName}/${photo.photoId}`, { method: 'Delete' });
    return await res.json();
  }

  async getMovieByIdP(id: string): Promise<Iphoto> { // working 
    const res = await fetch(`${API}/photos/user/${userName}/${id}`, {
      method: 'GET',
      headers: {
        'x-auth-token': localStorage.getItem('token') as string,
      },
    });
    if (res.status != 200) {
      // this.router.navigate(['/login']);
      throw new Error('Not Authorized');
    }
    return await res.json();
  }

}
