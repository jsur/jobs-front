import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { LeadService } from '../../services/lead.service';
import { TimelineService } from '../../services/timeline.service';
import { SessionService } from '../../services/session.service';

import { LeadstatusPipe } from '../../pipes/leadstatus.pipe';

import { Lead } from '../../shared/models/Lead';
import { Timeline } from '../../shared/models/Timeline';

import { environment } from '../../../environments/environment';

import { FileUploader } from 'ng2-file-upload';


@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.css']
})
export class LeadComponent implements OnInit {

  url: string = environment.base_url;

  timelineButtonsHidden = false;
  timelineEntryActive = false;
  attachmentAddActive = false;
  emailInfoModalActive = false;
  editLeadActive = false;
  deleteLeadActive = false;

  newEntry: Timeline = {
    owner: '',
    lead: '',
    content: '',
    creator: 'manual',
    fileurl: '',
    filename: ''
  }

  individualLead: Lead = {
    owner: '',
    company: '',
    jobtitle: '',
    status: '',
    logourl: '',
    contactperson: {
      name: '',
      email: ''
    }
  }

  allTimelineEntries: Array<Object>;

  public uploader: FileUploader = new FileUploader({url: ''});
  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;
  itemUrl;

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  constructor(
    private leads: LeadService,
    private timeline: TimelineService,
    private session: SessionService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.leads.editEvent$.subscribe(
      data => {
        this.toggleEditLead();
      },
      err => {
        console.log(err);
      })

    this.uploader.onSuccessItem = (item: any, response: any, status: any, headers: any) => {
      this.timeline.createTimelineEntry({
        owner: this.session.user._id,
        lead: this.route.snapshot.params['id'],
        content: 'Uploaded attachment',
        creator: 'manual',
        fileurl: this.itemUrl,
        filename: item.file.name
      })
        .subscribe(entry => {
          this.getLeadTimelineEntries(this.route.snapshot.params['id']);
          this.updateLeadUpdateAt(this.route.snapshot.params['id']); // hack
          this.getLeadParamId(); // get lead data again to refresh page contents
          this.leads.announceAlarmChange();
          this.uploader.removeFromQueue(item);
        },
        error => {
          console.log(error);
        });
    };
  }

  ngOnInit() {
    this.getLeadParamId();
    this.getLeadTimelineEntries(this.route.snapshot.params['id']);
  }

  getLeadParamId() {
    this.route.params.subscribe(params => {
      this.getLead(params['id']);
    });
  }

  getLead(id: string) {
    this.leads.getLead(id)
      .subscribe(
        data => {
          this.individualLead = data;
        },
        err => {
          console.log(err);
        }
      )
  }

  deleteLead() {
    this.leads.deleteLead(this.individualLead['_id'])
      .subscribe(
        data => {
          this.router.navigate(['dashboard']);
        },
        err => {
          console.log(err);
        }
      )
  }

  cancelTimelineEntry(form) {
    form.reset();
    this.toggleTimelineEntry();
  }

  submitTimelineEntry(form) {

    this.newEntry.owner = this.session.user._id;
    this.newEntry.lead = this.route.snapshot.params['id'];

    this.timeline.createTimelineEntry(this.newEntry)
      .subscribe(
        data => {
          this.getLeadTimelineEntries(this.newEntry.lead);
          this.updateLeadUpdateAt(this.newEntry.lead);
          this.leads.announceAlarmChange();
        },
        err => {
          console.log(err);
        }
      )

    form.reset();
    this.toggleTimelineEntry();
  }

  getLeadTimelineEntries(id) {
    this.timeline.getLeadTimeLineEntries(id)
      .subscribe(
        data => {
          this.allTimelineEntries = data;
        },
        err => {
          console.log(err);
        }
      )
  }

  deleteTimelineEntry(event) {
    this.timeline.deleteTimelineEntry(event.target.parentNode.id)
      .subscribe(
        data => {
          this.getLeadTimelineEntries(this.route.snapshot.params['id']);
        },
        err => {
          console.log(err);
        }
      )
  }

  closeAttachmentAdd() {
    this.uploader.cancelAll();
    this.uploader.clearQueue();
    this.toggleAttachmentAdd();
  }

  addAttachments() {
    this.uploader.queue.forEach((item) => {
      this.timeline.getS3Credentials(item.file.name, item.file.type)
        .subscribe(
          data => {
            this.uploader.options.url = data.signedRequest;
            this.itemUrl = data.url;

            item.url = data.signedRequest;
            item.method = 'PUT';
            item.withCredentials = false; // lol

            this.uploader.uploadItem(item);
          },
          err => {
            console.log(err);
          }
        )
    });
  }

  updateLeadUpdateAt(id) {
    this.leads.setLeadUpdateAtAsCurrent(id)
      .subscribe(
        data => {
          // console.log(data);
        },
        err => {
          console.log(err);
        }
      )
    }

  // All toggles here

  toggleEditLead() {
    this.editLeadActive = !this.editLeadActive;
  }

  toggleDeleteLead() {
    this.deleteLeadActive = !this.deleteLeadActive;
  }

  toggleEmailInfoModal() {
    this.emailInfoModalActive = !this.emailInfoModalActive;
  }

  toggleTimelineEntry() {
    this.timelineEntryActive = !this.timelineEntryActive;
    this.toggleTimelineButtonsHidden();
  }

  toggleTimelineButtonsHidden() {
    this.timelineButtonsHidden = !this.timelineButtonsHidden;
  }

  toggleAttachmentAdd() {
    this.toggleTimelineButtonsHidden();
    this.attachmentAddActive = !this.attachmentAddActive;
  }
}
