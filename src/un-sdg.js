import { LitElement, html, css } from 'lit';

// define goal data with name, color, and image paths
const goalData = [
  { name: 'No Poverty', color: '#e5243b', image: new URL('../lib/svgs/goal-1.svg', import.meta.url).href },
  { name: 'Zero Hunger', color: '#dda63a' },
  { name: 'Good Health and Well-being', color: '#4c9f38' },
  { name: 'Quality Education', color: '#c5192d' },
  { name: 'Gender Equality', color: '#ff3a21' },
  { name: 'Clean Water and Sanitation', color: '#26bde2' },
  { name: 'Affordable and Clean Energy', color: '#fcc30b' },
  { name: 'Decent Work and Economic Growth', color: '#a21942' },
  { name: 'Industry, Innovation and Infrastructure', color: '#fd6925' },
  { name: 'Reduced Inequalities', color: '#dd1367' },
  { name: 'Sustainable Cities and Communities', color: '#fd9d24' },
  { name: 'Responsible Consumption and Production', color: '#bf8b2e' },
  { name: 'Climate Action', color: '#3f7e44' },
  { name: 'Life Below Water', color: '#0a97d9' },
  { name: 'Life on Land', color: '#56c02b' },
  { name: 'Peace, Justice and Strong Institutions', color: '#00689d' },
  { name: 'Partnerships for the Goals', color: '#19486a' },
];

// create custom element for un-sdg
export class UnSdg extends LitElement {
  static get properties() {
    return {
      goal: { type: String, reflect: true }, // track goal prop
      label: { type: String }, // track label prop
      colorOnly: { type: Boolean, attribute: 'color-only', reflect: true }, // boolean to show color
      _currentSrc: { type: String }, // track current src
      alt: { type: String }, // track alt text
    };
  }

  // styles for the component
  static get styles() {
    return css`
      :host {
        display: inline-block;
        width: 254px;
        height: 254px;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      .color-only {
        width: 100%;
        height: 100%;
      }
    `;
  }

  constructor() {
    super();
    this.goal = '1'; // default goal
    this.label = ''; // default label
    this.alt = null; // default alt text
    this.colorOnly = false; // default colorOnly flag
    this._currentSrc = null; // default image source
  }

  // lifecycle method to handle updates
  updated(changedProperties) {
    if (changedProperties.has('goal')) {
      this.updateGoalImage(); // update image when goal changes
    }
  }

  // method to update the goal image based on the goal prop
  updateGoalImage() {
    if (this.goal === 'all') {
      // if goal is all, set to all.svg
      this._currentSrc = new URL(`../lib/svgs/all.svg`, import.meta.url).href;
      this.alt = 'All Sustainable Development Goals'; // alt text for all goals
    } else if (this.goal === 'circle') {
      // if goal is circle, set to circle.png
      this._currentSrc = new URL(`../lib/svgs/circle.png`, import.meta.url).href;
      this.alt = 'Sustainable Development Goals Circle'; // alt text for circle
    } else {
      const goalNumber = parseInt(this.goal); // convert goal to number
      if (goalNumber >= 1 && goalNumber <= 17) {
        // if valid goal number, set image
        this._currentSrc = new URL(`../lib/svgs/goal-${goalNumber}.svg`, import.meta.url).href;
        this.alt = `Goal ${goalNumber}: ${goalData[goalNumber - 1].name}`; // set alt text
      }
    }
  }

  // render method to display the image or color block
  render() {
    if (this.colorOnly) {
      const goalNumber = parseInt(this.goal); // parse goal number
      if (goalNumber >= 1 && goalNumber <= 17) {
        const color = goalData[goalNumber - 1].color; // get color from goal data
        return html`<div class="color-only" style="background-color: ${color};"></div>`; // return color block
      }
    }

    // return the image with alt and loading attributes
    return html`
      <img
        src="${this._currentSrc}"
        alt="${this.label || this.alt}"
        loading="lazy"
        fetchpriority="low"
      />
    `;
  }
}

// register the custom element
customElements.define('un-sdg', UnSdg);
