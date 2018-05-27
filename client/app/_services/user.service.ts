import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { appConfig } from '../app.config';
import { User } from '../_models/index';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }


    getAllprofiles(id:string) {
        return this.http.get(appConfig.apiUrl + '/users/profiles/'+ id);
    }

    getById(_id: string) {
        return this.http.get(appConfig.apiUrl + '/users/' + _id);
    }

    create(user: User) {
        return this.http.post(appConfig.apiUrl + '/users/register', user);
    }

    editProfile(profile:any) {
        return this.http.put(appConfig.apiUrl + '/users/profiles' , profile);
    }
    deleteProfile(_id: string) {
        return this.http.delete(appConfig.apiUrl + '/users/profiles/' + _id);
    }

    createProfile(profile:any) {
        return this.http.post(appConfig.apiUrl + '/users/create_profile/', profile);
    }
}