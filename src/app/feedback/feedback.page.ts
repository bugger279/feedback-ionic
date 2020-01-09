import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { ToastController, ModalController } from '@ionic/angular';
import { FeedbackModalPage } from '../feedback-modal/feedback-modal.page';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {

  constructor(private modalController: ModalController, private auth: AuthenticationService, private toastController: ToastController) { }

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
