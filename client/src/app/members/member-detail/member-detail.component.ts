import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { TabDirective, TabsetComponent, TabsModule } from 'ngx-bootstrap/tabs';
import { TimeagoModule } from 'ngx-timeago';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';
import { MemberMessagesComponent } from '../member-messages/member-messages.component';
import { MessageService } from 'src/app/_services/message.service';
import { Message } from 'src/app/_models/message';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
  imports: [CommonModule, TabsModule, GalleryModule, TimeagoModule, MemberMessagesComponent]
})
export class MemberDetailComponent implements OnInit {

  @ViewChild('memberTabs') memberTabs?: TabsetComponent;
  activeTab?: TabDirective;
  member: Member | undefined;
  images: GalleryItem[] = [];
  messages: Message[] = [];
  constructor(private membersService : MembersService, private route: ActivatedRoute, private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadMember();

    this.route.queryParams.subscribe(param => {
      param['tab'] && this.selectTab(param['tab'])
    })
  }

  selectTab(heading: string) {
    if(this.memberTabs) {
      console.log('tab: ', this.memberTabs);
      this.memberTabs.tabs.find(x => x.heading === heading)!.active = true; // the `!` asserts to the TypeScript compiler that the result of find is not null or undefined.
    }
  }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if(this.activeTab.heading === 'Messages') {
      this.loadMessages();
    }
  }

  loadMessages() {
    if(this.member) {
      this.messageService.getMessageThread(this.member.userName).subscribe(messages => {
        this.messages = messages;
      })
    }
  }
 
  loadMember() {
    var username = this.route.snapshot.paramMap.get('username');
    if (!username) return;
    this.membersService.getMember(username).subscribe(member => {
      this.member = member,
      this.getImages()
    });
  }

  getImages() {
    if(!this.member) return;
    for(const photo of this.member.photos) {
      this.images.push(new ImageItem({src: photo.url, thumb: photo.url}));
    }
  }

}
