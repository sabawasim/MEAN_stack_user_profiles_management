import { Component, OnInit,OnChanges } from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';
import { AlertService, AuthenticationService } from '../_services/index';
declare var $: any;

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnChanges {
    currentUser: User;
    profile={};
    allProfiles:any;
    selected_profile={};
    constructor(private userService: UserService,private authenticationService: AuthenticationService,
        private alertService: AlertService) {
        
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.ngOnChanges();
    }
    ngOnChanges(){
        this.loadAllprofiles(this.currentUser._id);
    }

    loadAllprofiles(id:string) {
        this.userService.getAllprofiles(id).subscribe((res) => { this.allProfiles=res; });
    }
    createProfile(){
        this.selected_profile={};
        $("#myModal").modal('toggle');
    }
    submitprofile(){
        this.profile=this.selected_profile;
        this.profile["id"]=this.currentUser._id;
        console.log(this.profile)
        if(this.profile["company"].length > 0 
        && this.profile["city"].length > 0 
        && this.profile["salary"].length > 0
        && this.profile["designation"].length > 0
        && this.profile["year"].length > 0){
            if (!this.selected_profile["_id"]){
                this.userService.createProfile(this.profile).subscribe((res:any) => {
                    this.loadAllprofiles(this.currentUser._id);
                    this.alertService.success("New Profile Added");
    
                 });
            }
            else
            {
                this.userService.editProfile(this.profile).subscribe(() => { this.loadAllprofiles(this.currentUser._id) });
            }
            
            
        }
        else{
            this.alertService.error("Please enter all feilds");
        }
        $("#myModal").modal('toggle');
    }
    deleteProfile(data:any){
        this.userService.deleteProfile(data._id).subscribe(() => { this.loadAllprofiles(this.currentUser._id) });
    }
    editProfile(data:any){
        this.selected_profile = data;
        $("#myModal").modal('toggle');

    }
}