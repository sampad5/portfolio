import { LightningElement, wire, track } from 'lwc';
import getMeetings from '@salesforce/apex/MeetingController.getMeetings';

export default class MeetingList extends LightningElement {
    @track meetings = [];

    @wire(getMeetings)
    wiredMeetings({ error, data }) {
        if (data) {
            this.meetings = data;
            this.scheduleNotifications();
        } else if (error) {
            console.error('Error fetching meetings', error);
        }
    }

    scheduleNotifications() {
        this.meetings.forEach(meeting => {
            let meetingTime = new Date(meeting.Meeting_Date__c + 'T' + meeting.Start_Time__c);
            let now = new Date();
            let notifyBeforeMinutes = 10; // Notify 10 minutes before
            let notifyTime = new Date(meetingTime.getTime() - notifyBeforeMinutes * 60000);

            if (notifyTime > now) {
                let delay = notifyTime - now;
                setTimeout(() => {
                    alert(`🔔 Reminder: Your meeting "${meeting.Name}" starts in ${notifyBeforeMinutes} minutes!`);
                }, delay);
            }
        });
    }
}
