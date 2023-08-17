import { Component, OnInit , Input } from '@angular/core';
import { Router , NavigationExtras} from "@angular/router";
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  @Input() id: any;
  @Input() long: any;
  @Input() lat: any;
  @Input() owner: any;
  @Input() hasImage : any ;
  googleMapsUrl: string = '';


  constructor(private router: Router, private Mc : ModalController) {
  }

  ngOnInit() {
    this.googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${this.lat}+${this.long}`;
  }

  GoToMaps() {
    window.open(this.googleMapsUrl, '_blank');
  }

  AddPic() {


    this.router.navigate(['/pictures'] , { queryParams: { id: this.id } });
    this.Mc.dismiss();
  }
}
