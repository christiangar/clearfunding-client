import { Component, OnInit } from '@angular/core';
import { Campaign } from '../../../shared/models/campaign.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CampaignService } from '../../../shared/services/campaign.service';
import { Observable } from 'rxjs/Rx';



@Component({
  selector: 'app-campaign-item',
  templateUrl: './campaign-item.component.html',
  styleUrls: ['./campaign-item.component.css']
})
export class CampaignItemComponent implements OnInit {
  campaign: Campaign = new Campaign();
  error: Object;

  constructor(
    private router: Router,
    private routes: ActivatedRoute,
    private campaignsService: CampaignService
  ) { }

  ngOnInit() {
    this.routes
      .params
      .subscribe(
       (params: Params) => {
         this.campaignsService.getCampaign(params['id'])
         .subscribe(campaign => {
           console.log(`this is campaign ${campaign}`);
           this.campaign = campaign;
          });
      });
  }
}
