import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { ToastController, ModalController } from '@ionic/angular';
import { FeedbackModalPage } from '../feedback-modal/feedback-modal.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private modalController: ModalController, private router: Router, private auth: AuthenticationService, private toastController: ToastController) { }

  public yourFeedBackData: Array<any> = [];
  public yeedBackUserList: Array<any> = [];
  ngOnInit() {
    this.auth.getFeedback().subscribe(
      (response) => {
        // console.log(response);
        if (response.data === null) {
          this.yourFeedBackData = [];
          console.log(this.yourFeedBackData);
        } else {
          this.yourFeedBackData = response.data;
          console.log(this.yourFeedBackData);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: FeedbackModalPage
    });
    return await modal.present();
  }
}
