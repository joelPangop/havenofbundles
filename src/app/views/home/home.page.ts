import {Component, OnInit} from '@angular/core';
import {Platform} from '@ionic/angular';
import {ProductsService} from '../../services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public view;

  constructor(public platform: Platform, private productService: ProductsService) {
    this.productService.loadAll().subscribe((res) => {
        this.productService.profile_products = res;
    });
  }

  ngOnInit() {
    console.log(this.platform.platforms());
    this.view = 'tab1';
  }

  public changeView(event, page): void {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName('tabcontent');
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = 'none';
    }
    tablinks = document.getElementsByClassName('tablinks');
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(' active', '');
    }
    // document.getElementById(cityName).style.display = "block";
    this.view = page;
    event.currentTarget.className += ' active';
  }

}
