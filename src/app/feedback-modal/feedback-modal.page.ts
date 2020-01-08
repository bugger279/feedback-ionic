import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { ToastController } from '@ionic/angular';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-feedback-modal',
  templateUrl: './feedback-modal.page.html',
  styleUrls: ['./feedback-modal.page.scss'],
})
export class FeedbackModalPage implements OnInit {

  constructor(private auth: AuthenticationService, private toastController: ToastController) { }
  public feedBackUserList: Array<any> = [];

  ngOnInit() {
    /**
     * getIds
     */
    this.auth.fetchIds().subscribe(
      (response) => {
        if (response.data === null) {
          this.feedBackUserList = [];
        } else {
          this.feedBackUserList = response.data;
          this.feedBackUserList['model'] = response.data._id;
          this.feedBackUserList['isDisabled'] = false;
        }
      },
      (err) => {
        console.log('Something went wrong!');
      }
    );
  }

  /**
   * submitReview
   */
  public submitReview(item, index) {
    this.auth.giveFeedback(item.receiver_id, item.model).subscribe(
      (response) => {
        this.feedBackUserList.splice(index, 1);
        // Toaster to display feedback given to specific user
        console.log(response);
        this.toastController.create({
          message: `Feedback given successfully to ${response.receiver_name}`
        }).then(toastEl => {
          toastEl.present();
        });
      },
      (err) => {
        // Toaster to display warning and error
        console.log(err);
      }
    );
  }
}
