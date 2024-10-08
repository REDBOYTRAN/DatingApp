import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';
import { HttpClient } from '@angular/common/http';
import { Message } from '../_models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMessage(pageNumber: number, pageSize: number, container: string) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('Container', container);
    return getPaginatedResult<Message[]>(this.baseUrl + 'messages', params, this.http)
  }

  getMessageThread(username: string) {
    return this.http.get<Message[]>(this.baseUrl + 'messages/thread/' + username);
  }
 
  sendMessage(recipientUsername: string, content: string) {
    return this.http.post<Message>(this.baseUrl + 'messages', {recipientUsername, content});
  }

  deleteMessage(id: number) {
    return this.http.delete<Message>(this.baseUrl + 'messages/' + id);
  }

}
