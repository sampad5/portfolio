import { LightningElement, track } from 'lwc';

export default class BmiCalculator extends LightningElement {
    @track weight = '';
    @track height = '';
    result;
    bmiValue;
    clicked = false;
    @track bmi;
    isFormVisible = true;  // Controls visibility of the input form

    onweightChange(event) {
        this.weight = parseFloat(event.target.value);
    }

    onheightChange(event) {
        this.height = parseFloat(event.target.value);
    }

    calculateBMI() {
        this.bmiValue = this.weight / ((this.height / 100) * (this.height / 100));
        this.bmi = this.bmiValue.toFixed(2); // Changing BMI values with only two decimal value

        // Result based on BMI
        if (this.bmi < 18.5) {
            this.result = 'Underweight';
        } else if (this.bmi >= 18.5 && this.bmi < 25) {
            this.result = 'Healthy';
        } else if (this.bmi >= 25 && this.bmi < 30) {
            this.result = 'Overweight';
        } else if (this.bmi >= 30) {
            this.result = 'Obese';
        } else {
            this.result = 'NaN';
        }

        this.clicked = true; // Show the result after calculating BMI
        this.isFormVisible = false; // Hide the form and the calculate button after calculation
    }

    resetInputs() {
        this.clicked = false;
        this.weight = '';
        this.height = '';
        this.isFormVisible = true; // Show the form and calculate button again after reset
    }
}
