import { LightningElement, track } from 'lwc';
import createMeeting from '@salesforce/apex/MeetingController.createMeeting';

export default class MeetingScheduler extends LightningElement {
    @track meetingTitle = '';
    @track meetingDate = '';
    @track startTime = '';
    @track endTime = '';

    handleTitleChange(event) { this.meetingTitle = event.target.value; }
    handleDateChange(event) { this.meetingDate = event.target.value; }
    handleStartTimeChange(event) { this.startTime = event.target.value; }
    handleEndTimeChange(event) { this.endTime = event.target.value; }

    scheduleMeeting() {
        let isValid = true;
        let inputs = this.template.querySelectorAll('lightning-input');

        // Reset previous error highlights
        inputs.forEach(input => input.classList.remove('input-error'));

        // Check if fields are filled
        if (!this.meetingTitle) {
            this.template.querySelector('[data-id="title"]').classList.add('input-error');
            isValid = false;
        }
        if (!this.meetingDate) {
            this.template.querySelector('[data-id="date"]').classList.add('input-error');
            isValid = false;
        }
        if (!this.startTime) {
            this.template.querySelector('[data-id="start"]').classList.add('input-error');
            isValid = false;
        }
        if (!this.endTime) {
            this.template.querySelector('[data-id="end"]').classList.add('input-error');
            isValid = false;
        }

        if (!isValid) {
            alert('Please fill in all fields before scheduling.');
            return;
        }

        // Proceed with meeting creation
        const newMeeting = {
            Name: this.meetingTitle,
            Meeting_Date__c: this.meetingDate,
            Start_Time__c: this.startTime,
            End_Time__c: this.endTime
        };

        createMeeting({ newMeeting })
            .then(() => {
                alert('Meeting Scheduled Successfully');
                // Clear fields after successful submission
                this.meetingTitle = '';
                this.meetingDate = '';
                this.startTime = '';
                this.endTime = '';
            })
            .catch(error => {
                console.error(error);
            });
    }
}
